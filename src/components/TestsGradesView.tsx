import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  GRADE_9_TEST_CHAPTERS,
  type Grade9TestTopic,
  type QuizOptionKey,
} from '../data/grade9TestsData';
import {
  countAnsweredQuestions,
  evaluateTopicQuiz,
  QUIZ_OPTION_KEYS,
} from '../utils/quizEngine';

export const TEST_GRADES = [7, 8, 9, 10, 11] as const;
export type TestGrade = (typeof TEST_GRADES)[number];

const BEST_SCORES_STORAGE_KEY = 'fizlab_g9_test_scores_v1';

interface SavedTopicScore {
  correctCount: number;
  totalCount: number;
  percentage: number;
}

interface TestsGradesViewProps {
  selectedGrade: TestGrade | null;
  onSelectGrade: (grade: TestGrade | null) => void;
  onBackToSections: () => void;
}

function loadSavedScores(): Record<string, SavedTopicScore> {
  try {
    const raw = localStorage.getItem(BEST_SCORES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SavedTopicScore>) : {};
  } catch {
    return {};
  }
}

export default function TestsGradesView({
  selectedGrade,
  onSelectGrade,
  onBackToSections,
}: TestsGradesViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<{
    topic: Grade9TestTopic;
    chapterTitle: string;
  } | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, QuizOptionKey>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [savedScores, setSavedScores] = useState<
    Record<string, SavedTopicScore>
  >(() => loadSavedScores());

  const openTopicQuiz = (topic: Grade9TestTopic, chapterTitle: string) => {
    setSelectedTopic({ topic, chapterTitle });
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const resetCurrentQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const handleSelectOption = (questionId: number, option: QuizOptionKey) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const evaluation = useMemo(() => {
    if (!selectedTopic || !submitted) return null;
    return evaluateTopicQuiz(selectedTopic.topic.questions, selectedAnswers);
  }, [selectedTopic, submitted, selectedAnswers]);

  const handleFinishQuiz = () => {
    if (!selectedTopic) return;
    const result = evaluateTopicQuiz(
      selectedTopic.topic.questions,
      selectedAnswers
    );
    setSubmitted(true);

    setSavedScores((prev) => {
      const existing = prev[selectedTopic.topic.id];
      if (existing && existing.correctCount >= result.correctCount) {
        return prev;
      }
      const next = {
        ...prev,
        [selectedTopic.topic.id]: {
          correctCount: result.correctCount,
          totalCount: result.totalCount,
          percentage: result.percentage,
        },
      };
      try {
        localStorage.setItem(BEST_SCORES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  // 1. Active Quiz / Results Screen for a selected 9th-grade topic
  if (selectedGrade === 9 && selectedTopic) {
    const { topic, chapterTitle } = selectedTopic;
    const questions = topic.questions;
    const activeQuestion = questions[currentIdx] ?? questions[0];
    const answeredCount = countAnsweredQuestions(questions, selectedAnswers);
    const chosenOption = activeQuestion
      ? selectedAnswers[activeQuestion.id]
      : undefined;

    return (
      <div className="fizlab-quiz-scope w-full max-w-[880px] mx-auto pt-1 pb-6 space-y-4">
        <div className="fizlab-neo-card">
          <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                9
              </span>
              <div className="min-w-0">
                <div className="text-xs font-medium text-sky-700/85 dark:text-sky-300/85 truncate">
                  {chapterTitle}
                </div>
                <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                  {topic.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTopic(null)}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          <div className="fizlab-neo-well !p-4 sm:!p-6 space-y-5">
            {!submitted && activeQuestion ? (
              <>
                {/* Quiet progress metadata + Question number selector */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-mono-tabular font-medium">
                      {currentIdx + 1}-savol · {questions.length} tadan
                    </span>
                    <span className="font-mono-tabular">
                      Belgilangan: {answeredCount} / {questions.length}
                    </span>
                  </div>

                  <nav
                    className="flex flex-wrap items-center gap-1.5"
                    aria-label="Savollar tartibi"
                  >
                    {questions.map((q, idx) => {
                      const isCurrent = idx === currentIdx;
                      const isAnswered = Boolean(selectedAnswers[q.id]);
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setCurrentIdx(idx)}
                          aria-label={`${idx + 1}-savol`}
                          aria-current={isCurrent ? 'step' : undefined}
                          data-active={isCurrent ? 'true' : undefined}
                          data-answered={
                            !isCurrent && isAnswered ? 'true' : undefined
                          }
                          className="fizlab-quiz-num-btn"
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Active Question Card */}
                <div className="rounded-2xl border border-white/60 dark:border-white/12 bg-white/45 dark:bg-white/[0.04] p-4 sm:p-5 space-y-4">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {activeQuestion.id}. {activeQuestion.question}
                  </h3>

                  <div
                    className="space-y-2.5"
                    role="group"
                    aria-label="Javob variantlari"
                  >
                    {QUIZ_OPTION_KEYS.map((optKey) => {
                      const isSelected = chosenOption === optKey;
                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() =>
                            handleSelectOption(activeQuestion.id, optKey)
                          }
                          aria-pressed={isSelected}
                          className="fizlab-quiz-option"
                        >
                          <span
                            className={`w-8 h-8 rounded-full font-display font-bold text-xs flex items-center justify-center shrink-0 border transition-all duration-150 ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#2E9BFF] to-[#0050CC] text-white border-[#2E9BFF]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]'
                                : 'bg-white/60 text-[#0B132B] border-white/75 dark:bg-white/10 dark:text-[#F1F7FF] dark:border-white/16'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="flex-1 text-sm sm:text-[15px] leading-snug">
                            {activeQuestion.options[optKey]}
                          </span>
                          {isSelected && (
                            <CheckCircle2
                              size={18}
                              className="shrink-0 text-sky-600 dark:text-sky-400"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation & Submit Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                      className="fizlab-quiz-secondary-btn"
                    >
                      <ArrowLeft size={14} aria-hidden="true" />
                      <span>Oldingi</span>
                    </button>

                    <button
                      type="button"
                      disabled={currentIdx === questions.length - 1}
                      onClick={() =>
                        setCurrentIdx((i) =>
                          Math.min(questions.length - 1, i + 1)
                        )
                      }
                      className="fizlab-quiz-secondary-btn"
                    >
                      <span>Keyingi</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinishQuiz}
                    className="fizlab-neo-btn !w-auto !m-0 px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap"
                  >
                    {answeredCount === questions.length
                      ? 'Testni yakunlash'
                      : `Testni yakunlash (${answeredCount}/${questions.length})`}
                  </button>
                </div>
              </>
            ) : (
              evaluation && (
                <div className="space-y-5">
                  {/* Results Summary Card */}
                  <div className="rounded-2xl border border-white/65 dark:border-white/14 bg-white/50 dark:bg-white/[0.05] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-sky-700 dark:text-sky-300">
                        <Award size={16} aria-hidden="true" />
                        <span>{evaluation.performanceLabel}</span>
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white font-mono-tabular">
                        {evaluation.correctCount} / {evaluation.totalCount}
                        <span className="text-base sm:text-lg font-semibold text-sky-700 dark:text-sky-300 ml-2.5">
                          ({evaluation.percentage}%)
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono-tabular">
                        <span>To‘g‘ri: {evaluation.correctCount}</span>
                        <span aria-hidden="true">·</span>
                        <span>Noto‘g‘ri: {evaluation.wrongCount}</span>
                        {evaluation.unansweredCount > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>
                              Belgilanmagan: {evaluation.unansweredCount}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={resetCurrentQuiz}
                        className="fizlab-neo-btn !w-auto !m-0 px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <RotateCcw size={14} aria-hidden="true" />
                        <span>Qayta topshirish</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTopic(null)}
                        className="fizlab-quiz-secondary-btn"
                      >
                        <span>Mavzularga qaytish</span>
                      </button>
                    </div>
                  </div>

                  {/* Per-Question Answer Review */}
                  <div className="space-y-3">
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">
                      Savollar tahlili
                    </h3>

                    <div className="space-y-3">
                      {questions.map((q, idx) => {
                        const review = evaluation.reviews[idx];
                        const isCorrect = review.status === 'correct';
                        const isWrong = review.status === 'wrong';

                        return (
                          <div
                            key={q.id}
                            className="rounded-2xl border border-white/60 dark:border-white/12 bg-white/45 dark:bg-white/[0.04] p-4 space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                {q.id}. {q.question}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                                  isCorrect
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : isWrong
                                    ? 'text-rose-700 dark:text-rose-400'
                                    : 'text-amber-700 dark:text-amber-400'
                                }`}
                              >
                                {isCorrect ? (
                                  <>
                                    <CheckCircle2
                                      size={14}
                                      aria-hidden="true"
                                    />
                                    <span>To‘g‘ri</span>
                                  </>
                                ) : isWrong ? (
                                  <>
                                    <XCircle size={14} aria-hidden="true" />
                                    <span>Noto‘g‘ri</span>
                                  </>
                                ) : (
                                  <span>Belgilanmagan</span>
                                )}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-[13px]">
                              {QUIZ_OPTION_KEYS.map((key) => {
                                const isRightOpt = q.correctAnswer === key;
                                const isUserOpt = review.selectedAnswer === key;
                                return (
                                  <div
                                    key={key}
                                    className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${
                                      isRightOpt
                                        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 dark:bg-emerald-500/12 dark:border-emerald-500/40 dark:text-emerald-100'
                                        : isUserOpt
                                        ? 'bg-rose-50/90 border-rose-300 text-rose-950 dark:bg-rose-500/12 dark:border-rose-500/40 dark:text-rose-100'
                                        : 'bg-slate-50/50 border-slate-200/70 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-300'
                                    }`}
                                  >
                                    <span className="font-display font-bold shrink-0">
                                      {key})
                                    </span>
                                    <span className="flex-1">
                                      {q.options[key]}
                                    </span>
                                    {isRightOpt && (
                                      <span className="font-medium text-emerald-700 dark:text-emerald-300 shrink-0">
                                        To‘g‘ri javob
                                      </span>
                                    )}
                                    {!isRightOpt && isUserOpt && (
                                      <span className="font-medium text-rose-700 dark:text-rose-300 shrink-0">
                                        Sizning javobingiz
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. 9th-Grade Chapters & Topics Directory
  if (selectedGrade === 9) {
    const totalTopics = GRADE_9_TEST_CHAPTERS.reduce(
      (sum, ch) => sum + ch.topics.length,
      0
    );
    const totalQuestions = GRADE_9_TEST_CHAPTERS.reduce(
      (sum, ch) =>
        sum + ch.topics.reduce((s, t) => s + t.questions.length, 0),
      0
    );

    return (
      <div className="fizlab-quiz-scope w-full max-w-[880px] mx-auto pt-1 pb-6 space-y-4">
        <div className="fizlab-neo-card">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                9
              </span>
              <div>
                <h2 className="fizlab-neo-heading">
                  9-sinf · Testlar mundarijasi
                </h2>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono-tabular">
                  {GRADE_9_TEST_CHAPTERS.length} ta bob · {totalTopics} ta mavzu ·{' '}
                  {totalQuestions} ta test
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedTopic(null);
                onSelectGrade(null);
              }}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          <div className="fizlab-neo-well !p-3 sm:!p-4 space-y-5">
            {GRADE_9_TEST_CHAPTERS.map((chapter) => (
              <section key={chapter.id} className="space-y-2">
                <h3 className="font-display text-[13px] sm:text-sm font-bold text-sky-700 dark:text-sky-300 px-1 border-b border-sky-900/10 dark:border-sky-300/15 pb-1.5">
                  {chapter.title}
                </h3>

                <div className="flex flex-col gap-1.5">
                  {chapter.topics.map((topic) => {
                    const best = savedScores[topic.id];
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => openTopicQuiz(topic, chapter.title)}
                        className="fizlab-neo-topic-row"
                      >
                        <span className="flex-1">{topic.title}</span>
                        <span className="flex items-center gap-2 shrink-0 text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                          {best ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                              {best.correctCount}/{best.totalCount}
                            </span>
                          ) : (
                            <span>{topic.questions.length} savol</span>
                          )}
                          <ChevronRight
                            size={15}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. Empty placeholder view for grades 7, 8, 10, 11
  if (selectedGrade !== null) {
    return (
      <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {selectedGrade}
              </span>
              <h2 className="fizlab-neo-heading">
                {selectedGrade}-sinf · Testlar
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedTopic(null);
                onSelectGrade(null);
              }}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          <div
            className="fizlab-neo-well min-h-[340px]"
            aria-label={`${selectedGrade}-sinf testlar bo‘limi`}
          />
        </div>
      </div>
    );
  }

  // 4. Grades grid (7-sinf .. 11-sinf)
  return (
    <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <span className="fizlab-neo-icon">
            <ClipboardList size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 className="fizlab-neo-heading">Testlar qismi</h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedTopic(null);
            onBackToSections();
          }}
          className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Orqaga</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEST_GRADES.map((grade) => (
          <button
            key={grade}
            type="button"
            onClick={() => {
              setSelectedTopic(null);
              onSelectGrade(grade);
            }}
            className="group fizlab-neo-card cursor-pointer is-interactive text-left w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {grade}
              </span>
              <span className="fizlab-neo-heading">{grade}-sinf</span>
            </div>

            <div
              className="fizlab-neo-well min-h-[104px]"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
