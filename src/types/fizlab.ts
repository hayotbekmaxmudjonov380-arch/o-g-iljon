export type FizLabTheme = 'dark' | 'light';

export type WorkspaceSection =
  | 'nazariya'
  | 'formulalar'
  | 'mashqlar'
  | 'kutubxona'
  | 'laboratoriya';

export type LabExperimentId =
  | 'gas-laws'
  | 'brownian'
  | 'states'
  | 'maxwell';

export type IntroThermalState = 'crystal' | 'liquid' | 'gas';

export interface TheoryTopic {
  id: string;
  chapterLabel: string;
  title: string;
  subtitle: string;
  readTime: string;
  relatedLab: LabExperimentId;
  summary: string;
  keyEquations: {
    expression: string;
    meaning: string;
  }[];
  principles: {
    heading: string;
    body: string;
  }[];
  experimentTip: string;
  schematicType: 'mkn-pressure' | 'isoprocesses' | 'kinetic-temp' | 'brownian-path' | 'phase-curve';
}

export type FormulaCategory =
  | 'all'
  | 'mkn'
  | 'gas-laws'
  | 'energy'
  | 'thermodynamics';

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  isConstant?: boolean;
}

export interface PhysicsFormula {
  id: string;
  category: Exclude<FormulaCategory, 'all'>;
  categoryLabel: string;
  title: string;
  equation: string;
  description: string;
  variables: FormulaVariable[];
  resultSymbol: string;
  resultName: string;
  resultUnit: string;
  compute: (values: Record<string, number>) => number;
  formatResult: (val: number) => string;
}

export type ExerciseDifficulty = 'Oson' | "O'rta" | 'Murakkab';

export interface PhysicsExercise {
  id: string;
  number: number;
  difficulty: ExerciseDifficulty;
  topic: string;
  title: string;
  statement: string;
  given: string[];
  question: string;
  targetSymbol: string;
  targetUnit: string;
  expectedAnswer: number;
  tolerancePercent: number;
  hint: string;
  solutionSteps: string[];
}

export interface LabTelemetry {
  temperatureK: number;
  volumeL: number;
  pressureKpa: number;
  rmsSpeedMs: number;
  kineticEnergyJ: number;
  collisionRate: number;
  msdUm2: number;
  phaseLabel: string;
  lightSpeciesSpeedMs: number;
  heavySpeciesSpeedMs: number;
  speedBins: number[];
}
