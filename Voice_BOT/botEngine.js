/**
 * botEngine.js — Telugu + Hindi mixed conversational logic
 * Exported as a module so server can optionally validate/generate responses.
 * The main engine runs client-side; this mirrors the same patterns server-side.
 */

const patterns = [
  // Greetings
  { match: /namaste|namaskar|hello|hi\b|hey\b|hii/i, reply: () => "Namaste ji! 🙏 Meeru ela unnaru? Meeku ela help cheyyali?" },
  { match: /good morning|subhodayam|suprabhatam/i, reply: () => "Subhodayam ji! 🌅 Meeku ela sahayam cheyyali?" },
  { match: /good evening|shubha sandhya/i, reply: () => "Shubha sandhya ji! 🌆 Aaj kya help chahiye?" },
  { match: /good night|shubh ratri|subha raatri/i, reply: () => "Shubh ratri ji! 🌙 Kal phir milte hain." },

  // Introductions / Names
  { match: /naa peru|mera naam|my name is|nenu (.*)/i, reply: (m) => {
    const name = m.input.replace(/naa peru|mera naam|my name is|nenu/gi, '').trim().split(' ')[0];
    return `Namaste ${name || 'ji'}! 😊 Meeku swaagatam. Meeku ela help cheyyali?`;
  }},
  { match: /meeru elu|your name|nee peru|aap ka naam/i, reply: () => "Nenu Sankar, meeru AI voice bot ni. 🤖 Meeku help cheyyataniki ikkade unnanu!" },

  // Demo requests
  { match: /demo|product demo|show me|chupinchu/i, reply: () => "Bilkul ji! 📊 Meeku demo schedule chestanu. Meeru available time cheppagalara?" },
  { match: /schedule|booking|appointment|meeting/i, reply: () => "Sure ji! Meeting schedule cheyyataniki meeru preferred date and time cheppandi. 📅" },

  // Help
  { match: /help|sahay|sahaayam|madad|support/i, reply: () => "Nenu meeku help cheyyataniki ikkade unnanu ji. 🙌 Meeru specific ga cheppagalara em help kavali?" },
  { match: /how (to|do)|ela cheyali|kaise kare/i, reply: () => "Sure ji! Meeru specific ga meeru question cheppandi, nenu step by step explain chestanu. 📝" },

  // Pricing / Cost
  { match: /price|pricing|cost|enta|kitna|charges/i, reply: () => "Meeru pricing details team contact chestundi ji. 💰 Meeru phone number or email ikkade share cheyyagalara?" },

  // Features
  { match: /features|capabilities|em cheyagalav|kya kar sakte/i, reply: () => "Meeru bot Telugu, Hindi, Hinglish conversation support chestundi ji! 🌟 Voice input, text input, auto-reply anni untaayi." },

  // Contact
  { match: /contact|reach|phone|email|call me/i, reply: () => "Meeru contact details share chesaaru ji. 📞 Team meeru tho shortly connect avutundi." },

  // Language
  { match: /telugu|hindi|hinglish|language|bhasha/i, reply: () => "Avunu ji! Nenu Telugu, Hindi, mariyu mixed Hinglish — anni lo matladagalanu. 🗣️" },

  // Weather (fun)
  { match: /weather|vaanam|mausam/i, reply: () => "Aa, weather meeru check cheyyataniki nenu help cheyyalenu ji, kani meeru local weather app chudandi! ☁️" },

  // Jokes
  { match: /joke|nakkal|funny|hasao/i, reply: () => "Oka chinna joke: Software developer enti ante — bug fix chesi, rendu new bugs create chestadu! 😄" },

  // Status / Working
  { match: /working|pani chestunda|kaam kar raha|are you there/i, reply: () => "Avunu ji, nenu baagunnanu! ✅ Meeku ela help cheyyali?" },

  // Age / Info
  { match: /how old|enni years|kitne saal/i, reply: () => "Nenu AI bot ni ji — naa age ledhu, kani meeru experience chaala undi! 😄" },

  // About
  { match: /who are you|neevu evaru|aap kaun|about you/i, reply: () => "Nenu Sankar Voice Bot — oka AI assistant, Telugu + Hindi lo meeru tho matladataniki design chesaanu. 🤖" },

  // Thanks
  { match: /thank|thanks|dhanyavaad|shukriya|nandri/i, reply: () => "Mee swaagatam ji! 🙏 Inkemi help kavali antara?" },

  // OK / Understood
  { match: /ok\b|okay|accha|sare|alright|got it/i, reply: () => "Chala manchidi ji! 👍 Inka em help kavali?" },

  // Bye / Goodbye
  { match: /bye|goodbye|alvida|velli vastanu|see you/i, reply: () => "Alvida ji! 👋 Meeru tho matladataniki chala santosham. Twaralo malli kaluddam!" },

  // Sorry
  { match: /sorry|maafi|kshaminchaali/i, reply: () => "괜찮아요 —괜찮아요 — No problem ji! 😊 Em help kavali?" },

  // Yes / Agree
  { match: /^(yes|avunu|ha\b|haan|sure|bilkul)$/i, reply: () => "Chala manchidi ji! 😊 Meeru tho matladataniki nenu ready ga unnanu." },

  // No / Disagree
  { match: /^(no|kadu|nahi|nahin|nope)$/i, reply: () => "Okayy ji! 🙂 Meeru convenient ga feel ainapudu matladandi." },

  // Fallback — default
  { match: /.*/, reply: () => "Nenu meeru message artham chesukovaledhu ji. 🤔 Konda different ga cheppagalara? Nenu meeku best ga help cheyyataniki try chestanu!" }
];

/**
 * getBotResponse — returns a Telugu+Hindi mixed reply string
 * @param {string} input - raw user message
 * @returns {string} bot reply
 */
function getBotResponse(input) {
  for (const pattern of patterns) {
    const match = input.match(pattern.match);
    if (match) {
      return pattern.reply(match);
    }
  }
  return "Nenu meeru message artham chesukovaledhu ji. Konda different ga cheppagalara?";
}

module.exports = { getBotResponse, patterns };
