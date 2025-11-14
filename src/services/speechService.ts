
class SpeechService {
  private utterance: SpeechSynthesisUtterance | null = null;
  private germanVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        this.germanVoice = voices.find(voice => voice.lang.startsWith('de')) || null;
         if (!this.germanVoice && voices.length > 0) {
            this.germanVoice = voices[0];
        }
      };
      
      setVoice();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  }

  speak(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported.");
      return;
    }

    this.cancel();

    this.utterance = new SpeechSynthesisUtterance(text);
    if (this.germanVoice) {
      this.utterance.voice = this.germanVoice;
    }
    this.utterance.lang = 'de-DE';
    this.utterance.rate = 0.9;
    this.utterance.pitch = 1.1;
    
    window.speechSynthesis.speak(this.utterance);
  }

  cancel(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

const speechService = new SpeechService();
export default speechService;
