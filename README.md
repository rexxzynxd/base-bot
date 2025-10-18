# 📁Script Bot WhatsApp By RexxHayanasi

[!](Script asli dimiliki oleh Fauzialfatah)

### 
**Update script base bot whatsapp yang sudah cukup support @lid ( Local Identifier ) dan @jid ( Jabber ID ) jika ada kendala dalam script tersebut kamu bisa ngefix sendiri atau tungguh update selanjutnya terimakasih atas penggunaan script base sayamenggunakan bailyes costum atau mood agar lebih stabil, Struktur ini mendukung fleksibilitas dalam menggunakan ESM (import/export) proyek Node.js.**

**Bot ini dirancang untuk berjalan dengan Node.js versi 24 atau yang lebih baru, yang mendukung fungsionalitas QR code untuk koneksi WhatsApp.**
```bash

/base-bot/
├── index.js
├── package.json
├── sesi/ (folder ini akan dibuat otomatis oleh Baileys)
├── settings/
│   ├── config.js
│   └── colors.js
├── handler.js
├── command/
│   ├── flux.js
│   ├── menu.js
│   └── deepai.js
└── lib/
    └── scrape/
        ├── deepai-api.js
        └── fluxai-api.js 
```

### 
**Parameter yang Diteruskan ke Plugin Handler:**
```bash
const senderJid = msg.key.remoteJid;
const senderLid = msg.key.chat?.lid; 
const sender = senderLid || senderJid; 
const isGroup = senderLid ? true : senderJid.endsWith('@g.us');

const groupMetadata = isGroup ? await sock.groupMetadata(sender).catch(() => ({})) : {};
```

[Saluran](https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z)
