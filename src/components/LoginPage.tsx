import { FormEvent, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
}

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

const NAV_ITEMS = [
  'Bosh sahifa',
  '3D Laboratoriya',
  'Nazariya',
  'AI Yordamchi',
];

function normalizeApostrophes(value: string): string {
  return value.replace(/[’‘`ʻʼ]/g, "'").trim();
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [helperMsg, setHelperMsg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  const focusLoginForm = () => {
    setMobileMenuOpen(false);
    usernameInputRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = normalizeApostrophes(password);

    if (!cleanUser) {
      setErrorMsg('Iltimos, foydalanuvchi nomini kiriting.');
      return;
    }

    if (cleanPass !== "o'g'iljon") {
      setErrorMsg('Parol noto‘g‘ri. Qaytadan urinib ko‘ring.');
      return;
    }

    setErrorMsg(null);
    onLoginSuccess(cleanUser);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist flex flex-col">
      {/* Fullscreen Looping Background Video positioned at 70% horizontal center */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={HERO_VIDEO_URL}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] pointer-events-none"
      />

      {/* Navbar (z-30) */}
      <header className="relative z-30 shrink-0 flex items-center justify-between px-6 py-4 md:px-12 lg:px-16">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            FizLab
          </span>

          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Asosiy bo‘limlar"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={focusLoginForm}
                className="text-sm text-white/80 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={focusLoginForm}
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform cursor-pointer"
          >
            <span>Kirish</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={mobileMenuOpen}
            className="relative z-50 flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-white active:scale-90 transition-transform cursor-pointer"
          >
            <Menu
              size={22}
              aria-hidden="true"
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? 'opacity-0 scale-75 rotate-90'
                  : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <X
              size={22}
              aria-hidden="true"
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? 'opacity-100 scale-100 -rotate-90'
                  : 'opacity-0 scale-75 rotate-0'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay (z-20) */}
      <div
        className={`fixed md:hidden inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'h-screen opacity-100 pointer-events-auto'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 gap-6 transition-all duration-500 delay-100 ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={focusLoginForm}
              className="text-left text-3xl font-medium text-white/90 hover:text-white bg-transparent border-0 p-0 cursor-pointer transition-colors"
            >
              {item}
            </button>
          ))}
          <div>
            <button
              type="button"
              onClick={focusLoginForm}
              className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Kirish</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content (z-10): Fixed single-screen height, left-aligned transparent glass login card */}
      <main className="relative z-10 flex-1 min-h-0 flex items-center px-6 pb-4 pt-1 md:px-12 lg:px-16">
        <div className="w-full max-w-[390px]">
          {/* Staggered Intro Heading */}
          <div className="mb-3">
            <p className="text-xs text-white/90 mb-1 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
              Molekulyar fizika · 3D virtual laboratoriya
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium leading-[1.12] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
              Ilmiy kashfiyotlar olamiga kiring.
            </h1>
          </div>

          {/* Crystal-Clear Transparent Glass Login Card placed on the Left */}
          <div className="fiz-login-card animate-[fadeSlideUp_0.8s_ease_0.6s_both]">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <p className="text-white font-medium text-[30px] sm:text-[34px] leading-tight mb-0.5">
                Login
              </p>
              <p className="text-white font-normal text-[13px] sm:text-[14px] mb-3">
                Login to your account
              </p>

              <div className="mb-3.5">
                <input
                  ref={usernameInputRef}
                  required
                  placeholder="Username"
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="fiz-login-input"
                />
              </div>

              <div className="mb-3.5">
                <input
                  required
                  placeholder="Password"
                  name="password"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="fiz-login-input"
                />
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="text-[#fca5a5] text-[12px] mb-2.5 text-center"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full p-3.5 rounded-full bg-gradient-to-br from-[#2E9BFF] to-[#0050CC] hover:brightness-110 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.75),0_12px_26px_-8px_rgba(0,80,204,0.65)] text-white text-[15px] font-semibold cursor-pointer transition-all duration-300 active:scale-[0.98]"
              >
                Login
              </button>

              <div className="flex flex-col items-center mt-3.5 text-white text-[13px] sm:text-[14px] font-normal gap-1">
                <p>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() =>
                      setHelperMsg(
                        'FizLab tizimiga istalgan Username va berilgan maxsus parol orqali kirishingiz mumkin.'
                      )
                    }
                    className="text-[#0173ed] hover:text-[#3f95f2] bg-transparent border-0 p-0 cursor-pointer transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      setHelperMsg(
                        'Kirish uchun o‘qituvchi tomonidan belgilangan maxsus paroldan foydalaning.'
                      )
                    }
                    className="text-[#0173ed] hover:text-[#3f95f2] bg-transparent border-0 p-0 cursor-pointer transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </p>
              </div>

              {helperMsg && (
                <p className="mt-2.5 text-[11px] text-[#cbd5e1] leading-snug">
                  {helperMsg}
                </p>
              )}
            </form>
          </div>

          <p className="hidden sm:block mt-3 text-xs leading-relaxed text-white/60 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.8s_both]">
            3D simulyatorlar, nazariy mashg‘ulotlar va AI yordamchi bilan fizikani jonli o‘rganing.
          </p>
        </div>
      </main>
    </div>
  );
}
