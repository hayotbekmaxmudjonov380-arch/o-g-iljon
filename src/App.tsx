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
      <div className="relative h-screen w-full overflow-hidden bg-[#DCEBF5] dark:bg-[#050A1C] text-[#0B132B] dark:text-[#F1F7FF] transition-colors duration-300">
      {/* Nimbus Tidepool Caustic Backdrop Light Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-40 -left-28 w-[640px] h-[640px] rounded-full opacity-75 dark:opacity-55"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(46,155,255,0.28) 0%, rgba(22,36,74,0.12) 45%, rgba(5,10,28,0) 72%)'
                : 'radial-gradient(circle, rgba(46,155,255,0.28) 0%, rgba(185,220,248,0.16) 45%, rgba(220,235,245,0) 72%)',
          }}
        />
        <div
          className="absolute -bottom-44 -right-12 w-[680px] h-[680px] rounded-full opacity-70 dark:opacity-50"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(0,162,255,0.22) 0%, rgba(0,80,204,0.12) 45%, rgba(5,10,28,0) 72%)'
                : 'radial-gradient(circle, rgba(0,162,255,0.22) 0%, rgba(238,247,255,0.2) 45%, rgba(220,235,245,0) 72%)',
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
