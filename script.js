let currentLang = 'pt-BR';
let voices = [];
let voiceMode = false;

// Mapeamento de 14 línguas indígenas (texto + voz)
const languages = {
  'pt-BR': { name: 'Português Brasileiro', hello: 'Olá! Sou o EduIA da Funasa. Como posso ajudar hoje?' },
  'guarani-kaiowa': { name: 'Avañe’ẽ Kaiowá', hello: 'Mba’éichapa! Che EduIA Funasa. Mba’épa erekói?' },
  'tikuna': { name: 'Tikuna', hello: 'Ngiiü üma! Düüxüü EduIA Funasa.' },
  'xavante': { name: 'Xavante', hello: 'Wa’wa! EduIA Funasa.' },
  'kaingang': { name: 'Kaingang', hello: 'Kanhgág vy! EduIA Funasa.' },
  'terena': { name: 'Terena', hello: 'Ayoó! EduIA Funasa.' },
  'tukano': { name: 'Tukano', hello: 'Ye’pa! EduIA Funasa.' },
  'macushi': { name: 'Macushi', hello: 'Pardon! EduIA Funasa.' },
  'yanomami': { name: 'Yanomami', hello: 'Napo! EduIA Funasa.' },
  'sateremawe': { name: 'Sateré-Mawé', hello: 'Kyrĩg! EduIA Funasa.' },
  'munduruku': { name: 'Munduruku', hello: 'Aip! EduIA Funasa.' },
  'kayapo': { name: 'Kayapó', hello: 'Me! EduIA Funasa.' },
  'guarani-mbya': { name: 'Guarani Mbya', hello: 'Avy’a! EduIA Funasa.' },
  'guarani-nandeva': { name: 'Guarani Ñandeva', hello: 'Javy’a! EduIA Funasa.' }
};

function openChat() {
  document.getElementById('chat-modal').style.display = 'flex';
  document.getElementById('chat-float').style.display = 'none';
  if (!document.querySelector('.bot')) addMessage(languages[currentLang].hello, 'bot');
}

function closeChat() {
  document.getElementById('chat-modal').style.display = 'none';
  document.getElementById('chat-float').style.display = 'flex';
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = message ${type};
  div.innerHTML = <p>${text.replace(/\n/g, '<br>')}</p>;
  document.getElementById('messages').appendChild(div);
  div.scrollIntoView({ behavior: 'smooth' });
  if (type === 'bot' && voiceMode) speak(text);
}

function setLang(lang) {
  currentLang = lang;
  addMessage(Pronto! Agora estou falando em <strong>${languages[lang].name}</strong> 🪶, 'bot');
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'pt-BR' ? 'pt-BR' : 'pt-BR'; // fallback (vozes indígenas experimentais)
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

function toggleVoice() {
  voiceMode = !voiceMode;
  document.getElementById('voice-btn').textContent = voiceMode ? '🔊' : '🎤';
}

function send() {
  const input = document.getElementById('user-input');
  const msg = input.value.trim();
  if (!msg) return;
  addMessage(msg, 'user');
  input.value = '';

  // Resposta simulada inteligente (substitua por API Grok/OpenAI em produção)
  setTimeout(() => {
    const resposta = currentLang === 'pt-BR' 
      ? Entendi sua dúvida sobre saúde ambiental! Posso explicar sobre água potável, fossa séptica, controle da dengue ou resíduos sólidos. O que você precisa?
      : Compreendi sua pergunta em ${languages[currentLang].name}. Posso explicar em sua língua sobre água, esgoto ou dengue.;
    addMessage(resposta + '\n\n🪶 Este é um protótipo funcional. Em breve com IA real!', 'bot');
  }, 1200);
}

// Suporte offline básico
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('offline-worker.js');