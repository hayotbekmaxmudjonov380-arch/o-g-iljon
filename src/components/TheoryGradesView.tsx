import { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import {
  GRADE_7_CURRICULUM,
  type GradeChapter,
  type GradePart,
  type GradeTopic,
} from '../data/grade7Curriculum';
import { GRADE_8_CURRICULUM } from '../data/grade8Curriculum';
import { GRADE_9_CURRICULUM } from '../data/grade9Curriculum';
import { GRADE_10_CURRICULUM } from '../data/grade10Curriculum';
import { GRADE_11_CURRICULUM } from '../data/grade11Curriculum';
import { GRADE_7_THEORY_CONTENT } from '../data/grade7TheoryContent';
import TopicContent from './TopicContent';

export const THEORY_GRADES = [7, 8, 9, 10, 11] as const;
export type TheoryGrade = (typeof THEORY_GRADES)[number];

interface TheoryGradesViewProps {
  selectedGrade: TheoryGrade | null;
  onSelectGrade: (grade: TheoryGrade | null) => void;
  onBackToSections: () => void;
}

interface GradeCurriculumViewData {
  intro?: GradeTopic;
  parts?: GradePart[];
  chapters?: GradeChapter[];
  appendices?: GradeTopic[];
}

function getCurriculumForGrade(
  grade: TheoryGrade | null
): GradeCurriculumViewData | null {
  if (grade === 7) return GRADE_7_CURRICULUM;
  if (grade === 8) return GRADE_8_CURRICULUM;
  if (grade === 9) return GRADE_9_CURRICULUM;
  if (grade === 10) return GRADE_10_CURRICULUM;
  if (grade === 11) return GRADE_11_CURRICULUM;
  return null;
}

function renderChapterBlock(
  chapter: GradeChapter,
  onOpenTopic: (topic: GradeTopic, chapterTitle?: string) => void
) {
  return (
    <div key={chapter.id} className="space-y-1.5">
      <h4 className="font-display text-[13px] sm:text-sm font-semibold text-sky-600 dark:text-sky-400 px-1">
        {chapter.title}
      </h4>

      <div className="flex flex-col gap-1.5">
        {chapter.topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onOpenTopic(topic, chapter.title)}
            className="fizlab-neo-topic-row"
          >
            <span>{topic.title}</span>
            <ChevronRight
              size={15}
              className="shrink-0 opacity-60"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TheoryGradesView({
  selectedGrade,
  onSelectGrade,
  onBackToSections,
}: TheoryGradesViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<{
    topic: GradeTopic;
    chapterTitle?: string;
  } | null>(null);

  const openTopic = (topic: GradeTopic, chapterTitle?: string) => {
    setSelectedTopic({ topic, chapterTitle });
  };

  const curriculum = getCurriculumForGrade(selectedGrade);

  if (curriculum && selectedTopic) {
    const topicBlocks =
      selectedGrade === 7
        ? GRADE_7_THEORY_CONTENT[selectedTopic.topic.id]
        : undefined;

    return (
      <div
        className={`w-full max-w-[880px] mx-auto space-y-4 ${
          topicBlocks ? 'pt-1 pb-6' : 'my-auto py-2'
        }`}
      >
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {selectedGrade}
              </span>
              <div className="min-w-0">
                {selectedTopic.chapterTitle && (
                  <div className="text-xs font-medium text-sky-700/80 dark:text-sky-300/80 truncate">
                    {selectedTopic.chapterTitle}
                  </div>
                )}
                <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                  {selectedTopic.topic.title}
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

          <div
            className={`fizlab-neo-well ${topicBlocks ? '!p-4 sm:!p-6' : 'min-h-[360px]'}`}
            aria-label={`${selectedTopic.topic.title} bo‘limi`}
          >
            {topicBlocks && <TopicContent blocks={topicBlocks} />}
          </div>
        </div>
      </div>
    );
  }

  if (curriculum) {
    return (
      <div className="w-full max-w-[880px] mx-auto pt-1 pb-6 space-y-4">
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {selectedGrade}
              </span>
              <h2 className="fizlab-neo-heading">
                {selectedGrade}-sinf · Mundarija
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

          <div className="fizlab-neo-well !p-3 sm:!p-4 space-y-5">
            {curriculum.intro && (
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => openTopic(curriculum.intro!)}
                  className="fizlab-neo-topic-row"
                >
                  <span>{curriculum.intro.title}</span>
                  <ChevronRight
                    size={15}
                    className="shrink-0 opacity-60"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}

            {curriculum.parts &&
              curriculum.parts.map((part) => (
                <section key={part.id} className="space-y-3.5">
                  <h3 className="font-display text-sm sm:text-[15px] font-bold tracking-wide text-sky-700 dark:text-sky-300 px-1 border-b border-sky-900/10 dark:border-sky-300/15 pb-1.5">
                    {part.title}
                  </h3>

                  <div className="space-y-4">
                    {part.chapters.map((chapter) =>
                      renderChapterBlock(chapter, openTopic)
                    )}
                  </div>
                </section>
              ))}

            {curriculum.chapters && (
              <section className="space-y-4">
                {curriculum.chapters.map((chapter) =>
                  renderChapterBlock(chapter, openTopic)
                )}
              </section>
            )}

            {curriculum.appendices && curriculum.appendices.length > 0 && (
              <section className="space-y-1.5 pt-2 border-t border-sky-900/10 dark:border-sky-300/15">
                {curriculum.appendices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openTopic(item)}
                    className="fizlab-neo-topic-row"
                  >
                    <span>{item.title}</span>
                    <ChevronRight
                      size={15}
                      className="shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedGrade !== null) {
    return (
      <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {selectedGrade}
              </span>
              <h2 className="fizlab-neo-heading">{selectedGrade}-sinf</h2>
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
            aria-label={`${selectedGrade}-sinf nazariy qism bo‘limi`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
      <div className="flex items-center justify-between gap-3 px-1 gw-reveal">
        <div className="flex items-center gap-3">
          <span className="fizlab-neo-icon">
            <BookOpen size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 className="fizlab-neo-heading">Darsning nazariy qismi</h2>
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
        {THEORY_GRADES.map((grade) => (
          <button
            key={grade}
            type="button"
            onClick={() => {
              setSelectedTopic(null);
              onSelectGrade(grade);
            }}
            className="group fizlab-neo-card gw-reveal cursor-pointer is-interactive text-left w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {grade}
              </span>
              <span className="fizlab-neo-heading">{grade}-sinf</span>
            </div>

            <div className="fizlab-neo-well min-h-[104px]" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
