import type { GradePart, GradeTopic } from './grade7Curriculum';

export interface Grade9Curriculum {
  parts: GradePart[];
}

export const GRADE_9_CURRICULUM: Grade9Curriculum = {
  parts: [
    {
      id: 'g9-molekulyar-fizika-va-termodinamika',
      title: 'MOLEKULYAR FIZIKA VA TERMODINAMIKA ASOSLARI',
      chapters: [
        {
          id: 'g9-bob-1',
          title:
            'I BOB MODDA TUZILISHINING MOLEKULYAR-KINETIK NAZARIYASI ASOSLARI',
          topics: [
            {
              id: 'g9-mavzu-1',
              title: '1-§. Modda tuzilishining molekulyar-kinetik nazariyasi',
            },
            {
              id: 'g9-mavzu-2',
              title: '2-§. Molekulaning massasi va o‘lchami',
            },
            { id: 'g9-mavzu-3', title: '3-§. Modda miqdori' },
            { id: 'g9-mavzu-4', title: '4-§. Masalalar yechish' },
            { id: 'g9-mavzu-5', title: '5-§. Ideal gaz' },
            { id: 'g9-mavzu-6', title: '6-§. Temperatura' },
            {
              id: 'g9-mavzu-7',
              title: '7-§. Gaz molekulalarining harakat tezligi',
            },
            { id: 'g9-mavzu-8', title: '8-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-9',
              title: '9-§. Ideal gaz holatining tenglamalari',
            },
            { id: 'g9-mavzu-10', title: '10-§. Izotermik jarayon' },
            { id: 'g9-mavzu-11', title: '11-§. Izobarik jarayon' },
            { id: 'g9-mavzu-12', title: '12-§. Izoxorik jarayon' },
            {
              id: 'g9-mavzu-13',
              title: '13-§. Amaliy mashg‘ulot. Molekulalarning o‘lchamini baholash',
            },
            { id: 'g9-mavzu-14', title: '14-§. Masalalar yechish' },
            {
              id: 'g9-bob1-test',
              title: 'I bobni takrorlash uchun test topshiriqlari',
            },
            {
              id: 'g9-bob1-xulosa',
              title: 'I bob yuzasidan muhim xulosalar',
            },
          ],
        },
        {
          id: 'g9-bob-2',
          title: 'II BOB ICHKI ENERGIYA VA TERMODINAMIKA ELEMENTLARI',
          topics: [
            { id: 'g9-mavzu-15', title: '15-§. Ichki energiya' },
            { id: 'g9-mavzu-16', title: '16-§. Termodinamik ish' },
            { id: 'g9-mavzu-17', title: '17-§. Issiqlik miqdori' },
            { id: 'g9-mavzu-18', title: '18-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-19',
              title:
                '19-§. Amaliy mashg‘ulot. Jismlarda issiqlik muvozanatini o‘rganish',
            },
            {
              id: 'g9-mavzu-20',
              title:
                '20-§. Laboratoriya ishi. Qattiq jismlarning solishtirma issiqlik sig‘imini aniqlash',
            },
            {
              id: 'g9-mavzu-21',
              title: '21-§. Yoqilg‘ining solishtirma yonish issiqligi',
            },
            {
              id: 'g9-mavzu-22',
              title: '22-§. Termodinamikaning birinchi qonuni',
            },
            { id: 'g9-mavzu-23', title: '23-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-24',
              title:
                '24-§. Issiqlik jarayonlarining qaytmasligi. Termodinamikaning ikkinchi qonuni',
            },
            {
              id: 'g9-mavzu-25',
              title:
                '25-§. Laboratoriya ishi. Turli temperaturali suv aralashtirilganda issiqlik miqdorlarini taqqoslash',
            },
            {
              id: 'g9-bob2-test',
              title: 'II bobni takrorlash uchun test topshiriqlari',
            },
            {
              id: 'g9-bob2-xulosa',
              title: 'II bob yuzasidan muhim xulosalar',
            },
          ],
        },
        {
          id: 'g9-bob-3',
          title: 'III BOB ISSIQLIK DVIGATELLARI',
          topics: [
            { id: 'g9-mavzu-26', title: '26-§. Ichki yonuv dvigatellari' },
            {
              id: 'g9-mavzu-27',
              title: '27-§. Issiqlik dvigatellarining ishlash prinsipi',
            },
            { id: 'g9-mavzu-28', title: '28-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-29',
              title: '29-§. Issiqlik mashinalari va tabiatni muhofaza qilish',
            },
            { id: 'g9-mavzu-30', title: '30-§. Masalalar yechish' },
            {
              id: 'g9-bob3-test',
              title: 'III bobni takrorlash uchun test topshiriqlari',
            },
            {
              id: 'g9-bob3-xulosa',
              title: 'III bob yuzasidan muhim xulosalar',
            },
          ],
        },
        {
          id: 'g9-bob-4',
          title: 'IV BOB SUYUQLIK VA QATTIQ JISMLARNING XOSSALARI',
          topics: [
            { id: 'g9-mavzu-31', title: '31-§. Suyuqlikning xossalari' },
            { id: 'g9-mavzu-32', title: '32-§. Ho‘llash. Kapillyar hodisalar' },
            { id: 'g9-mavzu-33', title: '33-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-34',
              title:
                '34-§. Laboratoriya ishi. Suyuqlikning sirt taranglik koeffitsiyentini aniqlash',
            },
            { id: 'g9-mavzu-35', title: '35-§. Kristall va amorf jismlar' },
            {
              id: 'g9-mavzu-36',
              title: '36-§. Qattiq jismlarning mexanik xossalari',
            },
            { id: 'g9-mavzu-37', title: '37-§. Masalalar yechish' },
            {
              id: 'g9-mavzu-38',
              title: '38-§. Qattiq jismlarning erishi va qotishi',
            },
            {
              id: 'g9-mavzu-39',
              title:
                '39-§. Moddaning solishtirma erish issiqligi. Amorf jismlarning erishi va qotishi',
            },
            { id: 'g9-mavzu-40', title: '40-§. Bug‘lanish va kondensatsiya' },
            { id: 'g9-mavzu-41', title: '41-§. Atmosferadagi hodisalar' },
            {
              id: 'g9-mavzu-42',
              title:
                '42-§. Laboratoriya ishi. Havoning nisbiy namligini aniqlash',
            },
            { id: 'g9-mavzu-43', title: '43-§. Masalalar yechish' },
            {
              id: 'g9-bob4-test',
              title: 'IV bobni takrorlash uchun test topshiriqlari',
            },
            {
              id: 'g9-bob4-xulosa',
              title: 'IV bob yuzasidan muhim xulosalar',
            },
          ],
        },
      ],
    },
  ],
};

export function flattenGrade9Topics(): GradeTopic[] {
  return GRADE_9_CURRICULUM.parts.flatMap((part) =>
    part.chapters.flatMap((chapter) => chapter.topics)
  );
}
