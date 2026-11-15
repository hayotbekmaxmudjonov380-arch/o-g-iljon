import {
  LabExperimentId,
  PhysicsExercise,
  PhysicsFormula,
  TheoryTopic,
} from '../types/fizlab';

export const LAB_EXPERIMENTS: {
  id: LabExperimentId;
  code: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  objective: string;
}[] = [
  {
    id: 'gas-laws',
    code: '01-tajriba',
    title: 'Ideal gaz qonunlari va izojarayonlar',
    shortTitle: 'Ideal gaz qonunlari',
    subtitle: 'Boyl-Mariott, Sharl va Gey-Lyussak qonunlarini porshenli 3D kamerada tadqiq qilish',
    objective:
      'Harorat va hajmni o‘zgartirish orqali gaz bosimining molekulyar to‘qnashuvlar chastotasiga bog‘liqligini aniqlang.',
  },
  {
    id: 'brownian',
    code: '02-tajriba',
    title: 'Broun harakati va molekulyar diffuziya',
    shortTitle: 'Broun harakati',
    subtitle: 'Kolloid zarrachaning issiqlik harakati ta’siridagi tasodifiy trayektoriyasi',
    objective:
      'Eritma molekulalarining tartibsiz zarbalari natijasida yirik zarrachaning o‘rtacha kvadratik siljishini kuzating.',
  },
  {
    id: 'states',
    code: '03-tajriba',
    title: 'Agregat holatlar va faza o‘tishlari',
    shortTitle: 'Agregat holatlar',
    subtitle: 'Qattiq kristall panjara, suyuqlik va gaz fazalari orasidagi uzluksiz o‘tish',
    objective:
      'Haroratni 60 K dan 600 K gacha oshirib, molekulalar orasidagi tortishish va kinetik energiya muvozanatini tekshiring.',
  },
  {
    id: 'maxwell',
    code: '04-tajriba',
    title: 'Maksvell-Bolsman tezlik taqsimoti',
    shortTitle: 'Tezlik taqsimoti',
    subtitle: 'Yengil (He) va og‘ir (Ar) gazlar aralashmasida energiyaning teng taqsimlanishi',
    objective:
      'Bir xil haroratda yengil va og‘ir molekulalarning o‘rtacha kvadratik tezliklari nisbatini taqqoslang.',
  },
];

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'mkn-asoslari',
    chapterLabel: '1-bob · Asosiy tushunchalar',
    title: 'Molekulyar-kinetik nazariya (MKN) asoslari',
    subtitle: 'Moddaning diskret tuzilishi, Avogadro doimiysi va ideal gaz bosimining asosiy tenglamasi',
    readTime: '6 daqiqa',
    relatedLab: 'gas-laws',
    summary:
      'Molekulyar-kinetik nazariya barcha jismlarning to‘xtovsiz va tartibsiz harakatlanuvchi juda kichik zarralar — atom va molekulalardan tashkil topganini isbotlaydi. Makroskopik kattaliklar (bosim, harorat) milliardlab molekulalarning o‘rtacha mexanik harakati natijasidir.',
    keyEquations: [
      {
        expression: 'P = (1/3) · n · m₀ · v²',
        meaning: 'MKN ning asosiy tenglamasi: bosim konsentratsiya va kinetik energiyaga proporsional',
      },
      {
        expression: 'ν = N / Nₐ = m / M',
        meaning: 'Modda miqdori (mol): Avogadro doimiysi Nₐ = 6.022 × 10²³ mol⁻¹',
      },
      {
        expression: 'P = n · kᵦ · T',
        meaning: 'Bosimning konsentratsiya va mutlaq haroratga bog‘liqligi',
      },
    ],
    principles: [
      {
        heading: '1. Moddaning zarrachali tuzilishi',
        body: 'Barcha moddalar — qattiq jismlar, suyuqliklar va gazlar alohida zarralardan iborat bo‘lib, ular orasida bo‘shliq (molekulyar masofa) mavjud. Gazlarda bu masofa molekulaning o‘lchamidan o‘nlab marta katta.',
      },
      {
        heading: '2. To‘xtovsiz tartibsiz harakat',
        body: 'Molekulalar hech qachon tinch turmaydi. Ularning harakat tezligi haroratga bog‘liq bo‘lib, xona haroratida havo molekulalari taxminan 450–500 m/s tezlikda uchadi va soniyasiga milliardlab marta to‘qnashadi.',
      },
      {
        heading: '3. O‘zaro ta’sir kuchlari',
        body: 'Yaqin masofada molekulalar bir-birini itaradi, bir oz uzoqlashganda esa tortadi. Qattiq jismlarda tortishish kuchli bo‘lgani uchun ular shakl va hajmini saqlaydi; gazlarda esa kinetik energiya ustunlik qiladi.',
      },
    ],
    experimentTip:
      '3D laboratoriyada porshenni pastga tushirib hajmni ikki barobar kamaytiring — molekulalar devorga ikki marta tez-tez urilib, bosimni 2 barobar oshirishini kuzatasiz.',
    schematicType: 'mkn-pressure',
  },
  {
    id: 'ideal-gaz-qonunlari',
    chapterLabel: '2-bob · Gaz holati',
    title: 'Ideal gaz holat tenglamasi va izojarayonlar',
    subtitle: 'Mendeleyev-Klapeyron tenglamasi hamda izotermik, izobarik va izoxorik jarayonlar',
    readTime: '7 daqiqa',
    relatedLab: 'gas-laws',
    summary:
      'Molekulalarning xususiy hajmi va o‘zaro tortishish kuchlari hisobga olinmaydigan gaz modeli ideal gaz deyiladi. Bunday gazning bosimi P, hajmi V va mutlaq harorati T yagona holat tenglamasi bilan bog‘lanadi.',
    keyEquations: [
      {
        expression: 'P · V = ν · R · T',
        meaning: 'Mendeleyev-Klapeyron tenglamasi (R = 8.314 J/(mol·K))',
      },
      {
        expression: 'P₁V₁ = P₂V₂ (T = const)',
        meaning: 'Boyl-Mariott qonuni — izotermik jarayon giperbolasi',
      },
      {
        expression: 'V₁ / T₁ = V₂ / T₂ (P = const)',
        meaning: 'Gey-Lyussak qonuni — izobarik kengayish',
      },
      {
        expression: 'P₁ / T₁ = P₂ / T₂ (V = const)',
        meaning: 'Sharl qonuni — izoxorik qizdirish',
      },
    ],
    principles: [
      {
        heading: 'Izotermik jarayon (T = const)',
        body: 'Doimiy haroratda gaz massasi o‘zgarmasa, bosim hajmga teskari proporsional. P–V koordinatalarida bu jarayon izoterma deb ataladigan giperbola chizig‘i ko‘rinishida tasvirlanadi.',
      },
      {
        heading: 'Izobarik jarayon (P = const)',
        body: 'Bosim o‘zgarmas bo‘lganda gazning hajmi mutlaq Kelvin haroratiga to‘g‘ri proporsional ravishda ortadi. Qizdirilganda porshen yuqoriga ko‘tariladi va gaz tashqi kuchlarga qarshi ish bajaradi.',
      },
      {
        heading: 'Izoxorik jarayon (V = const)',
        body: 'Yopiq berk idishda hajm o‘zgarmaydi. Harorat ko‘tarilishi bilan molekulalarning o‘rtacha kinetik energiyasi ortadi va bosim mutlaq haroratga proporsional o‘sadi.',
      },
    ],
    experimentTip:
      '01-tajribada avval haroratni 300 K da qulflab porshen hajmini o‘zgartiring (Izoterma), so‘ngra hajmni 4 L da saqlab haroratni oshiring (Izoxora).',
    schematicType: 'isoprocesses',
  },
  {
    id: 'harorat-va-energiya',
    chapterLabel: '3-bob · Statistik fizika',
    title: 'Haroratning molekulyar-kinetik ma’nosi va tezliklar',
    subtitle: 'Bolsman doimiysi, energiyaning teng taqsimlanishi va Maksvell taqsimoti',
    readTime: '6 daqiqa',
    relatedLab: 'maxwell',
    summary:
      'Mutlaq harorat — molekulalarning ilgarilanma harakat o‘rtacha kinetik energiyasining bevosita o‘lchovidir. Termodinamik muvozanatda har qanday turdagi gaz molekulalari bir xil haroratda bir xil o‘rtacha kinetik energiyaga ega bo‘ladi.',
    keyEquations: [
      {
        expression: 'Eₖ = (3/2) · kᵦ · T',
        meaning: 'Bitta molekulaning o‘rtacha ilgarilanma kinetik energiyasi',
      },
      {
        expression: 'vₖᵥ = √(3RT / M) = √(3kᵦT / m₀)',
        meaning: 'Molekulalarning o‘rtacha kvadratik tezligi',
      },
      {
        expression: 'kᵦ = R / Nₐ = 1.38 × 10⁻²³ J/K',
        meaning: 'Bolsman doimiysi — harorat va energiya orasidagi bog‘lovchi',
      },
    ],
    principles: [
      {
        heading: 'Mutlaq nol (0 K = −273.15 °C)',
        body: 'Nazariy jihatdan klassik issiqlik harakati to‘xtaydigan eng quyi harorat chegarasi. Kelvin shkalasida harorat har doim musbat va o‘rtacha kinetik energiyaga to‘g‘ri proporsional.',
      },
      {
        heading: 'Massa va tezlik nisbati',
        body: 'Bir xil haroratda yengil geliy (M = 4 g/mol) molekulalari og‘ir kislorod (M = 32 g/mol) molekulalariga qaraganda √(32/4) ≈ 2.83 marta tezroq harakatlanadi, ammo ularning o‘rtacha kinetik energiyalari teng.',
      },
      {
        heading: 'Maksvell tezlik taqsimoti',
        body: 'Gazdagi hamma molekulalar bir xil tezlikda uchmaydi: ba’zilari juda sekin, aksariyati eng ehtimolli tezlik atrofida, bir qismi esa juda katta tezlikda harakatlanadi. Harorat oshganda taqsimot egri chizig‘i o‘ngga siljiydi va yassilashadi.',
      },
    ],
    experimentTip:
      '04-tajribada ko‘k (yengil) va sariq (og‘ir) molekulalar aralashmasini kuzating: jonli gistogrammada ikki xil tezlik cho‘qqisi yaqqol ajralib turadi.',
    schematicType: 'kinetic-temp',
  },
  {
    id: 'broun-va-diffuziya',
    chapterLabel: '4-bob · Ko‘chish hodisalari',
    title: 'Broun harakati va molekulyar diffuziya',
    subtitle: 'Issiqlik harakatining tajribaviy tasdig‘i hamda Eynshteyn-Smoluxovskiy nazariyasi',
    readTime: '5 daqiqa',
    relatedLab: 'brownian',
    summary:
      '1827-yilda Robert Broun suvda muallaq turgan gul changi zarrachalarining to‘xtovsiz titrashini kashf etdi. 1905-yilda Albert Eynshteyn bu hodisani suyuqlik molekulalarining tartibsiz va muvozanatlashmagan zarbalari bilan miqdoriy jihatdan tushuntirdi.',
    keyEquations: [
      {
        expression: '⟨r²⟩ = 6 · D · t',
        meaning: '3D fazoda Broun zarrachasining o‘rtacha kvadratik siljishi',
      },
      {
        expression: 'D = (kᵦ · T) / (6 · π · η · r)',
        meaning: 'Eynshteyn-Stoks diffuziya koeffitsiyenti formulasi',
      },
    ],
    principles: [
      {
        heading: 'Zarracha o‘lchamining roli',
        body: 'Yirik jismlarga molekulalar barcha tomondan bir xil o‘rtacha kuch bilan uriladi va zarbalar kompensatsiyalanadi. Mikrometrlik zarrachalarda esa bir lahzadagi zarbalar soni teng bo‘lmaydi, natijada zarracha siniq chiziq bo‘ylab siljiydi.',
      },
      {
        heading: 'Harorat va yopishqoqlik ta’siri',
        body: 'Harorat ko‘tarilganda erituvchi molekulalari tezroq va kuchliroq uriladi, suyuqlik yopishqoqligi η esa kamayadi — natijada Broun harakati keskin jadallashadi.',
      },
      {
        heading: 'Diffuziya',
        body: 'Bir modda molekulalarining ikkinchi modda molekulalari orasiga issiqlik harakati tufayli o‘z-o‘zidan kirib borishi diffuziya deyiladi. Gazlarda eng tez, qattiq jismlarda esa juda sekin kechadi.',
      },
    ],
    experimentTip:
      '02-tajribada haroratni 500 K ga ko‘tarib, kolloid zarracha trayektoriyasining kengayishini va ⟨r²⟩ qiymati qanchalik tez o‘sishini kuzating.',
    schematicType: 'brownian-path',
  },
  {
    id: 'agregat-va-termodinamika',
    chapterLabel: '5-bob · Termodinamika',
    title: 'Agregat holatlar va Termodinamikaning I qonuni',
    subtitle: 'Kristall panjara, faza o‘tishlari, ichki energiya va issiqlik balansi',
    readTime: '7 daqiqa',
    relatedLab: 'states',
    summary:
      'Moddaning qattiq, suyuq yoki gaz holatida bo‘lishi molekulalar kinetik energiyasining ular orasidagi o‘zaro tortishish potensial energiyasiga nisbati bilan belgilanadi. Termodinamika I qonuni esa energiyaning saqlanish qonunidir.',
    keyEquations: [
      {
        expression: 'Q = ΔU + A',
        meaning: 'Termodinamikaning birinchi qonuni: berilgan issiqlik ichki energiya o‘zgarishi va ishga sarflanadi',
      },
      {
        expression: 'U = (i / 2) · ν · R · T',
        meaning: 'Ideal gazning ichki energiyasi (bir atomli gaz uchun i = 3)',
      },
      {
        expression: 'A = P · ΔV',
        meaning: 'Izobarik kengayishda gaz bajargan mexanik ish',
      },
    ],
    principles: [
      {
        heading: 'Qattiq jism (Kristall holat)',
        body: 'Past haroratlarda potensial energiya ustun keladi. Molekulalar tugun nuqtalarida tartibli panjara hosil qilib, faqat muvozanat vaziyati atrofida kichik tebranma harakat qiladi.',
      },
      {
        heading: 'Suyuqlik holati',
        body: 'Erish nuqtasidan yuqorida molekulalar bir-biriga yaqin joylashgan holda joy almasha oladi. Yaqin tartib saqlanadi, uzoq tartib yo‘qoladi — suyuqlik oquvchanlikka ega bo‘ladi.',
      },
      {
        heading: 'Gaz holati va plazma',
        body: 'Qaynash haroratidan yuqorida kinetik energiya tortishish kuchlarini to‘liq yengadi. Molekulalar idishning butun hajmini egallaydi va erkin uchadi.',
      },
    ],
    experimentTip:
      '03-tajribada harorat slayderini 70 K dan 550 K gacha sekin suring: kristall panjara bog‘larining uzilishini va moddaning bug‘lanishini real vaqtda ko‘rasiz.',
    schematicType: 'phase-curve',
  },
];

export const PHYSICS_FORMULAS: PhysicsFormula[] = [
  {
    id: 'mendeleyev-clapeyron',
    category: 'gas-laws',
    categoryLabel: 'Gaz qonunlari',
    title: 'Mendeleyev-Klapeyron tenglamasi',
    equation: 'P = (ν · R · T) / V',
    description: 'Ideal gaz bosimini modda miqdori, mutlaq harorat va hajm orqali aniqlaydi.',
    variables: [
      { symbol: 'ν', name: 'Modda miqdori', unit: 'mol', defaultValue: 2, min: 0.1, max: 50, step: 0.1 },
      { symbol: 'T', name: 'Mutlaq harorat', unit: 'K', defaultValue: 300, min: 10, max: 2000, step: 10 },
      { symbol: 'V', name: 'Gaz hajmi', unit: 'L (10⁻³ m³)', defaultValue: 10, min: 0.5, max: 100, step: 0.5 },
    ],
    resultSymbol: 'P',
    resultName: 'Gaz bosimi',
    resultUnit: 'kPa',
    compute: (v) => (v['ν'] * 8.314 * v['T']) / (v['V'] * 0.001) / 1000,
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'mkn-basic',
    category: 'mkn',
    categoryLabel: 'MKN asoslari',
    title: 'MKN ning asosiy tenglamasi',
    equation: 'P = n · kᵦ · T',
    description: 'Gaz bosimini molekulalar konsentratsiyasi va harorat orqali hisoblash.',
    variables: [
      { symbol: 'n', name: 'Konsentratsiya (×10²⁵)', unit: '10²⁵ m⁻³', defaultValue: 2.5, min: 0.1, max: 20, step: 0.1 },
      { symbol: 'T', name: 'Harorat', unit: 'K', defaultValue: 300, min: 50, max: 1500, step: 10 },
    ],
    resultSymbol: 'P',
    resultName: 'Bosim',
    resultUnit: 'kPa',
    compute: (v) => (v['n'] * 1e25 * 1.380649e-23 * v['T']) / 1000,
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'kinetic-energy',
    category: 'energy',
    categoryLabel: 'Tezlik va energiya',
    title: 'Molekulaning o‘rtacha kinetik energiyasi',
    equation: 'Eₖ = (3 / 2) · kᵦ · T',
    description: 'Bir atomli ideal gaz molekulasi ilgarilanma harakatining o‘rtacha kinetik energiyasi.',
    variables: [
      { symbol: 'T', name: 'Mutlaq harorat', unit: 'K', defaultValue: 300, min: 1, max: 3000, step: 10 },
    ],
    resultSymbol: 'Eₖ',
    resultName: 'Kinetik energiya',
    resultUnit: '×10⁻²¹ J',
    compute: (v) => 1.5 * 1.380649e-23 * v['T'] * 1e21,
    formatResult: (val) => val.toFixed(3),
  },
  {
    id: 'rms-velocity',
    category: 'energy',
    categoryLabel: 'Tezlik va energiya',
    title: 'O‘rtacha kvadratik tezlik',
    equation: 'vₖᵥ = √(3 · R · T / M)',
    description: 'Molyar massasi M bo‘lgan gaz molekulalarining issiqlik harakati tezligi.',
    variables: [
      { symbol: 'T', name: 'Harorat', unit: 'K', defaultValue: 300, min: 10, max: 2000, step: 10 },
      { symbol: 'M', name: 'Molyar massa', unit: 'g/mol', defaultValue: 32, min: 2, max: 150, step: 1 },
    ],
    resultSymbol: 'vₖᵥ',
    resultName: 'Kvadratik tezlik',
    resultUnit: 'm/s',
    compute: (v) => Math.sqrt((3 * 8.314 * v['T']) / (v['M'] * 0.001)),
    formatResult: (val) => val.toFixed(1),
  },
  {
    id: 'boyle-mariotte',
    category: 'gas-laws',
    categoryLabel: 'Gaz qonunlari',
    title: 'Boyl-Mariott qonuni (Izoterma)',
    equation: 'P₂ = (P₁ · V₁) / V₂',
    description: 'Doimiy haroratda hajm o‘zgarganda yakuniy gaz bosimini topish.',
    variables: [
      { symbol: 'P₁', name: 'Boshlang‘ich bosim', unit: 'kPa', defaultValue: 100, min: 10, max: 1000, step: 10 },
      { symbol: 'V₁', name: 'Boshlang‘ich hajm', unit: 'L', defaultValue: 6, min: 0.5, max: 50, step: 0.5 },
      { symbol: 'V₂', name: 'Yakuniy hajm', unit: 'L', defaultValue: 2, min: 0.5, max: 50, step: 0.5 },
    ],
    resultSymbol: 'P₂',
    resultName: 'Yakuniy bosim',
    resultUnit: 'kPa',
    compute: (v) => (v['P₁'] * v['V₁']) / v['V₂'],
    formatResult: (val) => val.toFixed(1),
  },
  {
    id: 'charles-law',
    category: 'gas-laws',
    categoryLabel: 'Gaz qonunlari',
    title: 'Sharl qonuni (Izoxora)',
    equation: 'P₂ = P₁ · (T₂ / T₁)',
    description: 'O‘zgarmas hajmda harorat o‘zgarishi natijasidagi bosim qiymati.',
    variables: [
      { symbol: 'P₁', name: 'Boshlang‘ich bosim', unit: 'kPa', defaultValue: 101.3, min: 10, max: 1000, step: 5 },
      { symbol: 'T₁', name: 'Boshlang‘ich harorat', unit: 'K', defaultValue: 273, min: 50, max: 1000, step: 5 },
      { symbol: 'T₂', name: 'Yakuniy harorat', unit: 'K', defaultValue: 546, min: 50, max: 2000, step: 5 },
    ],
    resultSymbol: 'P₂',
    resultName: 'Yakuniy bosim',
    resultUnit: 'kPa',
    compute: (v) => v['P₁'] * (v['T₂'] / v['T₁']),
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'gay-lussac',
    category: 'gas-laws',
    categoryLabel: 'Gaz qonunlari',
    title: 'Gey-Lyussak qonuni (Izobara)',
    equation: 'V₂ = V₁ · (T₂ / T₁)',
    description: 'Doimiy bosimda gazning issiqlikdan kengayish hajmini aniqlash.',
    variables: [
      { symbol: 'V₁', name: 'Boshlang‘ich hajm', unit: 'L', defaultValue: 4, min: 0.5, max: 50, step: 0.5 },
      { symbol: 'T₁', name: 'Boshlang‘ich harorat', unit: 'K', defaultValue: 300, min: 50, max: 1000, step: 10 },
      { symbol: 'T₂', name: 'Yakuniy harorat', unit: 'K', defaultValue: 450, min: 50, max: 1500, step: 10 },
    ],
    resultSymbol: 'V₂',
    resultName: 'Yakuniy hajm',
    resultUnit: 'L',
    compute: (v) => v['V₁'] * (v['T₂'] / v['T₁']),
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'molecule-count',
    category: 'mkn',
    categoryLabel: 'MKN asoslari',
    title: 'Modda miqdori va molekulalar soni',
    equation: 'N = (m / M) · Nₐ',
    description: 'Berilgan massadagi moddada nechta molekula borligini hisoblash.',
    variables: [
      { symbol: 'm', name: 'Modda massasi', unit: 'g', defaultValue: 36, min: 1, max: 500, step: 1 },
      { symbol: 'M', name: 'Molyar massa', unit: 'g/mol', defaultValue: 18, min: 2, max: 200, step: 1 },
    ],
    resultSymbol: 'N',
    resultName: 'Molekulalar soni',
    resultUnit: '×10²³ dona',
    compute: (v) => (v['m'] / v['M']) * 6.022,
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'internal-energy',
    category: 'thermodynamics',
    categoryLabel: 'Termodinamika',
    title: 'Bir atomli gazning ichki energiyasi',
    equation: 'U = (3 / 2) · ν · R · T',
    description: 'Ideal bir atomli gaz molekulalarining jami issiqlik energiyasi.',
    variables: [
      { symbol: 'ν', name: 'Modda miqdori', unit: 'mol', defaultValue: 2, min: 0.5, max: 20, step: 0.5 },
      { symbol: 'T', name: 'Harorat', unit: 'K', defaultValue: 300, min: 50, max: 1500, step: 10 },
    ],
    resultSymbol: 'U',
    resultName: 'Ichki energiya',
    resultUnit: 'kJ',
    compute: (v) => (1.5 * v['ν'] * 8.314 * v['T']) / 1000,
    formatResult: (val) => val.toFixed(2),
  },
  {
    id: 'first-law-thermo',
    category: 'thermodynamics',
    categoryLabel: 'Termodinamika',
    title: 'Termodinamikaning I qonuni',
    equation: 'ΔU = Q − A',
    description: 'Tizimga berilgan issiqlik miqdori Q va bajarilgan ish A bo‘yicha ichki energiya o‘zgarishi.',
    variables: [
      { symbol: 'Q', name: 'Berilgan issiqlik', unit: 'J', defaultValue: 1200, min: -5000, max: 5000, step: 50 },
      { symbol: 'A', name: 'Gaz bajargan ish', unit: 'J', defaultValue: 450, min: -3000, max: 3000, step: 50 },
    ],
    resultSymbol: 'ΔU',
    resultName: 'Ichki energiya o‘zgarishi',
    resultUnit: 'J',
    compute: (v) => v['Q'] - v['A'],
    formatResult: (val) => val.toFixed(0),
  },
  {
    id: 'isobaric-work',
    category: 'thermodynamics',
    categoryLabel: 'Termodinamika',
    title: 'Izobarik kengayish ishi',
    equation: 'A = P · (V₂ − V₁)',
    description: 'Doimiy bosim ostida gaz kengayganda bajarilgan mexanik ish.',
    variables: [
      { symbol: 'P', name: 'Bosim', unit: 'kPa', defaultValue: 100, min: 10, max: 500, step: 10 },
      { symbol: 'V₁', name: 'Boshlang‘ich hajm', unit: 'L', defaultValue: 2, min: 0.5, max: 20, step: 0.5 },
      { symbol: 'V₂', name: 'Yakuniy hajm', unit: 'L', defaultValue: 5, min: 0.5, max: 30, step: 0.5 },
    ],
    resultSymbol: 'A',
    resultName: 'Bajarilgan ish',
    resultUnit: 'J',
    compute: (v) => v['P'] * 1000 * (v['V₂'] - v['V₁']) * 0.001,
    formatResult: (val) => val.toFixed(1),
  },
  {
    id: 'brownian-msd',
    category: 'mkn',
    categoryLabel: 'MKN asoslari',
    title: 'Broun siljishining o‘rtacha kvadrati',
    equation: '√⟨r²⟩ = √(6 · D · t)',
    description: 'Diffuziya koeffitsiyenti D bo‘lgan muhitda t vaqtda zarrachaning o‘rtacha siljish masofasi.',
    variables: [
      { symbol: 'D', name: 'Diffuziya koeff.', unit: 'µm²/s', defaultValue: 1.5, min: 0.1, max: 20, step: 0.1 },
      { symbol: 't', name: 'Kuzatish vaqti', unit: 's', defaultValue: 10, min: 1, max: 120, step: 1 },
    ],
    resultSymbol: 'r',
    resultName: 'O‘rtacha siljish',
    resultUnit: 'µm',
    compute: (v) => Math.sqrt(6 * v['D'] * v['t']),
    formatResult: (val) => val.toFixed(2),
  },
];

export const PHYSICS_EXERCISES: PhysicsExercise[] = [
  {
    id: 'ex-1',
    number: 1,
    difficulty: 'Oson',
    topic: 'MKN asoslari',
    title: 'Suvdagi modda miqdorini aniqlash',
    statement:
      'Laboratoriya kolbasida massasi m = 90 g bo‘lgan toza suv (H₂O) mavjud. Suvning molyar massasi M = 18 g/mol.',
    given: ['m = 90 g', 'M = 18 g/mol', 'Nₐ = 6.02 × 10²³ mol⁻¹'],
    question: 'Kolbada necha mol suv bor?',
    targetSymbol: 'ν',
    targetUnit: 'mol',
    expectedAnswer: 5,
    tolerancePercent: 2,
    hint: 'Modda miqdori formulasi: ν = m / M.',
    solutionSteps: [
      'Berilgan: m = 90 g, M = 18 g/mol.',
      'Formula: ν = m / M.',
      'Hisoblash: ν = 90 / 18 = 5 mol.',
    ],
  },
  {
    id: 'ex-2',
    number: 2,
    difficulty: 'Oson',
    topic: 'Gaz qonunlari',
    title: 'Izotermik siqilishda gaz bosimi',
    statement:
      'Silindr porsheni ostidagi ideal gaz 120 kPa bosimda 6 litr hajmni egallaydi. Harorat o‘zgarmas qolgan holda porshen hajmni 2 litrgacha kamaytirdi.',
    given: ['P₁ = 120 kPa', 'V₁ = 6 L', 'V₂ = 2 L', 'T = const'],
    question: 'Yakuniy gaz bosimi P₂ necha kPa bo‘ladi?',
    targetSymbol: 'P₂',
    targetUnit: 'kPa',
    expectedAnswer: 360,
    tolerancePercent: 2,
    hint: 'Boyl-Mariott qonunidan foydalaning: P₁V₁ = P₂V₂.',
    solutionSteps: [
      'Izotermik jarayon uchun Boyl-Mariott qonuni: P₁ · V₁ = P₂ · V₂.',
      'P₂ = (P₁ · V₁) / V₂ = (120 · 6) / 2.',
      'P₂ = 720 / 2 = 360 kPa.',
    ],
  },
  {
    id: 'ex-3',
    number: 3,
    difficulty: "O'rta",
    topic: 'Ideal gaz holat tenglamasi',
    title: 'Mendeleyev-Klapeyron tenglamasi',
    statement:
      'Hajmi 8.31 litr bo‘lgan berk idishda harorati T = 300 K va modda miqdori ν = 2 mol ideal gaz saqlanmoqda. (R = 8.31 J/(mol·K) deb oling).',
    given: ['V = 8.31 L = 8.31 × 10⁻³ m³', 'T = 300 K', 'ν = 2 mol', 'R = 8.31 J/(mol·K)'],
    question: 'Idish ichidagi gaz bosimi necha kPa?',
    targetSymbol: 'P',
    targetUnit: 'kPa',
    expectedAnswer: 600,
    tolerancePercent: 2,
    hint: 'PV = νRT tenglamasidan P ni toping; 1 L = 10⁻³ m³ va 1 kPa = 10³ Pa ekanini unutmang.',
    solutionSteps: [
      'P = (ν · R · T) / V.',
      'P = (2 · 8.31 · 300) / (8.31 × 10⁻³) = 600 000 Pa.',
      'Kilopaskalga o‘tkazamiz: P = 600 kPa.',
    ],
  },
  {
    id: 'ex-4',
    number: 4,
    difficulty: "O'rta",
    topic: 'Tezlik va energiya',
    title: 'Kislorod molekulalarining o‘rtacha kvadratik tezligi',
    statement:
      'Kislorod (O₂) gazining molyar massasi M = 0.032 kg/mol. Gaz harorati T = 300 K ga teng (R = 8.314 J/(mol·K)).',
    given: ['M = 0.032 kg/mol', 'T = 300 K', 'R = 8.314 J/(mol·K)'],
    question: 'Kislorod molekulalarining o‘rtacha kvadratik tezligi vₖᵥ necha m/s?',
    targetSymbol: 'vₖᵥ',
    targetUnit: 'm/s',
    expectedAnswer: 483.5,
    tolerancePercent: 2.5,
    hint: 'Formula: vₖᵥ = √(3RT / M). Molyar massani kg/mol da qo‘ying!',
    solutionSteps: [
      'vₖᵥ = √(3 · 8.314 · 300 / 0.032).',
      '3 · 8.314 · 300 / 0.032 = 7482.6 / 0.032 = 233 831.25.',
      '√233 831.25 ≈ 483.6 m/s.',
    ],
  },
  {
    id: 'ex-5',
    number: 5,
    difficulty: "O'rta",
    topic: 'Gaz qonunlari',
    title: 'Izoxorik qizdirish (Sharl qonuni)',
    statement:
      'Berk ballondagi gaz 27 °C haroratda 200 kPa bosim beradi. Ballon 327 °C gacha qizdirildi.',
    given: ['t₁ = 27 °C → T₁ = 300 K', 't₂ = 327 °C → T₂ = 600 K', 'P₁ = 200 kPa'],
    question: 'Qizdirilgandan keyingi bosim P₂ necha kPa bo‘ladi?',
    targetSymbol: 'P₂',
    targetUnit: 'kPa',
    expectedAnswer: 400,
    tolerancePercent: 2,
    hint: 'Avval Selsiy haroratini Kelvinga o‘tkazing: T = t + 273, so‘ngra P₁/T₁ = P₂/T₂ ni qo‘llang.',
    solutionSteps: [
      'T₁ = 27 + 273 = 300 K; T₂ = 327 + 273 = 600 K.',
      'Izoxorik jarayon: P₂ = P₁ · (T₂ / T₁) = 200 · (600 / 300).',
      'P₂ = 400 kPa.',
    ],
  },
  {
    id: 'ex-6',
    number: 6,
    difficulty: 'Oson',
    topic: 'Termodinamika',
    title: 'Termodinamikaning I qonuni bo‘yicha ish',
    statement:
      'Gazga 1500 J issiqlik miqdori berilganda uning ichki energiyasi 900 J ga ortdi.',
    given: ['Q = 1500 J', 'ΔU = 900 J'],
    question: 'Gaz tashqi kuchlarga qarshi necha Joul (J) ish bajargan?',
    targetSymbol: 'A',
    targetUnit: 'J',
    expectedAnswer: 600,
    tolerancePercent: 1,
    hint: 'Q = ΔU + A formulasidan A ni toping.',
    solutionSteps: [
      'Termodinamikaning I qonuni: Q = ΔU + A.',
      'A = Q − ΔU = 1500 − 900.',
      'A = 600 J.',
    ],
  },
  {
    id: 'ex-7',
    number: 7,
    difficulty: 'Murakkab',
    topic: 'Termodinamika',
    title: 'Bir atomli gazning ichki energiya o‘zgarishi',
    statement:
      'Modda miqdori ν = 4 mol bo‘lgan bir atomli geliy gazi 300 K dan 400 K gacha qizdirildi (R = 8.31 J/(mol·K)).',
    given: ['ν = 4 mol', 'T₁ = 300 K', 'T₂ = 400 K', 'i = 3'],
    question: 'Gazning ichki energiyasi necha kilojoulga (kJ) ortgan?',
    targetSymbol: 'ΔU',
    targetUnit: 'kJ',
    expectedAnswer: 4.986,
    tolerancePercent: 2.5,
    hint: 'ΔU = (3/2) · ν · R · ΔT. Natijani 1000 ga bo‘lib kJ ga o‘tkazing.',
    solutionSteps: [
      'Harorat o‘zgarishi: ΔT = 400 − 300 = 100 K.',
      'ΔU = 1.5 · 4 · 8.31 · 100 = 4986 J.',
      'Kilojoulda: ΔU = 4.986 kJ (≈ 4.99 kJ).',
    ],
  },
  {
    id: 'ex-8',
    number: 8,
    difficulty: 'Murakkab',
    topic: 'Tezlik va energiya',
    title: 'Konsentratsiya va bosim bog‘liqligi',
    statement:
      'Idishdagi gaz molekulalarining konsentratsiyasi n = 2 × 10²⁵ m⁻³, har bir molekulaning o‘rtacha ilgarilanma kinetik energiyasi esa Eₖ = 6 × 10⁻²¹ J ga teng.',
    given: ['n = 2 × 10²⁵ m⁻³', 'Eₖ = 6 × 10⁻²¹ J'],
    question: 'Idishdagi gaz bosimi necha kPa?',
    targetSymbol: 'P',
    targetUnit: 'kPa',
    expectedAnswer: 80,
    tolerancePercent: 2,
    hint: 'MKN asosiy tenglamasi: P = (2/3) · n · Eₖ.',
    solutionSteps: [
      'Formula: P = (2 / 3) · n · Eₖ.',
      'P = (2 / 3) · (2 × 10²⁵) · (6 × 10⁻²¹) = 8 × 10⁴ Pa = 80 000 Pa.',
      'Kilopaskalga o‘tkazamiz: P = 80 kPa.',
    ],
  },
];
