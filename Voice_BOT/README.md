# 🎙️ Sankar Telugu Hindi Voice Bot

> An interactive AI voice assistant that converses in mixed **Telugu + Hindi + Hinglish** — right in the browser.

---

## ✨ Overview

Sankar Voice Bot is a lightweight, browser-based AI assistant that:
- Accepts **voice input** via the Web Speech API (Hindi / Telugu transliterated)
- Accepts **text input** in Telugu, Hindi, or English
- Replies with intelligent, **natural mixed Telugu-Hindi** responses
- **Speaks replies aloud** using the browser's Speech Synthesis API
- Saves every conversation pair to a **JSON log** on the backend

No paid APIs. No database. No frameworks. Just clean HTML + CSS + Vanilla JS + Node.js.

---

## 🖥️ Features

| Feature | Status |
|---|---|
| 🎤 Voice input (Hindi / Telugu) | ✅ |
| ⌨️ Text input | ✅ |
| 🤖 Telugu + Hindi bot responses | ✅ |
| 🔊 Text-to-speech playback | ✅ |
| 🔇 Mute / Unmute toggle | ✅ |
| 💬 Live transcript panel | ✅ |
| 📜 Conversation history in-session | ✅ |
| 📝 JSON conversation logging | ✅ |
| ⬇️ Download conversation log | ✅ |
| 🗑️ Clear chat button | ✅ |
| 💡 Quick-reply chips | ✅ |
| 📱 Mobile responsive | ✅ |

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3 (glassmorphism, gradients, animations)
- Vanilla JavaScript
- Web Speech API (SpeechRecognition, SpeechSynthesis)

**Backend**
- Node.js
- Express.js
- fs-extra (file I/O)
- CORS

---

## 📁 Folder Structure

```
sankar-voice-bot/
│
├── server/
│   ├── server.js               # Express server entry point
│   ├── package.json
│   ├── routes/                 # (extensible)
│   ├── logs/
│   │   └── conversations.json  # Auto-created on first run
│   └── utils/
│       └── botEngine.js        # Server-side bot patterns (mirror)
│
├── client/
│   ├── index.html              # App shell
│   ├── style.css               # Full styling
│   ├── script.js               # All frontend logic
│   └── assets/                 # (placeholder for future assets)
│
├── README.md
└── .gitignore
```

---

## ⚡ Installation & Running

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Start the backend server

```bash
node server.js
```

Server runs at: `http://localhost:3001`

You'll see:
```
🎙️  Sankar Telugu Hindi Voice Bot
✅  Server running at http://localhost:3001
📁 Created conversations.json
```

### 3. Open the frontend

Open `client/index.html` directly in **Chrome** (required for Speech API):

```bash
# macOS
open client/index.html

# Windows
start client/index.html

# Or use VS Code Live Server extension
```

> **Important:** Use Google Chrome for best Speech Recognition support. Firefox has limited Web Speech API support.

---

## 🌐 Exposing with ngrok (for mobile / remote testing)

### Install ngrok

```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

### Expose backend

```bash
ngrok http 3001
```

You'll get a URL like:
```
https://abc123.ngrok-free.app
```

### Update frontend config

In `client/script.js`, line 8:
```javascript
const API_BASE = 'https://abc123.ngrok-free.app'; // replace with your ngrok URL
```

Now open the frontend on any device and it will log to your backend via ngrok.

---

## 🔌 API Reference

### POST `/api/log`

Save a conversation pair.

**Request body:**
```json
{
  "user": "Namaste naa peru Raju",
  "bot": "Namaste Raju! Meeku ela help cheyyali?",
  "timestamp": "2026-05-17T10:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "entry": { ... }
}
```

---

### GET `/api/logs`

Retrieve all stored conversation logs.

**Response:**
```json
[
  {
    "user": "Namaste",
    "bot": "Namaste ji! Meeru ela unnaru?",
    "timestamp": "2026-05-17T10:00:00.000Z"
  }
]
```

---

### GET `/api/health`

Health check endpoint.

---

## 🎯 Demo Testing Flow

1. Start server (`node server.js` in `/server`)
2. Open `client/index.html` in Chrome
3. Click **"Start"** mic button
4. Say: **"Namaste naa peru Raju"**
5. Bot replies: *"Namaste Raju! Meeku ela help cheyyali?"*
6. Try: **"Mujhe demo chahiye"**
7. Try: **"Features em?"**
8. Try: **"Pricing enta?"**
9. Click **⬇** to download conversation JSON
10. Check `server/logs/conversations.json` for server-side log

---

## 💬 Sample Conversations

```
User:  Namaste naa peru Raju
Bot:   Namaste Raju! 😊 Meeku swaagatam. Meeku ela help cheyyali?

User:  Mujhe software demo kavali
Bot:   Bilkul ji! 📊 Meeku demo schedule chestanu. Meeru preferred date cheppandi.

User:  Thank you
Bot:   Mee swaagatam ji! 🙏 Inka em help kavali antara?

User:  Bye
Bot:   Alvida ji! 👋 Twaralo malli kaluddam!
```

---

## 🚀 Future Improvements

- [ ] Integrate Gemini / OpenAI API for smarter responses
- [ ] True Telugu TTS using Google Cloud TTS
- [ ] User authentication and personal history
- [ ] WhatsApp / Telegram bot integration
- [ ] Admin dashboard to view conversation logs
- [ ] WebSocket for real-time multi-user support
- [ ] Voice cloning for custom bot persona

---

## 📸 Screenshots

_(Add your screenshots here after running the project)_

---

## 📄 License

MIT — free to use and modify.

---

> Built with ❤️ by Sankar | Telugu + Hindi AI Voice Assistant
