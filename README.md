# 📁 WhatsApp Bot Base by RexxHayanasi  
> 🧠 *Script asli dikembangkan oleh* **Fauzialfatah**

---

## 📌 Deskripsi

Base bot WhatsApp ini merupakan **versi pembaruan terbaru** yang sudah mendukung penggunaan:

- 🆔 `@lid` *(Local Identifier)*
- 🌐 `@jid` *(Jabber ID)*

Jika terdapat kendala dalam script, kamu bisa melakukan *fix* sendiri atau menunggu pembaruan berikutnya.  
Terima kasih telah menggunakan base bot ini 🙌  

Bot ini menggunakan **Baileys custom/mod** agar lebih stabil dan fleksibel, serta mendukung **struktur modular ESM (import/export)** pada proyek **Node.js**.  

> ⚙️ **Minimal Node.js versi 24+ diperlukan** agar fitur **QR Code WhatsApp** dapat berfungsi dengan baik.

---

## 🧩 Struktur Folder

```bash
/base-bot/
├── index.js
├── package.json
├── sesi/                 # Dibuat otomatis oleh Baileys
├── settings/
│   ├── config.js
│   └── colors.js
├── handler.js
├── plugins/
│   ├── flux.js
│   ├── menu.js
│   └── deepai.js
└── lib/
    └── scrape/
        ├── deepai-api.js
        └── fluxai-api.js


---

⚙️ Parameter Plugin Handler

const senderJid = msg.key.remoteJid;
const senderLid = msg.key.chat?.lid; 
const sender = senderLid || senderJid; 
const isGroup = senderLid ? true : senderJid.endsWith('@g.us');

const groupMetadata = isGroup
  ? await sock.groupMetadata(sender).catch(() => ({}))
  : {};


---

🚀 Fitur Utama

✅ Dukungan @lid & @jid

🔄 Login via QR Code WhatsApp

⚡ Struktur modular (ESM)

🧱 Plugin system mudah dikembangkan

💾 Auto generate folder sesi



---

📦 Kebutuhan Sistem

Node.js v24 atau lebih baru

Baileys custom/mod

Koneksi internet stabil



---

🔗 Saluran Resmi

📡 Klik untuk Bergabung


---

🧑‍💻 Developer

RexxHayanasi

> Script original by Fauzialfatah




---

⭐ Dukung Proyek Ini

Jika kamu merasa script ini bermanfaat,
jangan lupa berikan ⭐ pada repository ini dan bergabung di saluran resmi kami!


---

---

File ini sudah diformat mengikuti **gaya standar README GitHub**:
- Menggunakan heading, icon emoji, dan blok kode berwarna.
- Bersih dan konsisten (tanpa tampilan terminal penuh).
- Sudah 100% siap ditempatkan di repositori GitHub.

Apakah kamu mau saya tambahkan **badge GitHub** (misalnya: Node.js version, license, last commit) di bagian atas agar tampil seperti proyek open-source profesional?

