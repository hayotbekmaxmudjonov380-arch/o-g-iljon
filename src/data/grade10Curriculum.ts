import type { GradeChapter, GradeTopic } from './grade7Curriculum';

export interface Grade10Curriculum {
  chapters: GradeChapter[];
  appendices: GradeTopic[];
}

export const GRADE_10_CURRICULUM: Grade10Curriculum = {
  chapters: [
    {
      id: 'g10-mexanika',
      title: 'MEXANIKA',
      topics: [
        { id: 'g10-mavzu-1', title: '1-mavzu. Fizikaning tadqiqot metodlari' },
      ],
    },
    {
      id: 'g10-bob-1',
      title: 'I bob. KINEMATIKA',
      topics: [
        {
          id: 'g10-mavzu-2',
          title:
            '2-mavzu. Mexanik harakat turlari. Harakatlarning mustaqillik prinsipi',
        },
        { id: 'g10-mavzu-3', title: '3-mavzu. Jismlarning vertikal harakati' },
        {
          id: 'g10-mavzu-4',
          title:
            '4-mavzu. Aylana bo‘ylab notekis harakat. Burchak tezlanish. Tangensial tezlanish',
        },
        {
          id: 'g10-mavzu-5',
          title: '5-mavzu. Aylanma va ilgarilanma harakatni o‘zaro uzatish',
        },
        {
          id: 'g10-mavzu-6',
          title: '6-mavzu. Gorizontal otilgan jism harakati',
        },
        {
          id: 'g10-mavzu-7',
          title: '7-mavzu. Gorizontga qiya otilgan jism harakati',
        },
        {
          id: 'g10-mavzu-8',
          title:
            '8-mavzu. Laboratoriya ishi: Gorizontga qiya otilgan jism harakatini o‘rganish',
        },
        {
          id: 'g10-bob1-test',
          title: 'I bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob1-xulosa',
          title: 'I bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-2',
      title: 'II bob. DINAMIKA',
      topics: [
        { id: 'g10-mavzu-9', title: '9-mavzu. Dinamika qonunlari' },
        {
          id: 'g10-mavzu-10',
          title:
            '10-mavzu. Galileyning nisbiylik prinsipi. Inersial va noinersial sanoq sistemalari',
        },
        {
          id: 'g10-mavzu-11',
          title: '11-mavzu. Gravitatsion maydonda harakat',
        },
        {
          id: 'g10-mavzu-12',
          title: '12-mavzu. Jism og‘irligining harakat turiga bog‘liqligi',
        },
        {
          id: 'g10-mavzu-13',
          title: '13-mavzu. Jismning bir necha kuch ta’siridagi harakati',
        },
        {
          id: 'g10-bob2-test',
          title: 'II bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob2-xulosa',
          title: 'II bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-3',
      title: 'III bob. MEXANIKADA SAQLANISH QONUNLARI',
      topics: [
        {
          id: 'g10-mavzu-14',
          title:
            '14-mavzu. Energiya va ish. Energiyaning saqlanish qonuni. Jismning qiya tekislik bo‘ylab harakatlanishida bajarilgan ish',
        },
        {
          id: 'g10-mavzu-15',
          title:
            '15-mavzu. Laboratoriya ishi: Qiya tekislikda foydali ish koeffitsiyentini aniqlash',
        },
        {
          id: 'g10-mavzu-16',
          title:
            '16-mavzu. Jismlarning absolyut elastik va noelastik to‘qnashishi',
        },
        {
          id: 'g10-bob3-test',
          title: 'III bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob3-xulosa',
          title: 'III bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-4',
      title: 'IV bob. STATIKA VA GIDRODINAMIKA',
      topics: [
        {
          id: 'g10-mavzu-17',
          title: '17-mavzu. Jismlarning muvozanatda bo‘lish shartlari',
        },
        {
          id: 'g10-mavzu-18',
          title:
            '18-mavzu. Momentlar qoidasiga asoslanib ishlaydigan mexanizmlar',
        },
        { id: 'g10-mavzu-19', title: '19-mavzu. Aylanma harakat dinamikasi' },
        {
          id: 'g10-mavzu-20',
          title:
            '20-mavzu. Suyuqlik va gazlar harakati, oqimning uzluksizlik teoremasi. Bernulli tenglamasi',
        },
        {
          id: 'g10-mavzu-21',
          title:
            '21-mavzu. Harakatlanayotgan gazlar va suyuqliklarda bosimning tezlikka bog‘liqligidan texnikada foydalanish',
        },
        {
          id: 'g10-bob4-test',
          title: 'IV bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob4-xulosa',
          title: 'IV bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-5',
      title: 'V bob. MEXANIK TEBRANISHLAR VA TO‘LQINLAR',
      topics: [
        { id: 'g10-mavzu-22', title: '22-mavzu. Garmonik tebranishlar' },
        {
          id: 'g10-mavzu-23',
          title: '23-mavzu. Prujinali va matematik mayatniklar',
        },
        {
          id: 'g10-mavzu-24',
          title:
            '24-mavzu. Laboratoriya ishi: Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash',
        },
        {
          id: 'g10-mavzu-25',
          title: '25-mavzu. Majburiy tebranishlar. Texnikada rezonans',
        },
        {
          id: 'g10-mavzu-26',
          title:
            '26-mavzu. Mexanik to‘lqinlarning muhitlarda tarqalishi. Ultra va infratovushlardan turmushda va texnikada foydalanish',
        },
        {
          id: 'g10-bob5-test',
          title: 'V bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob5-xulosa',
          title: 'V bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-6',
      title: 'VI bob. TERMODINAMIKA ASOSLARI',
      topics: [
        {
          id: 'g10-mavzu-27',
          title:
            '27-mavzu. Issiqlik jarayonlarining qaytmasligi. Termodinamika qonunlari',
        },
        {
          id: 'g10-mavzu-28',
          title:
            '28-mavzu. Adiabatik jarayon. Issiqlik mashinasining foydali ish koeffitsiyenti. Karno sikli',
        },
        {
          id: 'g10-mavzu-29',
          title:
            '29-mavzu. Inson hayotida issiqlik dvigatellarining ahamiyati. Issiqlik dvigatellari va ekologiya',
        },
        {
          id: 'g10-bob6-test',
          title: 'VI bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob6-xulosa',
          title: 'VI bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-7',
      title: 'VII bob. ELEKTRODINAMIKA',
      topics: [
        {
          id: 'g10-mavzu-30',
          title:
            '30-mavzu. Zaryadning saqlanish qonuni. Nuqtaviy zaryadning maydoni. Elektr maydon kuchlanganligining superpozitsiya prinsipi',
        },
        {
          id: 'g10-mavzu-31',
          title:
            '31-mavzu. Zaryadlangan sharning elektr maydoni. Dielektrik singdiruvchanlik',
        },
        {
          id: 'g10-mavzu-32',
          title:
            '32-mavzu. Nuqtaviy zaryad maydonining potensiali. Potensiallar farqi',
        },
        {
          id: 'g10-mavzu-33',
          title:
            '33-mavzu. Elektrostatik maydonda zaryadni ko‘chirishda bajarilgan ish',
        },
        { id: 'g10-mavzu-34', title: '34-mavzu. Elektr maydon energiyasi' },
        {
          id: 'g10-bob7-test',
          title: 'VII bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob7-xulosa',
          title: 'VII bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-8',
      title: 'VIII bob. O‘ZGARMAS TOK QONUNLARI',
      topics: [
        {
          id: 'g10-mavzu-35',
          title:
            '35-mavzu. Elektr o‘tkazuvchanlik. Tok kuchining kuchlanishga bog‘liqligi',
        },
        {
          id: 'g10-mavzu-36',
          title: '36-mavzu. Tok kuchi va tok zichligi. Elektr tokining ta’sirlari',
        },
        {
          id: 'g10-mavzu-37',
          title:
            '37-mavzu. Butun zanjir uchun Om qonuni. Tok manbayining foydali ish koeffitsiyenti',
        },
        {
          id: 'g10-mavzu-38',
          title: '38-mavzu. Tok manbalarini ketma-ket va parallel ulash',
        },
        {
          id: 'g10-mavzu-39',
          title: '39-mavzu. Ampermetr va voltmetrning o‘lchash chegarasini oshirish',
        },
        {
          id: 'g10-mavzu-40',
          title:
            '40-mavzu. Laboratoriya ishi: Tok manbayining EYuK va ichki qarshiligini aniqlash',
        },
        {
          id: 'g10-bob8-test',
          title: 'VIII bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob8-xulosa',
          title: 'VIII bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
    {
      id: 'g10-bob-9',
      title: 'IX bob. TURLI MUHITLARDA ELEKTR TOKI',
      topics: [
        { id: 'g10-mavzu-41', title: '41-mavzu. Vakuumda elektr toki' },
        {
          id: 'g10-mavzu-42',
          title:
            '42-mavzu. Metall o‘tkazgichlar qarshiligining temperaturaga bog‘liqligi',
        },
        {
          id: 'g10-mavzu-43',
          title:
            '43-mavzu. Yarimo‘tkazgichlarda xususiy o‘tkazuvchanlik. Aralashmali o‘tkazuvchanlik',
        },
        {
          id: 'g10-mavzu-44',
          title:
            '44-mavzu. Yarimo‘tkazgichli asboblar (diod, tranzistor) va ularning texnikada qo‘llanilishi',
        },
        {
          id: 'g10-mavzu-45',
          title:
            '45-mavzu. Laboratoriya ishi: Yarim o‘tkazgichli diodning volt-amper xarakteristikasini o‘rganish',
        },
        {
          id: 'g10-bob9-test',
          title: 'IX bobni yakunlash yuzasidan test savollari',
        },
        {
          id: 'g10-bob9-xulosa',
          title: 'IX bobda o‘rganilgan eng muhim tushuncha, qoida va qonunlar',
        },
      ],
    },
  ],
  appendices: [
    {
      id: 'g10-adabiyotlar',
      title: 'FOYDALANILGAN ADABIYOTLAR',
    },
  ],
};

export function flattenGrade10Topics(): GradeTopic[] {
  return [
    ...GRADE_10_CURRICULUM.chapters.flatMap((chapter) => chapter.topics),
    ...GRADE_10_CURRICULUM.appendices,
  ];
}
