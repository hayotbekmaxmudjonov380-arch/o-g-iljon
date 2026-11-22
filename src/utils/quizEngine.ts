import type {
  Grade9QuizQuestion,
  QuizOptionKey,
} from '../data/grade9TestsData';

export const QUIZ_OPTION_KEYS: readonly QuizOptionKey[] = ['A', 'B', 'C', 'D'];

export interface QuizQuestionReview {
  questionId: number;
  selectedAnswer: QuizOptionKey | null;
  correctAnswer: QuizOptionKey;
  status: 'correct' | 'wrong' | 'unanswered';
}

export interface QuizEvaluationResult {
  totalCount: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  percentage: number;
  performanceLabel: string;
  reviews: QuizQuestionReview[];
}

export function getQuizPerformanceLabel(percentage: number): string {
  if (percentage >= 85) return 'A’lo natija';
  if (percentage >= 70) return 'Yaxshi natija';
  if (percentage >= 50) return 'Qoniqarli natija';
  return 'Mavzuni takrorlash tavsiya etiladi';
}

export function countAnsweredQuestions(
  questions: readonly Grade9QuizQuestion[],
  selectedAnswers: Readonly<Record<number, QuizOptionKey>>
): number {
  let count = 0;
  for (const q of questions) {
    if (selectedAnswers[q.id]) {
      count += 1;
    }
  }
  return count;
}

export function evaluateTopicQuiz(
  questions: readonly Grade9QuizQuestion[],
  selectedAnswers: Readonly<Record<number, QuizOptionKey>>
): QuizEvaluationResult {
  const totalCount = questions.length;
  let answeredCount = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const reviews: QuizQuestionReview[] = questions.map((q) => {
    const selected = selectedAnswers[q.id] ?? null;
    if (!selected) {
      unansweredCount += 1;
      return {
        questionId: q.id,
        selectedAnswer: null,
        correctAnswer: q.correctAnswer,
        status: 'unanswered',
      };
    }

    answeredCount += 1;
    if (selected === q.correctAnswer) {
      correctCount += 1;
      return {
        questionId: q.id,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        status: 'correct',
      };
    }

    wrongCount += 1;
    return {
      questionId: q.id,
      selectedAnswer: selected,
      correctAnswer: q.correctAnswer,
      status: 'wrong',
    };
  });

  const percentage =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return {
    totalCount,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount,
    percentage,
    performanceLabel: getQuizPerformanceLabel(percentage),
    reviews,
  };
}
