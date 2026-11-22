import type { TheoryBlock } from '../data/grade7TheoryContent';

export type TheoryBlockEntry = {
  block: TheoryBlock;
  index: number;
};

export type FigureBlock = Extract<TheoryBlock, { type: 'figure' }>;

export type TheoryLayoutItem =
  | {
      kind: 'block';
      entry: TheoryBlockEntry;
    }
  | {
      kind: 'asideFigure';
      textEntries: TheoryBlockEntry[];
      figureEntry: {
        block: FigureBlock;
        index: number;
      };
    };

const STOP_TYPES = new Set<TheoryBlock['type']>([
  'sectionTitle',
  'figure',
  'keyTerms',
  'questions',
  'example',
]);

const DEFAULT_FLOW_TYPES = new Set<TheoryBlock['type']>([
  'paragraph',
  'numberedList',
]);

/**
 * Pairs textbook figures (`placement !== 'center'`) with their immediately
 * preceding prose blocks so figures render beside the text they illustrate
 * rather than leaving empty centered gaps.
 */
export function buildTheoryLayout(blocks: TheoryBlock[]): TheoryLayoutItem[] {
  const items: TheoryLayoutItem[] = [];

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];

    if (block.type === 'figure' && block.placement !== 'center') {
      const maxSpan = block.span;
      const collected: TheoryBlockEntry[] = [];

      while (items.length > 0) {
        if (maxSpan !== undefined && collected.length >= maxSpan) {
          break;
        }
        const prev = items[items.length - 1];
        if (prev.kind !== 'block') {
          break;
        }
        const prevType = prev.entry.block.type;
        if (STOP_TYPES.has(prevType)) {
          break;
        }
        // Without an explicit span, stop before standalone definition boxes so
        // definitions preceding unrelated figures remain full width.
        if (maxSpan === undefined && !DEFAULT_FLOW_TYPES.has(prevType)) {
          break;
        }
        items.pop();
        collected.unshift(prev.entry);
      }

      if (collected.length > 0) {
        items.push({
          kind: 'asideFigure',
          textEntries: collected,
          figureEntry: {
            block,
            index,
          },
        });
        continue;
      }
    }

    items.push({
      kind: 'block',
      entry: { block, index },
    });
  }

  return items;
}
