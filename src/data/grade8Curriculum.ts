import type { GradeChapter, GradeTopic } from './grade7Curriculum';

export interface Grade8Curriculum {
  intro: GradeTopic;
  chapters: GradeChapter[];
  appendices: GradeTopic[];
}

export const GRADE_8_CURRICULUM: Grade8Curriculum = {
  intro: {
    id: 'g8-kirish',
    title: 'Kirish',
  },
  chapters: [
    {
      id: 'g8-bob-1',
      title: 'I BOB. ELEKTR ZARYAD. ELEKTR MAYDON',
      topics: [
        { id: 'g8-mavzu-1', title: '1-§. Jismlarning zaryadlanishi' },
        { id: 'g8-mavzu-2', title: '2-§. Elektr zaryad' },
        {
          id: 'g8-mavzu-3',
          title: '3-§. Zaryadlarning o‘zaro ta’siri. Kulon qonuni',
        },
        { id: 'g8-mavzu-4', title: '4-§. Masalalar yechish' },
        { id: 'g8-mavzu-5', title: '5-§. Elektr maydon' },
        {
          id: 'g8-mavzu-6',
          title: '6-§. O‘tkazgichlarda elektr zaryadlarning taqsimlanishi',
        },
        { id: 'g8-mavzu-7', title: '7-§. Masalalar yechish' },
        { id: 'g8-mavzu-8', title: '8-§. Tabiatdagi elektr hodisalar' },
        {
          id: 'g8-bob1-test',
          title: 'I bobni takrorlash uchun test topshiriqlari',
        },
        {
          id: 'g8-bob1-xulosa',
          title: 'I bob yuzasidan muhim xulosalar',
        },
      ],
    },
    {
      id: 'g8-bob-2',
      title: 'II BOB. ELEKTR TOKI',
      topics: [
        { id: 'g8-mavzu-9', title: '9-§. Elektr toki haqida tushuncha' },
        { id: 'g8-mavzu-10', title: '10-§. Tok manbalari' },
        { id: 'g8-mavzu-11', title: '11-§. Elektr kuchlanish va uni o‘lchash' },
        { id: 'g8-mavzu-12', title: '12-§. Tok kuchi va uni o‘lchash' },
        { id: 'g8-mavzu-13', title: '13-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-14',
          title:
            '14-§. Laboratoriya ishi. Elektr zanjirni yig‘ish, uning turli qismlaridagi tok kuchi va kuchlanishni o‘lchash',
        },
        { id: 'g8-mavzu-15', title: '15-§. Elektr qarshilik' },
        {
          id: 'g8-mavzu-16',
          title: '16-§. Rezistorlar. Reostatlar. Potensiometrlar',
        },
        {
          id: 'g8-mavzu-17',
          title: '17-§. Zanjirning bir qismi uchun Om qonuni',
        },
        { id: 'g8-mavzu-18', title: '18-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-19',
          title: '19-§. Laboratoriya ishi. Om qonunini o‘rganish',
        },
        {
          id: 'g8-mavzu-20',
          title:
            '20-§. Amaliy mashg‘ulot. Reostat yordamida tok kuchini rostlash',
        },
        { id: 'g8-mavzu-21', title: '21-§. Iste’molchilarni ketma-ket ulash' },
        { id: 'g8-mavzu-22', title: '22-§. Iste’molchilarni parallel ulash' },
        {
          id: 'g8-mavzu-23',
          title: '23-§. Amaliy mashg‘ulot. Tok manbalarini ulash',
        },
        {
          id: 'g8-mavzu-24',
          title:
            '24-§. Laboratoriya ishi. O‘tkazgichlarni ketma-ket va parallel ulashni o‘rganish',
        },
        {
          id: 'g8-mavzu-25',
          title: '25-§. Iste’molchilarni aralash ulash (Mustaqil o‘qish uchun)',
        },
        { id: 'g8-mavzu-26', title: '26-§. Masalalar yechish' },
        { id: 'g8-mavzu-27', title: '27-§. Elektr sig‘imi. Kondensatorlar' },
        {
          id: 'g8-mavzu-28',
          title: '28-§. Kondensatorlarni parallel va ketma-ket ulash',
        },
        { id: 'g8-mavzu-29', title: '29-§. Masalalar yechish' },
        {
          id: 'g8-bob2-test',
          title: 'II bobni takrorlash uchun test topshiriqlari',
        },
        {
          id: 'g8-bob2-xulosa',
          title: 'II bob yuzasidan muhim xulosalar',
        },
      ],
    },
    {
      id: 'g8-bob-3',
      title: 'III BOB. ELEKTR TOKINING ISHI VA QUVVATI',
      topics: [
        { id: 'g8-mavzu-30', title: '30-§. Elektr tokining ishi' },
        { id: 'g8-mavzu-31', title: '31-§. Elektr tokining quvvati' },
        { id: 'g8-mavzu-32', title: '32-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-33',
          title:
            '33-§. Laboratoriya ishi. Iste’molchi (lampochka)ning elektr quvvatini aniqlash',
        },
        {
          id: 'g8-mavzu-34',
          title: '34-§. Elektr toki ta’sirida o‘tkazgichlarning qizishi',
        },
        { id: 'g8-mavzu-35', title: '35-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-36',
          title: '36-§. Joul–Lens qonunining amaliy tatbiqlari',
        },
        {
          id: 'g8-mavzu-37',
          title: '37-§. Xonadonlardagi elektr zanjirlar va ulashlar',
        },
        { id: 'g8-mavzu-38', title: '38-§. Elektr xavfsizlik choralari' },
        { id: 'g8-mavzu-39', title: '39-§. Masalalar yechish' },
        {
          id: 'g8-bob3-test',
          title: 'III bobni takrorlash uchun test topshiriqlari',
        },
        {
          id: 'g8-bob3-xulosa',
          title: 'III bob yuzasidan muhim xulosalar',
        },
      ],
    },
    {
      id: 'g8-bob-4',
      title: 'IV BOB. TURLI MUHITLARDA ELEKTR TOKI',
      topics: [
        { id: 'g8-mavzu-40', title: '40-§. Metallarda elektr toki' },
        { id: 'g8-mavzu-41', title: '41-§. Suyuqliklarda elektr toki' },
        {
          id: 'g8-mavzu-42',
          title: '42-§. Elektroliz. Faradeyning birinchi qonuni',
        },
        { id: 'g8-mavzu-43', title: '43-§. Faradeyning ikkinchi qonuni' },
        { id: 'g8-mavzu-44', title: '44-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-45',
          title: '45-§. Elektrolizdan turmushda va texnikada foydalanish',
        },
        { id: 'g8-mavzu-46', title: '46-§. Vakuumda elektr toki' },
        { id: 'g8-mavzu-47', title: '47-§. Gazlarda elektr toki' },
        {
          id: 'g8-mavzu-48',
          title: '48-§. Elektr razryadlarning turlari va ulardan foydalanish',
        },
        {
          id: 'g8-bob4-test',
          title: 'IV bobni takrorlash uchun test topshiriqlari',
        },
        {
          id: 'g8-bob4-xulosa',
          title: 'IV bob yuzasidan muhim xulosalar',
        },
      ],
    },
    {
      id: 'g8-bob-5',
      title: 'V BOB. MAGNIT MAYDON',
      topics: [
        {
          id: 'g8-mavzu-49',
          title: '49-§. Magnit maydon. Doimiy magnit va uning qutblari',
        },
        {
          id: 'g8-mavzu-50',
          title: '50-§. Magnit maydonni xarakterlovchi parametrlar',
        },
        { id: 'g8-mavzu-51', title: '51-§. Yerning magnit maydoni' },
        { id: 'g8-mavzu-52', title: '52-§. Tokning magnit maydoni' },
        {
          id: 'g8-mavzu-53',
          title: '53-§. Magnit maydonning tokli o‘tkazgichga ta’siri',
        },
        { id: 'g8-mavzu-54', title: '54-§. Masalalar yechish' },
        {
          id: 'g8-mavzu-55',
          title:
            '55-§. Bir jinsli magnit maydonda tokli ramkaning aylanma harakati',
        },
        {
          id: 'g8-mavzu-56',
          title: '56-§. Magnit maydonda zaryadli zarraning harakati',
        },
        {
          id: 'g8-mavzu-57',
          title: '57-§. Elektromagnitlar. Elektromagnit rele',
        },
        {
          id: 'g8-mavzu-58',
          title:
            '58-§. Laboratoriya ishi. Eng oddiy elektromagnitni yig‘ish va uning ishlashini o‘rganish',
        },
        {
          id: 'g8-mavzu-59',
          title: '59-§. O‘zgarmas tok elektr dvigateli',
        },
        { id: 'g8-mavzu-60', title: '60-§. Masalalar yechish' },
        {
          id: 'g8-bob5-test',
          title: 'V bobni takrorlash uchun test topshiriqlari',
        },
        {
          id: 'g8-bob5-xulosa',
          title: 'V bob yuzasidan muhim xulosalar',
        },
      ],
    },
  ],
  appendices: [
    {
      id: 'g8-mashqlar-javoblari',
      title: 'Mashqlarning javoblari',
    },
  ],
};

export function flattenGrade8Topics(): GradeTopic[] {
  return [
    GRADE_8_CURRICULUM.intro,
    ...GRADE_8_CURRICULUM.chapters.flatMap((chapter) => chapter.topics),
    ...GRADE_8_CURRICULUM.appendices,
  ];
}
