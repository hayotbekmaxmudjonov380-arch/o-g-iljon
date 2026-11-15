import type { GradeChapter, GradeTopic } from './grade7Curriculum';

export interface Grade11Curriculum {
  intro: GradeTopic;
  chapters: GradeChapter[];
  appendices: GradeTopic[];
}

export const GRADE_11_CURRICULUM: Grade11Curriculum = {
  intro: {
    id: 'g11-kirish',
    title: 'Kirish',
  },
  chapters: [
    {
      id: 'g11-bob-1',
      title: 'I bob. MAGNIT MAYDON',
      topics: [
        {
          id: 'g11-mavzu-1',
          title:
            '1-mavzu. Magnit maydon. Magnit maydonni tavsiflovchi kattaliklar',
        },
        {
          id: 'g11-mavzu-2',
          title:
            '2-mavzu. Bir jinsli magnit maydonning tokli ramkani aylantiruvchi momenti',
        },
        {
          id: 'g11-mavzu-3',
          title:
            '3-mavzu. Tokli to‘g‘ri o‘tkazgichning, halqa va g‘altakning magnit maydoni',
        },
        {
          id: 'g11-mavzu-4',
          title:
            '4-mavzu. Tokli o‘tkazgichni magnit maydonda ko‘chirishda bajarilgan ish',
        },
        {
          id: 'g11-mavzu-5',
          title: '5-mavzu. Tokli o‘tkazgichlarning o‘zaro ta’sir kuchi',
        },
        {
          id: 'g11-mavzu-6',
          title:
            '6-mavzu. Bir jinsli magnit maydonida zaryadli zarraning harakati. Lorens kuchi',
        },
      ],
    },
    {
      id: 'g11-bob-2',
      title: 'II bob. ELEKTROMAGNIT INDUKSIYA',
      topics: [
        {
          id: 'g11-mavzu-7',
          title:
            '7-mavzu. Elektromagnit induksiya hodisasi. Induksiya elektr yurituvchi kuch. Faradey qonuni',
        },
        {
          id: 'g11-mavzu-8',
          title:
            '8-mavzu. O‘zinduksiya hodisasi. O‘zinduksiya EYuK. Induktivlik',
        },
        { id: 'g11-mavzu-9', title: '9-mavzu. Moddalarning magnit xossalari' },
        { id: 'g11-mavzu-10', title: '10-mavzu. Magnit maydon energiyasi' },
      ],
    },
    {
      id: 'g11-bob-3',
      title: 'III bob. ELEKTROMAGNIT TEBRANISHLAR',
      topics: [
        {
          id: 'g11-mavzu-11',
          title:
            '11-mavzu. Erkin elektromagnit tebranishlar (tebranish konturi). Tebranish konturida energiyaning o‘zgarishi',
        },
        {
          id: 'g11-mavzu-12',
          title:
            '12-mavzu. Tebranishlarni grafik ravishda tasvirlash. So‘nuvchi elektromagnit tebranishlar',
        },
        {
          id: 'g11-mavzu-13',
          title: '13-mavzu. Tranzistorli elektromagnit tebranishlar generatori',
        },
        {
          id: 'g11-mavzu-14',
          title: '14-mavzu. O‘zgaruvchan tok zanjiridagi aktiv qarshilik',
        },
        {
          id: 'g11-mavzu-15',
          title: '15-mavzu. O‘zgaruvchan tok zanjiridagi kondensator',
        },
        {
          id: 'g11-mavzu-16',
          title: '16-mavzu. O‘zgaruvchan tok zanjiridagi induktiv g‘altak',
        },
        {
          id: 'g11-mavzu-17',
          title:
            '17-mavzu. Aktiv qarshilik, induktiv g‘altak va kondensator ketma-ket ulangan o‘zgaruvchan tok zanjiri uchun Om qonuni',
        },
        {
          id: 'g11-mavzu-18',
          title: '18-mavzu. O‘zgaruvchan tok zanjirida rezonans hodisasi',
        },
        {
          id: 'g11-mavzu-19',
          title:
            '19-mavzu. Laboratoriya ishi: O‘zgaruvchan tok zanjirida rezonans hodisasini o‘rganish',
        },
        {
          id: 'g11-mavzu-20',
          title:
            '20-mavzu. O‘zgaruvchan tokning ishi va quvvati. Quvvat koeffitsiyenti',
        },
      ],
    },
    {
      id: 'g11-bob-4',
      title: 'IV bob. ELEKTROMAGNIT TO‘LQINLAR VA TO‘LQIN OPTIKASI',
      topics: [
        {
          id: 'g11-mavzu-21',
          title:
            '21-mavzu. Elektromagnit tebranishlarning tarqalishi. Elektromagnit to‘lqin tezligi',
        },
        {
          id: 'g11-mavzu-22',
          title:
            '22-mavzu. Elektromagnit to‘lqinlarning umumiy xossalari (ikki muhit chegarasida qaytishi va sinishi). To‘lqinni xarakterlovchi asosiy tushuncha va kattaliklar',
        },
        {
          id: 'g11-mavzu-23',
          title:
            '23-mavzu. Radioaloqaning fizik asoslari. Eng sodda radioning tuzilishi va ishlashi. Radiolokatsiya',
        },
        {
          id: 'g11-mavzu-24',
          title:
            '24-mavzu. Teleko‘rsatuvlarning fizik asoslari. Toshkent — televideniye vatani',
        },
        {
          id: 'g11-mavzu-25',
          title: '25-mavzu. Yorug‘lik interferensiyasi va difraksiyasi',
        },
        {
          id: 'g11-mavzu-26',
          title:
            '26-mavzu. Laboratoriya ishi: Difraksion panjara yordamida yorug‘lik to‘lqin uzunligini aniqlash',
        },
        {
          id: 'g11-mavzu-27',
          title: '27-mavzu. Yorug‘lik dispersiyasi. Spektral analiz',
        },
        { id: 'g11-mavzu-28', title: '28-mavzu. Yorug‘likning qutblanishi' },
        {
          id: 'g11-mavzu-29',
          title:
            '29-mavzu. Infraqizil nurlanish. Ultrabinafsha nurlanish. Rentgen nurlanish va uning tatbiqi',
        },
        {
          id: 'g11-mavzu-30',
          title:
            '30-mavzu. Yorug‘lik oqimi. Yorug‘lik kuchi. Yoritilganlik qonuni',
        },
        {
          id: 'g11-mavzu-31',
          title:
            '31-mavzu. Laboratoriya ishi: Yoritilganlikning yorug‘lik kuchiga bog‘liqligi',
        },
      ],
    },
    {
      id: 'g11-bob-5',
      title: 'V bob. NISBIYLIK NAZARIYASI',
      topics: [
        {
          id: 'g11-mavzu-32',
          title:
            '32-mavzu. Maxsus nisbiylik nazariyasi asoslari. Tezliklarni qo‘shishning relyativistik qonuni',
        },
        {
          id: 'g11-mavzu-33',
          title:
            '33-mavzu. Massaning tezlikka bog‘liqligi. Relyativistik dinamika. Massa bilan energiyaning o‘zaro bog‘liqlik qonuni',
        },
      ],
    },
    {
      id: 'g11-bob-6',
      title: 'VI bob. KVANT FIZIKASI',
      topics: [
        {
          id: 'g11-mavzu-34',
          title: '34-mavzu. Kvant fizikasining paydo bo‘lishi',
        },
        {
          id: 'g11-mavzu-35',
          title: '35-mavzu. Fotoelektrik effekt. Fotonlar',
        },
        {
          id: 'g11-mavzu-36',
          title:
            '36-mavzu. Fotonning impulsi. Yorug‘lik bosimi. Fotoeffektning texnikada qo‘llanilishi',
        },
      ],
    },
    {
      id: 'g11-bob-7',
      title:
        'VII bob. ATOM VA YADRO FIZIKASI. ATOM ENERGETIKASINING FIZIK ASOSLARI',
      topics: [
        {
          id: 'g11-mavzu-37',
          title: '37-mavzu. Atomning Bor modeli. Bor postulatlari',
        },
        { id: 'g11-mavzu-38', title: '38-mavzu. Lazer va ularning turlari' },
        {
          id: 'g11-mavzu-39',
          title:
            '39-mavzu. Atom yadrosining tarkibi. Bog‘lanish energiyasi. Massa defekti',
        },
        {
          id: 'g11-mavzu-40',
          title:
            '40-mavzu. Radioaktiv nurlanishni va zarralarni qayd qilish usullari',
        },
        { id: 'g11-mavzu-41', title: '41-mavzu. Radioaktiv yemirilish qonuni' },
        {
          id: 'g11-mavzu-42',
          title: '42-mavzu. Yadro reaksiyalari. Siljish qonuni',
        },
        { id: 'g11-mavzu-43', title: '43-mavzu. Elementar zarralar' },
        {
          id: 'g11-mavzu-44',
          title:
            '44-mavzu. Atom energetikasining fizik asoslari. Yadro energiyasidan foydalanishda xavfsizlik choralari',
        },
        {
          id: 'g11-mavzu-45',
          title:
            '45-mavzu. O‘zbekistonda yadro fizikasi sohasidagi tadqiqotlar va ularning natijalaridan xalq xo‘jaligida foydalanish',
        },
      ],
    },
  ],
  appendices: [
    {
      id: 'g11-adabiyotlar',
      title: 'FOYDALANILGAN ADABIYOTLAR',
    },
  ],
};

export function flattenGrade11Topics(): GradeTopic[] {
  return [
    GRADE_11_CURRICULUM.intro,
    ...GRADE_11_CURRICULUM.chapters.flatMap((chapter) => chapter.topics),
    ...GRADE_11_CURRICULUM.appendices,
  ];
}
