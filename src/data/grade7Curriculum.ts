export interface GradeTopic {
  id: string;
  title: string;
}

export interface GradeChapter {
  id: string;
  title: string;
  topics: GradeTopic[];
}

export interface GradePart {
  id: string;
  title: string;
  chapters: GradeChapter[];
}

export interface Grade7Curriculum {
  intro: GradeTopic;
  parts: GradePart[];
  appendices: GradeTopic[];
}

export const GRADE_7_CURRICULUM: Grade7Curriculum = {
  intro: {
    id: 'kirish',
    title: 'Kirish',
  },
  parts: [
    {
      id: 'kinematika-asoslari',
      title: 'KINEMATIKA ASOSLARI',
      chapters: [
        {
          id: 'bob-1',
          title: 'I bob. Mexanik harakat haqida umumiy ma’lumotlar',
          topics: [
            { id: 'mavzu-1', title: '1-§. Jismlarning harakati' },
            { id: 'mavzu-2', title: '2-§. Fazo va vaqt' },
            { id: 'mavzu-3', title: '3-§. Kinematikaning asosiy tushunchalari' },
            {
              id: 'mavzu-4',
              title: '4-§. Skalyar va vektor kattaliklar hamda ular ustida amallar',
            },
          ],
        },
        {
          id: 'bob-2',
          title: 'II bob. To‘g‘ri chiziqli harakat',
          topics: [
            {
              id: 'mavzu-5',
              title: '5-§. To‘g‘ri chiziqli tekis harakat haqida tushuncha',
            },
            {
              id: 'mavzu-6',
              title: '6-§. To‘g‘ri chiziqli tekis harakat tezligi',
            },
            {
              id: 'mavzu-7',
              title: '7-§. To‘g‘ri chiziqli tekis harakatning grafik tasviri',
            },
            { id: 'mavzu-8', title: '8-§. Notekis harakatda tezlik' },
            {
              id: 'mavzu-9',
              title: '9-§. Tekis o‘zgaruvchan harakatda tezlanish',
            },
            {
              id: 'mavzu-10',
              title: '10-§. Tekis o‘zgaruvchan harakat tezligi',
            },
            {
              id: 'mavzu-11',
              title: '11-§. Tekis o‘zgaruvchan harakatda bosib o‘tilgan yo‘l',
            },
            {
              id: 'mavzu-12',
              title:
                '12-§. Tekis tezlanuvchan harakatlanayotgan jism tezlanishini aniqlash (1-laboratoriya ishi)',
            },
            { id: 'mavzu-13', title: '13-§. Jismlarning erkin tushishi' },
            {
              id: 'mavzu-14',
              title: '14-§. Yuqoriga tik otilgan jismning harakati',
            },
          ],
        },
        {
          id: 'bob-3',
          title: 'III bob. Tekis aylanma harakat',
          topics: [
            { id: 'mavzu-15', title: '15-§. Jismning tekis aylanma harakati' },
            {
              id: 'mavzu-16',
              title:
                '16-§. Aylanma harakatni tavsiflaydigan kattaliklar orasidagi munosabatlar',
            },
            { id: 'mavzu-17', title: '17-§. Markazga intilma tezlanish' },
          ],
        },
      ],
    },
    {
      id: 'dinamika-asoslari',
      title: 'DINAMIKA ASOSLARI',
      chapters: [
        {
          id: 'bob-4',
          title: 'IV bob. Harakat qonunlari',
          topics: [
            { id: 'mavzu-18', title: '18-§. Jismlarning o‘zaro ta’siri. Kuch' },
            {
              id: 'mavzu-19',
              title: '19-§. Nyutonning birinchi qonuni — inersiya qonuni',
            },
            { id: 'mavzu-20', title: '20-§. Jism massasi' },
            { id: 'mavzu-21', title: '21-§. Nyutonning ikkinchi qonuni' },
            { id: 'mavzu-22', title: '22-§. Nyutonning uchinchi qonuni' },
            {
              id: 'mavzu-23',
              title: '23-§. Harakat qonunlarining aylanma harakatga tatbiqi',
            },
            { id: 'mavzu-24', title: '24-§. Elastiklik kuchi' },
            {
              id: 'mavzu-25',
              title: '25-§. Prujina bikirligini aniqlash (2-laboratoriya ishi)',
            },
          ],
        },
        {
          id: 'bob-5',
          title: 'V bob. Tashqi kuchlar ta’sirida jismlarning harakati',
          topics: [
            { id: 'mavzu-26', title: '26-§. Butun olam tortishish qonuni' },
            { id: 'mavzu-27', title: '27-§. Og‘irlik kuchi' },
            { id: 'mavzu-28', title: '28-§. Jismning og‘irligi' },
            { id: 'mavzu-29', title: '29-§. Yuklama va vaznsizlik' },
            {
              id: 'mavzu-30',
              title: '30-§. Yerning tortish kuchi ta’sirida jismlarning harakati',
            },
            { id: 'mavzu-31', title: '31-§. Yerning sun’iy yo‘ldoshlari' },
            {
              id: 'mavzu-32',
              title: '32-§. Ishqalanish kuchi. Tinchlikdagi ishqalanish',
            },
            {
              id: 'mavzu-33',
              title: '33-§. Sirpanish ishqalanish. Dumalash ishqalanish',
            },
            {
              id: 'mavzu-34',
              title:
                '34-§. Sirpanish ishqalanish koeffitsiyentini aniqlash (3-laboratoriya ishi)',
            },
            {
              id: 'mavzu-35',
              title: '35-§. Tabiatda va texnikada ishqalanish',
            },
          ],
        },
      ],
    },
    {
      id: 'saqlanish-qonunlari',
      title: 'SAQLANISH QONUNLARI',
      chapters: [
        {
          id: 'bob-6',
          title: 'VI bob. Impulsning saqlanish qonuni',
          topics: [
            { id: 'mavzu-36', title: '36-§. Impuls' },
            { id: 'mavzu-37', title: '37-§. Impulsning saqlanish qonuni' },
            { id: 'mavzu-38', title: '38-§. Reaktiv harakat' },
          ],
        },
        {
          id: 'bob-7',
          title: 'VII bob. Ish va energiya. Energiyaning saqlanish qonuni',
          topics: [
            { id: 'mavzu-39', title: '39-§. Mexanik ish' },
            {
              id: 'mavzu-40',
              title:
                '40-§. Jismni ko‘tarishda va shu masofaga gorizontal ko‘chirishda bajarilgan ishini hisoblash (4-laboratoriya ishi)',
            },
            { id: 'mavzu-41', title: '41-§. Potensial energiya' },
            { id: 'mavzu-42', title: '42-§. Kinetik energiya' },
            {
              id: 'mavzu-43',
              title: '43-§. Mexanik energiyaning saqlanish qonuni',
            },
            {
              id: 'mavzu-44',
              title:
                '44-§. Jism kinetik energiyasining uning tezligi va massasiga bog‘liqligini aniqlash (5-laboratoriya ishi)',
            },
            { id: 'mavzu-45', title: '45-§. Quvvat' },
            {
              id: 'mavzu-46',
              title:
                '46-§. Tabiatda energiyaning saqlanishi. Foydali ish koeffitsiyenti',
            },
          ],
        },
      ],
    },
  ],
  appendices: [
    {
      id: 'ilova-xatoliklar',
      title: 'Ilova. Laboratoriya ishlarida o‘lchash xatoliklarini hisoblash',
    },
    {
      id: 'mashqlar-javoblari',
      title: 'Mashqlarning javoblari',
    },
    {
      id: 'qoshimcha-mashqlar-javoblari',
      title: 'Qo‘shimcha mashqlarning javoblari',
    },
  ],
};

export function flattenGrade7Topics(): GradeTopic[] {
  return [
    GRADE_7_CURRICULUM.intro,
    ...GRADE_7_CURRICULUM.parts.flatMap((part) =>
      part.chapters.flatMap((chapter) => chapter.topics)
    ),
    ...GRADE_7_CURRICULUM.appendices,
  ];
}
