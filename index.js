import { createRequire } from 'module';
import qrcode from 'qrcode-terminal';
import pkg from '@rexxhayanasi/elaina-bail';
const { makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = pkg;

import { Boom } from '@hapi/boom';
import P from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { pathToFileURL } from 'url';
import { watchFile, unwatchFile } from 'fs';

import globalConfig from './settings/config.js';
import colors from './settings/colors.js'; 
import { setupMessageHandler } from './handler.js';
import { Connection } from './lib/connection/connect.js';

let currentSock = null;

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`\n${colors.bright}${colors.cyan}=====================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}         BOT WHATSAPP DIMULAI        ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}=====================================${colors.reset}\n`);

const PLUGINS_DIR = path.resolve(__dirname, "./plugins");

const pluginsLoader = async (directory) => {
    let plugins = [];
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        if (filePath.endsWith(".js")) {
            try {
                const fileUrl = pathToFileURL(filePath).href;
                delete require.cache[fileUrl]; 
                const pluginModule = await import(fileUrl + `?update=${Date.now()}`);
                const pluginHandler = pluginModule.default;

                if (typeof pluginHandler === 'function' && pluginHandler.command) {
                    plugins.push(pluginHandler);
                } else {
                    console.log(`${colors.error}[PLUGIN ERROR] Plugin ${filePath} tidak memiliki struktur yang diharapkan (export default function dengan properti 'command').${colors.reset}`);
                }
            } catch (error) {
                console.log(`${colors.error}[PLUGIN ERROR] Gagal memuat plugin ${filePath}:`, error, colors.reset);
            }
        }
    }
    return plugins;
};

const userLimits = {};

function checkAndApplyLimit(userJid) {
    if (!globalConfig.limit.enable) return true;

    const now = Date.now();
    let userData = userLimits[userJid];

    if (!userData) {
        userData = { count: 0, lastUsed: now };
        userLimits[userJid] = userData;
    }

    if (now - userData.lastUsed > globalConfig.limit.resetIntervalMs) {
        userData.count = 0;
        userData.lastUsed = now;
    }

    if (userData.count >= globalConfig.limit.maxDaily) {
        return false;
    }

    userData.count++;
    userData.lastUsed = now;
    return true;
}

async function connectToWhatsApp() {
    if (currentSock) {
        try {
            if (currentSock && typeof currentSock.end === 'function') {
                await currentSock.end();
            }
        } catch (error) {
            console.log(`${colors.error}[RESTART ERROR] Gagal menutup koneksi sebelumnya:${colors.reset}`, error);
        }
        currentSock = null;
    }

    const { state, saveCreds } = await useMultiFileAuthState('sesi');

    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: Browsers.macOS('Desktop'),
        msgRetryCounterMap: {},
        retryRequestDelayMs: 250,
        markOnlineOnConnect: false,
        emitOwnEvents: true,
        patchMessageBeforeSending: (msg) => {
            if (msg.contextInfo) delete msg.contextInfo.mentionedJid;
            return msg;
        },
        appStateSyncInitialTimeoutMs: 10000 
    });

    currentSock = sock;

    const loadedPlugins = await pluginsLoader(PLUGINS_DIR);
    console.log(`${colors.info}[PLUGIN LOADER] Memuat ${loadedPlugins.length} plugin dari ${PLUGINS_DIR}${colors.reset}`);

    setupMessageHandler(sock, loadedPlugins, globalConfig, userLimits, checkAndApplyLimit);
    Connection(sock, connectToWhatsApp, saveCreds);
}

let isWatchingPlugins = false;

const startPluginWatcher = () => {
    if (isWatchingPlugins) return;

    const files = fs.readdirSync(PLUGINS_DIR);
    console.log(`${colors.info}[WATCHER] Memulai pengawasan ${files.length} file plugin di ${PLUGINS_DIR}${colors.reset}`);

    files.forEach(file => {
        if (file.endsWith(".js")) {
            const filePath = path.join(PLUGINS_DIR, file);
            watchFile(filePath, () => {
                unwatchFile(filePath);
                console.log(`${colors.warning}[RELOAD] Perubahan terdeteksi pada plugin: ${file}${colors.reset}`);
                console.log(`${colors.info}[RELOAD] Melakukan restart bot...${colors.reset}`);
                connectToWhatsApp();
            });
        }
    });
    isWatchingPlugins = true;
};

connectToWhatsApp();
startPluginWatcher();
