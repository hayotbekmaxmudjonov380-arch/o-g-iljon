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
      className={`relative w-full h-screen overflow-hidden bg-[#060a14] transition-opacity duration-250 ${
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
              ? 'linear-gradient(180deg, rgba(6,10,20,0.98) 0%, rgba(6,10,20,0.82) 9%, rgba(6,10,20,0) 22%, rgba(6,10,20,0) 72%, rgba(6,10,20,0.88) 87%, rgba(6,10,20,0.98) 100%), radial-gradient(circle at center, rgba(14,165,233,0.06) 0%, rgba(6,10,20,0.58) 100%)'
              : 'linear-gradient(180deg, rgba(6,10,20,0.98) 0%, rgba(15,23,42,0.72) 10%, rgba(15,23,42,0) 22%, rgba(15,23,42,0) 72%, rgba(15,23,42,0.82) 87%, rgba(6,10,20,0.98) 100%), radial-gradient(circle at center, rgba(56,189,248,0.06) 0%, rgba(6,10,20,0.48) 100%)',
        }}
      />

      {/* Minimal Foreground Overlay — Center 3D Model Unobstructed & Interactive */}
      <div className="relative z-10 pointer-events-none flex flex-col justify-between h-full px-5 py-5 md:px-10 md:py-7">
        {/* Minimal Top Header */}
        <header className="pointer-events-auto flex items-center justify-between gap-4 max-w-6xl w-full mx-auto">
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0 px-3 py-1.5 rounded-2xl glass-hud">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Atom className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white pr-1">
              FizLab
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => handleEnter('laboratoriya')}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-sky-500/20"
            >
              Ishchi ekranga o‘tish
            </button>
          </div>
        </header>

        {/* Bottom Minimal Floating Action & Refined Sketchfab Badge */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-3 pb-1">
          <div className="text-center space-y-1.5 px-5 py-2.5 rounded-2xl glass-hud">
            <h1 className="font-display text-xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              Molekulyar fizika 3D laboratoriyasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Sichqoncha yordamida 3D molekula modelini aylantirib va yaqinlashtirib kuzating
            </p>
          </div>

          <div className="pointer-events-auto glass-hud rounded-2xl p-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleEnter('laboratoriya')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
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
