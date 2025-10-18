/* Base-Bot RexxHayanasi| RClouds Team
jika menu error sesuaikan aja
*/


const handler = async (m, plug) => {
    const { sock, config, m: msg, isGroup, userLid, groupName } = plug;
    const chatId = m.chat || m.key.remoteJid;
    if (!sock.user) {
        console.error("Client atau user bot tidak terdefinisi.");
        await sock.sendMessage(chatId, { text: "Maaf, bot sedang mengalami masalah internal. Silakan coba lagi nanti." });
        return;
    }
    const ownerNumber = config.owner;
    let menubot = `
Hallo kak

Ini adalah informasi bot:
 Nama Bot: ${sock.user.name}
 Owner: ${ownerNumber}
`;

    if (userLid) {
        menubot += `
Identifikasi chat ini adalah LID: ${userLid}
`;
    } else if (m.chat) {
        menubot += `
Identifikasi chat ini adalah JID: ${m.chat}
`;
    }
    if (isGroup) {
        menubot += `
Nama Grup: ${groupName}
`;
    }

    menubot += `
Owner script: https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z
`;
    await sock.sendMessage(chatId, { text: menubot.trim() });
};

handler.help = ['menu'];
handler.tags = ['general'];
handler.command = ["menu", "start", "p"];
handler.limit = true;
//handler.private = true;
//handler.group = true;

export default handler;
