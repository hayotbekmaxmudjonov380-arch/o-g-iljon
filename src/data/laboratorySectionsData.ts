export type LaboratorySubSectionId =
  | 'amaliy-mashgulotlar'
  | 'laboratoriya-mashgulotlari';

export interface LaboratorySubSection {
  id: LaboratorySubSectionId;
  code: '01' | '02';
  title: string;
  ariaLabel: string;
}

export const LABORATORY_SUBSECTIONS: readonly [
  LaboratorySubSection,
  LaboratorySubSection,
] = [
  {
    id: 'amaliy-mashgulotlar',
    code: '01',
    title: 'Amaliy mashg‘ulotlar',
    ariaLabel: 'Amaliy mashg‘ulotlar bo‘limi',
  },
  {
    id: 'laboratoriya-mashgulotlari',
    code: '02',
    title: 'Laboratoriya mashg‘ulotlari',
    ariaLabel: 'Laboratoriya mashg‘ulotlari bo‘limi',
  },
];

export function getLaboratorySubSectionById(
  id: string | null
): LaboratorySubSection | undefined {
  if (!id) return undefined;
  return LABORATORY_SUBSECTIONS.find((item) => item.id === id);
}
