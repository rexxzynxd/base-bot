import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { watchFile, unwatchFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const globalConfig = {
    owner: "6285282530851",
    namaOwner: "RexxHayanasi",
    aiApiToken: "8be9e34764cd2fc4e6bcfb1bf6a945efe30406573a92d8ef0ec1613dc0e54876",
    prefix: "/",
    limit: {
        enable: true,
        maxDaily: 5,
        resetIntervalMs: 24 * 60 * 60 * 1000,
        message: "Maaf, Anda telah mencapai batas penggunaan %maxDaily%x untuk perintah ini dalam %resetHours% jam terakhir. Coba lagi dalam sekitar %remainingTime%."
    },
    mess: {
        ingroup: "Lucu banget, fitur ini cuma buat grup",
        admin: "tidak lucu, hanya admin grup yang menggunakan fitur ini",
        owner: "Wah! Kamu bukan pemilikku.",
        premium: "Anda bukan pengguna premium",
        seller: "Anda belum memiliki akses sebagai penjual",
        wait: "Tunggu sebentar ya kak, permintaan sedang diproses...",
        privateChat: "Maaf, perintah ini hanya bisa digunakan di chat pribadi dengan bot."
    }
};

function loadConfig() {
}

let file = __filename;
watchFile(file, () => {
    unwatchFile(file);
    console.log('\x1b[0;32m' + file + ' \x1b[1;32mupdated!\x1b[0m');
});

export default globalConfig;
