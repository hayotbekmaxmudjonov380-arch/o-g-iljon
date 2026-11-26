import { useState } from 'react';
import { Atom, ArrowRight, FlaskConical } from 'lucide-react';
import { FizLabTheme, WorkspaceSection } from '../types/fizlab';
import ThemeToggle from './ThemeToggle';

interface IntroPortalProps {
  theme: FizLabTheme;
  onToggleTheme: () => void;
  onEnterWorkspace: (section?: WorkspaceSection) => void;
}

const SKETCHFAB_EXTRA_ATTRS = {
  mozallowfullscreen: 'true',
  webkitallowfullscreen: 'true',
  'xr-spatial-tracking': '',
  'execution-while-out-of-viewport': '',
  'execution-while-not-rendered': '',
  'web-share': '',
} as Record<string, string>;

const SKETCHFAB_EMBED_SRC =
  'https://sketchfab.com/models/cb846488ccf7469e94f41c749e8136f5/embed?autostart=1&autospin=0.25&ui_theme=dark&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0';

export default function IntroPortal({
  theme,
  onToggleTheme,
  onEnterWorkspace,
}: IntroPortalProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = (target: WorkspaceSection = 'laboratoriya') => {
    setIsLeaving(true);
    window.setTimeout(() => {
      onEnterWorkspace(target);
    }, 260);
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-[#050A1C] transition-opacity duration-250 ${
        isLeaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Full-Viewport Seamless 3D Sketchfab Stage directly in the site UI */}
      <div className="sketchfab-embed-wrapper absolute inset-0 w-full h-full z-0">
        <iframe
          title="Testosterone"
          frameBorder={0}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={SKETCHFAB_EMBED_SRC}
          className="w-full h-full border-0 block"
          {...SKETCHFAB_EXTRA_ATTRS}
        />
      </div>

      {/* Seamless Edge Vignettes blending the 3D stage into the FizLab interface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(5,10,28,0.98) 0%, rgba(5,10,28,0.82) 9%, rgba(5,10,28,0) 22%, rgba(5,10,28,0) 72%, rgba(5,10,28,0.88) 87%, rgba(5,10,28,0.98) 100%), radial-gradient(circle at center, rgba(46,155,255,0.06) 0%, rgba(5,10,28,0.58) 100%)'
              : 'linear-gradient(180deg, rgba(5,10,28,0.95) 0%, rgba(11,19,43,0.7) 10%, rgba(11,19,43,0) 22%, rgba(11,19,43,0) 72%, rgba(11,19,43,0.8) 87%, rgba(5,10,28,0.96) 100%), radial-gradient(circle at center, rgba(46,155,255,0.08) 0%, rgba(5,10,28,0.46) 100%)',
        }}
      />

      {/* Minimal Foreground Overlay — Center 3D Model Unobstructed & Interactive */}
      <div className="relative z-10 pointer-events-none flex flex-col justify-between h-full px-5 py-5 md:px-10 md:py-7">
        {/* Minimal Top Header */}
        <header className="pointer-events-auto flex items-center justify-between gap-4 max-w-6xl w-full mx-auto">
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0 px-3 py-1.5 rounded-full glass-hud">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E9BFF] to-[#0050CC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center text-white">
              <Atom className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-[#0B132B] dark:text-[#F1F7FF] pr-1.5">
              FizLab
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => handleEnter('laboratoriya')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-br from-[#2E9BFF] to-[#0050CC] hover:brightness-110 text-white font-semibold text-sm transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),0_10px_24px_-8px_rgba(0,80,204,0.65)] active:scale-95"
            >
              Ishchi ekranga o‘tish
            </button>
          </div>
        </header>

        {/* Bottom Minimal Floating Action & Refined Badge */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-3 pb-1">
          <div className="text-center space-y-1.5 px-6 py-3 rounded-[24px] glass-hud">
            <h1 className="font-display text-xl sm:text-3xl font-bold text-[#0B132B] dark:text-[#F1F7FF] tracking-tight">
              Molekulyar fizika 3D laboratoriyasi
            </h1>
            <p className="text-xs sm:text-sm text-[#0B132B]/75 dark:text-[#F1F7FF]/75">
              Sichqoncha yordamida 3D molekula modelini aylantirib va yaqinlashtirib kuzating
            </p>
          </div>

          <div className="pointer-events-auto glass-hud rounded-full p-1.5 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleEnter('laboratoriya')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-[#2E9BFF] to-[#0050CC] hover:brightness-110 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),0_10px_24px_-8px_rgba(0,80,204,0.65)] active:scale-95"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Laboratoriyani boshlash</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
