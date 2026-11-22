import test from 'node:test';
import assert from 'node:assert/strict';
import type { Grade9QuizQuestion } from '../data/grade9TestsData';
import {
  countAnsweredQuestions,
  evaluateTopicQuiz,
  getQuizPerformanceLabel,
} from './quizEngine';

const SAMPLE_QUESTIONS: Grade9QuizQuestion[] = [
  {
    id: 1,
    question: 'Savol 1',
    options: { A: 'a1', B: 'b1', C: 'c1', D: 'd1' },
    correctAnswer: 'B',
  },
  {
    id: 2,
    question: 'Savol 2',
    options: { A: 'a2', B: 'b2', C: 'c2', D: 'd2' },
    correctAnswer: 'C',
  },
  {
    id: 3,
    question: 'Savol 3',
    options: { A: 'a3', B: 'b3', C: 'c3', D: 'd3' },
    correctAnswer: 'D',
  },
  {
    id: 4,
    question: 'Savol 4',
    options: { A: 'a4', B: 'b4', C: 'c4', D: 'd4' },
    correctAnswer: 'A',
  },
];

test('countAnsweredQuestions counts only valid question answers', () => {
  assert.equal(countAnsweredQuestions(SAMPLE_QUESTIONS, {}), 0);
  assert.equal(
    countAnsweredQuestions(SAMPLE_QUESTIONS, { 1: 'B', 3: 'A', 99: 'C' }),
    2
  );
});

test('evaluateTopicQuiz scores mixed correct, wrong, and unanswered items', () => {
  const result = evaluateTopicQuiz(SAMPLE_QUESTIONS, {
    1: 'B',
    2: 'A',
    4: 'A',
  });

  assert.equal(result.totalCount, 4);
  assert.equal(result.answeredCount, 3);
  assert.equal(result.correctCount, 2);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.unansweredCount, 1);
  assert.equal(result.percentage, 50);
  assert.equal(result.performanceLabel, 'Qoniqarli natija');
  assert.deepEqual(
    result.reviews.map((r) => r.status),
    ['correct', 'wrong', 'unanswered', 'correct']
  );
});

test('getQuizPerformanceLabel maps score bands accurately', () => {
  assert.equal(getQuizPerformanceLabel(100), 'A’lo natija');
  assert.equal(getQuizPerformanceLabel(85), 'A’lo natija');
  assert.equal(getQuizPerformanceLabel(70), 'Yaxshi natija');
  assert.equal(getQuizPerformanceLabel(50), 'Qoniqarli natija');
  assert.equal(
    getQuizPerformanceLabel(30),
    'Mavzuni takrorlash tavsiya etiladi'
  );
});
