import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { ArrowLeft, Loader2, Paperclip, Trash2, X } from 'lucide-react';

interface AiSectionViewProps {
  onBack: () => void;
}

interface ChatTurn {
  id: string;
  role: 'user' | 'model';
  text: string;
  attachmentName?: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const VIDEO_POSTER =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260831_223518_f11bfa03-4e65-47e1-a4a7-30e42a7a8c2f.png&w=1920&q=85';
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_232706_43757be4-2250-4f09-8cd7-23aebbf147ad.mp4';

const QUICK_NAV_PROMPTS: Record<string, string> = {
  Yordam:
    'FizLab AI qanday ishlaydi va molekulyar fizika masalalarini yechishda qanday yordam beradi?',
  Formulalar:
    'Molekulyar-kinetik nazariya va ideal gaz qonunlarining eng muhim formulalarini SI birliklari bilan yozib ber.',
  Mavzular:
    'Boyl-Mariott, Sharl va Gey-Lyussak qonunlarini qisqa va tushunarli qilib taqqoslab ber.',
};

export default function AiSectionView({ onBack }: AiSectionViewProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [attachment, setAttachment] = useState<{
    name: string;
    mimeType: string;
    data: string;
  } | null>(null);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.toggle('jm-menu-open', menuOpen);
    return () => {
      document.body.classList.remove('jm-menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const submitQuery = async (overrideText?: string) => {
    const textToSend = (overrideText ?? prompt).trim();
    if ((!textToSend && !attachment) || loading) return;

    const userTurn: ChatTurn = {
      id: `${Date.now()}-u`,
      role: 'user',
      text:
        textToSend ||
        `Biriktirilgan fayl tahlili: ${attachment?.name ?? 'rasm'}`,
      attachmentName: attachment?.name,
    };

    const currentAttachment = attachment;
    const historyPayload = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userTurn]);
    if (!overrideText) setPrompt('');
    setAttachment(null);
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: historyPayload,
          attachment: currentAttachment
            ? {
                mimeType: currentAttachment.mimeType,
                data: currentAttachment.data,
                name: currentAttachment.name,
              }
            : undefined,
        }),
      });

      const data = (await res.json()) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) {
        throw new Error(
          data.error || 'AI javobini olishda xatolik yuz berdi.'
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-m`,
          role: 'model',
          text: data.answer!,
        },
      ]);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Server bilan bog‘lanishda xatolik yuz berdi.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitQuery();
  };

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void submitQuery();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg('Fayl hajmi 3 MB dan oshmasligi kerak.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      if (base64) {
        setAttachment({
          name: file.name,
          mimeType: file.type || 'image/png',
          data: base64,
        });
        setErrorMsg(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleMic = () => {
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRec) {
      setErrorMsg(
        'Brauzeringizda ovozli kiritish qo‘llab-quvvatlanmaydi.'
      );
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = 'uz-UZ';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? '';
      if (transcript) {
        setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    setErrorMsg(null);
    setListening(true);
    recognition.start();
  };

  const handleQuickNav = (key: string) => {
    setMenuOpen(false);
    if (key === 'Tozalash') {
      setMessages([]);
      setErrorMsg(null);
      return;
    }
    const q = QUICK_NAV_PROMPTS[key];
    if (q) {
      setPrompt(q);
      void submitQuery(q);
    }
  };

  const hasConversation = messages.length > 0 || loading;

  return (
    <div className="jm-root">
      <style>{jungleMindStyles}</style>

      <section className="jm-hero">
        {/* Background Video — No Overlay / Scrim */}
        <div className="jm-hero__bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO_POSTER}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        <div className="jm-hero__inner">
          {/* Header Navigation */}
          <header className="jm-nav">
            <a
              className="jm-brand"
              href="#ai-home"
              onClick={(e) => {
                e.preventDefault();
                setMessages([]);
                setErrorMsg(null);
                setMenuOpen(false);
              }}
            >
              <svg
                className="jm-rise"
                style={{ '--i': 0 } as CSSProperties}
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 2.5 29.5 16 16 29.5 2.5 16 16 2.5Z"
                  stroke="#141414"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 9.5 22.5 16 16 22.5 9.5 16 16 9.5Z"
                  fill="#141414"
                />
              </svg>
              <span
                className="jm-rise"
                style={{ '--i': 1 } as CSSProperties}
              >
                FizLab AI
              </span>
            </a>

            <nav
              className={`jm-nav__nav ${menuOpen ? 'is-open' : ''}`}
              id="jm-site-menu"
              aria-label="AI bo‘limi menyusi"
            >
              <ul className="jm-nav__links">
                <li
                  className="jm-rise"
                  style={{ '--i': 2 } as CSSProperties}
                >
                  <a
                    href="#yordam"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickNav('Yordam');
                    }}
                  >
                    Yordam
                  </a>
                </li>
                <li
                  className="jm-rise"
                  style={{ '--i': 3 } as CSSProperties}
                >
                  <a
                    href="#formulalar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickNav('Formulalar');
                    }}
                  >
                    Formulalar
                  </a>
                </li>
                <li
                  className="jm-rise"
                  style={{ '--i': 4 } as CSSProperties}
                >
                  <a
                    href="#mavzular"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickNav('Mavzular');
                    }}
                  >
                    Mavzular
                  </a>
                </li>
                <li
                  className="jm-rise"
                  style={{ '--i': 5 } as CSSProperties}
                >
                  <a
                    href="#tozalash"
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickNav('Tozalash');
                    }}
                  >
                    Tozalash
                  </a>
                </li>
              </ul>

              <button
                type="button"
                className="jm-btn-dark jm-menu__cta"
                onClick={() => {
                  setMenuOpen(false);
                  onBack();
                }}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>Bo‘limlarga qaytish</span>
              </button>
            </nav>

            <div
              className="jm-nav__cta jm-rise"
              style={{ '--i': 6 } as CSSProperties}
            >
              <button
                type="button"
                className="jm-btn-dark"
                onClick={onBack}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>Bo‘limlar</span>
              </button>
            </div>

            <button
              ref={toggleRef}
              className="jm-nav__toggle jm-rise"
              style={{ '--i': 6 } as CSSProperties}
              id="jm-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              aria-expanded={menuOpen}
              aria-controls="jm-site-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="jm-nav__toggle-box" aria-hidden="true">
                <span className="jm-bar jm-bar--top" />
                <span className="jm-bar jm-bar--bot" />
              </span>
            </button>
          </header>

          {/* Center Stack */}
          <div className="jm-stage">
            {!hasConversation ? (
              <>
                <div
                  className="jm-badge jm-rise"
                  style={{ '--i': 8 } as CSSProperties}
                >
                  <span className="jm-badge__tag">Yangi</span>
                  <span>FizLab AI 3.0 ishga tushdi</span>
                </div>

                <h1
                  className="jm-headline jm-rise"
                  style={{ '--i': 10 } as CSSProperties}
                >
                  Fikrlovchi tizim —
                  <br className="jm-brk" /> eng muhimi uchun yaratilgan.
                </h1>

                <p
                  className="jm-sub jm-rise"
                  style={{ '--i': 12 } as CSSProperties}
                >
                  FizLab AI har bir fizik muammoni javob berishdan oldin
                  chuqur tahlil qiladigan aqlli tizim.
                  <br className="jm-brk" /> Savolingizni yozing va bir necha
                  soniyada asosli javobga ega bo‘ling.
                </p>
              </>
            ) : (
              <div
                className="jm-chat-panel"
                role="log"
                aria-label="AI suhbat oynasi"
              >
                <div className="jm-chat-header">
                  <span>FizLab AI muloqoti</span>
                  <button
                    type="button"
                    className="jm-clear-btn"
                    onClick={() => {
                      setMessages([]);
                      setErrorMsg(null);
                    }}
                  >
                    <Trash2 size={13} aria-hidden="true" />
                    <span>Tozalash</span>
                  </button>
                </div>

                <div className="jm-chat-scroll">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`jm-msg ${
                        msg.role === 'user' ? 'jm-msg--user' : 'jm-msg--model'
                      }`}
                    >
                      {msg.attachmentName && (
                        <div className="jm-msg-file">
                          <Paperclip size={12} aria-hidden="true" />
                          <span>{msg.attachmentName}</span>
                        </div>
                      )}
                      <div className="jm-msg-text">{msg.text}</div>
                    </div>
                  ))}
                  {loading && (
                    <div className="jm-msg jm-msg--model jm-msg--loading">
                      <Loader2
                        size={16}
                        className="jm-spin"
                        aria-hidden="true"
                      />
                      <span>FizLab AI tahlil qilmoqda...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Frosted Glass Prompt Card */}
            <form
              className="jm-prompt jm-rise"
              style={{ '--i': 14 } as CSSProperties}
              onSubmit={handleFormSubmit}
            >
              <label className="jm-sr-only" htmlFor="jm-prompt-input">
                FizLab AI ga savol bering
              </label>

              {attachment && (
                <div className="jm-attachment-chip">
                  <Paperclip size={13} aria-hidden="true" />
                  <span>{attachment.name}</span>
                  <button
                    type="button"
                    aria-label="Biriktirmani olib tashlash"
                    onClick={() => setAttachment(null)}
                  >
                    <X size={13} aria-hidden="true" />
                  </button>
                </div>
              )}

              {errorMsg && <div className="jm-error-banner">{errorMsg}</div>}

              <textarea
                id="jm-prompt-input"
                className="jm-prompt__input"
                rows={hasConversation ? 2 : 3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Ideal gaz bosimi nima sababdan haroratga bog‘liq?"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="jm-sr-only"
                onChange={handleFileChange}
              />

              <div className="jm-prompt__bar">
                <button
                  type="button"
                  className="jm-icon-btn jm-rise"
                  style={{ '--i': 16 } as CSSProperties}
                  aria-label="Rasm biriktirish"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                <div className="jm-prompt__right">
                  <button
                    type="button"
                    className={`jm-icon-btn jm-icon-btn--bare jm-rise ${
                      listening ? 'is-listening' : ''
                    }`}
                    style={{ '--i': 17 } as CSSProperties}
                    aria-label="Ovozli kiritish"
                    aria-pressed={listening}
                    onClick={handleToggleMic}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="2.5" width="6" height="11" rx="3" />
                      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
                    </svg>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="jm-icon-btn jm-icon-btn--send jm-rise"
                    style={{ '--i': 18 } as CSSProperties}
                    aria-label="Savol yuborish"
                  >
                    {loading ? (
                      <Loader2
                        size={19}
                        className="jm-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const jungleMindStyles = `
.jm-root {
  --ink: #111111;
  --muted: #5c5c5c;
  --card: rgba(248, 248, 246, 0.97);
  --shell: 1120px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  height: 100%;
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--ink);
  overflow: hidden;
}
.jm-root *, .jm-root *::before, .jm-root *::after {
  box-sizing: border-box;
}
body.jm-menu-open {
  overflow: hidden;
}
.jm-hero {
  position: relative;
  height: 100%;
  min-height: 560px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #eef2ee;
}
.jm-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  animation: jm-fade-in 1.15s var(--ease) both;
}
.jm-hero__bg video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.jm-hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}
.jm-nav {
  position: relative;
  z-index: 70;
  width: 100%;
  max-width: var(--shell);
  margin: 0 auto;
  padding: 24px 24px 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}
.jm-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;
}
.jm-brand svg {
  width: 30px;
  height: 30px;
  display: block;
}
.jm-nav__links {
  display: flex;
  align-items: center;
  gap: 42px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.jm-nav__links a {
  font-size: 15px;
  font-weight: 400;
  color: #1a1a1a;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.18s ease;
}
.jm-nav__links a:hover {
  opacity: 0.55;
}
.jm-nav__cta {
  justify-self: end;
}
.jm-btn-dark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #141414;
  color: #fff;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 500;
  padding: 12px 20px;
  border: 0;
  border-radius: 9px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}
.jm-btn-dark:hover {
  background: #000;
  transform: translateY(-1px);
}
.jm-nav__toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: -10px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.jm-nav__toggle-box {
  position: relative;
  display: block;
  width: 22px;
  height: 14px;
}
.jm-nav__toggle .jm-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.8px;
  border-radius: 2px;
  background: #141414;
  transition: transform 0.55s var(--ease), width 0.45s var(--ease);
}
.jm-bar--top { top: 0; }
.jm-bar--bot { bottom: 0; width: 70%; }
.jm-nav__toggle:hover .jm-bar--bot { width: 100%; }
.jm-nav__toggle[aria-expanded="true"] .jm-bar--top {
  transform: translateY(6.1px) rotate(45deg);
}
.jm-nav__toggle[aria-expanded="true"] .jm-bar--bot {
  width: 100%;
  transform: translateY(-6.1px) rotate(-45deg);
}
.jm-nav .jm-menu__cta {
  display: none;
}

.jm-stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 24px 24px;
  gap: clamp(14px, 2.2vh, 24px);
}
.jm-badge {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 999px;
  padding: 7px 16px 7px 8px;
  font-size: 13.5px;
  color: #4a4a4a;
}
.jm-badge__tag {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 13.5px;
  font-weight: 500;
  color: #111;
}
.jm-headline {
  margin: 0;
  font-size: clamp(30px, 4.9vw, 64px);
  line-height: 1.05;
  font-weight: 500;
  letter-spacing: -0.035em;
  max-width: 20ch;
  color: var(--ink);
}
.jm-sub {
  margin: 0;
  font-size: clamp(14px, 1.3vw, 17px);
  line-height: 1.62;
  font-weight: 400;
  color: var(--muted);
  max-width: 66ch;
}
.jm-brk { display: none; }
@media (min-width: 900px) {
  .jm-brk { display: inline; }
  .jm-stage .jm-headline { max-width: none; }
  .jm-stage .jm-sub { max-width: none; }
}

.jm-prompt {
  width: min(790px, 100%);
  background: rgba(255, 255, 255, 0.42);
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  backdrop-filter: blur(18px) saturate(1.15);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 20px 20px 15px;
  text-align: left;
  box-shadow: 0 18px 44px -26px rgba(0, 0, 0, 0.28);
  margin-top: clamp(4px, 1.2vh, 12px);
}
.jm-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.jm-prompt__input {
  width: 100%;
  border: 0;
  outline: 0;
  resize: none;
  background: transparent;
  font-family: inherit;
  font-size: 16.5px;
  line-height: 1.5;
  color: var(--ink);
  min-height: clamp(54px, 9.5vh, 96px);
  padding: 2px 4px;
}
.jm-prompt__input::placeholder {
  color: #3d3d3d;
  opacity: 0.72;
}
.jm-prompt__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}
.jm-prompt__right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.jm-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  color: #1a1a1a;
  cursor: pointer;
  padding: 0;
  transition: background 0.18s ease;
}
.jm-icon-btn:hover { background: #f1f1ef; }
.jm-icon-btn--bare {
  border: 0;
  background: transparent;
  width: 34px;
}
.jm-icon-btn--bare:hover { background: rgba(0, 0, 0, 0.05); }
.jm-icon-btn--bare.is-listening {
  background: rgba(220, 38, 38, 0.14);
  color: #b91c1c;
}
.jm-icon-btn--send {
  background: #141414;
  border-color: #141414;
  color: #fff;
  width: 46px;
  height: 46px;
  border-radius: 12px;
}
.jm-icon-btn--send:hover { background: #000; }
.jm-icon-btn--send:disabled { opacity: 0.65; cursor: wait; }
.jm-icon-btn svg { width: 19px; height: 19px; }
.jm-icon-btn--send svg { width: 21px; height: 21px; }

.jm-attachment-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  margin-bottom: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 12px;
  color: #141414;
}
.jm-attachment-chip button {
  display: inline-flex;
  align-items: center;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: #5c5c5c;
}
.jm-error-banner {
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(220, 38, 38, 0.12);
  border: 1px solid rgba(220, 38, 38, 0.25);
  font-size: 12.5px;
  color: #991b1b;
}

.jm-chat-panel {
  width: min(790px, 100%);
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.56);
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  backdrop-filter: blur(18px) saturate(1.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 18px 44px -26px rgba(0, 0, 0, 0.25);
}
.jm-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 13px;
  font-weight: 500;
  color: #141414;
}
.jm-clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  color: #141414;
  cursor: pointer;
}
.jm-clear-btn:hover { background: #fff; }
.jm-chat-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.jm-msg {
  max-width: 88%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
}
.jm-msg--user {
  align-self: flex-end;
  background: #141414;
  color: #ffffff;
}
.jm-msg--model {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #111111;
}
.jm-msg--loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4a4a4a;
}
.jm-msg-file {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  opacity: 0.85;
  margin-bottom: 4px;
}
.jm-spin {
  animation: jm-spin 1s linear infinite;
}

@keyframes jm-spin {
  to { transform: rotate(360deg); }
}
@keyframes jm-rise {
  from { opacity: 0; transform: translate3d(0, 18px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes jm-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.jm-rise {
  animation: jm-rise 0.9s var(--ease) both;
  animation-delay: calc(var(--i, 0) * 70ms);
}

@media (max-width: 900px) {
  .jm-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px 0;
  }
  .jm-brand, .jm-nav__toggle {
    position: relative;
    z-index: 80;
  }
  .jm-brand {
    font-size: 21px;
    margin-right: auto;
  }
  .jm-brand svg {
    width: 25px;
    height: 25px;
  }
  .jm-btn-dark {
    padding: 10px 15px;
    font-size: 13.5px;
  }
  .jm-nav__toggle {
    display: inline-flex;
  }
  .jm-nav__nav {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 92px 28px 46px;
    background: #fafbf9;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: opacity 0.45s var(--ease), transform 0.45s var(--ease), visibility 0s linear 0.45s;
  }
  .jm-nav__nav.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: opacity 0.6s var(--ease), transform 0.6s var(--ease), visibility 0s linear 0s;
  }
  .jm-nav__links {
    flex-direction: column;
    gap: 2px;
    width: 100%;
    max-width: 340px;
  }
  .jm-nav__links li {
    overflow: hidden;
  }
  .jm-nav__links a {
    display: block;
    padding: 9px 0;
    text-align: center;
    font-size: clamp(26px, 7.4vw, 34px);
    font-weight: 500;
    letter-spacing: -0.03em;
    opacity: 0;
    transform: translateY(115%);
    transition: opacity 0.5s var(--ease), transform 0.7s var(--ease);
  }
  .jm-nav__links a:hover { opacity: 0; }
  .jm-nav__nav.is-open .jm-nav__links a {
    opacity: 1;
    transform: translateY(0);
  }
  .jm-nav__nav.is-open .jm-nav__links a:hover {
    opacity: 0.55;
  }
  .jm-nav__nav.is-open .jm-nav__links li:nth-child(1) a { transition-delay: 0.12s; }
  .jm-nav__nav.is-open .jm-nav__links li:nth-child(2) a { transition-delay: 0.18s; }
  .jm-nav__nav.is-open .jm-nav__links li:nth-child(3) a { transition-delay: 0.24s; }
  .jm-nav__nav.is-open .jm-nav__links li:nth-child(4) a { transition-delay: 0.30s; }
  .jm-nav__links .jm-rise { animation: none; }
  .jm-menu__cta {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s var(--ease), transform 0.6s var(--ease), background 0.18s ease;
  }
  .jm-nav__nav.is-open .jm-menu__cta {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.36s;
  }
}

@media (max-width: 640px) {
  .jm-hero { min-height: 520px; }
  .jm-nav__cta { display: none; }
  .jm-nav .jm-menu__cta {
    display: inline-flex;
    width: 100%;
    max-width: 340px;
    padding: 15px 22px;
    font-size: 15px;
    border-radius: 11px;
  }
  .jm-stage {
    padding: 16px 18px 22px;
    gap: 14px;
  }
  .jm-headline {
    font-size: clamp(25px, 7.2vw, 35px);
    max-width: 15ch;
    letter-spacing: -0.03em;
  }
  .jm-sub {
    font-size: 14px;
    line-height: 1.6;
    max-width: 40ch;
  }
  .jm-badge {
    font-size: 12px;
    padding: 6px 13px 6px 6px;
    gap: 10px;
  }
  .jm-badge__tag {
    font-size: 12px;
    padding: 3px 10px;
  }
  .jm-prompt {
    border-radius: 17px;
    padding: 16px 14px 12px;
  }
  .jm-prompt__input {
    font-size: 16px;
    min-height: 58px;
  }
  .jm-icon-btn { width: 38px; height: 38px; }
  .jm-icon-btn--bare { width: 32px; }
  .jm-icon-btn--send {
    width: 42px;
    height: 42px;
    border-radius: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jm-hero__bg video { display: none; }
  .jm-hero__bg, .jm-rise { animation: none !important; }
  .jm-nav__nav, .jm-nav__nav .jm-nav__links a, .jm-menu__cta, .jm-nav__toggle .jm-bar {
    transition-duration: 0.01ms !important;
    transition-delay: 0s !important;
  }
  .jm-nav__nav, .jm-nav__nav .jm-nav__links a, .jm-menu__cta {
    transform: none !important;
  }
}
`;
