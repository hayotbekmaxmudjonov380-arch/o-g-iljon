export type PracticalLabId = 'molecule-size' | 'heat-equilibrium';

export interface PracticalLab {
  id: PracticalLabId;
  code: string;
  grade: number;
  title: string;
  shortTitle: string;
  goal: string;
  theory: string[];
  formula: string;
  equipment: string[];
  steps: string[];
  conclusion: string;
}

export const PRACTICAL_LABS: readonly PracticalLab[] = [
  {
    id: 'molecule-size',
    code: '13-§',
    grade: 9,
    title: 'Amaliy mashg‘ulot. Molekulalarning o‘lchamini baholash',
    shortTitle: 'Molekula o‘lchamini baholash',
    goal:
      'Moy plyonkasining suv yuzasida bir molekula qalinlikda tarqalishidan foydalanib, molekulaning o‘lchamini baholash.',
    theory: [
      'Suv yuzasiga tomizilgan moy tomchisi yupqa plyonka hosil qilib tarqaladi. Plyonka qalinligi bitta molekula o‘lchamiga teng deb qabul qilinadi.',
      'Agar moyning hajmi V va plyonkaning yuzasi S ma’lum bo‘lsa, molekulaning diametrini d = V / S formula bilan baholash mumkin.',
      'Tajribada moy spirt bilan suyultiriladi, shuning uchun bitta tomchidagi sof moy hajmi juda kichik bo‘ladi.',
    ],
    formula: 'd = V / S,   S = π · (D / 2)²',
    equipment: [
      'Suv solingan taglik (vanna)',
      'Suyultirilgan moy eritmasi va pipetka',
      'Chizg‘ich yoki o‘lchov lineykasi',
      'Talk kukuni (plyonkani ko‘rinadigan qilish uchun)',
    ],
    steps: [
      'Suv yuzasiga talk kukuni seping.',
      'Pipetka bilan bitta tomchi suyultirilgan moy eritmasini tomizing.',
      'Plyonka to‘liq tarqalgach, uning diametrini chizg‘ich bilan o‘lchang.',
      'S = π·(D/2)² formula bo‘yicha plyonka yuzasini hisoblang.',
      'd = V/S formula bo‘yicha molekula diametrini toping.',
    ],
    conclusion:
      'Molekulaning o‘lchami 10⁻⁹ m tartibida ekanligi tasdiqlanadi. Bu molekulyar-kinetik nazariyaning asosiy g‘oyalaridan biridir.',
  },
  {
    id: 'heat-equilibrium',
    code: '19-§',
    grade: 9,
    title: 'Amaliy mashg‘ulot. Jismlarda issiqlik muvozanatini o‘rganish',
    shortTitle: 'Issiqlik muvozanati',
    goal:
      'Turli temperaturali suv miqdorlarini aralashtirib, issiqlik muvozanati qonunini va issiqlik miqdorining saqlanishini tekshirish.',
    theory: [
      'Issiqlik almashinuvda issiq jism bergan issiqlik miqdori sovuq jism olgan issiqlik miqdoriga teng bo‘ladi: Qberilgan = Qolingan.',
      'Issiqlik miqdori Q = c·m·Δt formula bilan hisoblanadi, bunda c — solishtirma issiqlik sig‘imi.',
      'Aralashma temperaturasi massalar va boshlang‘ich temperaturalarga bog‘liq: t = (m₁t₁ + m₂t₂) / (m₁ + m₂).',
    ],
    formula: 'Q = c·m·Δt,   t = (m₁t₁ + m₂t₂) / (m₁ + m₂)',
    equipment: [
      'Kalorimetr (issiqlik yo‘qotilishini kamaytiruvchi idish)',
      'Ikki menzurka: issiq va sovuq suv uchun',
      'Termometr',
      'Tarozi yoki o‘lchovli idish',
    ],
    steps: [
      'Issiq va sovuq suvning massasini o‘lchang.',
      'Termometr bilan ikkala suvning boshlang‘ich temperaturasini aniqlang.',
      'Aralashmaning oxirgi temperaturasini oldindan hisoblab ko‘ring.',
      'Suvlarni kalorimetrda aralashtiring va temperaturani o‘lchang.',
      'Qberilgan va Qolingan ni hisoblab, ularning tengligini tekshiring.',
    ],
    conclusion:
      'Issiqlik almashinuvda energiya yo‘qolmaydi, faqat issiq jismdan sovuq jismga o‘tadi. Issiqlik muvozanatida ikkala jism temperaturasi teng bo‘ladi.',
  },
];

export function getPracticalLabById(
  id: string | null
): PracticalLab | undefined {
  if (!id) return undefined;
  return PRACTICAL_LABS.find((lab) => lab.id === id);
}
