import util from 'util';
import colors from './settings/colors.js';
import { 
    logHeader, 
    logFooter, 
    logIncomingMessage, 
    logNonCommand, 
    logCommandDetection, 
    logCommandStatus, 
    logWarning, 
    logError, 
    logLimitInfo, 
    logLimitBlocked
} from './settings/logger.js';

export const setupMessageHandler = (sock, loadedPlugins, globalConfig, userLimits, checkAndApplyLimit) => {
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const now = Date.now();
            const botNumber = sock.user.id.replace(/:[0-9]+/, '');

            for (let msg of messages) {
                if (msg.key.fromMe || !msg.message) {
                    continue;
                }
                
                logHeader('REXXHAYANASI');

                const senderJid = msg.key.remoteJid;
                const senderLid = msg.key.chat?.lid; 
                const sender = senderLid || senderJid; 
                const isGroup = senderLid ? true : senderJid.endsWith('@g.us');

                const groupMetadata = isGroup ? await sock.groupMetadata(sender).catch(() => ({})) : {};
                const groupName = isGroup ? groupMetadata.subject || '' : '';
                const participants = isGroup
                    ? groupMetadata.participants?.map(p => {
                        const admin = p.admin === 'superadmin' ? 'superadmin' : p.admin === 'admin' ? 'admin' : null;
                        return { id: p.id || null, lid: p.lid || null, admin, full: p };
                    }) || []
                    : [];
                const groupOwner = isGroup
                    ? participants.find(p => p.admin === 'superadmin')?.id || ''
                    : '';
                const groupAdmins = participants
                    .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
                    .map(p => p.id);
                const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = isGroup ? groupAdmins.includes(msg.key.participant || msg.key.remoteJid) : false;
                const isGroupOwner = isGroup ? groupOwner === (msg.key.participant || msg.key.remoteJid) : false;
                const userLid = (() => {
                    const p = participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid));
                    return p?.lid || null;
                })();

                let messageBody = '';
                if (msg.message.conversation) {
                    messageBody = msg.message.conversation;
                } else if (msg.message.extendedTextMessage?.text) {
                    messageBody = msg.message.extendedTextMessage.text;
                } else if (msg.message.imageMessage?.caption) {
                    messageBody = msg.message.imageMessage.caption;
                } else if (msg.message.videoMessage?.caption) {
                    messageBody = msg.message.videoMessage.caption;
                } else if (msg.message.listMessage?.description) {
                    messageBody = msg.message.listMessage.description;
                } else if (msg.message.buttonsMessage?.content?.text) {
                    messageBody = msg.message.buttonsMessage.content.text;
                } else if (msg.message.templateButtonReplyMessage?.selectedDisplayText) {
                    messageBody = msg.message.templateButtonReplyMessage.selectedDisplayText;
                } else if (msg.message.reaction?.text) {
                    messageBody = msg.message.reaction.text;
                } else if (msg.message.stickerMessage) {
                    continue;
                }

                const logSender = senderLid ? `${colors.bright}${colors.cyan}LID:${colors.reset} ${senderLid}` : `${colors.bright}${colors.cyan}JID:${colors.reset} ${sender}`;
                const logType = Object.keys(msg.message)[0];
                logIncomingMessage(logSender, logType, messageBody, isGroup);
                
                let command = '';
                let args = '';
                const prefix = globalConfig.prefix;

                if (messageBody.toLowerCase().trim().startsWith(prefix)) {
                    const contentWithoutPrefix = messageBody.toLowerCase().trim().slice(prefix.length).trim();
                    const parts = contentWithoutPrefix.split(' ');
                    command = parts[0];
                    args = parts.slice(1).join(' ');
                    logCommandDetection(command, args);
                } else {
                    logNonCommand(messageBody);
                    logFooter();
                    continue;
                }

                const plug = {
                    sock,
                    command: command,
                    text: messageBody,
                    args: args,
                    isBot: msg.key.fromMe,
                    m: msg,
                    config: globalConfig,
                    isGroup: isGroup,
                    client: sock,
                    groupMetadata,
                    groupName,
                    participants,
                    groupOwner,
                    groupAdmins,
                    isBotAdmins,
                    isAdmins,
                    isGroupOwner,
                    userLid,
                    botNumber
                };

                let commandHandled = false;
                let matchedCommand = '';

                for (let pluginHandler of loadedPlugins) {
                    if (typeof pluginHandler === 'function' && pluginHandler.command) {
                        const commandsToMatch = Array.isArray(pluginHandler.command) ? pluginHandler.command : [pluginHandler.command];

                        const foundCommand = commandsToMatch.find(cmd => cmd === command);
                        if (foundCommand) {
                            logCommandStatus('running', foundCommand);

                            if (pluginHandler.group && !isGroup) {
                                await sock.sendMessage(sender, { text: globalConfig.mess.ingroup }, { quoted: msg });
                                logWarning(`Perintah "${foundCommand}" hanya untuk grup. Ditolak.`);
                                commandHandled = true;
                                break;
                            }

                            if (pluginHandler.private && isGroup) {
                                await sock.sendMessage(sender, { text: globalConfig.mess.privateChat }, { quoted: msg });
                                logWarning(`Perintah "${foundCommand}" hanya untuk chat pribadi. Ditolak.`);
                                commandHandled = true;
                                break;
                            }

                            if (globalConfig.limit.enable && pluginHandler.limit) {
                                const userJid = msg.key.participant || msg.key.remoteJid;
                                if (userJid.replace(/@.+/, '') === globalConfig.owner) {
                                     logLimitInfo(`Owner (${userJid}) menggunakan perintah tanpa limit.`);
                                } else if (!checkAndApplyLimit(userJid)) {
                                    const userData = userLimits[userJid];
                                    const timeDiff = userData.lastUsed + globalConfig.limit.resetIntervalMs - now;
                                    const remainingHours = Math.ceil(timeDiff / (60 * 60 * 1000));
                                    const remainingMinutes = Math.ceil(timeDiff / (60 * 1000));
                                    
                                    let remainingTimeMessage = remainingHours > 0 ? `${remainingHours} jam` : `${remainingMinutes} menit`;
                                    let limitMessage = globalConfig.limit.message
                                        .replace('%maxDaily%', globalConfig.limit.maxDaily)
                                        .replace('%resetHours%', globalConfig.limit.resetIntervalMs / (60 * 60 * 1000))
                                        .replace('%remainingTime%', remainingTimeMessage);

                                    await sock.sendMessage(sender, { text: limitMessage }, { quoted: msg });
                                    logLimitBlocked(`Pengguna ${userJid} mencapai limit untuk perintah "${foundCommand}".`);
                                    commandHandled = true;
                                    break;
                                } else {
                                     logLimitInfo(`Pengguna ${userJid} menggunakan perintah "${foundCommand}". Sisa: ${globalConfig.limit.maxDaily - userLimits[userJid].count}`);
                                }
                            }

                            try {
                                await pluginHandler(msg, plug);
                                commandHandled = true;
                                matchedCommand = foundCommand;
                                logCommandStatus('success', matchedCommand);
                                break;
                            } catch (error) {
                                logError(`Gagal menjalankan perintah "${foundCommand}":`, error);
                                await sock.sendMessage(sender, { text: `Maaf, terjadi kesalahan saat menjalankan perintah "${foundCommand}". Silakan coba lagi nanti.` }, { quoted: msg });
                            }
                        }
                    }
                }
                
                if (!commandHandled) {
                   logCommandStatus('notfound', command);
                }
                logFooter();
            }
        }
    });
};
