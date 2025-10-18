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
```

---
⚙️ Parameter Plugin Handler
```bash
const senderJid = msg.key.remoteJid;
const senderLid = msg.key.chat?.lid; 
const sender = senderLid || senderJid; 
const isGroup = senderLid ? true : senderJid.endsWith('@g.us');

const groupMetadata = isGroup
  ? await sock.groupMetadata(sender).catch(() => ({}))
  : {};
```

---

## 🚀 Fitur Utama

<details>
<summary>✅ <b>Dukungan @lid & @jid</b></summary>

Base bot ini telah mendukung sistem identifikasi ganda menggunakan:
- **@lid (Local Identifier)** untuk grup atau chat lokal.
- **@jid (Jabber ID)** untuk user, bot, dan grup global.

Meningkatkan fleksibilitas serta kompatibilitas dalam pengelolaan event dan metadata chat.
</details>

<details>
<summary>🔄 <b>Login via QR Code WhatsApp</b></summary>

Mendukung sistem login modern menggunakan **QR Code** langsung dari terminal.  
Kamu cukup memindai QR sekali, dan sesi akan tersimpan otomatis di folder `sesi/` agar tidak perlu login ulang.
</details>

<details>
<summary>⚡ <b>Struktur Modular (ESM)</b></summary>

Dibangun menggunakan **ECMAScript Module (import/export)** untuk kompatibilitas penuh dengan proyek Node.js modern.  
Memudahkan pengembangan, pembacaan kode, dan integrasi plugin baru.
</details>

<details>
<summary>🧱 <b>Plugin System Mudah Dikembangkan</b></summary>

Struktur plugin yang sederhana dan terpisah dalam folder `plugins/`, sehingga kamu dapat menambahkan, menghapus, atau memodifikasi fitur tanpa mengubah file utama.  
Cocok untuk pengembang yang ingin memperluas kemampuan bot.
</details>

<details>
<summary>💾 <b>Auto Generate Folder Sesi</b></summary>

Folder `sesi/` akan otomatis dibuat oleh **Baileys**, menyimpan data koneksi dan sesi agar login tetap bertahan meskipun bot direstart.
</details>

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

