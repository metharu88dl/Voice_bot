/**
 * Sankar Telugu Hindi Voice Bot — Client Script
 * Handles: Speech Recognition, TTS, Bot Engine, Chat UI, Logging
 */

// ══════════════════════════════════════════════════════════════
//  CONFIG
// ══════════════════════════════════════════════════════════════
const API_BASE = 'http://localhost:3001'; // Change if using ngrok

// ══════════════════════════════════════════════════════════════
//  BOT RESPONSE ENGINE — Telugu + Hindi + Hinglish
// ══════════════════════════════════════════════════════════════
const BOT_PATTERNS = [
  // Greetings
  { match: /namaste|namaskar|hello|hi\b|hey\b|hii/i,
    reply: () => 'Namaste ji! 🙏 Meeru ela unnaru? Meeku ela help cheyyali?' },

  { match: /good morning|subhodayam|suprabhatam/i,
    reply: () => 'Subhodayam ji! 🌅 Meeku ela sahayam cheyyali aaj?' },

  { match: /good evening|shubha sandhya/i,
    reply: () => 'Shubha sandhya ji! 🌆 Aaj kya help chahiye?' },

  { match: /good night|shubh ratri|subha raatri/i,
    reply: () => 'Shubh ratri ji! 🌙 Kyal phir milte hain. Take care!' },

  // Name / Intro
  { match: /naa peru|mera naam|my name is|i am\s+\w+|nenu\s+(\w+)/i,
    reply: (m) => {
      const raw = m.input || '';
      const name = raw.replace(/naa peru|mera naam|my name is|i am|nenu/gi, '').trim().split(/\s+/)[0] || 'ji';
      return `Namaste ${name}! 😊 Meeku swaagatam. Meeku ela help cheyyali?`;
    }
  },

  { match: /meeru elu|your name|nee peru|aap ka naam|what.*your name/i,
    reply: () => 'Nenu Sankar — oka AI Voice Bot ni ji. 🤖 Telugu + Hindi lo meeru tho matladataniki ikkade unnanu!' },

  // Demo / product
  { match: /demo|chupinchu/i,
    reply: () => 'Bilkul ji! 📊 Meeku demo schedule chestanu. Meeru preferred date and time cheppandi.' },

  { match: /schedule|appointment|meeting|booking/i,
    reply: () => 'Sure ji! 📅 Meeru convenient slot cheppandi — nenu team tho confirm chestanu.' },

  // Help
  { match: /help|sahay|sahaayam|madad|support/i,
    reply: () => 'Nenu meeku help cheyyataniki ikkade unnanu ji! 🙌 Meeru exact question cheppandi.' },

  { match: /how (to|do|can)|ela cheyali|kaise kare/i,
    reply: () => 'Sure ji! Meeru specific question cheppandi — nenu step by step explain chestanu. 📝' },

  // Pricing
  { match: /price|pricing|cost|enta|kitna|charges|fee/i,
    reply: () => 'Meeru pricing details team contact chestundi ji. 💰 Meeru contact info share cheyyagalara?' },

  // Features
  { match: /features|capabilities|em cheyagalav|kya kar sakte/i,
    reply: () => '🌟 Features: Voice input (Telugu + Hindi), text input, auto-reply, conversation logging — anni untaayi ji!' },

  // Contact
  { match: /contact|reach|phone|email|call\s*(me|us)/i,
    reply: () => 'Meeru contact info share chesaaru ji. 📞 Team shortly meeru tho connect avutundi.' },

  // Language
  { match: /telugu|hindi|hinglish|language|bhasha/i,
    reply: () => 'Avunu ji! 🗣️ Nenu Telugu, Hindi, mariyu mixed Hinglish — anni lo matladagalanu!' },

  // Weather
  { match: /weather|vaanam|mausam/i,
    reply: () => 'Aa, weather check cheyyataniki nenu help cheyyalenu ji ☁️ — kani meeru local weather app chudandi!' },

  // Joke
  { match: /joke|nakkal|funny|hasao|comedy/i,
    reply: () => 'Oka developer joke ji: Bug fix chesi, rendu new bugs create chesaadu! 😄 Programmer life!' },

  // Working / Status
  { match: /working|pani chestunda|kaam kar raha|are you there|online/i,
    reply: () => 'Avunu ji, nenu baagunnanu! ✅ Meeku ela help cheyyali?' },

  // Age
  { match: /how old|enni years|kitne saal|age/i,
    reply: () => 'Nenu AI bot ni ji — age ledhu, kani meeru knowledge is always fresh! 😄' },

  // About
  { match: /who are you|neevu evaru|aap kaun|about you|introduce/i,
    reply: () => 'Nenu Sankar Voice Bot — Telugu + Hindi AI assistant ji. Meeru tho matladataniki chala santhosham! 🤖🙏' },

  // Thanks
  { match: /thank|thanks|dhanyavaad|shukriya|nandri|thank you/i,
    reply: () => 'Mee swaagatam ji! 🙏 Inka em help kavali antara?' },

  // OK / Acknowledge
  { match: /^(ok|okay|accha|sare|alright|got it|understood|theek hai)[\s!.]*$/i,
    reply: () => 'Chala manchidi ji! 👍 Inka em help kavali?' },

  // Yes
  { match: /^(yes|avunu|ha\b|haan|sure|bilkul|definitely)[\s!.]*$/i,
    reply: () => 'Chala manchidi ji! 😊 Nenu ready ga unnanu — cheppandi.' },

  // No
  { match: /^(no|kadu|nahi|nahin|nope|not really)[\s!.]*$/i,
    reply: () => 'Okay ji 🙂 — convenient ga feel ainapudu malli matladandi.' },

  // Sorry
  { match: /sorry|maafi|kshaminchaali|excuse me/i,
    reply: () => 'No problem ji! 😊 Nenu ikkade unnanu — em help kavali?' },

  // Goodbye
  { match: /bye|goodbye|alvida|velli vastanu|see you|later|tata/i,
    reply: () => 'Alvida ji! 👋 Meeru tho matladataniki chala santosham. Twaralo malli kaluddam! 🙏' },

  // FALLBACK
  { match: /.*/,
    reply: () => 'Nenu meeru message artham chesukovaledhu ji 🤔 — konda different ga cheppagalara? Nenu best ga help cheyyataniki try chestanu!' }
];

/**
 * getBotResponse — match user input against patterns
 * @param {string} input
 * @returns {string}
 */
function getBotResponse(input) {
  const text = input.trim();
  for (const pattern of BOT_PATTERNS) {
    const m = text.match(pattern.match);
    if (m) {
      m.input = text; // preserve original for name extraction
      return pattern.reply(m);
    }
  }
  return 'Nenu meeru message artham chesukovaledhu ji. Konda different ga cheppagalara?';
}

// ══════════════════════════════════════════════════════════════
//  DOM REFERENCES
// ══════════════════════════════════════════════════════════════
const chatWindow     = document.getElementById('chat-window');
const startBtn       = document.getElementById('start-btn');
const stopBtn        = document.getElementById('stop-btn');
const textInput      = document.getElementById('text-input');
const sendBtn        = document.getElementById('send-btn');
const liveTranscript = document.getElementById('live-transcript');
const transcriptBar  = document.getElementById('transcript-bar');
const typingIndicator= document.getElementById('typing-indicator');
const statusPill     = document.getElementById('status-pill');
const statusText     = document.getElementById('status-text');
const muteBtn        = document.getElementById('mute-btn');
const clearBtn       = document.getElementById('clear-btn');
const downloadBtn    = document.getElementById('download-btn');

// ══════════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════════
let isMuted     = false;
let isListening = false;
let recognition = null;
const conversationLog = []; // in-memory session log

// ══════════════════════════════════════════════════════════════
//  ANIMATED CANVAS BACKGROUND
// ══════════════════════════════════════════════════════════════
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  const stars  = [];
  const STAR_COUNT = 90;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.006 + 0.002,
      drift: (Math.random() - 0.5) * 0.15
    });
  }

  // Nebula blobs
  const blobs = [
    { x: 0.15, y: 0.2,  r: 0.35, c: 'rgba(124,58,237,0.07)' },
    { x: 0.85, y: 0.75, r: 0.28, c: 'rgba(6,182,212,0.05)' },
    { x: 0.5,  y: 0.5,  r: 0.22, c: 'rgba(79,70,229,0.06)' }
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Nebula
    blobs.forEach(b => {
      const gx = ctx.createRadialGradient(
        b.x * canvas.width, b.y * canvas.height, 0,
        b.x * canvas.width, b.y * canvas.height, b.r * Math.max(canvas.width, canvas.height)
      );
      gx.addColorStop(0, b.c);
      gx.addColorStop(1, 'transparent');
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Stars
    stars.forEach(s => {
      s.a += s.speed;
      s.x += s.drift;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      const alpha = (Math.sin(s.a) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,190,255,${alpha * 0.7})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ══════════════════════════════════════════════════════════════
//  CHAT UI HELPERS
// ══════════════════════════════════════════════════════════════
function getTimeStr() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(role, text) {
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'user' ? '🧑' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = getTimeStr();

  const inner = document.createElement('div');
  inner.style.display = 'flex';
  inner.style.flexDirection = 'column';
  inner.appendChild(bubble);
  inner.appendChild(time);

  if (role === 'user') {
    row.appendChild(inner);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(inner);
  }

  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function setStatus(label, mode) {
  statusText.textContent = label;
  statusPill.className   = 'status-pill ' + (mode || '');
}

function showTyping(show) {
  typingIndicator.classList.toggle('active', show);
  if (show) chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ══════════════════════════════════════════════════════════════
//  WELCOME CARD
// ══════════════════════════════════════════════════════════════
function renderWelcome() {
  const card = document.createElement('div');
  card.className = 'welcome-card';
  card.innerHTML = `
    <h2>Namaste! 🙏 Meeku Swaagatam</h2>
    <p>Nenu Sankar — meeru AI Voice Bot. Telugu, Hindi, Hinglish — anni lo matladagalanu!<br>
    Mic button press cheyyi or below type cheyyi.</p>
    <div class="quick-chips">
      <span class="chip" data-msg="Namaste">👋 Namaste</span>
      <span class="chip" data-msg="Mujhe demo chahiye">📊 Demo kavali</span>
      <span class="chip" data-msg="Meeru features em?">✨ Features</span>
      <span class="chip" data-msg="Pricing enta?">💰 Pricing</span>
      <span class="chip" data-msg="Help kavali">🆘 Help</span>
      <span class="chip" data-msg="Tell me a joke">😄 Joke cheppu</span>
    </div>
  `;
  chatWindow.appendChild(card);

  card.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => handleUserMessage(chip.dataset.msg));
  });
}

// ══════════════════════════════════════════════════════════════
//  MESSAGE HANDLER — user input → bot reply → TTS → log
// ══════════════════════════════════════════════════════════════
async function handleUserMessage(text) {
  if (!text || !text.trim()) return;

  const userText = text.trim();
  appendMessage('user', userText);
  textInput.value = '';

  setStatus('Thinking…', 'thinking');
  showTyping(true);

  // Simulate slight "thinking" delay for UX
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

  const botText = getBotResponse(userText);

  showTyping(false);
  appendMessage('bot', botText);
  setStatus('Ready', '');

  // TTS
  speak(botText);

  // Log to server + memory
  const entry = { user: userText, bot: botText, timestamp: new Date().toISOString() };
  conversationLog.push(entry);
  logToServer(entry);
}

// ══════════════════════════════════════════════════════════════
//  TEXT-TO-SPEECH
// ══════════════════════════════════════════════════════════════
function speak(text) {
  if (isMuted || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop previous
  const utt = new SpeechSynthesisUtterance(text);

  // Strip emoji for cleaner TTS
  utt.text = text.replace(/[\u{1F300}-\u{1FAD6}]/gu, '').trim();
  utt.lang  = 'hi-IN'; // closest available; browser will approximate Telugu
  utt.rate  = 0.95;
  utt.pitch = 1.05;

  // Prefer an Indian voice if available
  const voices = window.speechSynthesis.getVoices();
  const indian = voices.find(v => v.lang.includes('hi') || v.lang.includes('te') || v.name.includes('Indian'));
  if (indian) utt.voice = indian;

  window.speechSynthesis.speak(utt);
}

// ══════════════════════════════════════════════════════════════
//  SPEECH RECOGNITION (Web Speech API)
// ══════════════════════════════════════════════════════════════
function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('⚠️ Speech Recognition not supported in this browser. Please use Chrome.');
    return null;
  }

  const rec = new SR();
  rec.continuous      = true;
  rec.interimResults  = true;
  rec.lang            = 'hi-IN'; // Hindi; browser also picks up Telugu transliteration

  rec.onresult = (event) => {
    let interim = '';
    let final   = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) final += t;
      else interim += t;
    }
    liveTranscript.textContent = interim || final || 'Listening…';
    if (final.trim()) handleUserMessage(final.trim());
  };

  rec.onerror = (e) => {
    console.error('STT error:', e.error);
    if (e.error !== 'no-speech') {
      setStatus('Error: ' + e.error, '');
      stopListening();
    }
  };

  rec.onend = () => {
    if (isListening) rec.start(); // keep alive
  };

  return rec;
}

function startListening() {
  if (!recognition) recognition = initSpeechRecognition();
  if (!recognition) return;

  isListening = true;
  recognition.start();

  startBtn.disabled = true;
  stopBtn.disabled  = false;
  startBtn.classList.add('recording');
  transcriptBar.classList.add('active');
  liveTranscript.textContent = 'Listening…';
  setStatus('Listening…', 'listening');
}

function stopListening() {
  if (!recognition) return;
  isListening = false;
  recognition.stop();

  startBtn.disabled = false;
  stopBtn.disabled  = true;
  startBtn.classList.remove('recording');
  transcriptBar.classList.remove('active');
  liveTranscript.textContent = 'Say something…';
  setStatus('Ready', '');
}

// ══════════════════════════════════════════════════════════════
//  SERVER LOGGING
// ══════════════════════════════════════════════════════════════
async function logToServer(entry) {
  try {
    await fetch(`${API_BASE}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (e) {
    console.warn('Server logging failed (offline?):', e.message);
  }
}

// ══════════════════════════════════════════════════════════════
//  DOWNLOAD LOG
// ══════════════════════════════════════════════════════════════
function downloadLog() {
  if (!conversationLog.length) {
    alert('No conversation to download yet!');
    return;
  }
  const blob = new Blob([JSON.stringify(conversationLog, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `sankar-chat-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════════════
//  CLEAR CHAT
// ══════════════════════════════════════════════════════════════
function clearChat() {
  if (!confirm('Clear the chat? This only affects the screen — server logs remain.')) return;
  chatWindow.innerHTML = '';
  conversationLog.length = 0;
  renderWelcome();
}

// ══════════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ══════════════════════════════════════════════════════════════
startBtn.addEventListener('click',    startListening);
stopBtn.addEventListener('click',     stopListening);

sendBtn.addEventListener('click', () => handleUserMessage(textInput.value));
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleUserMessage(textInput.value);
  }
});

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
  muteBtn.classList.toggle('muted', isMuted);
  if (isMuted) window.speechSynthesis.cancel();
});

clearBtn.addEventListener('click',    clearChat);
downloadBtn.addEventListener('click', downloadLog);

// Load voices async (required by some browsers)
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

// ══════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════
renderWelcome();
