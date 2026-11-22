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
      title?: string;
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
  'mavzu-2': [
    {
      type: 'sectionTitle',
      text: 'Fazoning cheksizligi',
    },
    {
      type: 'paragraph',
      text: 'Olamda mavjud bo‘lgan barcha narsalar fazoda joylashgan. Fazoni egallamagan va fazodan tashqarida bo‘lgan birorta ham obyekt mavjud emas va bo‘lishi ham mumkin emas. Boshqacha aytganda, fazo materiya bilan uzluksiz bog‘langan. Fazo cheksiz va chegarasizdir. Fazo haqidagi tasavvurlarimizni faqat matematik ko‘rinishda – sonlar bilan ifodalashimiz mumkin. Demak, osmon jismlari orqasida yanada uzoq joylashgan boshqa jismlar mavjud. Biz osmondagi yulduzlardan faqat 3 mingtasini ko‘ra olamiz, xolos. Yorug‘lik nuri 1 sekundda 300 000 km masofani bosib o‘tadi. Shunday tezlikda eng yaqin yulduz (sentavr)ning nuri bizga 4 yilda yetib keladi. Bu masofaning qanchalik kattaligini faqat hisob-kitoblar ko‘rsatadi. Shu yulduzgacha bo‘lgan masofani hisoblab ko‘raylik:',
    },
    {
      type: 'example',
      title: 'Masofani hisoblash namunasi',
      given: ['t = 4 yil ≈ 126 230 400 s;', 'υ = 300 000 km/s.'],
      find: ['s = ?'],
      formula: ['s = υt.'],
      solution: [
        's = 300 000 km/s · 126 230 400 s =',
        '= 37 869 120 000 000 km.',
      ],
      answer: 's = 37 869 120 000 000 km.',
    },
    {
      type: 'paragraph',
      text: 'Faraz qilib ko‘raylik. Soatiga 1000 km tezlikda uchadigan samolyotda Yerdan o‘sha yulduzga borishimiz kerak bo‘lsin. Hisoblashlar shuni ko‘rsatadiki, buning uchun 4300 yildan ko‘proq vaqt davomida kecha-yu kunduz to‘xtamasdan uchishimiz kerak bo‘ladi.',
    },
    {
      type: 'paragraph',
      text: 'Bizga ko‘ringan yulduzlar ortida yana son-sanoqsiz yulduzlar bor. Fazoda bir-biriga bog‘liq ravishda harakat qiladigan yulduzlar sistemasi galaktikani tashkil etadi. Biz eng kuchli asboblardan foydalanishimizga qaramasdan, fazoning kichik bir qisminigina kuzata olishimiz sababli, galaktikalarning aniq sonini aniqlash qiyin. Olimlar hisobiga ko‘ra, Quyosh sistemasi o‘rin olgan bizning galaktikamizda 200 dan 400 milliardgacha yulduz borligi faraz qilinmoqda. Yorug‘lik tezligida harakat qilinsa, galaktikamizning bir chetidan ikkinchi chetiga borish uchun 100 ming yil kerak bo‘lar ekan. Bepoyon fazoda esa 100 dan 200 milliardgacha galaktikalar mavjud bo‘lib, har bir galaktikada yuz milliardlab yulduzlar bor deb hisoblanmoqda. Eng uzoqda topilgan galaktikaning yuborgan nuri bizga deyarli 10 milliard yildan keyin yetib keladi. Fazoning qanchalik kengligini tasavvur qilib ko‘ring. Demak, fazo cheksiz.',
    },
    {
      type: 'sectionTitle',
      text: 'Fazoni uch o‘lchamli koordinatalarda tasvirlash',
    },
    {
      type: 'paragraph',
      text: 'Tekis to‘g‘ri yo‘lda ketayotgan avtomobil harakatini chizmada ifodalash uchun masshtabi ko‘rsatilgan bitta to‘g‘ri chiziq yetarli (5-rasm). Temiryo‘lning to‘g‘ri chiziqli qismidagi poyezdning harakatini ifodalashga ham bir o‘lchamli koordinata o‘qi kerak. Bunda harakatlanayotgan jism o‘ng yoki chapga, shuningdek, yuqori yoki pastga harakatlanmaganligi sababli qo‘shimcha koordinata o‘qlariga hojat yo‘q, uning harakatini bir o‘lchamli koordinatalarda tasvirlashning o‘zi yetarli.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-5.png',
      caption: '5-rasm. To‘g‘ri chiziqli harakatni bir o‘lchamli koordinatada tasvirlash',
      size: 'wide',
    },
    {
      type: 'paragraph',
      text: 'To‘g‘ri yo‘lda ketayotgan avtomobil chorrahaga kelganida chapga yoki o‘ngga burilishi, ya’ni to‘g‘ri chiziqli harakatidan chetlashi mumkin. Yer sirtini katta bo‘lmagan masofalarda tekislik deb olsak, shu tekislikda odam, velosiped, avtomobillarning harakatini tasvirlash uchun ikki o‘lchamli koordinatalar kerak bo‘ladi. Demak, tekislikda vaziyati o‘zgarayotgan jismning harakatini, masalan, avtomobilning harakatini koordinatalar tekisligida tasvirlash qulay (6-rasm).',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-6.png',
      caption: '6-rasm. Tekislikdagi harakatni ikki o‘lchamli koordinatada tasvirlash',
      size: 'wide',
    },
    {
      type: 'paragraph',
      text: 'Qush yerda, ya’ni tekislikda yurishi, yoki osmonda, ya’ni fazoda uchishi mumkin. Uning yerdagi harakatini ikki o‘lchamli, osmondagi parvozini esa uch o‘lchamli koordinatada ifodalash qulay. Samolyot parvozi harakat yo‘nalishiga nisbatan tanlab olingan uch o‘lchamli koordinatalar sistemasida tasvirlanadi (7-rasm). Havo sharining osmondagi, dengiz hayvonlarining esa suv ostidagi harakatini ifodalash uchun ham uch o‘lchamli koordinatalar sistemasi kerak.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-7.png',
      caption: '7-rasm. Samolyot harakatini uch o‘lchamli koordinatada tasvirlash',
      size: 'normal',
    },
    {
      type: 'definition',
      text: 'Fazoning asosiy xossalari: haqiqatan ham, mavjudligi, materiya bilan ajralmasligi (olamda fazo bilan bog‘lanmagan bitta ham obyekt yo‘q), cheksizligi, uch o‘lchamliligi (barcha fizik obyektlarning bo‘yi, eni va balandligi mavjud).',
    },
    {
      type: 'sectionTitle',
      text: 'Vaqtni bir o‘lchamli koordinatalarda tasvirlash',
    },
    {
      type: 'paragraph',
      text: 'Har qanday jarayon, voqea, hodisa ma’lum bir makon (fazo) va zamon (vaqt)da sodir bo‘ladi. Jism harakatlanadi, ya’ni o‘z vaziyatini nafaqat fazoda, balki vaqt bo‘yicha ham o‘zgartiradi. Vaqtni o‘lchash uchun takrorlanib turuvchi hodisaning takrorlanish davomiyligidan foydalaniladi. Masalan, Yerning o‘z o‘qi atrofida Quyoshga nisbatan bir marta aylanish vaqtini 24 soat deb yoki Yerning Quyosh atrofida bir marta aylanish vaqtini bir yil deb olishga kelishib olingan. Bir yil 31 556 926 sekundga teng. Shuning uchun 1 s o‘tish davri Yerning Quyosh atrofida bir marta aylanish davrining 31 556 926 dan bir qismiga teng. Hozirda vaqtni katta aniqlikda o‘lchaydigan kvars va molekulyar soatlar ishlatiladi. Ular vaqtni sekundning trilliondan bir qismicha aniqlikda o‘lchashi mumkin. Vaqt o‘zi bir o‘lchamli koordinatalarda ifodalanib, u o‘tmishdan kelajakka tomon o‘sib boruvchi kattalik sifatida qaraladi (8-rasm).',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-8.png',
      caption: '8-rasm. Vaqtni bir o‘lchamli koordinatada ifodalash',
      size: 'wide',
    },
    {
      type: 'paragraph',
      text: 'Jismlar harakatini fazo va vaqtdan ajratgan holda tasavvur qilib bo‘lmaydi. Shuning uchun ham jismlarning mavjudligi va ularning harakatlari fazoda va ma’lum vaqt davomida sodir bo‘ladi, deb qaraladi.',
    },
    {
      type: 'definition',
      text: 'Vaqt hodisalarning ketma-ket o‘zgarish tartibini va jarayonlarning davomiyligini ifodalaydigan fizik kattalikdir. Vaqt xalqaro birliklar sistemasi (XBS)da sekundlarda o‘lchanadi.',
    },
    {
      type: 'paragraph',
      text: 'Bizni, asosan, jism fazodagi vaziyatining vaqtga bog‘liqligi qiziqtiradi.',
    },
    {
      type: 'keyTerms',
      terms: [
        'fazo',
        'galaktika',
        'vaqt',
        'bir o‘lchamli koordinatada, ikki o‘lchamli koordinatada va uch o‘lchamli koordinatada ifodalanadigan harakat',
        'uch o‘lchamli koordinatadagi fazo',
      ],
    },
    {
      type: 'questions',
      items: [
        'Faraz qilgan holda 99-betdagi ma’lumotlardan foydalanib, samolyotda Yerdan Oyga va Quyoshga borish uchun qancha vaqt uchish kerakligini hisoblang.',
      ],
    },
  ],
  'mavzu-3': [
    {
      type: 'definition',
      text: 'Mexanikaning jism harakatini uning massasi va uni harakatga keltiruvchi sabablar hisobga olinmagan holda o‘rganadigan bo‘limiga kinematika deb ataladi.',
    },
    {
      type: 'paragraph',
      text: 'Kinematikaning asosiy vazifasi jismlarning istalgan vaqtdagi koordinatalarini aniqlashdan iborat. Jism koordinatalarining vaqtga bog‘liqligi haqidagi ma’lumotlar turli ko‘rinishda: masalan, grafik, jadval yoki formula ko‘rinishida berilishi, shuningdek, so‘zlar bilan ifodalanishi mumkin. Bu ma’lumotlarni bilgan holda shu jismning istalgan vaqtdagi fazodagi o‘rni aniq aytib beriladi. Buning uchun bir qator yangi tushunchalar bilan tanishib olishimiz kerak.',
    },
    {
      type: 'sectionTitle',
      text: 'Moddiy nuqta',
    },
    {
      type: 'paragraph',
      text: 'Uzoqda ketayotgan avtomobil shakli aniq ko‘rinmaydi, u juda kichkina, hatto nuqta bo‘lib ko‘rinishi mumkin. Asli kichkina chumoliga mikroskop orqali qaraganimizda esa u bahaybat yirtqich bo‘lib ko‘rinadi. Jismlarning harakatini o‘rganishda bir qator soddalashtirishlardan foydalanamiz. Bunday usullardan biri harakatlanayotgan jismning o‘lchamlarini hisobga olmasdan, uni ko‘rilayotgan jarayon yoki chizmalarda moddiy nuqta deb olishdan iborat.',
    },
    {
      type: 'definition',
      text: 'Muayyan sharoitda o‘lchami va shakli hisobga olinmasa ham bo‘ladigan jism moddiy nuqta deb ataladi.',
    },
    {
      type: 'paragraph',
      text: 'Uzunligi 4 m bo‘lgan avtomobilning 10 km masofani bosib o‘tishdagi harakatini o‘rganishda uni moddiy nuqta deb qarash mumkin. Chunki avtomobil bosib o‘tadigan masofa uning uzunligidan 2500 marta katta. Shu singari, samolyotning uzoq masofaga parvozi qaralayotganda, uni moddiy nuqta deb hisoblash mumkin. Aynan bir jism bir holda moddiy nuqta deb qaraladi, boshqa holda esa uni moddiy nuqta deb qarab bo‘lmaydi. Masalan, o‘quvchi maktabga borayotganida uyidan 1 km masofani bosib o‘tsa, bu harakatda uni moddiy nuqta deb qarash mumkin. Lekin shu o‘quvchi uy ichida ertalabki gimnastika mashqlarini bajarayotganida, uni moddiy nuqta deb bo‘lmaydi. Kitobni sumkadan olib stolga qo‘yish jarayonini rasmda ifodalashda kitobni qaysi tomoni bilan qo‘yganligimizni ko‘rsata olamiz. Lekin maktabga olib ketilayotgan kitob chizmada juda kichkina nuqta sifatida tasvirlanadi. Bu holda uni moddiy nuqta deb olish mumkin.',
    },
    {
      type: 'paragraph',
      text: 'Moddiy nuqta tushunchasidan harakatlanayotgan jism o‘lchami bosib o‘tilgan masofaga nisbatan juda kichik bo‘lgan holdagina emas, balki tahlil qilinayotgan jism o‘lchami unga nisbatan qaralayotgan boshqa bir jismgacha bo‘lgan masofaga nisbatan juda kichik bo‘lganida ham foydalaniladi. Yer sharining o‘lchamlari juda katta. Lekin Yer sayyorasining Quyosh atrofida aylanishi o‘rganilayotganda, ular orasidagi masofa yanada kattaligi sababli, Yerni moddiy nuqta deb qarash mumkin.',
    },
    {
      type: 'sectionTitle',
      text: 'Trayektoriya',
    },
    {
      type: 'paragraph',
      text: 'Doskaga bo‘r bilan chizganda, qorli yo‘lda avtomobil yurganda, osmondagi tosh bo‘lagi – meteor atmosferadan o‘tganda, ular iz qoldiradi (9-rasm). Bo‘r, avtomobil va meteorning qoldirgan izi ularning harakat trayektoriyasidir.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-9.png',
      caption: '9-rasm. Meteor jismning harakat trayektoriyasi',
      size: 'wide',
    },
    {
      type: 'paragraph',
      text: 'Jismlar o‘z harakatida har doim ham iz qoldiravermaydi. Masalan, osmonda uchayotgan meteor iz qoldirsa, tramplindan sakrayotgan sportchi esa iz qoldirmaydi. Sportchi, to‘p, odam, mashina, qush va samolyotlarning o‘z harakati davomida izi ko‘rinmasa-da, ularning izini uzluksiz chiziq deb tasavvur qilish mumkin.',
    },
    {
      type: 'definition',
      text: 'Moddiy nuqtaning o‘z harakati davomida bosib o‘tgan nuqtalarini birlashtiruvchi chiziq harakat trayektoriyasi deb ataladi.',
    },
    {
      type: 'sectionTitle',
      text: 'Yo‘l va ko‘chish',
    },
    {
      type: 'paragraph',
      text: 'Jism trayektoriyasini miqdor jihatdan baholash uchun fizik kattalik – yo‘l qabul qilingan.',
    },
    {
      type: 'definition',
      text: 'Jismning harakat trayektoriyasi bo‘ylab bosib o‘tgan masofasi, trayektoriya uzunligi yo‘l deb ataladi va s harfi bilan belgilanadi.',
    },
    {
      type: 'paragraph',
      text: 'Yo‘lning, umuman, uzunlikning o‘lchov birligi qilib metr qabul qilingan. Uning namunasi – etaloni etib Parijdagi Xalqaro O‘lchovlar Byurosida saqlanadigan platina-iridiydan tayyorlangan maxsus sterjen uzunligi olingan.',
    },
    {
      type: 'paragraph',
      text: 'Ba’zi hollarda jismning bosib o‘tgan yo‘li emas, balki u harakatni qaysi nuqtadan boshlab, qaysi nuqtada to‘xtatgani ahamiyatliroqdir.',
    },
    {
      type: 'definition',
      text: 'Jism harakatidagi boshlang‘ich va oxirgi vaziyatini tutashtiruvchi yo‘nalishli kesma ko‘chish deb ataladi.',
    },
    {
      type: 'paragraph',
      text: 'Siz ko‘l qirg‘og‘idagi so‘qmoqdan yurib, A nuqtadan B nuqtaga egri chiziqli trayektoriya bo‘ylab 100 m yo‘lni bosib o‘tishingiz mumkin (10-rasm). Bunda ko‘chish A nuqtadan B nuqtagacha bo‘lgan masofaga, ya’ni 40 m ga teng bo‘ladi. Do‘stingiz esa qayiqda A nuqtadan B nuqtaga to‘g‘ri chiziq bo‘yicha suzib o‘tsa, trayektoriya va ko‘chish ustma-ust tushib, uning uzunligi 40 m bo‘ladi.',
    },
    {
      type: 'paragraph',
      text: 'Toshkentdan Andijongacha ko‘chish 245 km bo‘lgani holda, avtomobil Toshkentdan Andijonga borish uchun 380 km yo‘lni bosib o‘tadi. To‘g‘ri chiziqli harakatda esa yo‘l va ko‘chish bir-biriga teng bo‘ladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-10.png',
      caption: '10-rasm. Yo‘l va ko‘chish',
      span: 2,
      size: 'normal',
    },
    {
      type: 'sectionTitle',
      text: 'Mexanik harakat',
    },
    {
      type: 'paragraph',
      text: 'Soddalashtirish maqsadida jismlar harakati uch turga bo‘lib o‘rganiladi: ilgarilanma, aylanma va tebranma. Avtomashinaning korpusi ilgarilanma harakat qilsa, g‘ildiraklari aylanma harakatlanadi (11-rasm). Motoridagi porshenlari esa tebranma harakat qiladi, deyish mumkin.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-11.png',
      caption: '11-rasm. «Matiz»dagi ilgarilanma va aylanma harakat yo‘nalishi',
      size: 'wide',
    },
    {
      type: 'sectionTitle',
      text: 'Ilgarilanma harakat',
    },
    {
      type: 'paragraph',
      text: 'Agar jism ilgarilanma harakat qilsa, uning harakatini ifodalash uchun jismning bitta nuqtasi harakatini ifodalash yetarli. Masalan, stol ustidagi kitobni bir joydan boshqa joyga turlicha ko‘chirish mumkin (12-rasm). (a) holda uning qirralari turlicha harakat qiladi. (b) holda kitob qirralarining harakat trayektoriyasi bir xil bo‘ladi, ya’ni kitobning to‘rttala qirrasi trayektoriyalarini ustma-ust qo‘yish mumkin. Kitobning ikkinchi holdagi harakati ilgarilanma harakatga misol bo‘la oladi. Bunda kitobning qirralarigina emas, boshqa ixtiyoriy nuqtalari ham bir xil harakat qiladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-12.png',
      caption: '12-rasm. Kitobning ilgarilanma bo‘lmagan (a) va ilgarilanma (b) harakati',
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Velosiped yoki motorli qayiqdagi odam ilgarilanma harakat qiladi. Lekin velosiped g‘ildiragi va motor parraklarining harakati bunga misol bo‘la olmaydi.',
    },
    {
      type: 'definition',
      text: 'Harakat davomida jismning hamma nuqtalari bir xil ko‘chsa, bunday harakatga ilgarilanma harakat deyiladi.',
    },
    {
      type: 'paragraph',
      text: 'Ilgarilanma harakat qilayotgan jismning ixtiyoriy ikki nuqtasidan o‘tkazilgan har qanday chiziq o‘ziga o‘zi parallel ravishda ko‘chadi.',
    },
    {
      type: 'paragraph',
      text: 'Tepaga ko‘tarilayotgan lift, uchib ketayotgan samolyot va raketa ilgarilanma harakat qiladi. Istirohat bog‘idagi charxpalak savati aylanma harakat qiladi (13-rasm). Lekin shu bilan bir vaqtda u ilgarilanma harakat ham qiladi. Chunki savatning ixtiyoriy ikki nuqtasidan o‘tkazilgan to‘g‘ri chiziq o‘z-o‘ziga parallel ravishda ko‘chadi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-13.png',
      caption: '13-rasm. Charxpalak savatlarining ilgarilanma harakati',
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Ilgarilanma harakat qilayotgan jismning harakati o‘rganilayotganda, uning faqat bitta nuqtasi harakatini o‘rganish kifoyadir. Shu sababli ilgarilanma harakat qilayotgan jismni moddiy nuqta deb qarash mumkin. Ilgarilanma harakat to‘g‘ri chiziqli va egri chiziqli bo‘lishi mumkin.',
    },
    {
      type: 'paragraph',
      text: 'Jismlar harakatini uch turga: ilgarilanma, aylanma va tebranma harakatlarga bo‘lish shartli bo‘lib, bu murakkab harakatlarni tahlil qilishni osonlashtiradi va matematik ko‘rinishda ifodalash imkonini beradi.',
    },
    {
      type: 'keyTerms',
      terms: [
        'moddiy nuqta',
        'trayektoriya',
        'yo‘l',
        'ko‘chish',
        'ilgarilanma harakat',
      ],
    },
    {
      type: 'questions',
      items: [
        'Bitta jismni kuzatilayotgan turli jarayonlarning birida moddiy nuqta deb olish mumkin bo‘lgan, ikkinchisida esa mumkin bo‘lmagan hollarga bir nechta misol yozing.',
        'Uyingizdan maktabgacha borish trayektoriyasi va ko‘chishni chizmada chizib, ular orasidagi masofalar farqini chamalab ko‘ring.',
      ],
    },
  ],
  'mavzu-4': [
    {
      type: 'sectionTitle',
      text: 'Skalyar kattaliklar',
    },
    {
      type: 'paragraph',
      text: 'Fizik kattaliklarni ikkita guruh – skalyar va vektor kattaliklarga bo‘lish mumkin.',
    },
    {
      type: 'definition',
      text: 'Yo‘nalishining ahamiyati bo‘lmagan, faqat son qiymati bilan aniqlanadigan kattaliklar skalyar kattaliklar deb ataladi.',
    },
    {
      type: 'paragraph',
      text: 'Hajm, vaqt, yo‘l, massa, energiya kabi fizik kattaliklar skalyar kattaliklardir. Ular ustida amallar sonlar ustida amallar kabi bajariladi. Masalan, birinchi jismning massasi m₁ = 8 kg, ikkinchi jismning massasi m₂ = 4 kg bo‘lsa, ularning birgalikdagi massasi:\nm₁ + m₂ = 8 kg + 4 kg = 12 kg.\nBu ikki jism massalari orasidagi farq:\nm₁ – m₂ = 8 kg – 4 kg = 4 kg.',
    },
    {
      type: 'paragraph',
      text: 'Shu tariqa birinchi jismning massasi ikkinchisinikidan necha marta ortiq ekanligini ham aniqlash mumkin. Bundan tashqari, jism massasini biror songa ko‘paytirish yoki bo‘lish mumkin. Masalan, m = 12 kg bo‘lsa, uni 3 ga ko‘paytirish va bo‘lish quyidagicha bajariladi:\nm · 3 = 12 kg · 3 = 36 kg;   m : 3 = 12 kg : 3 = 4 kg.\nTo‘g‘ri chiziq bo‘yicha harakatda jism qayerdan harakatni boshladi, qaysi tomonga harakatlandi va bosib o‘tilgan yo‘lning kattaligini bilish bu jismning harakat oxiridagi vaziyatini aniqlash uchun yetarlidir.',
    },
    {
      type: 'sectionTitle',
      text: 'Vektor kattaliklar',
    },
    {
      type: 'paragraph',
      text: 'Ba’zi fizik kattaliklar bilan ish ko‘rilganda ularning son qiymatini bilish kifoya qilmaydi, ularning yo‘nalishi ham muhim ahamiyatga ega bo‘ladi.',
    },
    {
      type: 'paragraph',
      text: 'Masalan, jism s = 5 m masofaga ko‘chdi, deyish yetarli emas. Bunda ko‘chishning yo‘nalishi ham ma’lum bo‘lishi kerak. Shunda jism qaysi tomonga va qayerga ko‘chganligi haqida to‘liq tasavvurga ega bo‘lamiz.',
    },
    {
      type: 'paragraph',
      text: 'Stol ustida turgan aravachaga ma’lum bir kuch ta’sir etmoqda, deyish yetarli emas. Bu kuch jismga chapdan o‘ngga yo‘nalishda ta’sir etganda, aravacha o‘ngga, o‘ngdan chapga yo‘nalishda ta’sir etganda esa chapga tomon harakatlanadi (14-rasm). Agar kuch aravachaga tepadan pastga ta’sir etsa, aravacha harakat qilmaydi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-14.png',
      caption: '14-rasm. Harakat yo‘nalishining kuch yo‘nalishiga bog‘liqligi',
      span: 2,
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Kuch, tezlik, ko‘chish kabi fizik kattaliklar vektor kattaliklardir. Bu kattaliklarni o‘rganishda son qiymatidan tashqari ularning yo‘nalishini ham bilish muhim.',
    },
    {
      type: 'definition',
      text: 'Son qiymatlari va yo‘nalishlari bilan aniqlanadigan kattaliklar vektor kattaliklar deb ataladi.',
    },
    {
      type: 'paragraph',
      text: 'Odatda, vektor kattaliklar ustiga yo‘nalish – strelka qo‘yiladi. Masalan, kuch – F→, tezlik – υ→, ko‘chish – s→ ko‘rinishda ifodalanadi. Vektor kattalikning faqat miqdorini ko‘rsatmoqchi bo‘lsak, uning son qiymati quyidagicha ifodalanadi:\n| F→ | = 2 N,   | υ→ | = 10 m/s,   | s→ | = 5 m\nyoki F = 2 N, υ = 10 m/s, s = 5 m.\nVektor kattalik chizmada uzunligi son qiymatiga teng yo‘nalishli kesma shaklida ko‘rsatiladi.',
    },
    {
      type: 'sectionTitle',
      text: 'Vektor kattaliklarni qo‘shish va ayirish',
    },
    {
      type: 'paragraph',
      text: 'Anhorning A nuqtasidan B nuqtasi tomon υ₁ tezlikda suzib o‘tmoqchi bo‘lgan suzuvchining harakatini ko‘rib chiqaylik (15-rasm). Suzuvchi B nuqta tomon suzmoqda, lekin υ₂ tezlikdagi daryo oqimi ta’sirida u narigi qirg‘oqning C nuqtasiga borib qoladi. Suzuvchi A dan B ga yetib olish uchun sarflagan t vaqtda daryo suvi B dan C gacha bo‘lgan masofani o‘tadi. Suzuvchi o‘zining υ₁→ tezligiga suvning υ₂→ tezligi qo‘shilishi natijasi bo‘lgan υ₃→ tezlikda daryoni suzib o‘tadi. Vektor ko‘rinishda buni quyidagicha ifodalash mumkin:\nυ₁→ + υ₂→ = υ₃→.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-15.png',
      caption: '15-rasm. Suzuvchi daryodan o‘tishining vektor ifodasi',
      size: 'compact',
    },
    {
      type: 'paragraph',
      text: 'Vektor kattaliklar ustida amallar oddiy sonlar ustida amallar kabi bajarilmaydi. Masalan, AB kesma 4 m, BC kesma 3 m bo‘lsa, bu vektorlar yig‘indisi 4 m + 3 m = 7 m emas, balki 5 m ga teng bo‘ladi.\n16-rasmdagi A nuqtadan suv havzasini aylanib, B va C nuqtalar orqali D nuqtaga borish yo‘lini chizmada ifodalab ko‘raylik. AB vektorga BC vektor qo‘shilganida AC vektor hosil bo‘ldi:\nAB→ + BC→ = AC→.\nAB va BC vektor bo‘yicha yurilganida hosil bo‘lgan yig‘indi AC vektor A nuqtadan C nuqtaga ko‘chishni ko‘rsatadi.\nAC vektorga CD vektor qo‘shilganida AD vektor hosil bo‘ldi:\nAC→ + CD→ = AD→.\nA nuqtadan B va C orqali D nuqtaga borish uchun ko‘p masofa bosib o‘tildi, ko‘chish esa faqat A nuqtadan D nuqtagacha bo‘ldi:\nAB→ + BC→ + CD→ = AD→.\nDemak, vektor kattalikning sonigina emas, yo‘nalishi ham katta ahamiyatga ega ekan.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-16.png',
      caption: '16-rasm. Binoni aylanib o‘tish chizmasi',
      size: 'wide',
    },
    {
      type: 'paragraph',
      text: 'Boshqa bir misolni ko‘rib chiqaylik. Masalan, A nuqtada turgan jism to‘g‘ri chiziq bo‘ylab 4 m yo‘lni bosib, B nuqtaga, so‘ngra B nuqtadan 3 m yo‘lni bosib, C nuqtaga ko‘chgan bo‘lsin (17-rasm). Jismning bosib o‘tgan yo‘lini s₁ va s₂ bilan belgilasak, s₁ = 4 m va s₂ = 3 m bo‘ladi. Jismning A nuqtadan B nuqtaga, so‘ngra B nuqtadan C nuqtaga ko‘chishi s₁→ + s₂→ ko‘rinishda bo‘ladi. Bu ko‘chish A nuqtadan C nuqtaga to‘g‘ridan to‘g‘ri ko‘chish s→ ga teng:\ns₁→ + s₂→ = s→.   (1)\nBu usulda qo‘shish uchburchak usulda qo‘shish qoidasi deb ataladi. Uni quyidagicha ta’riflash mumkin:',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-17.png',
      caption: '17-rasm. s₁→ va s₂→ vektorlarni qo‘shish',
      size: 'normal',
    },
    {
      type: 'definition',
      text: 'Ikkita vektorni qo‘shish uchun birinchi vektorning oxiriga ikkinchi vektorning boshi qo‘yiladi va birinchi vektorning boshidan ikkinchi vektorning oxiriga yo‘nalgan vektor o‘tkaziladi. Shu vektor ikki vektorning yig‘indisi bo‘ladi.',
    },
    {
      type: 'paragraph',
      text: 'Ixtiyoriy yo‘nalishdagi a→ va b→ vektorlar berilgan bo‘lsin. Ularning yig‘indisi:\na→ + b→ = c→   (2)\nvektorni topish 18-rasmda tasvirlangan.\nYo‘nalishli to‘g‘ri chiziq fizik kattalikning yo‘nalishinigina emas, balki son jihatdan miqdorini ham ifodalaydi. Yo‘nalishli chiziqning uzunligi qancha katta bo‘lsa, berilgan fizik kattalik shuncha katta qiymatga ega bo‘ladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-18.png',
      caption: '18-rasm. a→ va b→ vektorlar (1), ularning yig‘indisi c→ vektor (2)',
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Ayirish amali qo‘shishga teskari amal bo‘lgani uchun 18-rasmda c→ vektordan a→ vektor ayirilsa, b→ hosil bo‘ladi. Bunda:\nc→ – a→ = b→.   (3)',
    },
    {
      type: 'definition',
      text: 'Bir vektordan ikkinchi vektorni ayirish uchun ikkala vektorning boshlari bir nuqtaga qo‘yiladi va ikkinchi vektor uchidan birinchi vektor uchiga yo‘nalgan vektor o‘tkaziladi. Shu vektor ikki vektorning ayirmasi bo‘ladi.',
    },
    {
      type: 'paragraph',
      text: 'Demak, vektorlarni qo‘shish va ayirishda yo‘nalishli chiziqning uzunligi va yo‘nalishini o‘zgartirmagan holda vektorlarning boshi va oxirini qanday joylashtirilishiga ahamiyat berish kerak ekan.',
    },
    {
      type: 'definition',
      text: 'Yo‘nalishi va son qiymati bir-xil bo‘lgan vektorlar teng vektorlar deyiladi.',
    },
    {
      type: 'sectionTitle',
      text: 'Vektor kattaliklarni songa ko‘paytirish va bo‘lish',
    },
    {
      type: 'paragraph',
      text: 'Jism biror yo‘nalishda to‘g‘ri chiziq bo‘ylab harakatlanib, s yo‘lni bosib o‘tsa, bu masofaga teng ko‘chish kattaligi s vektorga teng bo‘ladi: s = s→. Jism o‘z yo‘nalishini o‘zgartirmagan holda shunday s yo‘lni yana ikki marta bosib o‘tsin. Bu holda uning bosib o‘tgan yo‘li s + s + s = 3s ga, ko‘chishi s→ + s→ + s→ = 3s→ ga teng bo‘ladi (19-rasm).\nDemak, s→ ni 3 marta orttirilsa, 3s→ vektor hosil bo‘ladi. Natijada vektor yo‘nalishi o‘zgarmaydi.',
    },
    {
      type: 'definition',
      text: 'Vektor kattalik musbat songa ko‘paytirilsa, uning kattaligi shu son marta ortadi, yo‘nalishi esa o‘zgarmaydi.',
    },
    {
      type: 'paragraph',
      text: 'Bunda vektor kattalik ko‘paytiriladigan son musbat bo‘lishi kerak.\nShu singari vektor kattalikni musbat songa bo‘lish ham mumkin. Agar manfiy songa ko‘paytirilsa yoki bo‘linsa, yo‘nalish teskarisiga o‘zgaradi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-19.png',
      caption: '19-rasm. s→ vektorning 3 ga ko‘paytmasi',
      span: 2,
      size: 'normal',
    },
    {
      type: 'definition',
      text: 'Vektor kattalik musbat songa bo‘linsa, uning kattaligi shu son marta kamayadi, yo‘nalishi esa o‘zgarmaydi.',
    },
    {
      type: 'sectionTitle',
      text: 'Vektor kattaliklarning proyeksiyasi',
    },
    {
      type: 'paragraph',
      text: 'Aravacha harakat yo‘nalishiga nisbatan biror burchak ostida F→ kuch bilan tortilayotgan bo‘lsin (20-rasm). Bu kuch aravachani ham vertikal, ham gorizontal yo‘nalishda tortadi. Aravachaga harakat yo‘nalishida ta’sir etayotgan kuchning qiymati qanday bo‘ladi?\nAravachaning harakat yo‘nalishi bo‘ylab Ox o‘qini o‘tkazamiz. Bunda O nuqtani F→ vektorning boshiga to‘g‘ri keltirishimiz kerak. F→ vektor oxiri A nuqtaga Ox o‘qdan perpendikulyar o‘tkazamiz. Hosil bo‘lgan OB→ vektor F→ vektorning Ox o‘qidagi tashkil etuvchisi, ya’ni proyeksiyasini ifodalaydi. Harakat yo‘nalishida aravachaga ta’sir etayotgan kuch shu OB→ proyeksiyaning uzunligiga teng bo‘ladi. Masalan, burchak ostida ta’sir etayotgan kuchning qiymati | F→ | = 5 N bo‘lsin. Bu kuchning proyeksiyasi esa 3 N ga teng bo‘lishi mumkin. Aravachaga harakat yo‘nalishida ta’sir etayotgan kuch ana shu 3 N ga teng bo‘ladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-20.png',
      caption: '20-rasm. Aravachaga ta’sir etayotgan kuchning proyeksiyasi',
      size: 'normal',
    },
    {
      type: 'paragraph',
      text: 'Endi F→ kuch aravachani yuqoriga qanday kuch bilan tortayotganligini bilish uchun A nuqtadan Oy o‘qining C nuqtasiga perpendikulyar o‘tkazamiz. Hosil bo‘lgan OC→ vektor uzunligi vertikal ta’sir etuvchi kuchga teng. Uning qiymati 4 N bo‘lishi mumkin.',
    },
    {
      type: 'paragraph',
      text: 'Ixtiyoriy yo‘nalishdagi a→ vektorning Ox o‘qidagi proyeksiyasini aniqlaylik (21-rasm). Buning uchun vektorning boshi A va oxiri B nuqtalaridan Ox o‘qining C va D nuqtalariga ikkita perpendikulyar o‘tkaziladi. Hosil bo‘lgan CD kesma a→ vektorning Ox o‘qidagi proyeksiyasi bo‘ladi.',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-21.png',
      caption: '21-rasm. Ixtiyoriy yo‘nalishdagi vektorning proyeksiyasi',
      size: 'normal',
    },
    {
      type: 'keyTerms',
      terms: [
        'skalyar kattalik',
        'vektor kattalik',
        'vektorlar yig‘indisi',
        'vektorlar ayirmasi',
        'vektorni songa ko‘paytirish',
        'vektorni songa bo‘lish',
        'vektorning proyeksiyasi (tashkil etuvchisi)',
      ],
    },
    {
      type: 'questions',
      items: [
        'Uyingizdan maktabgacha yurgan yo‘lingizni vektor ko‘rinishida ifodalab, bu vektorlar yig‘indisini toping.',
      ],
    },
    {
      type: 'questions',
      title: 'Mashqlar',
      items: [
        '22-rasmda ko‘rsatilgan a) s₁→ va s₂→ vektorlarning; b) F₁→ va F₂→ vektorlarning; d) a→, b→ va c→ vektorlarning; e) a₁→, a₂→, a₃→, a₄→ va a₅→ vektorlarning yig‘indisini daftaringizda tasvirlang.',
        '22-rasmda ko‘rsatilgan: a) s₁→ vektordan s₂→ vektorning ayirmasini; b) F₁→ vektordan F₂→ vektorning ayirmasini daftaringizda tasvirlang.',
        '23-rasmda ko‘rsatilgan: a) F→ vektorni 2 ga ko‘paytiring; b) a→ vektorni 5 ga ko‘paytiring; d) b→ vektorni 3 ga bo‘ling.',
        '23-rasmda ko‘rsatilgan s→ va υ→ vektorlarning Ox o‘qqa proyeksiyasini daftaringizda tasvirlang.',
      ],
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-22.png',
      caption: '22-rasm. Yig‘indisi va ayirmasi aniqlanadigan vektorlar',
      placement: 'center',
    },
    {
      type: 'figure',
      src: '/books/grade7/rasm-23.png',
      caption: '23-rasm. Songa ko‘paytiriladigan va bo‘linadigan, proyeksiyasi aniqlanadigan vektorlar',
      placement: 'center',
    },
  ],
};
