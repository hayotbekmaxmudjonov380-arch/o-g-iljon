export type TheoryBlock =
  | {
      type: 'sectionTitle';
      text: string;
    }
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'definition';
      text: string;
    }
  | {
      type: 'figure';
      src: string;
      caption: string;
      placement?: 'side' | 'center';
      span?: number;
      size?: 'compact' | 'normal' | 'wide';
    }
  | {
      type: 'numberedList';
      intro?: string;
      items: string[];
    }
  | {
      type: 'keyTerms';
      terms: string[];
    }
  | {
      type: 'questions';
      items: string[];
    }
  | {
      type: 'example';
      title?: string;
      given: string[];
      find: string[];
      formula: string[];
      solution: string[];
      answer: string;
    };

export const GRADE_7_THEORY_CONTENT: Record<string, TheoryBlock[]> = {
  'mavzu-1': [
    {
      type: 'sectionTitle',
      text: 'Mexanik harakat',
    },
    {
      type: 'paragraph',
      text: 'Tevarak-atrofimizda velosiped, avtomobil va odamlar yurishini; osmonda qush, vertolyot, samolyot va raketalar uchishini (2-rasm); suvda baliq, akula va delfinlar suzishini; Yer Quyosh atrofida, Oy esa Yer atrofida aylanishini kuzatishimiz mumkin. Jismning harakati ma’lum qonun-qoidalarga bo‘ysunadi. Masalan, olimlar kuzatish natijalari asosida osmon jismlarining qaysi vaqtda fazoning qaysi joyida bo‘lishini aniqlay oladilar. Jumladan, ular Oy va Quyoshning qachon tutilishini oldindan aytib berishlari mumkin.',
    },
    {
      type: 'paragraph',
      text: 'Har qanday jismning mexanik harakati boshqa jismga nisbatan kuzatiladi. Masalan, avtomobil ko‘cha bo‘yidagi daraxt yoki binolarga nisbatan, daryo suvi qirg‘oqlarga nisbatan, samolyot Yerdagi bino, osmondagi bulutlarga nisbatan harakat qiladi. Jism harakati kuzatuvchining vaziyatiga qarab turlicha bo‘ladi.',
    },
    {
      type: 'definition',
      text: 'Jismning mexanik harakati deb, uning boshqa jismlarga nisbatan fazodagi vaziyatining vaqt o‘tishi bilan o‘zgarishiga aytiladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-2.png',
      caption: '2-rasm. Jismlarning mexanik harakati',
      span: 3,
      size: 'compact',
    },
    {
      type: 'sectionTitle',
      text: 'Harakatning nisbiyligi',
    },
    {
      type: 'paragraph',
      text: 'Odatda, jismning vaziyati yerga nisbatan o‘zgarmasa, u tinch turibdi, deymiz. Aslida, jismning tinch yoki harakat holati nisbiydir. Qayiqda o‘tirgan odam qayiqqa nisbatan tinch holatda bo‘lsa, daryo qirg‘og‘iga nisbatan harakatda bo‘ladi. Yerdagi barcha narsalar go‘yoki tinch turganga o‘xshaydi. Lekin ular Yer bilan birga Quyosh atrofida aylanadi, ya’ni harakatda bo‘ladi. Ma’lum tezlikda ketayotgan poyezd ichida yurib ketayotgan odam vagonga nisbatan kichik tezlikda harakatlansa, tashqaridagi temiryo‘l relsiga nisbatan katta tezlikda harakatlanayotgan bo‘ladi. Bu odam tezligi turli jismlarga nisbatan turlicha bo‘ladi. Boshqa jismlar bo‘lmasa, yakka bir jism tezligi haqida biron bir fikr yuritish mumkin emas.',
    },
    {
      type: 'definition',
      text: 'Barcha jismlarning harakati nisbiy bo‘lib, ularning tinch turishi ham nisbiydir.',
    },
    {
      type: 'sectionTitle',
      text: 'Sanoq jism',
    },
    {
      type: 'paragraph',
      text: 'Harakatning nisbiyligini hisobga olish uchun «sanoq jism» tushunchasi kiritiladi. Masalan, odam va avtomobillarning harakati yoki tinch holati Yerga nisbatan olinadi. Bu holda Yer – sanoq jism hisoblanadi. Atrofimizdagi barcha jismlarning tinchlik holati yoki mexanik harakati ana shunday sanoq jismlarga nisbatan qaraladi. Agar Yerning Quyosh atrofidagi harakati qaralayotgan bo‘lsa, Quyosh sanoq jism bo‘ladi.',
    },
    {
      type: 'definition',
      text: 'Jismning harakati yoki tinch holati qaysi jismga nisbatan kuzatilayotgan bo‘lsa, o‘sha jism sanoq jism deb ataladi.',
    },
    {
      type: 'paragraph',
      text: '3-rasmda yerga nisbatan 10 m/s tezlik bilan ketayotgan platforma ustida shu yo‘nalishda 1 m/s tezlik bilan ketayotgan odam tasvirlangan. Bu odamning harakati uchun platforma sanoq jism deb olinsa, uning tezligi 1 m/s bo‘ladi. Agar sanoq jism sifatida Yer tanlab olinsa, odamning tezligi 11 m/s bo‘ladi (10 m/s + 1 m/s = 11 m/s). Yo‘lda ketayotgan avtomobil, poyezd va boshqalarning harakatida sanoq jism sifatida Yer shari o‘rniga uning sirtida qo‘zg‘almas holatda joylashgan bino, daraxt kabilarni olish mumkin. Masalan, avtomobilning harakati yo‘l yoqasidagi daraxtga nisbatan kuzatilayotgan bo‘lsa, ayni paytda shu daraxt sanoq jism deb olinadi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-3.png',
      caption: '3-rasm. Platforma ustidagi odam harakati nisbiydir',
      size: 'wide',
    },
    {
      type: 'sectionTitle',
      text: 'Sanoq sistemasi',
    },
    {
      type: 'paragraph',
      text: 'Jismning mexanik harakati haqida to‘liq ma’lumot berish kerak bo‘lsin. Masalan, avtomobil shaharning A punktidan B punktiga borishini tahlil qilaylik. Uning tekislikdagi harakatini ifodalash uchun quyidagi usuldan foydalanishimiz mumkin. Shahar xaritasini olib, unda harakat boshlangan A punkt, ya’ni sanoq jismni topamiz (4-rasm). Shu nuqtadan o‘tuvchi G‘arbdan Sharqqa va Janubdan Shimolga yo‘nalgan ikkita masshtabi ko‘rsatilgan o‘q o‘tkazamiz. Bu bilan ikki o‘lchamli koordinatalar sistemasini hosil qilamiz. Avtomobil yurgan ko‘chalar bo‘yicha chiziq o‘tkazsak, avtomobilning koordinatalar boshiga nisbatan harakat yo‘li chizmasini ifodalagan bo‘lamiz. Endi harakat davomida avtomobilning koordinatalar boshiga nisbatan qayerda va qachon bo‘lgani aniq ko‘rsatilsa, harakat haqida batafsil ma’lumot berilgan bo‘ladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-4.png',
      caption: '4-rasm. Avtomobil harakatini ikki o‘lchamli koordinatada ifodalash',
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Agar parvozdagi raketaning koordinatalarini ifodalamoqchi bo‘lsak, uning balandlik bo‘yicha harakati haqidagi ma’lumotlarni ham ko‘rsatishimiz kerak bo‘ladi. Buning uchun tekislikdagi koordinatalar sistemasida yuqoriga yo‘nalgan va koordinata boshidan o‘tuvchi perpendikulyar o‘q o‘tkazamiz. Natijada uch o‘lchamli koordinatalar sistemasi hosil bo‘ladi.',
    },
    {
      type: 'numberedList',
      intro: 'Raketaning harakatini to‘liq ifodalash uchun uchta parametr ko‘rsatiladi:',
      items: [
        'sanoq jism (bu misolda Yer shari olinadi);',
        'koordinatalar sistemasi (koordinata markazi Yer sharida raketa uchgan joydagi nuqtaga joylashtiriladi);',
        'vaqt sanog‘i (raketa uchish trayektoriyasining ma’lum bir nuqtasida qaysi vaqtda bo‘lgani).',
      ],
    },
    {
      type: 'definition',
      text: 'Sanoq jism, unga bog‘liq koordinatalar sistemasi va shu harakatning vaqt sanog‘i birgalikda sanoq sistemasini tashkil etadi.',
    },
    {
      type: 'paragraph',
      text: 'Masalan, «Lasetti» avtomobili uydan chiqib, 10 minutda shimol yo‘nalishida 8 km masofani bosib o‘tgan bo‘lsin. Bunda «Lasetti»ning uyda bo‘lgan tinch holati ham, yo‘ldagi harakati ham Yerga nisbatan qaraladi. «Lasetti» uchun Yer qo‘zg‘almas bo‘lib, sanoq jism hisoblanadi. Haydovchi soati va avtomobilning spidometri yordamida 10 minut davomida avtomobil qancha masofani bosib o‘tganini aniqlashi mumkin. Bunda uy – koordinata boshi, undan 8 km uzoqlashish masofasi esa koordinata boshiga nisbatan bosib o‘tilgan yo‘l hisoblanadi. Bunda «Lasetti»ning harakatida Yer – sanoq jism, uy – koordinata boshi, haydovchidagi soat – jismning harakat vaqtini o‘lchaydigan asbobdir. Ular birgalikda sanoq sistemasini tashkil etib, bu harakat haqidagi ma’lumotlarni to‘liq ifodalashga yordam beradi.',
    },
    {
      type: 'keyTerms',
      terms: [
        'mexanik harakat',
        'harakatning nisbiyligi',
        'sanoq jism',
        'koordinatalar sistemasi',
        'sanoq sistemasi',
      ],
    },
    {
      type: 'questions',
      items: [
        'Yunon olimi Ptolemey Quyosh Yer atrofida aylanadi, deb hisoblagan. Polshalik olim Kopernik esa Yer Quyosh atrofida aylanadi, degan fikrni ilgari surgan. Sizningcha, qaysi olimning fikri to‘g‘ri? O‘z fikringizni asoslab bering.',
        'Bir xil mustahkamlikka ega bo‘lgan, pishirilgan ikkita bir xil tuxum olamiz. Ularning bir xil tomonlarini bir-biriga to‘g‘rilab, birinchisini tinch holatda tutib turamiz va ikkinchisi bilan birinchisiga zarb beramiz. Sizningcha, bunda tinch turgan tuxum sinadimi yoki zarb bergan tuxummi?',
      ],
    },
  ],
};
