import { useEffect, useRef, useState } from 'react';
import { Atom, ArrowRight, FlaskConical } from 'lucide-react';
import { IntroMoleculeScene } from '../three/IntroMoleculeScene';
import { FizLabTheme, WorkspaceSection } from '../types/fizlab';
import ThemeToggle from './ThemeToggle';

interface IntroPortalProps {
  theme: FizLabTheme;
  onToggleTheme: () => void;
  onEnterWorkspace: (section?: WorkspaceSection) => void;
}

export default function IntroPortal({
  theme,
  onToggleTheme,
  onEnterWorkspace,
}: IntroPortalProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<IntroMoleculeScene | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new IntroMoleculeScene(container, theme);
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setTheme(theme);
  }, [theme]);

  const handleEnter = (target: WorkspaceSection = 'laboratoriya') => {
    setIsLeaving(true);
    window.setTimeout(() => {
      onEnterWorkspace(target);
    }, 260);
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-[#e9f1fa] dark:bg-[#060a14] transition-opacity duration-250 ${
        isLeaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Full-viewport 3D Molecular Physics WebGL stage */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Minimal Foreground Overlay — Center 3D Scene Completely Unobstructed */}
      <div className="relative z-10 pointer-events-none flex flex-col justify-between h-full px-5 py-5 md:px-10 md:py-8">
        {/* Minimal Top Header */}
        <header className="pointer-events-auto flex items-center justify-between gap-4 max-w-6xl w-full mx-auto">
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <div className="w-10 h-10 rounded-xl glass-hud flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Atom className="w-5 h-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
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

        {/* Bottom Minimal Floating Action */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-4 pb-1">
          <div className="text-center space-y-1.5">
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              Molekulyar fizika 3D laboratoriyasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Sichqonchani harakatlantirib 3D molekulyar panjara harakatini kuzating
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
