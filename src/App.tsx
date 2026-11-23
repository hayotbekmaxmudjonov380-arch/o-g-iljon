import { useCallback, useEffect, useState } from 'react';
import AppErrorBoundary from './components/AppErrorBoundary';
import ExercisesView from './components/ExercisesView';
import FormulasView from './components/FormulasView';
import IntroPortal from './components/IntroPortal';
import LaboratoriesView from './components/LaboratoriesView';
import LibraryView from './components/LibraryView';
import LoginPage from './components/LoginPage';
import TheoryView from './components/TheoryView';
import { FizLabTheme, LabExperimentId, WorkspaceSection } from './types/fizlab';

const SOLVED_STORAGE_KEY = 'fizlab_solved_exercises_v1';
const THEME_STORAGE_KEY = 'fizlab_theme_v1';
const AUTH_STORAGE_KEY = 'fizlab_auth_user_v1';

export default function App() {
  const [theme, setTheme] = useState<FizLabTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [authUser, setAuthUser] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] =
    useState<WorkspaceSection>('laboratoriya');
  const [activeLab, setActiveLab] = useState<LabExperimentId>('gas-laws');
  const [labViewMode, setLabViewMode] = useState<'sections' | 'simulator'>(
    'sections'
  );
  const [aiFullScreen, setAiFullScreen] = useState(false);

  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SOLVED_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify(solvedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [solvedIds]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleEnterWorkspace = useCallback((section?: WorkspaceSection) => {
    if (section) {
      setActiveSection(section);
    }
    setLabViewMode('sections');
    setAiFullScreen(false);
    setShowIntro(false);
  }, []);

  const handleOpenLabFromTheory = useCallback((labId: LabExperimentId) => {
    setActiveLab(labId);
    setLabViewMode('simulator');
    setAiFullScreen(false);
    setActiveSection('laboratoriya');
  }, []);

  const handleMarkSolved = useCallback((id: string) => {
    setSolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const handleLoginSuccess = useCallback((user: string) => {
    setAuthUser(user);
    setAiFullScreen(false);
    setShowIntro(true);
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, user);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAuthUser(null);
    setAiFullScreen(false);
    setShowIntro(true);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  if (!authUser) {
    return (
      <AppErrorBoundary>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </AppErrorBoundary>
    );
  }

  if (showIntro) {
    return (
      <AppErrorBoundary>
        <IntroPortal
          theme={theme}
          onToggleTheme={toggleTheme}
          onEnterWorkspace={handleEnterWorkspace}
        />
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <div className="relative h-screen w-full overflow-hidden bg-[#eef4fb] dark:bg-[#060a14] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Ambient Glassmorphism Backdrop Light Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full opacity-55 dark:opacity-35"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(14,165,233,0.32) 0%, rgba(14,165,233,0) 70%)'
                : 'radial-gradient(circle, rgba(14,165,233,0.24) 0%, rgba(14,165,233,0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 right-10 w-[620px] h-[620px] rounded-full opacity-45 dark:opacity-30"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0) 70%)'
                : 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 70%)',
          }}
        />
      </div>

      {/* Full-Width Workspace Frame (Edge-to-edge when AI view is active) */}
      <div
        className={`relative z-10 flex h-full w-full ${
          aiFullScreen && activeSection === 'laboratoriya'
            ? 'p-0'
            : 'p-2.5 sm:p-4'
        }`}
      >
        <main
          className={`flex-1 min-w-0 min-h-0 overflow-hidden ${
            aiFullScreen && activeSection === 'laboratoriya'
              ? 'rounded-none'
              : 'rounded-3xl'
          } ${activeSection === 'laboratoriya' ? '' : 'glass-panel-subtle'}`}
        >
          {activeSection === 'nazariya' && (
            <TheoryView onOpenLab={handleOpenLabFromTheory} />
          )}
          {activeSection === 'formulalar' && <FormulasView />}
          {activeSection === 'mashqlar' && (
            <ExercisesView
              solvedIds={solvedIds}
              onMarkSolved={handleMarkSolved}
              onResetProgress={() => setSolvedIds([])}
            />
          )}
          {activeSection === 'kutubxona' && (
            <div className="h-full overflow-y-auto p-3 sm:p-5">
              <LibraryView
                onBackToSections={() => setActiveSection('laboratoriya')}
              />
            </div>
          )}
          {activeSection === 'laboratoriya' && (
            <LaboratoriesView
              activeLab={activeLab}
              onSelectLab={setActiveLab}
              theme={theme}
              onToggleTheme={toggleTheme}
              onLogout={handleLogout}
              viewMode={labViewMode}
              onChangeViewMode={setLabViewMode}
              onAiModeChange={setAiFullScreen}
            />
          )}
        </main>
      </div>
      </div>
    </AppErrorBoundary>
  );
}
