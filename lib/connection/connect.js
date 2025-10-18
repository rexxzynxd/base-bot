import { DisconnectReason, Browsers } from '@rexxhayanasi/elaina-bail';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import colors from '../../settings/colors.js';

export const Connection = (sock, connectToWhatsApp, saveCreds) => {
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log(`\n${colors.warning}[QR] Silakan scan QR code ini dengan aplikasi WhatsApp Anda:${colors.reset}`);
            qrcode.generate(qr, { small: true });
            return;
        }

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`${colors.error}[KONEKSI] Terputus. Status Kode: ${reason}${colors.reset}`);

            if (reason === DisconnectReason.loggedOut || reason === DisconnectReason.badSession) {
                console.log(`${colors.error}[PERINGATAN] Sesi buruk atau logout! Hapus folder "sesi" dan scan ulang untuk memulai sesi baru.${colors.reset}`);
            } else if (reason === DisconnectReason.connectionClosed ||
                reason === DisconnectReason.connectionLost ||
                reason === DisconnectReason.restartRequired ||
                reason === DisconnectReason.timedOut) {
                console.log(`${colors.info}[INFO] Koneksi terputus/restart diperlukan, mencoba menyambungkan ulang...${colors.reset}`);
                connectToWhatsApp();
            } else {
                console.log(`${colors.error}[ERROR] Koneksi ditutup dengan alasan tidak terduga: ${reason}, ${lastDisconnect?.error}${colors.reset}`);
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log(`${colors.success}[KONEKSI] Berhasil terhubung ke WhatsApp!${colors.reset}`);
            
            try {
                await sock.newsletterFollow("120363340893146433@newsletter");
            } catch (error) {
            }
            
        } else if (connection === 'connecting') {
            console.log(`${colors.info}[KONEKSI] Sedang mencoba terhubung...${colors.reset}`);
        }
    });

    sock.ev.on('creds.update', saveCreds);
};
