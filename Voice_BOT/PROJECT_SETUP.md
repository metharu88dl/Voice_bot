# 🎙️ Sankar Telugu Hindi Voice Bot - Project Setup Guide

> A complete step-by-step guide to set up and run the Sankar Voice Bot project.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation Steps](#installation-steps)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Configuration](#configuration)
7. [Features Overview](#features-overview)
8. [Usage Instructions](#usage-instructions)
9. [Troubleshooting](#troubleshooting)
10. [Development Guide](#development-guide)

---

## 📝 Project Overview

**Sankar Telugu Hindi Voice Bot** is a lightweight, browser-based AI assistant that:
- Accepts **voice input** in Telugu/Hindi via Web Speech API
- Accepts **text input** in Telugu, Hindi, or English
- Responds with intelligent, natural **mixed Telugu-Hindi** responses
- **Speaks replies aloud** using the browser's Speech Synthesis API
- Saves every conversation pair to a **JSON log** on the backend
- Features a beautiful, modern UI with glassmorphism design

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Web Speech API
- **Backend**: Node.js, Express.js, fs-extra, CORS
- **Database**: JSON file-based logging (no external database required)

---

## ⚙️ System Requirements

### Hardware
- **Processor**: Any modern CPU (Intel i5+ or AMD equivalent recommended)
- **RAM**: Minimum 2GB RAM (4GB+ recommended)
- **Disk Space**: 500MB available space

### Software
- **Operating System**: Windows 10+, macOS, or Linux
- **Node.js**: Version 14.0.0 or higher (download from https://nodejs.org/)
- **npm**: Version 6.0.0 or higher (comes with Node.js)
- **Browser**: Chrome/Edge 90+, Firefox 89+, Safari 14+ (for Web Speech API support)

### Permissions
- Read/Write access to the project directory
- Access to port 3001 (for backend server)

---

## 🚀 Installation Steps

### Step 1: Verify Node.js and npm Installation

```bash
# Open PowerShell or Command Prompt and check versions
node --version
npm --version
```

**Expected Output:**
```
v14.21.0  (or higher)
8.19.2    (or higher)
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Step 2: Navigate to the Project Directory

```bash
# Open PowerShell/Command Prompt
cd c:\Users\user\Desktop\INTERNSHIP\Internshaala\VOICE_BOT_shankar_group\Voice_bot\Voice_BOT
```

### Step 3: Install Backend Dependencies

```bash
npm install
```

This will install:
- **express**: ^4.18.2 (web server framework)
- **cors**: ^2.8.5 (cross-origin resource sharing)
- **fs-extra**: ^11.2.0 (enhanced file system operations)

**What to expect:**
- A `node_modules/` folder will be created
- A `package-lock.json` file will be generated
- Installation should complete in 1-2 minutes

### Step 4: Verify Installation

```bash
ls node_modules
```

Should show `cors`, `express`, `fs-extra`, and other dependencies.

---

## ▶️ Running the Application

### Method 1: Direct Node Execution

```bash
# Start the backend server
node server.js
```

**Expected Output:**
```
🎙️  Sankar Telugu Hindi Voice Bot
✅ Express server running at http://localhost:3001
📁 Created conversations.json (on first run)
🎙️  Server started successfully!
```

### Method 2: Using npm Script

```bash
# Alternative startup method
npm start
# or for development with auto-reload (if nodemon is installed)
npm run dev
```

### Step 5: Access the Web Interface

1. **Open your browser** (Chrome, Edge, or Firefox)
2. **Navigate to**: `http://localhost:3001`
3. You should see the Sankar Voice Bot interface

**Browser Requirements:**
- HTTPS or localhost (Web Speech API requires secure context)
- Microphone access permission (browser will prompt)
- JavaScript enabled

---

## 📁 Project Structure

```
Voice_BOT/
│
├── 📄 server.js                 # Express server entry point
├── 📄 botEngine.js              # Bot response patterns & logic
├── 📄 script.js                 # Client-side frontend logic
├── 📄 index.html                # HTML structure & UI
├── 📄 style.css                 # Styling (glassmorphism design)
├── 📄 package.json              # Project metadata & dependencies
├── 📄 README.md                 # Project documentation
├── 📄 PROJECT_SETUP.md          # This file - Setup instructions
├── 📄 .gitignore                # Git ignore patterns
├── 📁 node_modules/             # Installed dependencies (auto-created)
├── 📁 logs/                     # Conversation logs (auto-created)
│   └── conversations.json       # Stored conversations
└── 📝 package-lock.json         # Dependency lock file (auto-created)
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `server.js` | Express backend server, CORS setup, API endpoints, log file management |
| `botEngine.js` | Bot response patterns (Telugu/Hindi/Hinglish matched responses) |
| `script.js` | Frontend logic: Speech Recognition, TTS, UI handling, API calls |
| `index.html` | Application shell, layout, topbar, chat interface |
| `style.css` | Modern glassmorphism UI, animations, responsive design |
| `package.json` | Project metadata, dependencies, npm scripts |

---

## ⚙️ Configuration

### Backend Configuration (server.js)

```javascript
// Default port
const PORT = process.env.PORT || 3001;

// Log file location
const LOG_FILE = path.join(__dirname, 'logs', 'conversations.json');

// CORS settings
app.use(cors());
```

**To change the port:**
```bash
# Set environment variable
set PORT=8080
node server.js
```

### Frontend Configuration (script.js)

```javascript
// Backend API endpoint
const API_BASE = 'http://localhost:3001';

// Change this if using ngrok or deploying to a different server:
// const API_BASE = 'https://your-production-server.com';
```

### Language & Bot Responses

Edit `botEngine.js` or the `BOT_PATTERNS` array in `script.js` to:
- Add new conversational patterns
- Modify responses
- Add new languages or keywords

---

## ✨ Features Overview

### User Interface
- **🎙️ Voice Input**: Speak Telugu/Hindi, bot transcribes
- **⌨️ Text Input**: Type in Telugu, Hindi, or English
- **🤖 Bot Responses**: Mixed Telugu-Hindi intelligent replies
- **🔊 Text-to-Speech**: Bot speaks responses aloud
- **🔇 Mute/Unmute**: Toggle bot voice output
- **💬 Live Transcript**: See real-time speech recognition
- **💬 Chat History**: In-session conversation display
- **📜 Conversation Logging**: Auto-saved to JSON
- **⬇️ Download Chat**: Export conversation as JSON
- **🗑️ Clear Chat**: Reset current session
- **💡 Quick Reply Chips**: Suggested responses
- **📱 Mobile Responsive**: Works on phones and tablets

### Backend Capabilities
- **Express API**: RESTful endpoints for conversation logging
- **CORS Support**: Safe cross-origin requests
- **File-based Storage**: JSON logging of all conversations
- **Auto Log Creation**: Creates logs folder on first run
- **Error Handling**: Graceful error responses

### Bot Conversational Patterns
- Greetings (Namaste, Hello, Good Morning, etc.)
- Name introductions
- Product demos
- Scheduling & appointments
- Help requests
- Pricing inquiries
- Feature information
- Contact details
- Language queries
- Weather (fun responses)
- Jokes
- Status checks
- And more... (see botEngine.js for full list)

---

## 📖 Usage Instructions

### Starting Your First Conversation

1. **Open the application** at `http://localhost:3001`
2. **Grant microphone permission** when prompted (required for voice input)
3. **Choose input method**:
   - 🎤 Click the microphone button to use voice input
   - ⌨️ Type in the text input field for text input

### Voice Input Steps
1. Click the **🎤 Microphone button** (top-right of chat)
2. **Speak clearly** in Telugu, Hindi, or English
3. **Stop speaking** - recognition will auto-detect silence
4. Transcript appears in the chat
5. Bot automatically responds (in 1-2 seconds)
6. Response is spoken aloud (if unmuted)

### Text Input Steps
1. Click in the **text input field** at the bottom
2. **Type your message** in Telugu, Hindi, English, or Hinglish
3. Press **Enter** or click **Send button**
4. Bot responds instantly
5. Response is spoken (if unmuted)

### Managing Conversations

| Action | How | Result |
|--------|-----|--------|
| Mute bot voice | Click 🔊 button | Responses won't be spoken |
| Clear chat | Click 🗑️ button | Current session cleared (logs saved) |
| Download logs | Click ⬇️ button | conversations.json downloaded |
| View history | Scroll up in chat | See previous messages |

### Conversation Logging

Every conversation is automatically:
1. **Saved to server** at the moment bot responds
2. **Stored in** `logs/conversations.json`
3. **Contains**: user message, bot reply, timestamp
4. **Persists across** sessions (never deleted unless manually)

**Example log entry:**
```json
{
  "user": "Namaste, meeru ela unnaru?",
  "bot": "Namaste ji! 🙏 Meeru ela unnaru? Meeku ela help cheyyali?",
  "timestamp": "2024-05-17T10:30:45.123Z"
}
```

---

## 🔧 Troubleshooting

### Issue 1: Cannot Access http://localhost:3001

**Symptoms**: Browser shows "Connection refused" or "Cannot reach server"

**Solutions**:
```bash
# 1. Check if server is running (should see message in terminal)
# 2. Kill any process on port 3001
netstat -ano | findstr :3001

# 3. Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# 4. Restart server
node server.js
```

### Issue 2: Microphone Not Working

**Symptoms**: Voice input button doesn't work, browser doesn't ask for permission

**Solutions**:
1. **Check browser**: Use Chrome, Edge, or Firefox (Safari has limited support)
2. **HTTPS requirement**: Voice API requires HTTPS or localhost
3. **Check permissions**: 
   - Go to browser settings → Privacy → Microphone → Allow localhost
   - Check Windows Sound settings → Microphone is enabled
4. **Restart browser** and allow permission when prompted

### Issue 3: Bot Doesn't Respond or Responds with Wrong Language

**Symptoms**: Bot stays silent or responds in unexpected language

**Solutions**:
1. Check browser console for errors: Press `F12` → Console tab
2. Verify bot response patterns in `botEngine.js`
3. Check that `API_BASE` in `script.js` points to correct server
4. Restart server: Stop (Ctrl+C) and restart `node server.js`

### Issue 4: npm install Fails

**Symptoms**: Error messages during `npm install`

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Try installing again
npm install
```

### Issue 5: Port 3001 Already in Use

**Symptoms**: Error "Port 3001 already in use"

**Solutions**:
```bash
# Option 1: Find and kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Option 2: Use different port
set PORT=3002
node server.js

# Then access: http://localhost:3002
```

### Issue 6: Conversation Logs Not Saved

**Symptoms**: `conversations.json` is empty or doesn't exist

**Solutions**:
1. Check that `logs/` folder exists
2. Verify file permissions (write access needed)
3. Check server console for error messages
4. Restart server to recreate log file

---

## 👨‍💻 Development Guide

### Adding New Bot Responses

Edit `botEngine.js` or the `BOT_PATTERNS` array in `script.js`:

```javascript
// Add a new pattern
{
  match: /your keywords|or phrases/i,  // Regex pattern to match user input
  reply: () => "Your bot response here 🎙️"
}
```

**Example - Add Telugu greeting:**
```javascript
{
  match: /ayyo|hello anna|hello akka/i,
  reply: () => "Ayyo anna! Meeru ela unnaru ji? Nenu meuku help cheyyataniki ikkade unnanu!"
}
```

### Customizing UI

Edit `style.css` to modify:
- Colors and gradients
- Fonts and typography
- Chat bubble styling
- Button designs
- Animations

Edit `index.html` to modify:
- Layout structure
- Element positioning
- SVG icons
- Navigation items

### Extending Backend APIs

Add new routes to `server.js`:

```javascript
// New endpoint for statistics
app.get('/api/stats', async (req, res) => {
  try {
    const logs = await fs.readJson(LOG_FILE);
    res.json({
      totalConversations: logs.length,
      lastConversation: logs[logs.length - 1]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
```

### Debugging Tips

1. **Frontend Debugging**: Press `F12` to open DevTools
   - Check Console tab for JavaScript errors
   - Check Network tab to verify API calls to http://localhost:3001
   - Use `console.log()` in `script.js` for debugging

2. **Backend Debugging**: Add logging to `server.js`
   ```javascript
   app.post('/api/log', async (req, res) => {
     console.log('Received:', req.body);  // Debug line
     // ... rest of code
   });
   ```

3. **View Logs**: Check `logs/conversations.json` directly
   ```bash
   type logs/conversations.json
   ```

### Testing Locally with Mobile Devices

To access the bot from another device on the network:

1. **Find your PC's local IP**:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (usually starts with 192.168.x.x)

2. **On mobile device**, navigate to:
   ```
   http://YOUR_IP:3001
   ```
   Example: `http://192.168.1.100:3001`

---

## 📚 Additional Resources

### Web Speech API Documentation
- [MDN Web Docs - Speech Recognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MDN Web Docs - Speech Synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

### Express.js Documentation
- [Express Official Docs](https://expressjs.com/)
- [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)

### Node.js Learning Resources
- [Node.js Official Documentation](https://nodejs.org/docs/)
- [fs-extra Documentation](https://github.com/jprichardson/node-fs-extra)

### Regex Pattern Helpers (for Bot Responses)
- [Regex101.com](https://regex101.com/) - Online regex tester

---

## 🎯 Quick Start Checklist

- [ ] Node.js v14+ installed
- [ ] npm v6+ installed
- [ ] Project directory downloaded/extracted
- [ ] `npm install` completed successfully
- [ ] `node server.js` running (shows server started message)
- [ ] Browser can access `http://localhost:3001`
- [ ] Microphone permission granted in browser
- [ ] Test with voice input (click 🎤 button)
- [ ] Test with text input (type and press Enter)
- [ ] Verify bot responses appear
- [ ] Check conversation logged in `logs/conversations.json`

---

## 📞 Support & Contact

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review **Development Guide** for customization help
3. Check browser console (F12) for error messages
4. Review server terminal output for backend errors
5. Consult project's README.md for additional info

---

## 📝 Version History

- **v1.0.0** - Initial Release
  - Voice input (Telugu/Hindi)
  - Text input support
  - Bot response engine
  - Conversation logging
  - TTS playback
  - Modern UI

---

## 📄 License

MIT License - Feel free to use, modify, and distribute this project.

---

## 👤 Author

**Sankar** - Voice Bot Creator

Created for: **Internship Project** @ Internshaala

---

**Last Updated**: May 2024  
**Project Status**: Active Development
