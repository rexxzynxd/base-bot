───────────────────╮
│ 📁 WhatsApp Bot Base by RexxHayanasi│
╰──────────────────╯
---

## 📌 Deskripsi

Base bot WhatsApp ini merupakan **versi pembaruan terbaru** yang sudah mendukung penggunaan:

- 🆔 `@lid` *(Local Identifier)*
- 🌐 `@jid` *(Jabber ID)*

Jika terdapat kendala dalam script, kamu bisa melakukan *fix* sendiri atau menunggu pembaruan berikutnya.  
Terima kasih telah menggunakan base bot ini 🙌  

Bot ini menggunakan **Baileys custom/mod** agar lebih stabil dan fleksibel, serta mendukung **struktur modular ESM (import/export)** pada proyek **Node.js**.  

> ⚙️ **Minimal Node.js versi 20+ diperlukan** agar fitur **QR Code WhatsApp** dapat berfungsi dengan baik.

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
<summary>🎉 <b>Login via Code pair WhatsApp [ Next Update ]</b></summary>

Mendukung sistem login modern menggunakan **Pairing Code** langsung dari terminal.  
Kamu cukup memasukan nomer bot dan mengisi code dari terimnal ke perangkat tertaut di whatsapp, dan sesi akan tersimpan otomatis di folder `sesi/` agar tidak perlu login ulang.
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

## 📦 Kebutuhan Sistem

<details>
<summary>🟢 <b>Node.js v20 atau lebih baru</b></summary>

Versi **Node.js 20+** diperlukan agar bot dapat menggunakan fitur  
modern seperti **QR Code login**, **async/await penuh**, dan **ESM (import/export)**.  
> 💡 Disarankan menggunakan versi LTS terbaru untuk stabilitas maksimal.
</details>

<details>
<summary>🧩 <b>Baileys Custom / Mod</b></summary>

Script ini memakai **Baileys @rexxhayanasi/elaina-bail** agar lebih stabil  
dan kompatibel dengan update WhatsApp terbaru.  
> ⚙️ Pastikan menggunakan versi **yang mendukung @lid & @jid**.
</details>

<details>
<summary>🌐 <b>Koneksi Internet Stabil</b></summary>

Bot memerlukan koneksi internet yang stabil agar proses sinkronisasi  
dan QR login berjalan lancar.  
> 📶 Disarankan menggunakan jaringan **Wi-Fi atau VPS** dengan uptime tinggi.
</details>


---
## 🔗 Saluran Resmi

<details>
<summary>📡 <b>Bergabung!</b></summary>

Bergabunglah dengan **saluran resmi WhatsApp bot ini**  
untuk mendapatkan:
- 📢 Update terbaru script  
- 🧩 Rilis fitur tambahan  
- 🛠️ Patch & perbaikan bug  
- 💬 Diskusi Terkait dengan bot

👉 [Klik di sini untuk bergabung](https://whatsapp.com/channel/0029VapYyKEGufIpsd3Rja2C)
</details>


---

## 🧑‍💻 Developer

<details>
<summary>💻 <b>Lihat Informasi Developer</b></summary>

**👤 Developer Utama:**  
> 🧠 **RexxHayanasi**  

**📜 Script Original:**  
> ✍️ *Fauzialfatah*  

Terima kasih untuk kontribusi dan pengembangan base bot ini 🙌  
Jika kamu ingin mengembangkan lebih lanjut atau memberikan kredit,  
harap tetap mencantumkan nama developer asli.
</details>




---

⭐ Dukung Proyek Ini

Jika kamu merasa script ini bermanfaat,
jangan lupa berikan ⭐ pada repository ini dan bergabung di saluran whatsapp!
---
