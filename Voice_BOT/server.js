/**
 * Sankar Telugu Hindi Voice Bot - Backend Server
 * Express.js server with CORS, JSON logging, and conversation storage
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3001;
const LOG_FILE = path.join(__dirname, 'logs', 'conversations.json');

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve client files statically (optional convenience)
app.use(express.static(path.join(__dirname, '..', 'client')));

// ── Ensure logs file exists on startup ────────────────────────────────────
async function ensureLogFile() {
  await fs.ensureDir(path.join(__dirname, 'logs'));
  const exists = await fs.pathExists(LOG_FILE);
  if (!exists) {
    await fs.writeJson(LOG_FILE, [], { spaces: 2 });
    console.log('📁 Created conversations.json');
  }
}

// ── Routes ─────────────────────────────────────────────────────────────────

// POST /api/log — save a conversation pair
app.post('/api/log', async (req, res) => {
  try {
    const { user, bot, timestamp } = req.body;

    if (!user || !bot) {
      return res.status(400).json({ error: 'user and bot fields are required' });
    }

    const entry = {
      user: user.trim(),
      bot: bot.trim(),
      timestamp: timestamp || new Date().toISOString()
    };

    // Read existing logs, append, write back
    const logs = await fs.readJson(LOG_FILE);
    logs.push(entry);
    await fs.writeJson(LOG_FILE, logs, { spaces: 2 });

    console.log(`💬 Logged: [${entry.timestamp}] User: "${entry.user}" | Bot: "${entry.bot}"`);
    res.json({ success: true, entry });
  } catch (err) {
    console.error('Error saving log:', err);
    res.status(500).json({ error: 'Failed to save log' });
  }
});

// GET /api/logs — retrieve all conversation logs
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await fs.readJson(LOG_FILE);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

// GET /api/health — server health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sankar Voice Bot server is running 🚀' });
});

// ── Start Server ───────────────────────────────────────────────────────────
ensureLogFile().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🎙️  Sankar Telugu Hindi Voice Bot`);
    console.log(`✅  Server running at http://localhost:${PORT}`);
    console.log(`📝  Logs stored at: ${LOG_FILE}\n`);
  });
});
