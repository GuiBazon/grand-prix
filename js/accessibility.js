/**
 * accessibility.js — Controles de acessibilidade
 * TTS, fonte, temas, LIBRAS, animações
 */

const Accessibility = {
  _synth:     window.speechSynthesis || null,
  _utterance: null,

  /** Aplica todas as configurações de ACC ao DOM */
  apply() {
    const acc  = State.acc;
    const html = document.documentElement;

    html.setAttribute('data-theme',         acc.dark     ? 'dark'  : '');
    html.setAttribute('data-contrast',      acc.contrast ? 'high'  : '');
    html.setAttribute('data-reduce-motion', acc.motion   ? 'true'  : '');

    // Font scale — muda o font-size raiz, tudo em rem escala junto
    html.style.fontSize = acc.font + '%';

    // Banner de narração
    const banner = document.getElementById('narr-banner');
    if (banner) banner.classList.toggle('active', acc.narr);
    if (!acc.narr) this.stop();

    // Widget LIBRAS
    const lw = document.getElementById('libras-widget');
    if (lw) lw.classList.toggle('active', acc.libras);
  },

  /** Fala um texto via Web Speech API */
  speak(text) {
    if (!State.acc.narr || !this._synth) return;

    this._synth.cancel();
    this._utterance       = new SpeechSynthesisUtterance(text);
    this._utterance.lang  = 'pt-BR';
    this._utterance.rate  = State.acc.narrSpeed;
    this._utterance.pitch = 1;

    const trySpeak = () => {
      const voices  = this._synth.getVoices();
      const ptVoice = voices.find(v => v.lang && v.lang.startsWith('pt'));
      if (ptVoice) this._utterance.voice = ptVoice;
      this._synth.speak(this._utterance);
    };

    const voices = this._synth.getVoices();
    if (voices.length > 0) {
      trySpeak();
    } else {
      this._synth.onvoiceschanged = () => { this._synth.onvoiceschanged = null; trySpeak(); };
    }

    // Atualiza banner e legenda LIBRAS
    const narText = document.getElementById('narr-text');
    if (narText) narText.textContent = '🔊 Lendo: ' + text.substring(0, 60) + (text.length > 60 ? '...' : '');

    const libCap = document.getElementById('libras-caption');
    if (libCap) libCap.textContent = text.substring(0, 40) + (text.length > 40 ? '...' : '');
  },

  /** Para a narração */
  stop() {
    if (this._synth) this._synth.cancel();
    const el = document.getElementById('narr-text');
    if (el) el.textContent = 'Narração ativa — aguardando';
  },

  /** Restaura todos os valores de ACC para o padrão */
  reset() {
    State.acc = { dark: false, contrast: false, font: 100, narr: false, narrSpeed: 1, libras: false, motion: false };
    this.apply();
    document.documentElement.style.fontSize = '100%';
  },

  /** Inicializa pré-carregamento de vozes */
  init() {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {};
    }
  },
};
