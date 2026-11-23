export const LIBRARY_GRADES = [7, 8, 9, 10, 11] as const;
export type LibraryGrade = (typeof LIBRARY_GRADES)[number];

export interface LibraryChapterBookmark {
  id: string;
  title: string;
  pdfPage: number;
}

export interface LibraryTextbook {
  grade: LibraryGrade;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  year: number | null;
  edition: string;
  language: string;
  pageCount: number | null;
  fileSizeLabel: string | null;
  pdfUrl: string | null;
  downloadFileName: string | null;
  coverImageUrl: string | null;
  coverAlt: string;
  accentGradient: string;
  chapters: LibraryChapterBookmark[];
}

export const LIBRARY_BOOKS: readonly LibraryTextbook[] = [
  {
    grade: 7,
    title: 'Fizika — 7-sinf',
    subtitle: 'Umumiy o‘rta ta’lim maktablarining 7-sinfi uchun darslik',
    authors:
      'P. Q. Habibullayev, A. Boydedayev, A. D. Bahromov, S. O. Burxonov',
    publisher: '«O‘zbekiston milliy ensiklopediyasi» Davlat ilmiy nashriyoti',
    year: 2017,
    edition: '4-nashri (qayta ishlangan va to‘ldirilgan)',
    language: 'O‘zbek tilida',
    pageCount: 170,
    fileSizeLabel: '2.7 MB',
    pdfUrl: '/books/pdf/fizika_7_uzb.pdf',
    downloadFileName: 'Fizika_7_sinf_uzb.pdf',
    coverImageUrl: null,
    coverAlt: '7-sinf Fizika darsligi muqovasi',
    accentGradient:
      'linear-gradient(155deg, #0369a1 0%, #0284c7 52%, #0ea5e9 100%)',
    chapters: [
      {
        id: 'g7-bob-1',
        title: 'I bob. Mexanik harakat haqida umumiy ma’lumotlar',
        pdfPage: 1,
      },
      {
        id: 'g7-bob-2',
        title: 'II bob. To‘g‘ri chiziqli harakat',
        pdfPage: 19,
      },
      {
        id: 'g7-bob-3',
        title: 'III bob. Tekis aylanma harakat',
        pdfPage: 49,
      },
      {
        id: 'g7-bob-4',
        title: 'IV bob. Harakat qonunlari',
        pdfPage: 62,
      },
      {
        id: 'g7-bob-5',
        title: 'V bob. Tashqi kuchlar ta’sirida jismlarning harakati',
        pdfPage: 90,
      },
      {
        id: 'g7-bob-6',
        title: 'VI bob. Impulsning saqlanish qonuni',
        pdfPage: 123,
      },
      {
        id: 'g7-bob-7',
        title: 'VII bob. Ish va energiya. Energiyaning saqlanish qonuni',
        pdfPage: 140,
      },
      {
        id: 'g7-mundarija',
        title: 'Mundarija',
        pdfPage: 166,
      },
    ],
  },
  {
    grade: 8,
    title: 'Fizika — 8-sinf',
    subtitle: 'Umumiy o‘rta ta’lim maktablarining 8-sinfi uchun darslik',
    authors: 'Elektron darslik fayli hali yuklanmagan',
    publisher: '—',
    year: null,
    edition: '—',
    language: 'O‘zbek tilida',
    pageCount: null,
    fileSizeLabel: null,
    pdfUrl: null,
    downloadFileName: null,
    coverImageUrl: null,
    coverAlt: '8-sinf Fizika darsligi',
    accentGradient:
      'linear-gradient(155deg, #1e3a5f 0%, #274c77 55%, #3b6ea5 100%)',
    chapters: [],
  },
  {
    grade: 9,
    title: 'Fizika — 9-sinf',
    subtitle: 'Umumiy o‘rta ta’lim maktablarining 9-sinfi uchun darslik',
    authors: 'Elektron darslik fayli hali yuklanmagan',
    publisher: '—',
    year: null,
    edition: '—',
    language: 'O‘zbek tilida',
    pageCount: null,
    fileSizeLabel: null,
    pdfUrl: null,
    downloadFileName: null,
    coverImageUrl: null,
    coverAlt: '9-sinf Fizika darsligi',
    accentGradient:
      'linear-gradient(155deg, #164e63 0%, #0e7490 55%, #0891b2 100%)',
    chapters: [],
  },
  {
    grade: 10,
    title: 'Fizika — 10-sinf',
    subtitle:
      'O‘rta ta’lim muassasalarining 10-sinfi va o‘rta maxsus ta’lim o‘quvchilari uchun darslik',
    authors:
      'N. Sh. Turdiyev, K. A. Tursunmetov, A. G. Ganiyev, K. T. Suyarov, J. E. Usarov, A. K. Avliyoqulov',
    publisher: '«Niso Poligraf» nashriyoti (Toshkent)',
    year: 2017,
    edition: '1-nashri · ISBN 978-9943-4867-6-8',
    language: 'O‘zbek tilida',
    pageCount: 178,
    fileSizeLabel: '1.8 MB',
    pdfUrl: '/books/pdf/fizika_10_uzb.pdf',
    downloadFileName: 'Fizika_10_sinf_uzb.pdf',
    coverImageUrl: '/books/covers/fizika_10_cover.jpg',
    coverAlt: '10-sinf Fizika darsligi muqovasi',
    accentGradient:
      'linear-gradient(155deg, #075985 0%, #0369a1 52%, #0284c7 100%)',
    chapters: [
      { id: 'g10-mexanika', title: 'Kirish. Mexanika', pdfPage: 4 },
      { id: 'g10-bob-1', title: 'I bob. Kinematika', pdfPage: 6 },
      { id: 'g10-bob-2', title: 'II bob. Dinamika', pdfPage: 29 },
      {
        id: 'g10-bob-3',
        title: 'III bob. Mexanikada saqlanish qonunlari',
        pdfPage: 48,
      },
      {
        id: 'g10-bob-4',
        title: 'IV bob. Statika va gidrodinamika',
        pdfPage: 60,
      },
      {
        id: 'g10-bob-5',
        title: 'V bob. Mexanik tebranishlar va to‘lqinlar',
        pdfPage: 79,
      },
      {
        id: 'g10-bob-6',
        title: 'VI bob. Termodinamika asoslari',
        pdfPage: 99,
      },
      { id: 'g10-bob-7', title: 'VII bob. Elektrodinamika', pdfPage: 115 },
      {
        id: 'g10-bob-8',
        title: 'VIII bob. O‘zgarmas tok qonunlari',
        pdfPage: 133,
      },
      {
        id: 'g10-bob-9',
        title: 'IX bob. Turli muhitlarda elektr toki',
        pdfPage: 153,
      },
      { id: 'g10-mundarija', title: 'Mundarija', pdfPage: 174 },
    ],
  },
  {
    grade: 11,
    title: 'Fizika — 11-sinf',
    subtitle:
      'O‘rta ta’lim muassasalarining 11-sinfi va o‘rta maxsus ta’lim o‘quvchilari uchun darslik',
    authors:
      'N. Sh. Turdiyev, K. A. Tursunmetov, A. G. Ganiyev, K. T. Suyarov, J. E. Usarov, A. K. Avliyoqulov',
    publisher: '«Niso Poligraf» nashriyoti (Toshkent)',
    year: 2018,
    edition: '1-nashri · ISBN 978-9943-5083-3-0',
    language: 'O‘zbek tilida',
    pageCount: 193,
    fileSizeLabel: '4.2 MB',
    pdfUrl: '/books/pdf/fizika_11_uzb.pdf',
    downloadFileName: 'Fizika_11_sinf_uzb.pdf',
    coverImageUrl: '/books/covers/fizika_11_cover.jpg',
    coverAlt: '11-sinf Fizika darsligi muqovasi',
    accentGradient:
      'linear-gradient(155deg, #0c4a6e 0%, #075985 52%, #0284c7 100%)',
    chapters: [
      { id: 'g11-kirish', title: 'Kirish', pdfPage: 4 },
      { id: 'g11-bob-1', title: 'I bob. Magnit maydon', pdfPage: 5 },
      {
        id: 'g11-bob-2',
        title: 'II bob. Elektromagnit induksiya',
        pdfPage: 27,
      },
      {
        id: 'g11-bob-3',
        title: 'III bob. Elektromagnit tebranishlar',
        pdfPage: 42,
      },
      {
        id: 'g11-bob-4',
        title: 'IV bob. Elektromagnit to‘lqinlar va to‘lqin optikasi',
        pdfPage: 77,
      },
      { id: 'g11-bob-5', title: 'V bob. Nisbiylik nazariyasi', pdfPage: 125 },
      { id: 'g11-bob-6', title: 'VI bob. Kvant fizikasi', pdfPage: 136 },
      {
        id: 'g11-bob-7',
        title: 'VII bob. Atom va yadro fizikasi',
        pdfPage: 152,
      },
      { id: 'g11-mundarija', title: 'Mundarija', pdfPage: 190 },
    ],
  },
];

export function getLibraryBookByGrade(
  grade: LibraryGrade | null
): LibraryTextbook | undefined {
  if (grade === null) return undefined;
  return LIBRARY_BOOKS.find((book) => book.grade === grade);
}
