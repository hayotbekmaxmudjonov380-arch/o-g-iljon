export type QuizOptionKey = 'A' | 'B' | 'C' | 'D';

export interface Grade9QuizQuestion {
  id: number;
  question: string;
  options: Record<QuizOptionKey, string>;
  correctAnswer: QuizOptionKey;
}

export interface Grade9TestTopic {
  id: string;
  sectionNumber: number;
  title: string;
  questions: Grade9QuizQuestion[];
}

export interface Grade9TestChapter {
  id: string;
  title: string;
  topics: Grade9TestTopic[];
}

export const GRADE_9_TEST_CHAPTERS: Grade9TestChapter[] = [
  {
    "id": "g9-test-bob-1",
    "title": "I bob. Modda tuzilishining molekulyar-kinetik nazariyasi asoslari",
    "topics": [
      {
        "id": "g9-test-1",
        "sectionNumber": 1,
        "title": "1-§. Modda tuzilishining molekulyar-kinetik nazariyasi",
        "questions": [
          {
            "id": 1,
            "question": "Molekulyar-kinetik nazariya (MKN) nimani o‘rganadi?",
            "options": {
              "A": "Faqat jismlarning mexanik harakatini",
              "B": "Moddaning tuzilishi va xossalarini molekulalar harakati hamda ular orasidagi o‘zaro ta’sir kuchlari asosida",
              "C": "Faqat yorug‘lik hodisalarini",
              "D": "Faqat elektr zaryadlarining o‘zaro ta’sirini"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "MKN ning isbotlangan asosiy qoidalaridan biri qaysi?",
            "options": {
              "A": "Molekulalar faqat suyuqliklarda harakatlanadi",
              "B": "Moddalar uzluksiz va bo‘linmas massadan iborat",
              "C": "Moddalar atom va molekulalardan tashkil topgan",
              "D": "Molekulalar orasida faqat tortishish kuchi mavjud"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Moddaning eng kichik bo‘linmas zarrasini «atom» deb atagan va modda tuzilishi haqidagi ta’limotga asos solgan olim kim?",
            "options": {
              "A": "Galiley",
              "B": "Nyuton",
              "C": "Avogadro",
              "D": "Demokrit"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Atom va molekulalar qanday harakatda bo‘ladi?",
            "options": {
              "A": "To‘xtovsiz va tartibsiz",
              "B": "Faqat to‘g‘ri chiziq bo‘ylab bir xil tezlik bilan",
              "C": "Faqat qizdirilganda harakatlanadi",
              "D": "To‘xtovsiz va tartibli"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Atom va molekulalar orasida qanday kuchlar mavjud?",
            "options": {
              "A": "Faqat itarilish kuchlari",
              "B": "Faqat tortishish kuchlari",
              "C": "Hech qanday kuch mavjud emas",
              "D": "Bir vaqtda tortishish va itarilish kuchlari"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Xonaning bir chekkasiga sepilgan atir hidi boshqa chekkasiga darhol yetib bormaydi. Buning sababi nima?",
            "options": {
              "A": "Atir molekulalari havo molekulalari bilan ko‘p marta to‘qnashib, harakat yo‘nalishini o‘zgartiradi",
              "B": "Havo molekulalari atir molekulalariga ta’sir qilmaydi",
              "C": "Atir molekulalari harakatsiz bo‘ladi",
              "D": "Atir hidi faqat shamol ta’sirida tarqaladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Stakandagi suv ustiga sut quyilsa, ular asta-sekin aralashib ketadi. Bu hodisa nimani ko‘rsatadi?",
            "options": {
              "A": "Sut suvda erimasligini",
              "B": "Suv va sut zarralardan tashkil topgan hamda bu zarralar to‘xtovsiz tartibsiz harakatda ekanini",
              "C": "Moddalar uzluksiz tuzilishga ega ekanini",
              "D": "Suv sutdan og‘irligini"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Oltin va qo‘rg‘oshin plastinkalari uzoq vaqt ustma-ust turganda bir-biriga yopishib qoladi, atomlari esa bir-birining ichiga o‘tadi. Bu nimani ko‘rsatadi?",
            "options": {
              "A": "Oltin qo‘rg‘oshindan yengil ekanini",
              "B": "Qattiq jismlarda molekulalar harakatlanmasligini",
              "C": "Qattiq jismlarda ham diffuziya sodir bo‘lishini",
              "D": "Metallarning suyuqlanishini"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "MKN ning rivojlanishiga hissa qo‘shgan avstriyalik fizik kim?",
            "options": {
              "A": "L. Bolsman",
              "B": "J. Maksvell",
              "C": "A. Avogadro",
              "D": "O. Shtern"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "MKN qaysi asrdan boshlab uzviy nazariya sifatida rivojlana boshlagan?",
            "options": {
              "A": "XX asrdan",
              "B": "XVIII asrdan",
              "C": "XV asrdan",
              "D": "V asrdan"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-2",
        "sectionNumber": 2,
        "title": "2-§. Molekulaning massasi va o‘lchami",
        "questions": [
          {
            "id": 1,
            "question": "Moddaning kimyoviy xossalarini o‘zida saqlab qoladigan eng kichik zarra nima deyiladi?",
            "options": {
              "A": "Molekula",
              "B": "Elektron",
              "C": "Proton",
              "D": "Neytron"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Suv molekulasi qanday atomlardan tashkil topgan?",
            "options": {
              "A": "2 ta vodorod va 2 ta kislorod atomidan",
              "B": "2 ta vodorod va 1 ta kislorod atomidan",
              "C": "1 ta vodorod va 2 ta kislorod atomidan",
              "D": "1 ta vodorod va 1 ta kislorod atomidan"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Kislorod gazining molekulasi nechta atomdan iborat?",
            "options": {
              "A": "3 ta kislorod atomidan",
              "B": "4 ta kislorod atomidan",
              "C": "1 ta kislorod atomidan",
              "D": "2 ta kislorod atomidan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Tabiatda atom holda uchraydigan moddalar qaysilar?",
            "options": {
              "A": "Faqat vodorod va kislorod",
              "B": "Barcha suyuqliklar",
              "C": "Barcha gazlar",
              "D": "Metallar va inert gazlar"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Zaytun moyi tomchisi suv sirtiga eng katta yuzaga yoyilganda hosil bo‘lgan qatlam qalinligi nimaga yaqin deb olinadi?",
            "options": {
              "A": "Molekula hajmining kubiga",
              "B": "Bitta molekula diametriga",
              "C": "Avogadro doimiysiga",
              "D": "Molekula massasiga"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Hajmi 1 mm³ bo‘lgan moy tomchisi suv sirtida 0,6 m² yuzani egallasa, moy qatlami qalinligi (molekula o‘lchami) taxminan qancha bo‘ladi? (1 mm³ = 10⁻⁹ m³)",
            "options": {
              "A": "6·10⁻⁷ m",
              "B": "1,7·10⁻⁶ m",
              "C": "6·10⁻¹⁰ m",
              "D": "1,7·10⁻⁹ m"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Atomlarning o‘lchamlarini katta aniqlikda o‘lchashga imkon beradigan asbob qaysi?",
            "options": {
              "A": "Tunnelli mikroskop",
              "B": "Oddiy lupa",
              "C": "Barometr",
              "D": "Termometr"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Molekulalarni oddiy ko‘z bilan ko‘rib bo‘lmaydi, chunki...",
            "options": {
              "A": "ular harakatsiz",
              "B": "ular shaffof",
              "C": "ularning o‘lchami nihoyatda kichik",
              "D": "ularning massasi juda katta"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Oddiy molekulalarning o‘lchami qaysi tartibda bo‘ladi?",
            "options": {
              "A": "10⁻¹⁵ m",
              "B": "10⁻⁶ m",
              "C": "10⁻¹⁰ m",
              "D": "10⁻³ m"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Vodorod gazi qanday zarralardan tashkil topgan?",
            "options": {
              "A": "Alohida vodorod atomlaridan",
              "B": "Har biri 3 ta atomdan iborat molekulalardan",
              "C": "Har biri 2 ta vodorod atomidan iborat molekulalardan",
              "D": "Kislorod va vodorod molekulalaridan"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-3",
        "sectionNumber": 3,
        "title": "3-§. Modda miqdori",
        "questions": [
          {
            "id": 1,
            "question": "1 mol modda miqdori deb nimaga aytiladi?",
            "options": {
              "A": "Atom (molekula) soni 12 g uglerodda atomlar soniga teng bo‘lgan modda miqdoriga",
              "B": "Massasi 1 g bo‘lgan modda miqdoriga",
              "C": "Massasi 1 kg bo‘lgan modda miqdoriga",
              "D": "Hajmi 1 litr bo‘lgan modda miqdoriga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Avogadro doimiysining son qiymati qaysi javobda to‘g‘ri berilgan?",
            "options": {
              "A": "6,02·10²³ kg",
              "B": "6,02·10²³ mol⁻¹",
              "C": "1,38·10⁻²³ J/K",
              "D": "8,31 J/(mol·K)"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Modda miqdori qaysi harf bilan belgilanadi?",
            "options": {
              "A": "μ",
              "B": "ν (nyu)",
              "C": "N",
              "D": "M"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Molyar massaning XBS dagi birligi qaysi?",
            "options": {
              "A": "g",
              "B": "kg/mol",
              "C": "mol",
              "D": "kg"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Karbonat angidrid (CO₂) gazining molyar massasi qancha? (nisbiy molekulyar massa 44)",
            "options": {
              "A": "44 g/mol",
              "B": "32 g/mol",
              "C": "28 g/mol",
              "D": "12 g/mol"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Modda miqdorini molekulalar soni N orqali topish formulasi qaysi?",
            "options": {
              "A": "ν = N · Nₐ",
              "B": "ν = N · M",
              "C": "ν = Nₐ / N",
              "D": "ν = N / Nₐ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Bitta molekula massasi (m₀) qaysi formula bilan topiladi?",
            "options": {
              "A": "m₀ = Nₐ / M",
              "B": "m₀ = M · Nₐ",
              "C": "m₀ = ν · M",
              "D": "m₀ = M / Nₐ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "2 mol suvda nechta molekula bor?",
            "options": {
              "A": "12,04·10²³",
              "B": "3,01·10²³",
              "C": "6,02·10²³",
              "D": "18·10²³"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Massasi 36 g bo‘lgan suvning (M = 18 g/mol) modda miqdori qancha?",
            "options": {
              "A": "18 mol",
              "B": "0,5 mol",
              "C": "2 mol",
              "D": "648 mol"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "3,01·10²³ ta molekuladan iborat moddaning miqdori qancha?",
            "options": {
              "A": "5 mol",
              "B": "2 mol",
              "C": "0,5 mol",
              "D": "1 mol"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-4",
        "sectionNumber": 4,
        "title": "4-§. Masalalar yechish (modda miqdori, molekula massasi)",
        "questions": [
          {
            "id": 1,
            "question": "Massasi 64 g kislorod (M = 32 g/mol) necha mol moddaga to‘g‘ri keladi?",
            "options": {
              "A": "2 mol",
              "B": "0,5 mol",
              "C": "32 mol",
              "D": "4 mol"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "0,5 mol gazda nechta molekula bor?",
            "options": {
              "A": "12,04·10²³",
              "B": "1,5·10²³",
              "C": "3,01·10²³",
              "D": "6,02·10²³"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Vodorod molekulasining (M = 2 g/mol) massasi taxminan qancha?",
            "options": {
              "A": "1,2·10²⁴ kg",
              "B": "3,3·10⁻²⁷ kg",
              "C": "3,3·10⁻²⁴ kg",
              "D": "3,3·10⁻³⁰ kg"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Gazda 12,04·10²³ ta molekula bor. Uning modda miqdori qancha?",
            "options": {
              "A": "20 mol",
              "B": "2 mol",
              "C": "7,2 mol",
              "D": "0,2 mol"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Massasi 90 g bo‘lgan suvda (M = 18 g/mol) nechta molekula bor?",
            "options": {
              "A": "5,4·10²⁵",
              "B": "1,2·10²⁴",
              "C": "3,01·10²³",
              "D": "3,01·10²⁴"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Massasi 22 g bo‘lgan CO₂ gazining (M = 44 g/mol) modda miqdori qancha?",
            "options": {
              "A": "0,5 mol",
              "B": "0,25 mol",
              "C": "1 mol",
              "D": "2 mol"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "2 mol uglerodning (M = 12 g/mol) massasi qancha?",
            "options": {
              "A": "12 g",
              "B": "48 g",
              "C": "24 g",
              "D": "6 g"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Azot molekulasining (M = 28 g/mol) massasi taxminan qancha?",
            "options": {
              "A": "1,7·10²⁵ kg",
              "B": "4,65·10⁻²⁹ kg",
              "C": "4,65·10⁻²³ kg",
              "D": "4,65·10⁻²⁶ kg"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Geliyning (M = 4 g/mol) 0,25 mol miqdorining massasi qancha?",
            "options": {
              "A": "0,0625 g",
              "B": "16 g",
              "C": "1 g",
              "D": "4 g"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Molyar massasi 32 g/mol bo‘lgan gazning 8 g miqdoridagi modda miqdori qancha?",
            "options": {
              "A": "8 mol",
              "B": "4 mol",
              "C": "0,5 mol",
              "D": "0,25 mol"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-5",
        "sectionNumber": 5,
        "title": "5-§. Ideal gaz",
        "questions": [
          {
            "id": 1,
            "question": "Qanday gaz ideal gaz deyiladi?",
            "options": {
              "A": "Molekulalari moddiy nuqta deb qaraladigan va ular orasidagi o‘zaro ta’sir kuchlari e’tiborga olinmaydigan gaz",
              "B": "Yuqori bosimdagi har qanday gaz",
              "C": "Faqat havodan iborat gaz",
              "D": "Molekulalari bir-biri bilan kuchli ta’sirlashadigan gaz"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Qaysi gazni shartli ravishda ideal gaz deb qarash mumkin?",
            "options": {
              "A": "Kuchli siqilgan gazni",
              "B": "Suyuqlashayotgan gazni",
              "C": "Bug‘ qozonidagi gazni",
              "D": "Siyraklashtirilgan gazni"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Ideal gazda molekulani moddiy nuqta deb qarash mumkin, chunki...",
            "options": {
              "A": "molekulalar juda katta massaga ega",
              "B": "molekulalar harakatsiz",
              "C": "molekulalar orasidagi masofa ularning o‘lchamlaridan juda katta",
              "D": "molekulalar orasida kuchli tortishish bor"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Real gaz deb qanday gazga aytiladi?",
            "options": {
              "A": "Faqat inert gazlarga",
              "B": "Faqat vodorodga",
              "C": "Xossalari molekulalarining o‘zaro ta’siriga bog‘liq bo‘lgan gazga",
              "D": "Molekulalari orasida ta’sir bo‘lmagan gazga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Idish devoriga gaz bosimi nima sababdan vujudga keladi?",
            "options": {
              "A": "Gazning sovishi tufayli",
              "B": "Ko‘p sondagi molekulalarning devorga deyarli uzluksiz urilishi tufayli",
              "C": "Gaz molekulalarining og‘irligi tufayli",
              "D": "Molekulalarning bir-biriga yopishishi tufayli"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Gaz molekulalari kinetik nazariyasining asosiy tenglamasi qaysi javobda to‘g‘ri yozilgan? (n – konsentratsiya, m₀ – molekula massasi, v – o‘rtacha kvadratik tezlik)",
            "options": {
              "A": "p = (1/3)·n·m₀·v²",
              "B": "p = n·m₀·v²",
              "C": "p = (1/3)·m₀·v²",
              "D": "p = 3·n·m₀·v²"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Temperatura o‘zgarmaganda idishdagi molekulalar soni ortsa, gaz bosimi qanday o‘zgaradi?",
            "options": {
              "A": "Nolga teng bo‘ladi",
              "B": "Ortadi",
              "C": "O‘zgarmaydi",
              "D": "Kamayadi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Gaz bosimining XBS dagi birligi qaysi?",
            "options": {
              "A": "Paskal (Pa)",
              "B": "Joul (J)",
              "C": "Vatt (W)",
              "D": "Nyuton (N)"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Ideal gaz molekulalarining o‘zaro ta’sir potensial energiyasi qanday deb olinadi?",
            "options": {
              "A": "Manfiy",
              "B": "Nolga teng",
              "C": "Eng katta qiymatga teng",
              "D": "Kinetik energiyadan katta"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Gaz molekulalarining harakat tezligi qanday kattalik bilan tavsiflanadi?",
            "options": {
              "A": "Impuls moment bilan",
              "B": "Tezlanish bilan",
              "C": "Ko‘chish bilan",
              "D": "O‘rtacha kvadratik tezlik bilan"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-6",
        "sectionNumber": 6,
        "title": "6-§. Temperatura",
        "questions": [
          {
            "id": 1,
            "question": "Temperatura nimani miqdoriy tavsiflaydi?",
            "options": {
              "A": "Moddaning zichligini",
              "B": "Moddaning hajmini",
              "C": "Moddaning issiqlik darajasini",
              "D": "Moddaning massasini"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Issiqlik muvozanatida bo‘lgan sistemaning hamma qismlarida temperatura qanday bo‘ladi?",
            "options": {
              "A": "Nolga teng",
              "B": "Turlicha",
              "C": "Bir xil",
              "D": "Eng yuqori"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Absolyut nolga mos keladigan temperatura Selsiy shkalasida taxminan qancha bo‘ladi?",
            "options": {
              "A": "–100 °C",
              "B": "–273 °C",
              "C": "0 °C",
              "D": "+273 °C"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Selsiy shkalasidan Kelvin shkalasiga o‘tish formulasi qaysi?",
            "options": {
              "A": "T = t + 273",
              "B": "T = t / 273",
              "C": "T = t – 273",
              "D": "T = t · 273"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "27 °C temperatura Kelvin shkalasida qancha bo‘ladi?",
            "options": {
              "A": "327 K",
              "B": "300 K",
              "C": "246 K",
              "D": "27 K"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "400 K temperatura Selsiy shkalasida qancha bo‘ladi?",
            "options": {
              "A": "–127 °C",
              "B": "673 °C",
              "C": "127 °C",
              "D": "400 °C"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Temperaturaning XBS dagi birligi qaysi?",
            "options": {
              "A": "Joul (J)",
              "B": "Selsiy (°C)",
              "C": "Farengeyt (°F)",
              "D": "Kelvin (K)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Absolyut temperatura shkalasini 1848-yilda taklif qilgan olim kim?",
            "options": {
              "A": "Jeyms Joul",
              "B": "Isaak Nyuton",
              "C": "Anders Selsiy",
              "D": "Uilyam Tomson (Kelvin)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Termometr tana bilan tekkizilganda uning ko‘rsatishi o‘zgarmay qolishi uchun nima qaror topishi kerak?",
            "options": {
              "A": "Kimyoviy muvozanat",
              "B": "Mexanik muvozanat",
              "C": "Elektr muvozanati",
              "D": "Issiqlik muvozanati"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Turli temperaturali ikki jism bir-biriga tekkizilsa, issiqlik uzatish qanday yo‘nalishda boradi?",
            "options": {
              "A": "Yuqori temperaturali jismdan past temperaturali jismga",
              "B": "Ikkala jism ham sovuydi",
              "C": "Issiqlik uzatilmaydi",
              "D": "Past temperaturali jismdan yuqori temperaturali jismga"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-7",
        "sectionNumber": 7,
        "title": "7-§. Gaz molekulalarining harakat tezligi",
        "questions": [
          {
            "id": 1,
            "question": "Gaz molekulalarining o‘rtacha kinetik energiyasi absolyut temperatura T bilan qanday bog‘langan?",
            "options": {
              "A": "E = (2/3)·T/k",
              "B": "E = k·T²",
              "C": "E = 3·k/T",
              "D": "E = (3/2)·k·T"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Bolsman doimiysining son qiymati qancha?",
            "options": {
              "A": "8,31 J/(mol·K)",
              "B": "1,38·10⁻²³ J/K",
              "C": "6,02·10²³ mol⁻¹",
              "D": "1,6·10⁻¹⁹ C"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Universal (molyar) gaz doimiysi R ning qiymati qancha?",
            "options": {
              "A": "1,38·10⁻²³ J/K",
              "B": "9,8 m/s²",
              "C": "8,31 J/(mol·K)",
              "D": "6,02·10²³ mol⁻¹"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Universal gaz doimiysi qaysi ifoda bilan aniqlanadi?",
            "options": {
              "A": "R = Nₐ / k",
              "B": "R = k·Nₐ",
              "C": "R = k / Nₐ",
              "D": "R = k + Nₐ"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Molekulalarning o‘rtacha kvadratik tezligi qaysi formula bilan topiladi?",
            "options": {
              "A": "v = √(3RT/M)",
              "B": "v = (3RT/M)²",
              "C": "v = √(RT/(3M))",
              "D": "v = 3RT/M"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Gaz absolyut temperaturasi 4 marta ortsa, molekulalarning o‘rtacha kvadratik tezligi necha marta ortadi?",
            "options": {
              "A": "2 marta",
              "B": "8 marta",
              "C": "16 marta",
              "D": "4 marta"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Gaz molekulalari harakat tezligini 1920-yilda tajribada aniqlagan olim kim?",
            "options": {
              "A": "Lyudvig Bolsman",
              "B": "Jeyms Maksvell",
              "C": "Robert Boyl",
              "D": "Otto Shtern"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Molekulalarning tezliklar bo‘yicha taqsimotini 1859-yilda nazariy yo‘l bilan aniqlagan olim kim?",
            "options": {
              "A": "Jeyms Maksvell",
              "B": "Amedeo Avogadro",
              "C": "Benua Klapeyron",
              "D": "Otto Shtern"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Bir xil temperaturada vodorod (M = 2 g/mol) va kislorod (M = 32 g/mol) molekulalarining o‘rtacha kvadratik tezliklari nisbati v(H₂) / v(O₂) nimaga teng?",
            "options": {
              "A": "16",
              "B": "4",
              "C": "8",
              "D": "2"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "300 K temperaturada kislorod molekulalarining (M = 32 g/mol) o‘rtacha kvadratik tezligi taxminan qancha?",
            "options": {
              "A": "970 m/s",
              "B": "1930 m/s",
              "C": "483 m/s",
              "D": "240 m/s"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-8",
        "sectionNumber": 8,
        "title": "8-§. Masalalar yechish (gaz molekulalarining harakati)",
        "questions": [
          {
            "id": 1,
            "question": "Gazning zichligi 1,5 kg/m³, bosimi 180 kPa. Molekulalarning o‘rtacha kvadratik tezligi qancha? (p = ρv²/3)",
            "options": {
              "A": "600 m/s",
              "B": "1200 m/s",
              "C": "360 m/s",
              "D": "300 m/s"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "300 K temperaturada gaz molekulasining o‘rtacha kinetik energiyasi qancha? (k = 1,38·10⁻²³ J/K)",
            "options": {
              "A": "4,1·10⁻²¹ J",
              "B": "6,2·10⁻²¹ J",
              "C": "1,24·10⁻²⁰ J",
              "D": "6,2·10⁻²³ J"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Gaz molekulalarining konsentratsiyasi 2·10²⁵ m⁻³, har bir molekulaning o‘rtacha kinetik energiyasi 6·10⁻²¹ J. Gaz bosimi qancha? (p = 2nE/3)",
            "options": {
              "A": "40 kPa",
              "B": "120 kPa",
              "C": "8 kPa",
              "D": "80 kPa"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Gazning temperaturasi 27 °C dan 327 °C gacha ko‘tarildi. Molekulalarning o‘rtacha kvadratik tezligi necha marta ortadi?",
            "options": {
              "A": "2 marta",
              "B": "√2 marta",
              "C": "4 marta",
              "D": "1,5 marta"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Konsentratsiyasi 10²⁵ m⁻³ bo‘lgan gazning 300 K dagi bosimi qancha? (p = nkT)",
            "options": {
              "A": "13,8 kPa",
              "B": "4,14 kPa",
              "C": "414 kPa",
              "D": "41,4 kPa"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Zichligi 2 kg/m³ bo‘lgan gaz molekulalarining o‘rtacha kvadratik tezligi 300 m/s. Gaz bosimi qancha?",
            "options": {
              "A": "600 kPa",
              "B": "180 kPa",
              "C": "60 kPa",
              "D": "20 kPa"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Gaz temperaturasi (kelvinda) 2 marta ortdi. Molekulaning o‘rtacha kinetik energiyasi qanday o‘zgaradi?",
            "options": {
              "A": "√2 marta ortadi",
              "B": "4 marta ortadi",
              "C": "O‘zgarmaydi",
              "D": "2 marta ortadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Boshqa sharoit o‘zgarmaganda gaz molekulalarining konsentratsiyasi 2 marta ortsa, gaz bosimi qanday o‘zgaradi?",
            "options": {
              "A": "4 marta ortadi",
              "B": "O‘zgarmaydi",
              "C": "2 marta ortadi",
              "D": "2 marta kamayadi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "10²³ ta molekulaning har birining o‘rtacha kinetik energiyasi 6·10⁻²¹ J. Barcha molekulalar kinetik energiyalarining yig‘indisi qancha?",
            "options": {
              "A": "600 J",
              "B": "6000 J",
              "C": "60 J",
              "D": "6 J"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "400 K temperaturada geliy molekulalarining (M = 4 g/mol) o‘rtacha kvadratik tezligi taxminan qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "500 m/s",
              "B": "3160 m/s",
              "C": "1580 m/s",
              "D": "790 m/s"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-9",
        "sectionNumber": 9,
        "title": "9-§. Ideal gaz holatining tenglamalari",
        "questions": [
          {
            "id": 1,
            "question": "Mendeleyev–Klapeyron tenglamasi qaysi javobda to‘g‘ri yozilgan?",
            "options": {
              "A": "pV = mRT·M",
              "B": "p = (m/M)·RT·V",
              "C": "pV = (M/m)·RT",
              "D": "pV = (m/M)·RT"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Ideal gazning termodinamik holati qaysi uchta makroskopik parametr bilan tavsiflanadi?",
            "options": {
              "A": "Energiya, impuls, kuch",
              "B": "Bosim, hajm, temperatura",
              "C": "Bosim, zichlik, massa",
              "D": "Massa, zichlik, tezlik"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Modda miqdori 1 mol bo‘lgan ideal gaz uchun holat tenglamasi qaysi?",
            "options": {
              "A": "pV = RT",
              "B": "pV = R + T",
              "C": "p = RT·V",
              "D": "pV = R/T"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Massasi o‘zgarmas bo‘lgan gaz bir holatdan boshqa holatga o‘tganda qaysi munosabat bajariladi?",
            "options": {
              "A": "p₁T₁/V₁ = p₂T₂/V₂",
              "B": "p₁V₁·T₁ = p₂V₂·T₂",
              "C": "p₁V₁/T₁ = p₂V₂/T₂",
              "D": "p₁/V₁ = p₂/V₂"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Ideal gaz holat tenglamasini keltirib chiqargan olimlar kimlar?",
            "options": {
              "A": "R. Boyl va E. Mariott",
              "B": "J. Sharl va Gey-Lyussak",
              "C": "D. Mendeleyev va B. Klapeyron",
              "D": "G. Galiley va I. Nyuton"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Gaz bosimi p, molekulalar konsentratsiyasi n va temperatura T orasidagi bog‘lanish qaysi?",
            "options": {
              "A": "p = n·k·T",
              "B": "p = n / (k·T)",
              "C": "p = n·k / T",
              "D": "p = k·T / n"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Modda miqdori 2 mol, temperaturasi 300 K, hajmi 0,05 m³ bo‘lgan ideal gazning bosimi taxminan qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "49,9 kPa",
              "B": "99,7 kPa",
              "C": "199 kPa",
              "D": "9,97 kPa"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Gaz bosimi ham, absolyut temperaturasi ham 2 marta ortsa (massa o‘zgarmas), uning hajmi qanday o‘zgaradi?",
            "options": {
              "A": "2 marta kamayadi",
              "B": "2 marta ortadi",
              "C": "4 marta ortadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Hajmi 10 l, temperaturasi 300 K, bosimi 249,3 kPa bo‘lgan gazning modda miqdori qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "0,5 mol",
              "B": "1 mol",
              "C": "2 mol",
              "D": "10 mol"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Ideal gaz holat tenglamasiga ko‘ra gazning massasi qaysi formula bilan topiladi?",
            "options": {
              "A": "m = pVM / (RT)",
              "B": "m = pV·RT / M",
              "C": "m = RT / (pVM)",
              "D": "m = M·R / (pVT)"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-10",
        "sectionNumber": 10,
        "title": "10-§. Izotermik jarayon",
        "questions": [
          {
            "id": 1,
            "question": "Qanday jarayon izotermik jarayon deyiladi?",
            "options": {
              "A": "Gaz massasi va hajmi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "B": "Gaz massasi va bosimi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "C": "Gaz massasi va temperaturasi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "D": "Gaz bilan issiqlik almashinuvi bo‘lmaydigan jarayon"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Izotermik jarayon uchun qaysi qonun o‘rinli?",
            "options": {
              "A": "Avogadro qonuni",
              "B": "Boyl–Mariott qonuni: pV = const",
              "C": "Sharl qonuni: p/T = const",
              "D": "Gey-Lyussak qonuni: V/T = const"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Izotermik jarayon qonunini mustaqil ravishda kashf qilgan olimlar kimlar?",
            "options": {
              "A": "R. Boyl va E. Mariott",
              "B": "A. Avogadro va J. Dalton",
              "C": "J. Sharl va Gey-Lyussak",
              "D": "D. Mendeleyev va B. Klapeyron"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Izotermada bosimning hajmga bog‘lanish grafigi (p–V koordinatalarida) qanday chiziq bo‘ladi?",
            "options": {
              "A": "Giperbola",
              "B": "To‘g‘ri chiziq",
              "C": "Aylana",
              "D": "Parabola"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Temperatura o‘zgarmaganda gaz izotermik siqilsa, uning bosimi qanday o‘zgaradi?",
            "options": {
              "A": "Kamayadi",
              "B": "O‘zgarmaydi",
              "C": "Avval ortib, keyin kamayadi",
              "D": "Ortadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Gazning dastlabki hajmi 24 cm³, bosimi 0,8 MPa. Gaz izotermik siqilib, hajmi 16 cm³ ga keldi. Uning bosimi qancha bo‘ldi?",
            "options": {
              "A": "1,6 MPa",
              "B": "0,53 MPa",
              "C": "0,6 MPa",
              "D": "1,2 MPa"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Normal atmosfera bosimida ideal gaz 50 l hajmni egallaydi. Temperatura o‘zgarmaganda bosim 4 marta ortsa, gaz qancha hajmni egallaydi?",
            "options": {
              "A": "46 l",
              "B": "25 l",
              "C": "200 l",
              "D": "12,5 l"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Izotermik jarayonda gazning hajmi 3 marta kamaysa, bosimi qanday o‘zgaradi?",
            "options": {
              "A": "9 marta ortadi",
              "B": "3 marta ortadi",
              "C": "3 marta kamayadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Gaz temperaturasini o‘zgarmas saqlash uchun gaz solingan idish qanday maxsus idishga joylashtiriladi?",
            "options": {
              "A": "Kalorimetrga",
              "B": "Manometrga",
              "C": "Termostatga",
              "D": "Barometrga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Ideal gaz 1,2 l dan 0,8 l gacha izotermik siqildi, bunda bosim 40 kPa ga ortdi. Gazning dastlabki bosimi qancha bo‘lgan?",
            "options": {
              "A": "120 kPa",
              "B": "40 kPa",
              "C": "80 kPa",
              "D": "100 kPa"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-11",
        "sectionNumber": 11,
        "title": "11-§. Izobarik jarayon",
        "questions": [
          {
            "id": 1,
            "question": "Qanday jarayon izobarik jarayon deyiladi?",
            "options": {
              "A": "Gaz massasi va temperaturasi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "B": "Gaz massasi va bosimi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "C": "Gaz massasi va hajmi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "D": "Gaz bilan issiqlik almashinuvi bo‘lmaydigan jarayon"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Izobarik jarayon qonuni qaysi javobda to‘g‘ri yozilgan?",
            "options": {
              "A": "p/T = const",
              "B": "V·T = const",
              "C": "pV = const",
              "D": "V/T = const"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Izobarik jarayon qonunini 1802-yilda tajribada kim topgan?",
            "options": {
              "A": "Boyl",
              "B": "Mariott",
              "C": "Gey-Lyussak",
              "D": "Sharl"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "«Baros» yunoncha so‘zi qanday ma’noni bildiradi?",
            "options": {
              "A": "Hajm",
              "B": "Bosim",
              "C": "Issiq",
              "D": "Teng"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Bosim o‘zgarmaganda gazning absolyut temperaturasi 2 marta ortsa, uning hajmi qanday o‘zgaradi?",
            "options": {
              "A": "4 marta ortadi",
              "B": "2 marta ortadi",
              "C": "2 marta kamayadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Gazning hajmi 2 l, temperaturasi 280 K. Bosim o‘zgarmaganda gaz 350 K gacha qizdirilsa, uning hajmi qancha bo‘ladi?",
            "options": {
              "A": "2,5 l",
              "B": "2,8 l",
              "C": "1,6 l",
              "D": "3,5 l"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Gaz bosimi o‘zgarmaganda 27 °C dan 127 °C gacha qizdirildi. Uning hajmi necha marta ortadi?",
            "options": {
              "A": "4/3 marta",
              "B": "1,5 marta",
              "C": "2 marta",
              "D": "127/27 marta"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Izobarik jarayonda gaz hajmi 3 marta ortishi uchun uning dastlabki 100 K temperaturasi qanchagacha oshirilishi kerak?",
            "options": {
              "A": "400 K",
              "B": "200 K",
              "C": "300 K",
              "D": "33 K"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Izobarik jarayonda hajmning absolyut temperaturaga bog‘lanish grafigi (V–T) qanday chiziq bo‘ladi?",
            "options": {
              "A": "Koordinata boshidan chiquvchi to‘g‘ri chiziq",
              "B": "Abssissa o‘qiga parallel to‘g‘ri chiziq",
              "C": "Giperbola",
              "D": "Parabola"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Erkin siljiy oladigan porshenli silindrdagi gaz qizdirilganda sodir bo‘ladigan jarayon qanday jarayon?",
            "options": {
              "A": "Qaytar",
              "B": "Izotermik",
              "C": "Izoxorik",
              "D": "Izobarik"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-12",
        "sectionNumber": 12,
        "title": "12-§. Izoxorik jarayon",
        "questions": [
          {
            "id": 1,
            "question": "Qanday jarayon izoxorik jarayon deyiladi?",
            "options": {
              "A": "Gaz massasi va bosimi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "B": "Gaz massasi va temperaturasi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "C": "Gaz massasi va hajmi o‘zgarmas bo‘lgandagi holat o‘zgarishi",
              "D": "Gaz bosimi nolga teng bo‘lgandagi jarayon"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Izoxorik jarayon qonuni qaysi javobda to‘g‘ri yozilgan?",
            "options": {
              "A": "p/T = const",
              "B": "V/T = const",
              "C": "pV = const",
              "D": "p·T = const"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Izoxorik jarayon qonunini 1787-yilda tajribada kim topgan?",
            "options": {
              "A": "Gey-Lyussak",
              "B": "Jak Sharl",
              "C": "Robert Boyl",
              "D": "Edm Mariott"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "«Xoros» yunoncha so‘zi qanday ma’noni bildiradi?",
            "options": {
              "A": "Bosim",
              "B": "Issiqlik",
              "C": "Hajm",
              "D": "Temperatura"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Hajm o‘zgarmaganda gazning absolyut temperaturasi 2 marta ortsa, bosimi qanday o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "2 marta ortadi",
              "C": "4 marta ortadi",
              "D": "2 marta kamayadi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Gaz 280 K dan 540 K gacha izoxorik qizdirilganda uning bosimi 39 kPa ga ortdi. Gazning dastlabki bosimi qancha bo‘lgan?",
            "options": {
              "A": "42 kPa",
              "B": "21 kPa",
              "C": "39 kPa",
              "D": "81 kPa"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Izoxora chizig‘i (p–T koordinatalarida) qanday ko‘rinishda bo‘ladi?",
            "options": {
              "A": "Ordinata o‘qiga parallel to‘g‘ri chiziq",
              "B": "Giperbola",
              "C": "Koordinata boshidan chiquvchi to‘g‘ri chiziq",
              "D": "Aylana"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Germetik yopiq idishda yoki elektr lampochkasida isitilgan gaz bosimining ortishi qanday jarayon hisoblanadi?",
            "options": {
              "A": "Izobarik",
              "B": "Qaytar",
              "C": "Izotermik",
              "D": "Izoxorik"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Berk idishdagi gaz 27 °C dan 327 °C gacha qizdirilsa, uning bosimi necha marta ortadi?",
            "options": {
              "A": "12 marta",
              "B": "1,2 marta",
              "C": "4 marta",
              "D": "2 marta"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Gaz 300 K dan 420 K gacha izoxorik qizdirilganda uning bosimi 50 kPa ga ortdi. Gazning dastlabki bosimi qancha bo‘lgan?",
            "options": {
              "A": "175 kPa",
              "B": "62,5 kPa",
              "C": "50 kPa",
              "D": "125 kPa"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-13",
        "sectionNumber": 13,
        "title": "13-§. Amaliy mashg‘ulot. Molekulalarning o‘lchamini baholash",
        "questions": [
          {
            "id": 1,
            "question": "Amaliy mashg‘ulotning maqsadi nima?",
            "options": {
              "A": "Moy qatlami qalinligi bitta molekula diametriga yaqin degan tasavvurni mexanik model asosida tekshirish",
              "B": "Issiqlik sig‘imini aniqlash",
              "C": "Jism zichligini aniqlash",
              "D": "Gaz bosimini o‘lchash"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Mashg‘ulotda molekula modeli sifatida nimadan foydalaniladi?",
            "options": {
              "A": "Metall sharchalardan",
              "B": "Suv tomchilaridan",
              "C": "No‘xat donalaridan",
              "D": "Magnit sterjenlardan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Chizilgan to‘g‘ri to‘rtburchakning yuzasi qanday topiladi?",
            "options": {
              "A": "Perimetrini ikkiga bo‘lib",
              "B": "Bo‘yini eniga ko‘paytirib",
              "C": "Bo‘yini eniga bo‘lib",
              "D": "Bo‘yini eniga qo‘shib"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "To‘rtburchak ichiga no‘xat donalari zich qilib bir qavat joylashtiriladi. Hosil bo‘lgan qatlam qalinligi nimaga teng deb olinadi?",
            "options": {
              "A": "No‘xat donalarining umumiy massasiga",
              "B": "To‘rtburchak perimetriga",
              "C": "Bitta no‘xat doni diametriga",
              "D": "To‘rtburchak diagonaliga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "No‘xat donalarining umumiy hajmi qaysi asbob yordamida o‘lchanadi?",
            "options": {
              "A": "Termometr",
              "B": "Menzurka",
              "C": "Barometr",
              "D": "Dinamometr"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "No‘xat donalarining hajmi 20 cm³, ular egallagan yuza 40 cm². Qatlam qalinligi (d = V/S) qancha?",
            "options": {
              "A": "2 cm",
              "B": "800 cm",
              "C": "0,05 cm",
              "D": "0,5 cm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Nima uchun no‘xat donalari chizilgan to‘rtburchakdan tashqariga chiqib ketmasligi kerak?",
            "options": {
              "A": "Qog‘oz yirtilmasligi uchun",
              "B": "Yuza va hajm nisbati to‘g‘ri aniqlanishi uchun",
              "C": "Donalar yo‘qolmasligi uchun",
              "D": "Hech qanday ahamiyati yo‘q"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Qalinlikni hisoblash uchun qaysi formuladan foydalaniladi?",
            "options": {
              "A": "d = V · S",
              "B": "d = V + S",
              "C": "d = S / V",
              "D": "d = V / S"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Idishning yarmiga oq, yarmiga qora sharchalar solib silkitilganda ular aralashib ketadi. Bu mexanik model nimani tasvirlaydi?",
            "options": {
              "A": "Molekulalarning tartibsiz harakati natijasida aralashishni (diffuziyani)",
              "B": "Jismlarning issiqlik o‘tkazuvchanligini",
              "C": "Molekulalarning bir-biridan itarilishini",
              "D": "Gazning kengayishini"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Mashg‘ulot xulosasiga ko‘ra molekula o‘lchamini baholash uchun nimani bilish kerak?",
            "options": {
              "A": "Moddaning hajmi va u egallagan eng katta yuzani",
              "B": "Moddaning issiqlik sig‘imini",
              "C": "Moddaning erish temperaturasini",
              "D": "Moddaning rangi va hidini"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-14",
        "sectionNumber": 14,
        "title": "14-§. Masalalar yechish (gaz qonunlari)",
        "questions": [
          {
            "id": 1,
            "question": "Ballondagi gaz 17 °C da 1,45·10⁵ Pa bosimga ega. Qanday temperaturada uning bosimi 2·10⁵ Pa bo‘ladi? (hajm o‘zgarmas, T = t + 273)",
            "options": {
              "A": "210 K",
              "B": "527 K",
              "C": "400 K",
              "D": "290 K"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Gaz hajmi 4 l, temperaturasi 300 K. Bosim o‘zgarmaganda uni 450 K gacha qizdirilsa, hajmi qancha bo‘ladi?",
            "options": {
              "A": "2,7 l",
              "B": "6 l",
              "C": "4,5 l",
              "D": "8 l"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Hajmi 2 l bo‘lgan gaz 150 kPa bosim ostida turibdi. Temperatura o‘zgarmaganda hajm 0,5 l gacha kamaytirilsa, bosim qancha bo‘ladi?",
            "options": {
              "A": "37,5 kPa",
              "B": "300 kPa",
              "C": "600 kPa",
              "D": "150 kPa"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Gazning hajmi 10 l, bosimi 100 kPa, temperaturasi 300 K. Gaz hajmi 5 l gacha kamaytirilib, temperaturasi 600 K gacha oshirilsa, bosimi qancha bo‘ladi?",
            "options": {
              "A": "100 kPa",
              "B": "800 kPa",
              "C": "200 kPa",
              "D": "400 kPa"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Berk idishdagi gaz bosimi 100 kPa, temperaturasi 27 °C. Gaz 327 °C gacha qizdirilsa, bosimi qancha bo‘ladi?",
            "options": {
              "A": "109 kPa",
              "B": "50 kPa",
              "C": "200 kPa",
              "D": "1200 kPa"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Hajmi 2 l, bosimi 249,3 kPa, temperaturasi 300 K bo‘lgan geliyning (M = 4 g/mol) massasi qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "0,2 g",
              "B": "3,2 g",
              "C": "8 g",
              "D": "0,8 g"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Gazning bosimi 100 kPa, temperaturasi 300 K. Molekulalar konsentratsiyasi taxminan qancha? (k = 1,38·10⁻²³ J/K)",
            "options": {
              "A": "2,4·10²³ m⁻³",
              "B": "1,4·10²⁸ m⁻³",
              "C": "4,1·10⁻²⁶ m⁻³",
              "D": "2,4·10²⁵ m⁻³"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Gazning hajmi 2 marta, absolyut temperaturasi ham 2 marta ortdi. Bosim qanday o‘zgardi (massa o‘zgarmas)?",
            "options": {
              "A": "O‘zgarmadi",
              "B": "4 marta ortdi",
              "C": "2 marta ortdi",
              "D": "2 marta kamaydi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "p–T koordinatalarida koordinata boshidan chiquvchi to‘g‘ri chiziq qanday jarayonni tasvirlaydi?",
            "options": {
              "A": "Izobarik jarayonni",
              "B": "Izoxorik jarayonni",
              "C": "Qaytmas jarayonni",
              "D": "Izotermik jarayonni"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Gaz holati p₁V₁/T₁ = p₂V₂/T₂ tenglama bilan ifodalanadi. Qaysi shartda bu tenglama Boyl–Mariott qonuniga aylanadi?",
            "options": {
              "A": "T₁ = T₂ bo‘lganda",
              "B": "m o‘zgarganda",
              "C": "V₁ = V₂ bo‘lganda",
              "D": "p₁ = p₂ bo‘lganda"
            },
            "correctAnswer": "A"
          }
        ]
      }
    ]
  },
  {
    "id": "g9-test-bob-2",
    "title": "II bob. Ichki energiya va termodinamika elementlari",
    "topics": [
      {
        "id": "g9-test-15",
        "sectionNumber": 15,
        "title": "15-§. Ichki energiya",
        "questions": [
          {
            "id": 1,
            "question": "Termodinamika jismlarning xossalarini qaysi nuqtayi nazardan o‘rganadi?",
            "options": {
              "A": "Faqat optik xossalari nuqtayi nazaridan",
              "B": "Faqat molekulalar tuzilishi nuqtayi nazaridan",
              "C": "Energiya almashinishi nuqtayi nazaridan",
              "D": "Faqat elektr xossalari nuqtayi nazaridan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Jismning ichki energiyasi nimaga teng?",
            "options": {
              "A": "Jismning mexanik harakat energiyasiga",
              "B": "Faqat molekulalarning potensial energiyasiga",
              "C": "Jismni tashkil etgan barcha zarralarning kinetik va potensial energiyalari yig‘indisiga",
              "D": "Jismning yerga nisbatan potensial energiyasiga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Ideal gazning ichki energiyasi nimalardan iborat?",
            "options": {
              "A": "Faqat potensial energiyadan",
              "B": "Faqat molekulalarning tartibsiz harakati kinetik energiyalari yig‘indisidan",
              "C": "Nolga teng",
              "D": "Kinetik va potensial energiyalar yig‘indisidan"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Bir atomli ideal gazning ichki energiyasi qaysi formula bilan topiladi?",
            "options": {
              "A": "U = (3/2)·ν·R·T",
              "B": "U = ν·R·T²",
              "C": "U = 3·ν·R·T",
              "D": "U = (2/3)·ν·R/T"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Ideal gaz temperaturasi ortsa, uning ichki energiyasi qanday o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "Ortadi",
              "C": "Kamayadi",
              "D": "Nolga teng bo‘ladi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "300 K temperaturadagi 2 mol bir atomli ideal gazning ichki energiyasi taxminan qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "7,5 kJ",
              "B": "5 kJ",
              "C": "15 kJ",
              "D": "2,5 kJ"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Sistemaning ichki energiyasi qanday usullar bilan o‘zgartirilishi mumkin?",
            "options": {
              "A": "Faqat sovitish orqali",
              "B": "Faqat ish bajarish orqali",
              "C": "Faqat qizdirish orqali",
              "D": "Ish bajarish va issiqlik almashinish orqali"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Ideal gazning ichki energiyasi nimaga bog‘liq?",
            "options": {
              "A": "Faqat absolyut temperaturaga va modda miqdoriga",
              "B": "Idishning shakliga",
              "C": "Faqat bosimiga",
              "D": "Faqat hajmiga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Ideal gaz absolyut temperaturasi 3 marta ortsa, uning ichki energiyasi necha marta ortadi?",
            "options": {
              "A": "√3 marta",
              "B": "9 marta",
              "C": "6 marta",
              "D": "3 marta"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "1 mol bir atomli ideal gaz 100 K ga qizdirilsa, uning ichki energiyasi qancha ortadi? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "Taxminan 12,5 kJ ga",
              "B": "Taxminan 1,25 kJ ga",
              "C": "Taxminan 2,5 kJ ga",
              "D": "Taxminan 0,83 kJ ga"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-16",
        "sectionNumber": 16,
        "title": "16-§. Termodinamik ish",
        "questions": [
          {
            "id": 1,
            "question": "Termodinamik ish deb nimaga aytiladi?",
            "options": {
              "A": "Gaz hajmi o‘zgarganda uning tashqi kuchlarga qarshi bajargan ishiga",
              "B": "Ishqalanish kuchining bajargan ishiga",
              "C": "Elektr tokining bajargan ishiga",
              "D": "Jismning yer sirtidan ko‘tarilishida bajarilgan ishga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Gazning izobarik kengayishida bajargan ishi qaysi formula bilan topiladi?",
            "options": {
              "A": "A = ΔV / p",
              "B": "A = p / ΔV",
              "C": "A = p + ΔV",
              "D": "A = p·ΔV"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Gaz kengayganda uning bajargan ishi qanday bo‘ladi?",
            "options": {
              "A": "Manfiy",
              "B": "Musbat",
              "C": "Nolga teng",
              "D": "Cheksiz katta"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Gaz siqilganda qanday ish bajariladi?",
            "options": {
              "A": "Hech qanday ish bajarilmaydi",
              "B": "Gaz juda katta ish bajaradi",
              "C": "Tashqi kuchlar gaz ustida ish bajaradi",
              "D": "Gaz ichki energiyasini yo‘qotadi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Izobarik jarayonda gazning bajargan ishini temperatura o‘zgarishi orqali ifodalovchi formula qaysi?",
            "options": {
              "A": "A = (M/m)·R·ΔT",
              "B": "A = (m/M)·R·ΔT",
              "C": "A = R / ΔT",
              "D": "A = (m/M)·ΔT / R"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Ideal gaz 100 kPa bosim ostida izobarik kengayib, hajmi 100 cm³ dan 300 cm³ gacha ortdi. Gaz qancha ish bajargan?",
            "options": {
              "A": "30 J",
              "B": "2000 J",
              "C": "10 J",
              "D": "20 J"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "160 kPa bosim ostida turgan gaz izobarik kengayib, 48 kJ ish bajardi. Gaz hajmi qanchaga ortgan?",
            "options": {
              "A": "3 m³",
              "B": "0,03 m³",
              "C": "0,3 m³",
              "D": "7,68 m³"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "2 mol ideal gaz izobarik 50 K ga qizdirildi. Gaz qancha ish bajargan? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "415 J",
              "B": "8310 J",
              "C": "831 J",
              "D": "1662 J"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Gazning hajmi o‘zgarmaydigan (izoxorik) jarayonda gaz bajargan ish qancha?",
            "options": {
              "A": "Nolga teng",
              "B": "Eng katta qiymatga ega",
              "C": "Bosimga teng",
              "D": "Manfiy"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Izobarik jarayonning p–V grafigida gaz bajargan ish nimaga teng?",
            "options": {
              "A": "Grafikning og‘ish burchagiga",
              "B": "Koordinatalar boshidan masofaga",
              "C": "Grafikning uzunligiga",
              "D": "Grafik ostidagi to‘g‘ri to‘rtburchak yuzasiga"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-17",
        "sectionNumber": 17,
        "title": "17-§. Issiqlik miqdori",
        "questions": [
          {
            "id": 1,
            "question": "Ish bajarmasdan bir jismdan boshqa jismga energiya uzatish jarayoni qanday ataladi?",
            "options": {
              "A": "Kondensatsiya",
              "B": "Issiqlik almashinuvi (issiqlik uzatish)",
              "C": "Termodinamik ish",
              "D": "Diffuziya"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Issiqlik miqdori nima?",
            "options": {
              "A": "Issiqlik almashinish jarayonida jism olgan yoki yo‘qotgan ichki energiya miqdori",
              "B": "Jismning massasi",
              "C": "Jismning temperaturasi",
              "D": "Jismning mexanik energiyasi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Jismni qizdirish uchun zarur issiqlik miqdori qaysi formula bilan hisoblanadi?",
            "options": {
              "A": "Q = c·m·ΔT",
              "B": "Q = c·ΔT / m",
              "C": "Q = c + m + ΔT",
              "D": "Q = m / (c·ΔT)"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Solishtirma issiqlik sig‘imining XBS dagi birligi qaysi?",
            "options": {
              "A": "J·kg·K",
              "B": "kg/J",
              "C": "J/(kg·K)",
              "D": "W/m"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Suvning solishtirma issiqlik sig‘imi qancha?",
            "options": {
              "A": "460 J/(kg·K)",
              "B": "890 J/(kg·K)",
              "C": "4200 J/(kg·K)",
              "D": "380 J/(kg·K)"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Solishtirma issiqlik sig‘imi nimani bildiradi?",
            "options": {
              "A": "1 kg moddani eritish uchun zarur issiqlik miqdorini",
              "B": "1 kg yoqilg‘i yonganda ajralgan issiqlikni",
              "C": "1 kg moddani bug‘latish uchun zarur issiqlik miqdorini",
              "D": "1 kg moddaning temperaturasini 1 K ga o‘zgartirish uchun zarur issiqlik miqdorini"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "2 kg suv 10 °C dan 60 °C gacha qizdirildi. Qancha issiqlik miqdori sarflangan? (c = 4200 J/(kg·K))",
            "options": {
              "A": "420 kJ",
              "B": "42 kJ",
              "C": "210 kJ",
              "D": "840 kJ"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Massasi 0,5 kg va solishtirma issiqlik sig‘imi 450 J/(kg·K) bo‘lgan jism 20 K ga qizdirildi. Jism qancha issiqlik oladi?",
            "options": {
              "A": "45000 J",
              "B": "225 J",
              "C": "9000 J",
              "D": "4500 J"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Issiqlik miqdorining XBS dagi birligi qaysi?",
            "options": {
              "A": "Vatt",
              "B": "Joul",
              "C": "Paskal",
              "D": "Nyuton"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Issiqlik balansi tenglamasiga ko‘ra, issiqlik almashinuvida qatnashayotgan jismlar (tashqariga issiqlik yo‘qotilmasa)...",
            "options": {
              "A": "ikkala jism ham issiqlik beradi",
              "B": "bir jism bergan issiqlik miqdori ikkinchi jism olgan issiqlik miqdoriga teng",
              "C": "issiqlik miqdori ortadi",
              "D": "ikkala jism ham issiqlik oladi"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-18",
        "sectionNumber": 18,
        "title": "18-§. Masalalar yechish (issiqlik miqdori)",
        "questions": [
          {
            "id": 1,
            "question": "3 kg suvni 20 °C dan 100 °C gacha qizdirish uchun qancha issiqlik kerak? (c = 4200 J/(kg·K))",
            "options": {
              "A": "1008 kJ",
              "B": "252 kJ",
              "C": "1260 kJ",
              "D": "504 kJ"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Massasi 2 kg, temperaturasi 80 °C bo‘lgan suv bilan massasi 2 kg, temperaturasi 20 °C bo‘lgan suv aralashtirildi. Aralashmaning temperaturasi qancha bo‘ladi?",
            "options": {
              "A": "50 °C",
              "B": "40 °C",
              "C": "100 °C",
              "D": "60 °C"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "1 kg 100 °C li suv 3 kg 20 °C li suv bilan aralashtirilsa, aralashma temperaturasi qancha bo‘ladi?",
            "options": {
              "A": "60 °C",
              "B": "30 °C",
              "C": "40 °C",
              "D": "80 °C"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Massasi 0,2 kg bo‘lgan jismni 10 K ga qizdirish uchun 8400 J issiqlik sarflandi. Jismning solishtirma issiqlik sig‘imi qancha?",
            "options": {
              "A": "1680 J/(kg·K)",
              "B": "840 J/(kg·K)",
              "C": "42000 J/(kg·K)",
              "D": "4200 J/(kg·K)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Massasi 0,5 kg bo‘lgan po‘lat (c = 460 J/(kg·K)) 100 °C dan 20 °C gacha soviganda qancha issiqlik ajraladi?",
            "options": {
              "A": "9,2 kJ",
              "B": "4,6 kJ",
              "C": "23 kJ",
              "D": "18,4 kJ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Massalari teng suv (c = 4200) va temir (c = 460) ga bir xil issiqlik miqdori berildi. Qaysi biri ko‘proq qiziydi?",
            "options": {
              "A": "Aniqlab bo‘lmaydi",
              "B": "Ikkalasi bir xil",
              "C": "Temir",
              "D": "Suv"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "42 kJ issiqlik 2 kg suvning temperaturasini necha kelvinga oshiradi? (c = 4200 J/(kg·K))",
            "options": {
              "A": "20 K",
              "B": "5 K",
              "C": "2,5 K",
              "D": "10 K"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "5 kg suv 1 K ga sovishda qancha issiqlik ajratadi? (c = 4200 J/(kg·K))",
            "options": {
              "A": "2,1 kJ",
              "B": "4,2 kJ",
              "C": "21 kJ",
              "D": "42 kJ"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Massasi 2 kg bo‘lgan mis (c = 380 J/(kg·K)) ga 15200 J issiqlik berildi. U necha kelvinga qiziydi?",
            "options": {
              "A": "10 K",
              "B": "20 K",
              "C": "8 K",
              "D": "40 K"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Issiqlik balansi tenglamasi qaysi javobda to‘g‘ri yozilgan?",
            "options": {
              "A": "Q₁ · Q₂ = 1",
              "B": "Q₁ / Q₂ = m",
              "C": "Q₁ – Q₂ = c",
              "D": "Q₁ + Q₂ + … = 0 (olingan va berilgan issiqlik algebraik yig‘indisi nolga teng)"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-19",
        "sectionNumber": 19,
        "title": "19-§. Amaliy mashg‘ulot. Jismlarda issiqlik muvozanatini o‘rganish",
        "questions": [
          {
            "id": 1,
            "question": "Mashg‘ulotning maqsadi nima?",
            "options": {
              "A": "Gaz bosimini aniqlash",
              "B": "Issiqlik muvozanatining yuzaga kelish jarayonini o‘rganish",
              "C": "Yorug‘lik tezligini o‘lchash",
              "D": "Suyuqlik zichligini aniqlash"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Issiq suv ichiga sovuq suvli paket tushirilganda temperaturalar qanday o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "Ikkalasi ham isiydi",
              "C": "Issiq suv soviydi, sovuq suv isiydi",
              "D": "Ikkalasi ham soviydi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Muvozanat yuzaga kelgandagi umumiy temperatura issiq va sovuq suv boshlang‘ich temperaturalariga nisbatan qanday bo‘ladi?",
            "options": {
              "A": "Ular orasida bo‘ladi",
              "B": "Nolga teng bo‘ladi",
              "C": "Issiq suvnikidan yuqori bo‘ladi",
              "D": "Sovuq suvnikidan past bo‘ladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Sovuq suv nima uchun polietilen paketga solinadi?",
            "options": {
              "A": "Paket suvni isitadi",
              "B": "Suv bug‘lanib ketmasligi uchun",
              "C": "Suv rangini ko‘rsatish uchun",
              "D": "Issiq va sovuq suv aralashib ketmay, faqat issiqlik almashinuvi kuzatilishi uchun"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Mashg‘ulotda temperaturani o‘lchash uchun qaysi asbob ishlatiladi?",
            "options": {
              "A": "Voltmetr",
              "B": "Manometr",
              "C": "Termometr",
              "D": "Dinamometr"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Termodinamik muvozanat yuzaga kelgandan keyin termometrlarning ko‘rsatishi qanday bo‘ladi?",
            "options": {
              "A": "Tebranib turadi",
              "B": "Bir xil va o‘zgarmas",
              "C": "Doimo kamayib boradi",
              "D": "Doimo o‘sib boradi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Mashg‘ulotda kuzatilgan natijalarni qanday qayd etamiz?",
            "options": {
              "A": "Faqat oxirgi natijani yodda saqlaymiz",
              "B": "Har bir minutda termometr ko‘rsatishini jadvalga yozamiz",
              "C": "Faqat sovuq suv temperaturasini yozamiz",
              "D": "Natijani yozmaymiz"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Grafikda issiq suvning sovishi va sovuq suvning isishi vaqt bo‘yicha tasvirlansa, ikki egri chiziq qanday holatga keladi?",
            "options": {
              "A": "Muvozanat temperaturasida yaqinlashib, tutashadi",
              "B": "Bir-biridan uzoqlashadi",
              "C": "Parallel bo‘lib qoladi",
              "D": "Kesishmaydi va uzilib qoladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Issiqlik muvozanati qaror topganda jismlar orasidagi issiqlik almashinuvi...",
            "options": {
              "A": "to‘xtaydi (sof issiqlik oqimi bo‘lmaydi)",
              "B": "issiq jismdan sovuqqa kuchayadi",
              "C": "faqat sovuq jismdan issiqqa boradi",
              "D": "tezlashadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Issiq suv 80 °C, sovuq suv 20 °C. Muvozanat temperaturasi qaysi oraliqda bo‘ladi?",
            "options": {
              "A": "100 °C dan yuqori",
              "B": "80 °C dan yuqori",
              "C": "20 °C dan past",
              "D": "20 °C va 80 °C orasida"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-20",
        "sectionNumber": 20,
        "title": "20-§. Laboratoriya ishi. Qattiq jismlarning solishtirma issiqlik sig‘imini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Laboratoriya ishining maqsadi nima?",
            "options": {
              "A": "Jismning zichligini aniqlash",
              "B": "Jism erish temperaturasini aniqlash",
              "C": "Havo namligini aniqlash",
              "D": "Jismning solishtirma issiqlik sig‘imini aniqlash"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Ishda qaysi asbob issiqlik almashinuvini kam yo‘qotish bilan o‘tkazish uchun ishlatiladi?",
            "options": {
              "A": "Barometr",
              "B": "Kalorimetr",
              "C": "Ampermetr",
              "D": "Manometr"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Kalorimetrga quyilgan suv massasi qaysi formula bilan hisoblanadi?",
            "options": {
              "A": "m = ρ·V",
              "B": "m = ρ / V",
              "C": "m = V / ρ",
              "D": "m = ρ + V"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Jism qaynab turgan suvga tushirilib, qizdirilganda uning temperaturasi taxminan qancha bo‘ladi?",
            "options": {
              "A": "100 °C ga yaqin",
              "B": "0 °C ga yaqin",
              "C": "50 °C ga yaqin",
              "D": "20 °C ga yaqin"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Alyuminiy kalorimetrning solishtirma issiqlik sig‘imi ishda qancha deb olinadi?",
            "options": {
              "A": "380 J/(kg·°C)",
              "B": "460 J/(kg·°C)",
              "C": "890 J/(kg·°C)",
              "D": "4200 J/(kg·°C)"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Issiqlik balansi tenglamasiga ko‘ra qizdirilgan jism bergan issiqlik miqdori nimaga teng?",
            "options": {
              "A": "Kalorimetr massasiga",
              "B": "Nolga",
              "C": "Suv massasiga",
              "D": "Suv va kalorimetr olgan issiqlik miqdoriga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Qizdirilgan jism nima uchun tezlik bilan sovuq suvli kalorimetrga o‘tkaziladi?",
            "options": {
              "A": "Jism sovib ketmasligi uchun",
              "B": "Suv qaynab ketmasligi uchun",
              "C": "Tarozi buzilmasligi uchun",
              "D": "Atrof-muhitga issiqlik yo‘qotilishini kamaytirish uchun"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Ishda jismlarning massalari qaysi asbob bilan o‘lchanadi?",
            "options": {
              "A": "Dinamometr",
              "B": "Menzurka",
              "C": "Tarozi",
              "D": "Termometr"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Ishda suv hajmi qaysi asbob bilan o‘lchanadi?",
            "options": {
              "A": "Termometr",
              "B": "Tarozi",
              "C": "Menzurka",
              "D": "Kalorimetr"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Massasi 0,1 kg jism 100 °C da, 0,4 kg suvli kalorimetrga tushirildi (boshlang‘ich 20 °C), muvozanat temperaturasi 25 °C bo‘ldi. Kalorimetr issiqlik sig‘imini hisobga olmasa, jismning solishtirma issiqlik sig‘imi taxminan qancha? (c_suv = 4200)",
            "options": {
              "A": "2240 J/(kg·K)",
              "B": "1120 J/(kg·K)",
              "C": "4200 J/(kg·K)",
              "D": "560 J/(kg·K)"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-21",
        "sectionNumber": 21,
        "title": "21-§. Yoqilg‘ining solishtirma yonish issiqligi",
        "questions": [
          {
            "id": 1,
            "question": "Yoqilg‘i yonganda issiqlik nima hisobiga ajralib chiqadi?",
            "options": {
              "A": "Molekulalarning parchalanishi hisobiga",
              "B": "Moddaning sovishi hisobiga",
              "C": "Uglerod atomlari kislorod bilan birikib CO₂ molekulasi hosil bo‘lishida energiya ajralishi hisobiga",
              "D": "Gaz bosimining ortishi hisobiga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Yoqilg‘ining solishtirma yonish issiqligi nimani bildiradi?",
            "options": {
              "A": "1 kg yoqilg‘i to‘liq yonganda ajralib chiqadigan issiqlik miqdorini",
              "B": "1 kg yoqilg‘ining temperaturasini 1 K ga oshiruvchi issiqlikni",
              "C": "1 kg yoqilg‘ini eritish uchun kerak bo‘ladigan issiqlikni",
              "D": "1 kg yoqilg‘ini bug‘lantirish uchun kerak bo‘ladigan issiqlikni"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Yoqilg‘i yonganda ajralib chiqadigan issiqlik miqdori qaysi formula bilan topiladi?",
            "options": {
              "A": "Q = q + m",
              "B": "Q = m / q",
              "C": "Q = q / m",
              "D": "Q = q·m"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Yoqilg‘ining solishtirma yonish issiqligi XBS da qanday birlikda ifodalanadi?",
            "options": {
              "A": "J/(kg·K)",
              "B": "J/kg",
              "C": "J·kg",
              "D": "kg/J"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Molekulani atomlarga ajratish uchun nima qilish kerak?",
            "options": {
              "A": "Atomlar orasidagi tortishish kuchiga qarshi ish bajarish (energiya sarflash)",
              "B": "Hech narsa qilish shart emas",
              "C": "Molekulani sovitish",
              "D": "Molekulani siqish"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Solishtirma yonish issiqligi 30 MJ/kg bo‘lgan ko‘mirdan 2 kg to‘liq yonganda qancha issiqlik ajraladi?",
            "options": {
              "A": "90 MJ",
              "B": "15 MJ",
              "C": "30 MJ",
              "D": "60 MJ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Solishtirma yonish issiqligi 30 MJ/kg bo‘lgan yoqilg‘idan 90 MJ issiqlik olish uchun uning qancha massasini yoqish kerak?",
            "options": {
              "A": "60 kg",
              "B": "0,33 kg",
              "C": "3 kg",
              "D": "2700 kg"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Quyidagi yoqilg‘ilardan qaysi birining solishtirma yonish issiqligi eng katta?",
            "options": {
              "A": "O‘tin (≈ 10 MJ/kg)",
              "B": "Benzin (≈ 46 MJ/kg)",
              "C": "Spirt (≈ 27 MJ/kg)",
              "D": "Toshko‘mir (≈ 30 MJ/kg)"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "5 kg suvni 20 °C dan 100 °C gacha isitish uchun zarur issiqlik 1,68 MJ. Agar yoqilg‘ida issiqlik yo‘qotilmasa, solishtirma yonish issiqligi 30 MJ/kg bo‘lgan ko‘mirdan qancha kerak?",
            "options": {
              "A": "0,056 kg",
              "B": "5,6 kg",
              "C": "0,0056 kg",
              "D": "0,56 kg"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Odatdagi yoqilg‘ilarning (ko‘mir, neft, benzin) tarkibida qaysi kimyoviy element atomlari bor?",
            "options": {
              "A": "Geliy",
              "B": "Uglerod",
              "C": "Oltin",
              "D": "Neon"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-22",
        "sectionNumber": 22,
        "title": "22-§. Termodinamikaning birinchi qonuni",
        "questions": [
          {
            "id": 1,
            "question": "Energiyaning saqlanish qonuni qanday ta’riflanadi?",
            "options": {
              "A": "Energiya faqat ish bajarilganda hosil bo‘ladi",
              "B": "Energiya faqat issiqlikka aylanadi",
              "C": "Energiya vaqt o‘tishi bilan kamayib boradi",
              "D": "Energiya yo‘qdan bor bo‘lmaydi va yo‘qolmaydi, faqat bir turdan boshqa turga aylanadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Termodinamikaning birinchi qonuni formulasi qaysi?",
            "options": {
              "A": "Q = ΔU · A",
              "B": "Q = ΔU / A",
              "C": "Q = ΔU – A",
              "D": "Q = ΔU + A"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Termodinamikaning birinchi qonuniga ko‘ra sistemaga berilgan issiqlik miqdori nimaga sarflanadi?",
            "options": {
              "A": "Faqat ichki energiyani oshirishga",
              "B": "Hajmni kamaytirishga",
              "C": "Ichki energiyani o‘zgartirishga va tashqi kuchlarga qarshi ish bajarishga",
              "D": "Faqat ish bajarishga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Izoxorik jarayonda (A = 0) termodinamikaning birinchi qonuni qanday ko‘rinishga keladi?",
            "options": {
              "A": "Q = ΔU",
              "B": "Q = A",
              "C": "ΔU = 0",
              "D": "Q = 0"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Izotermik jarayonda ideal gaz uchun (ΔU = 0) birinchi qonun qanday ko‘rinishga keladi?",
            "options": {
              "A": "Q = A",
              "B": "Q = 0",
              "C": "Q = ΔU",
              "D": "A = 0"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Gazga 500 J issiqlik berildi, gaz 200 J ish bajardi. Ichki energiya qanchaga o‘zgardi?",
            "options": {
              "A": "200 J ga ortdi",
              "B": "300 J ga ortdi",
              "C": "300 J ga kamaydi",
              "D": "700 J ga ortdi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Issiqlik almashinuvi bo‘lmagan sistemada gaz ustida 300 J ish bajarildi. Gazning ichki energiyasi qanday o‘zgaradi?",
            "options": {
              "A": "300 J ga kamayadi",
              "B": "O‘zgarmaydi",
              "C": "300 J ga ortadi",
              "D": "600 J ga ortadi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Gaz atrofga 400 J issiqlik berdi va ish bajarmadi (V = const). Ichki energiyasi qanchaga o‘zgardi?",
            "options": {
              "A": "O‘zgarmadi",
              "B": "800 J ga kamaydi",
              "C": "400 J ga ortdi",
              "D": "400 J ga kamaydi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Energiya sarflamasdan ish bajaradigan dvigatelni (abadiy dvigatel) yaratib bo‘lmasligining sababi nima?",
            "options": {
              "A": "Material yetarli emas",
              "B": "Bu energiyaning saqlanish qonuniga zid",
              "C": "Dvigatel juda og‘ir bo‘ladi",
              "D": "Ishqalanish kuchi yo‘q"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Termodinamikaning birinchi qonuni nimaning issiqlik hodisalariga tatbiqi hisoblanadi?",
            "options": {
              "A": "Guk qonuni",
              "B": "Butun olam tortishish qonuni",
              "C": "Energiyaning saqlanish qonuni",
              "D": "Nyutonning uchinchi qonuni"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-23",
        "sectionNumber": 23,
        "title": "23-§. Masalalar yechish (termodinamikaning birinchi qonuni)",
        "questions": [
          {
            "id": 1,
            "question": "Gazga 800 J issiqlik berildi va gaz 300 J ish bajardi. Ichki energiya o‘zgarishi qancha?",
            "options": {
              "A": "500 J",
              "B": "1100 J",
              "C": "800 J",
              "D": "300 J"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Gaz siqilganda tashqi kuchlar 150 J ish bajardi, issiqlik almashinuvi bo‘lmadi. Gazning ichki energiyasi qanday o‘zgardi?",
            "options": {
              "A": "150 J ga kamaydi",
              "B": "150 J ga ortdi",
              "C": "300 J ga ortdi",
              "D": "O‘zgarmadi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "1 mol bir atomli ideal gaz izobarik 100 K ga qizdirildi. Gazga berilgan issiqlik miqdori taxminan qancha? (R = 8,31 J/(mol·K))",
            "options": {
              "A": "1,25 kJ",
              "B": "4,16 kJ",
              "C": "0,83 kJ",
              "D": "2,08 kJ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Ideal gaz izotermik kengayib, 1 kJ issiqlik oldi. Gaz qancha ish bajargan?",
            "options": {
              "A": "1 kJ",
              "B": "0,5 kJ",
              "C": "2 kJ",
              "D": "0"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Gaz 2·10⁵ Pa o‘zgarmas bosimda 0,01 m³ ga kengaydi va unga 3000 J issiqlik berildi. Ichki energiya qanchaga o‘zgardi?",
            "options": {
              "A": "2000 J ga ortdi",
              "B": "5000 J ga ortdi",
              "C": "1000 J ga ortdi",
              "D": "3000 J ga ortdi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Berk idishdagi gazga 600 J issiqlik berildi. Gaz bajargan ish va ichki energiya o‘zgarishi qancha?",
            "options": {
              "A": "A = 300 J, ΔU = 300 J",
              "B": "A = 0, ΔU = 600 J",
              "C": "A = 600 J, ΔU = 0",
              "D": "A = 600 J, ΔU = 600 J"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Gaz 500 J ish bajardi va uning ichki energiyasi 200 J ga kamaydi. Gaz qancha issiqlik olgan?",
            "options": {
              "A": "300 J",
              "B": "–300 J",
              "C": "500 J",
              "D": "700 J"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Gaz 2 kJ issiqlik oldi va 2 kJ ish bajardi. Uning ichki energiyasi qanday o‘zgardi?",
            "options": {
              "A": "2 kJ ga kamaydi",
              "B": "4 kJ ga ortdi",
              "C": "O‘zgarmadi",
              "D": "2 kJ ga ortdi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Gazdan 100 J issiqlik olindi va gaz ustida 50 J ish bajarildi. Ichki energiya o‘zgarishi qancha?",
            "options": {
              "A": "150 J ga kamaydi",
              "B": "50 J ga kamaydi",
              "C": "50 J ga ortdi",
              "D": "150 J ga ortdi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Bir atomli ideal gaz izobarik kengayganda unga berilgan issiqlikning qancha qismi ish bajarishga sarflanadi?",
            "options": {
              "A": "60 %",
              "B": "100 %",
              "C": "25 %",
              "D": "40 %"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-24",
        "sectionNumber": 24,
        "title": "24-§. Issiqlik jarayonlarining qaytmasligi. Termodinamikaning ikkinchi qonuni",
        "questions": [
          {
            "id": 1,
            "question": "Qaytar jarayon deb qanday jarayonga aytiladi?",
            "options": {
              "A": "Faqat bir yo‘nalishda boradigan jarayonga",
              "B": "Issiqlik uzatish bilan boradigan har qanday jarayonga",
              "C": "Sistema boshlang‘ich holatiga qaytganda tashqi muhitda hech qanday o‘zgarish qolmaydigan jarayonga",
              "D": "Gaz kengayishi bilan boradigan jarayonga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Qaytmas jarayon deb qanday jarayonga aytiladi?",
            "options": {
              "A": "Faqat mexanik jarayonga",
              "B": "Juda sekin boradigan jarayonga",
              "C": "Har doim tez boradigan jarayonga",
              "D": "O‘z-o‘zidan yoki tashqi muhitda o‘zgarish qoldirmasdan boshlang‘ich holatiga qaytmaydigan jarayonga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Issiqlik jarayonlarining mexanik jarayonlardan tubdan farqi nimada?",
            "options": {
              "A": "Issiqlik jarayonlarida energiya saqlanmaydi",
              "B": "Issiqlik jarayonlari qaytmas",
              "C": "Issiqlik jarayonlari doim qaytar",
              "D": "Farqi yo‘q"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Qaysi jarayon qaytmas jarayonga misol bo‘ladi?",
            "options": {
              "A": "Ideal elastik sharning yerga urilib qaytishi",
              "B": "Ishqalanishsiz mayatnik tebranishi",
              "C": "Prujinaga osilgan yukning ishqalanishsiz tebranishi",
              "D": "Issiq jismdan sovuq jismga issiqlik uzatilishi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Jo‘mrakli nay bilan tutashtirilgan gazli va gazsiz idishlar orasidagi jo‘mrak ochilsa, gaz...",
            "options": {
              "A": "ikkala idishda bosim tenglashguncha tarqaladi va o‘z-o‘zidan qayta bir idishga to‘planmaydi",
              "B": "o‘z hajmini o‘zgartirmaydi",
              "C": "faqat bo‘sh idishga o‘tadi va bosimi nolga tushadi",
              "D": "o‘z-o‘zidan yana dastlabki idishga qaytib to‘planadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Termodinamikaning ikkinchi qonunini qaysi nemis olimi ta’riflagan?",
            "options": {
              "A": "R. Mayer",
              "B": "O. Shtern",
              "C": "G. Gelmgols",
              "D": "R. Klauzius"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Klauzius ta’rifiga ko‘ra termodinamikaning ikkinchi qonuni qanday?",
            "options": {
              "A": "Issiqlik hamma vaqt sovuq jismdan issiq jismga o‘tadi",
              "B": "Gaz bosimi hajmga teskari proporsional",
              "C": "Boshqa o‘zgarish bo‘lmasa, sovuqroq sistemadan issiqroq sistemaga issiqlik o‘z-o‘zidan o‘tmaydi",
              "D": "Energiya yo‘qolmaydi va yo‘qdan bor bo‘lmaydi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Quyidagilardan qaysi biri qaytmas jarayon hisoblanadi?",
            "options": {
              "A": "Vakuumda ideal prujinaning tebranishi",
              "B": "Ishqalanishsiz mayatnikning tebranishi",
              "C": "Tirik organizmning qarishi",
              "D": "Elastik sharchaning sakrashi (ishqalanishsiz)"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Qaysi jarayonlar qaytar jarayonga ancha yaqin bo‘ladi?",
            "options": {
              "A": "Ishqalanish va noelastik deformatsiya bo‘lmaydigan mexanik jarayonlar",
              "B": "Diffuziya jarayonlari",
              "C": "Yonish jarayonlari",
              "D": "Barcha issiqlik jarayonlari"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Termodinamikaning ikkinchi qonuni nimaning muhimligini ko‘rsatadi?",
            "options": {
              "A": "Moddaning zichligi o‘zgarmasligini",
              "B": "Tabiatdagi jarayonlarning tayinli yo‘nalishda borishini va qaytmasligini",
              "C": "Energiyaning saqlanishini",
              "D": "Gaz bosimi doimo ortib borishini"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-25",
        "sectionNumber": 25,
        "title": "25-§. Laboratoriya ishi. Turli temperaturali suv aralashtirilganda issiqlik miqdorlarini taqqoslash",
        "questions": [
          {
            "id": 1,
            "question": "Laboratoriya ishining maqsadi nima?",
            "options": {
              "A": "Suvning zichligini aniqlash",
              "B": "Suvning bug‘lanish issiqligini aniqlash",
              "C": "Issiq suv bergan va sovuq suv olgan issiqlik miqdorlarini taqqoslash",
              "D": "Suvning qaynash temperaturasini o‘lchash"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Issiq suv bergan issiqlik miqdori qaysi formula bilan topiladi? (m₁, t₁ – issiq suv, θ – aralashma temperaturasi)",
            "options": {
              "A": "Q = m₁·(t₁ + θ)",
              "B": "Q = c·m₁·(t₁ – θ)",
              "C": "Q = c·m₁ / (t₁ – θ)",
              "D": "Q = c·m₁·(θ – t₁)"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Ishda temperaturani o‘lchash uchun qaysi asbob kerak?",
            "options": {
              "A": "Manometr",
              "B": "Dinamometr",
              "C": "Voltmetr",
              "D": "Termometr"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Aralashma temperaturasi qanday aniqlanadi?",
            "options": {
              "A": "Suvlar aralashtirilgach, termometr ko‘rsatishi o‘zgarmay qolganda o‘qib olinadi",
              "B": "Boshlang‘ich temperaturalarning yig‘indisi olinadi",
              "C": "Faqat issiq suv temperaturasi o‘lchanadi",
              "D": "Hisoblab bo‘lmaydi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Ish natijasida odatda sovuq suv olgan issiqlik miqdori issiq suv bergan issiqlik miqdoridan biroz kam chiqadi. Buning sababi nima?",
            "options": {
              "A": "Issiqlik yo‘qolmaydi, tajriba xatosi bo‘lmaydi",
              "B": "Suvning massasi o‘zgaradi",
              "C": "Issiqlikning bir qismi atrof-muhitga va idishga yo‘qoladi",
              "D": "Termometr xato ishlaydi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Suvning zichligi 1 g/cm³ bo‘lsa, 200 cm³ suvning massasi qancha?",
            "options": {
              "A": "200 g",
              "B": "20 g",
              "C": "2 kg",
              "D": "0,2 g"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "100 g, 60 °C li suv bilan 100 g, 20 °C li suv aralashtirildi (θ = 40 °C). Issiq suv bergan issiqlik miqdori qancha? (c = 4200 J/(kg·K))",
            "options": {
              "A": "8400 J",
              "B": "16800 J",
              "C": "4200 J",
              "D": "840 J"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Kalorimetrning vazifasi nima?",
            "options": {
              "A": "Massani o‘lchash",
              "B": "Hajmni o‘lchash",
              "C": "Suvni qizdirish",
              "D": "Tashqi muhit bilan issiqlik almashinuvini kamaytirish"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Ideal holatda (issiqlik yo‘qotilmasa) issiq suv bergan va sovuq suv olgan issiqlik miqdorlari orasida qanday munosabat bo‘ladi?",
            "options": {
              "A": "Issiq suvniki katta bo‘ladi",
              "B": "Ular o‘zaro teng bo‘ladi",
              "C": "Sovuq suvniki katta bo‘ladi",
              "D": "Ular nolga teng bo‘ladi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Ishda tajriba xatoligini baholash uchun nimani hisoblash mumkin?",
            "options": {
              "A": "Suvning rangini",
              "B": "Olingan va berilgan issiqlik miqdorlari farqining nisbiy qiymatini (foizda)",
              "C": "Kalorimetr hajmini",
              "D": "Termometrning uzunligini"
            },
            "correctAnswer": "B"
          }
        ]
      }
    ]
  },
  {
    "id": "g9-test-bob-3",
    "title": "III bob. Issiqlik dvigatellari",
    "topics": [
      {
        "id": "g9-test-26",
        "sectionNumber": 26,
        "title": "26-§. Ichki yonuv dvigatellari",
        "questions": [
          {
            "id": 1,
            "question": "Issiqlik dvigateli deb nimaga aytiladi?",
            "options": {
              "A": "Mexanik energiyani issiqlikka aylantiradigan qurilmaga",
              "B": "Issiqlik energiyasini mexanik energiyaga aylantirib beradigan qurilmaga",
              "C": "Suvni sovituvchi qurilmaga",
              "D": "Elektr energiyasini yorug‘likka aylantiradigan qurilmaga"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Ichki yonuv dvigateli nima uchun shunday ataladi?",
            "options": {
              "A": "Dvigatel suv bilan sovitiladi",
              "B": "Dvigatel uy ichida ishlaydi",
              "C": "Yoqilg‘i dvigatel silindri ichida yonadi",
              "D": "Dvigatel elektr bilan ishlaydi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Ichki yonuv dvigatellari qanday yoqilg‘ilar bilan ishlaydi?",
            "options": {
              "A": "Faqat suv bilan",
              "B": "Faqat elektr toki bilan",
              "C": "Faqat qattiq yoqilg‘i (ko‘mir) bilan",
              "D": "Suyuq yoqilg‘i (benzin, kerosin) yoki yonuvchi gaz bilan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Bir silindrli ichki yonuv dvigatelida yonuvchi aralashmani o‘t oldiradigan qism qaysi?",
            "options": {
              "A": "Shatun",
              "B": "Tirsakli val",
              "C": "Svecha",
              "D": "Porshen"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Yonuvchi aralashma yonganda silindr ichidagi gaz temperaturasi qancha bo‘lishi mumkin?",
            "options": {
              "A": "0 °C ga yaqin",
              "B": "100 °C ga yaqin",
              "C": "1600–1800 °C ga yaqin",
              "D": "20 °C ga yaqin"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Dvigatelda foydali ish qanday bajariladi?",
            "options": {
              "A": "Porshen o‘z-o‘zidan harakatlanadi",
              "B": "Yonish natijasida kengayayotgan gaz porshenni itaradi",
              "C": "Gaz siqilib porshenni tortadi",
              "D": "Klapan porshenni itaradi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Dizel dvigatelida yoqilg‘i qanday alangalanadi?",
            "options": {
              "A": "Siqilishdan qizigan havoda o‘z-o‘zidan alangalanadi",
              "B": "Svecha uchquni orqali",
              "C": "Elektr yoyi orqali",
              "D": "Alangalanmaydi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Kosmik kemalar reaktiv dvigatelining ishlashi nima uchun atrofdagi muhitga bog‘liq bo‘lmaydi?",
            "options": {
              "A": "U quyosh nuri bilan ishlaydi",
              "B": "U suvdan foydalanadi",
              "C": "U havodan kislorod oladi",
              "D": "Yonilg‘i ham, ishchi modda ham dvigatelning o‘zida bo‘ladi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Issiqlik dvigatellarining qaysi turlari mavjud?",
            "options": {
              "A": "Ichki yonuv, dizel va reaktiv dvigatellar",
              "B": "Faqat elektr dvigatellar",
              "C": "Faqat suv turbinalari",
              "D": "Faqat shamol dvigatellari"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "To‘rt taktli ichki yonuv dvigateli sikli qaysi javobda to‘g‘ri tartibda berilgan?",
            "options": {
              "A": "Kengayish, so‘rish, chiqarish, siqish",
              "B": "Siqish, so‘rish, chiqarish, kengayish",
              "C": "Chiqarish, so‘rish, kengayish, siqish",
              "D": "So‘rish, siqish, ish yurishi (kengayish), chiqarish"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-27",
        "sectionNumber": 27,
        "title": "27-§. Issiqlik dvigatellarining ishlash prinsipi",
        "questions": [
          {
            "id": 1,
            "question": "Issiqlik dvigatelida ishchi jism nima bo‘ladi?",
            "options": {
              "A": "Qattiq jism",
              "B": "Suyuq metall",
              "C": "Kengayganda ish bajaradigan gaz",
              "D": "Elektr zaryadi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Issiqlik dvigateli qaysi asosiy qismlardan iborat?",
            "options": {
              "A": "Isitkich, sovitkich va ishchi modda",
              "B": "Faqat sovitkich",
              "C": "Faqat isitkich",
              "D": "Svecha va akkumulyator"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Issiqlik dvigatelining bir siklda bajargan foydali ishi qaysi formula bilan topiladi? (Q₁ – isitkichdan olingan, Q₂ – sovitkichga berilgan issiqlik)",
            "options": {
              "A": "A = Q₁ + Q₂",
              "B": "A = Q₁ – Q₂",
              "C": "A = Q₁ / Q₂",
              "D": "A = Q₂ – Q₁"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Issiqlik dvigatelining foydali ish koeffitsiyenti (FIK) qaysi formula bilan topiladi?",
            "options": {
              "A": "η = Q₂ / Q₁",
              "B": "η = Q₁ / (Q₁ – Q₂)",
              "C": "η = (Q₁ + Q₂) / Q₁",
              "D": "η = (Q₁ – Q₂) / Q₁"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Issiqlik dvigatelining ishlashi uchun nima shart?",
            "options": {
              "A": "Ishchi jism suyuq bo‘lishi",
              "B": "Isitkich va sovitkich temperaturalari turlicha bo‘lishi",
              "C": "Isitkich va sovitkich temperaturalari bir xil bo‘lishi",
              "D": "Sovitkich bo‘lmasligi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Ideal issiqlik mashinasining (Karno sikli) maksimal FIK qaysi formula bilan topiladi? (T₁ – isitkich, T₂ – sovitkich temperaturasi)",
            "options": {
              "A": "η = T₁ / T₂",
              "B": "η = T₂ / T₁",
              "C": "η = (T₁ – T₂) / T₂",
              "D": "η = (T₁ – T₂) / T₁"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Ideal to‘rt siklli issiqlik mashinasi nazariyasini birinchi bo‘lib kim yaratgan?",
            "options": {
              "A": "Fransuz injeneri Sadi Karno",
              "B": "Nikolaus Otto",
              "C": "Jeyms Vatt",
              "D": "Rudolf Dizel"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Isitkich temperaturasi 500 K, sovitkichniki 300 K bo‘lgan ideal mashinaning FIK qancha?",
            "options": {
              "A": "40 %",
              "B": "20 %",
              "C": "60 %",
              "D": "100 %"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Dvigatel isitkichdan 1000 J issiqlik oldi va sovitkichga 700 J berdi. Uning FIK qancha?",
            "options": {
              "A": "70 %",
              "B": "30 %",
              "C": "42 %",
              "D": "100 %"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Issiqlik dvigatelining FIK 100 % ga teng bo‘lishi mumkinmi?",
            "options": {
              "A": "Ha, har qanday sharoitda",
              "B": "Faqat ideal gazda",
              "C": "Yo‘q, har doim 100 % dan kichik",
              "D": "Faqat sovitkich bo‘lmaganda"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-28",
        "sectionNumber": 28,
        "title": "28-§. Masalalar yechish (issiqlik dvigatellari)",
        "questions": [
          {
            "id": 1,
            "question": "Ishchi jism isitkichdan 840 J issiqlik oldi. Dvigatelning FIK 30 % bo‘lsa, gaz qancha ish bajaradi?",
            "options": {
              "A": "252 J",
              "B": "840 J",
              "C": "2800 J",
              "D": "588 J"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Isitkich temperaturasi 477 °C, sovitkichniki 27 °C bo‘lgan issiqlik mashinasining maksimal FIK qancha?",
            "options": {
              "A": "60 %",
              "B": "40 %",
              "C": "6 %",
              "D": "94 %"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Ideal issiqlik dvigatelining FIK 62,5 % bo‘lishi uchun isitkich temperaturasi qancha bo‘lishi kerak? (sovitkich 300 K)",
            "options": {
              "A": "600 K",
              "B": "480 K",
              "C": "800 K",
              "D": "1000 K"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Isitkich temperaturasi 127 °C, sovitkich 7 °C bo‘lgan ideal mashina bir siklda isitkichdan 1300 J issiqlik oladi. Foydali ish qancha?",
            "options": {
              "A": "1300 J",
              "B": "390 J",
              "C": "130 J",
              "D": "910 J"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "FIK 40 % bo‘lgan issiqlik mashinasi bir siklda sovitkichga 63 kJ issiqlik beradi. Mashina bir siklda qancha ish bajaradi?",
            "options": {
              "A": "25,2 kJ",
              "B": "105 kJ",
              "C": "42 kJ",
              "D": "63 kJ"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Ideal dvigatelda sovitkich temperaturasi 62 °C, FIK 50 %. Isitkich bilan sovitkich temperaturalari farqi qancha?",
            "options": {
              "A": "500 K",
              "B": "670 K",
              "C": "168 K",
              "D": "335 K"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Karno siklida isitkich va sovitkich temperaturalari nisbati 5. Bir siklda sovitkichga 180 kJ issiqlik berilgan. Isitkichdan olingan issiqlik qancha?",
            "options": {
              "A": "1080 kJ",
              "B": "180 kJ",
              "C": "900 kJ",
              "D": "36 kJ"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Dvigatel isitkichdan 2000 J issiqlik olib, 500 J foydali ish bajardi. Uning FIK qancha?",
            "options": {
              "A": "40 %",
              "B": "25 %",
              "C": "4 %",
              "D": "75 %"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Dvigatelning foydali ishi 200 J, FIK 20 %. Isitkichdan olingan issiqlik qancha?",
            "options": {
              "A": "200 J",
              "B": "160 J",
              "C": "40 J",
              "D": "1000 J"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "FIK 25 % bo‘lgan dvigatel isitkichdan 800 J issiqlik oldi. Sovitkichga qancha issiqlik beriladi?",
            "options": {
              "A": "200 J",
              "B": "800 J",
              "C": "1000 J",
              "D": "600 J"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-29",
        "sectionNumber": 29,
        "title": "29-§. Issiqlik mashinalari va tabiatni muhofaza qilish",
        "questions": [
          {
            "id": 1,
            "question": "Issiqlik mashinalarining tabiatga asosiy zarari nima?",
            "options": {
              "A": "Yoqilg‘i yonganda hosil bo‘lgan zararli chiqindilar bilan atmosferani ifloslantirishi",
              "B": "Ular zararsiz, hech qanday ta’sir qilmaydi",
              "C": "Ular suvni ko‘paytirishi",
              "D": "Ular Yerning aylanishini sekinlashtirishi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Yoqilg‘i yonganda atmosferaga ko‘p miqdorda chiqadigan asosiy gaz qaysi?",
            "options": {
              "A": "Geliy",
              "B": "Karbonat angidrid (CO₂)",
              "C": "Argon",
              "D": "Neon"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Atmosferada CO₂ miqdorining ortishi qanday oqibatga olib keladi?",
            "options": {
              "A": "Havoning sovishiga",
              "B": "Kunning uzayishiga",
              "C": "Issiqxona effektining kuchayishiga va iqlimning isishiga",
              "D": "Yer tortishishining ortishiga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Avtomobil dvigatellaridan chiqadigan zararli gazlar miqdorini kamaytirish uchun nima qo‘llaniladi?",
            "options": {
              "A": "Katalitik neytralizator va filtrlar",
              "B": "Yoqilg‘i miqdorini ko‘paytirish",
              "C": "Dvigatelni qizdirish",
              "D": "Chiqarish trubasini yopish"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Tabiatni muhofaza qilish nuqtayi nazaridan qaysi energiya manbai eng toza hisoblanadi?",
            "options": {
              "A": "Toshko‘mir",
              "B": "Quyosh energiyasi",
              "C": "Benzin",
              "D": "Mazut"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Issiqlik mashinalarining FIK ni oshirish nimaga olib keladi?",
            "options": {
              "A": "Chiqindilar ortishiga",
              "B": "Yoqilg‘i sarfi ortishiga",
              "C": "Hech narsaga olib kelmaydi",
              "D": "Bir xil ish uchun yoqilg‘i sarfi va chiqindilar kamayishiga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Issiqlik mashinalari sovitkichga issiqlik uzatadi. Bu atrof-muhitga qanday ta’sir qiladi?",
            "options": {
              "A": "Havoni tozalaydi",
              "B": "Atrof-muhitni isitadi (issiqlik ifloslanishi)",
              "C": "Atrof-muhitni sovitadi",
              "D": "Ta’sir qilmaydi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Atrof-muhitga zarar kamroq yetkazadigan transport vositasi qaysi?",
            "options": {
              "A": "Elektromobil",
              "B": "Dizelli traktor",
              "C": "Ko‘mirda ishlaydigan bug‘ mashinasi",
              "D": "Eski benzinli yuk mashinasi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Nima uchun yoqilg‘ini tejash muhim?",
            "options": {
              "A": "Yoqilg‘i tez buziladi",
              "B": "Yoqilg‘ining narxi o‘zgarmaydi",
              "C": "Yoqilg‘i cheksiz",
              "D": "Yoqilg‘i zaxiralari (neft, gaz, ko‘mir) tiklanmaydi va cheklangan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Qaysi tadbir atmosferani muhofaza qilishga xizmat qiladi?",
            "options": {
              "A": "Daraxtlarni kesish",
              "B": "Zavodlarni ko‘paytirish",
              "C": "Zavod trubalariga changushlagich va filtrlar o‘rnatish",
              "D": "Yoqilg‘ini ko‘proq yoqish"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-30",
        "sectionNumber": 30,
        "title": "30-§. Masalalar yechish (issiqlik mashinalari)",
        "questions": [
          {
            "id": 1,
            "question": "Isitkich temperaturasi 600 K, sovitkichniki 300 K bo‘lgan ideal mashinaning FIK qancha?",
            "options": {
              "A": "75 %",
              "B": "25 %",
              "C": "100 %",
              "D": "50 %"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Isitkich 227 °C, sovitkich 27 °C bo‘lgan ideal mashinaning FIK qancha?",
            "options": {
              "A": "12 %",
              "B": "60 %",
              "C": "88 %",
              "D": "40 %"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Dvigatel bir siklda 600 J foydali ish bajardi va isitkichdan 2400 J issiqlik oldi. FIK qancha?",
            "options": {
              "A": "25 %",
              "B": "75 %",
              "C": "40 %",
              "D": "4 %"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "FIK 40 % bo‘lgan dvigatel isitkichdan 500 J issiqlik olsa, foydali ish qancha bo‘ladi?",
            "options": {
              "A": "500 J",
              "B": "1250 J",
              "C": "300 J",
              "D": "200 J"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Ideal issiqlik dvigatelining FIK 40 %, sovitkich temperaturasi 300 K. Isitkich temperaturasi qancha?",
            "options": {
              "A": "750 K",
              "B": "420 K",
              "C": "500 K",
              "D": "120 K"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Sovitkich temperaturasi 300 K. Isitkich temperaturasi 400 K dan 800 K gacha oshirilsa, ideal mashinaning FIK qanday o‘zgaradi?",
            "options": {
              "A": "25 % dan 12,5 % gacha kamayadi",
              "B": "25 % dan 62,5 % gacha ortadi",
              "C": "50 % dan 100 % gacha ortadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Mashina bir siklda 150 J foydali ish bajardi va sovitkichga 350 J issiqlik berdi. Uning FIK qancha?",
            "options": {
              "A": "30 %",
              "B": "50 %",
              "C": "70 %",
              "D": "43 %"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Agar isitkich va sovitkichning temperaturalari bir xil bo‘lsa, ideal mashinaning FIK qancha bo‘ladi?",
            "options": {
              "A": "100 %",
              "B": "0",
              "C": "50 %",
              "D": "Cheksiz katta"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Dvigatel 1 soat davomida 36 MJ foydali ish bajarsa, uning foydali quvvati qancha?",
            "options": {
              "A": "100 kW",
              "B": "36 kW",
              "C": "10 kW",
              "D": "1 kW"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Dvigatelning bir siklidagi foydali ish 300 J. Dvigatel 10 sikl ishlasa, umumiy foydali ish qancha bo‘ladi?",
            "options": {
              "A": "30 kJ",
              "B": "30 J",
              "C": "3 kJ",
              "D": "300 J"
            },
            "correctAnswer": "C"
          }
        ]
      }
    ]
  },
  {
    "id": "g9-test-bob-4",
    "title": "IV bob. Suyuqlik va qattiq jismlarning xossalari",
    "topics": [
      {
        "id": "g9-test-31",
        "sectionNumber": 31,
        "title": "31-§. Suyuqlikning xossalari",
        "questions": [
          {
            "id": 1,
            "question": "Suyuqliklarda molekulalar qanday joylashgan?",
            "options": {
              "A": "Bir-biridan o‘z o‘lchamidan juda katta masofada joylashgan",
              "B": "Deyarli bir-biriga tegib turadi",
              "C": "Bir-biridan ajralgan va o‘zaro ta’sirlashmaydi",
              "D": "Aniq tartibli kristall panjara hosil qiladi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Suyuqlik molekulalari orasidagi o‘zaro ta’sir kuchlari gaz molekulalari orasidagi kuchlarga nisbatan qanday?",
            "options": {
              "A": "Ancha katta",
              "B": "Ancha kichik",
              "C": "Nolga teng",
              "D": "Bir xil"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Nima uchun gazning erkin sirti bo‘lmaydi?",
            "options": {
              "A": "Gaz molekulalari bir-biriga yopishgan",
              "B": "Gaz molekulalari harakatsiz",
              "C": "Gaz juda og‘ir bo‘ladi",
              "D": "Molekulalar orasidagi tortishish kuchlari juda kichik, shuning uchun gaz kengayib ketadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Suyuqlik o‘z shaklini qanday saqlaydi?",
            "options": {
              "A": "Saqlamaydi, u solingan idish shaklini oladi, lekin hajmini saqlaydi",
              "B": "Faqat sharsimon shaklni oladi",
              "C": "Hajmini ham, shaklini ham saqlamaydi",
              "D": "Saqlaydi, chunki u qattiq jism"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Tinch turgan suyuqlikning erkin sirti qanday bo‘ladi?",
            "options": {
              "A": "Qavariq",
              "B": "Gorizontal",
              "C": "Vertikal",
              "D": "Qiya"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Sirt taranglik kuchi suyuqlik sirtini qanday o‘zgartirishga intiladi?",
            "options": {
              "A": "Egishga",
              "B": "Kengaytirishga",
              "C": "Qisqartirishga",
              "D": "Aylantirishga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Sirt taranglik kuchi qanday yo‘nalgan?",
            "options": {
              "A": "Sirtga tik, pastga",
              "B": "Sirtga tik, yuqoriga",
              "C": "Idish tubiga qarab",
              "D": "Suyuqlik sirtiga urinma bo‘ylab, sirt chegarasiga tik yo‘nalgan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Sirt taranglik koeffitsiyentining XBS dagi birligi (kuch orqali) qaysi?",
            "options": {
              "A": "N/m²",
              "B": "N/m",
              "C": "N·m",
              "D": "kg/m³"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Vaznsizlik holatida suyuqlik tomchisi qanday shaklda bo‘ladi?",
            "options": {
              "A": "Sharsimon",
              "B": "Yassi",
              "C": "Silindrsimon",
              "D": "Konussimon"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Mayda shudring tomchilari nima uchun deyarli sharsimon bo‘ladi?",
            "options": {
              "A": "Havo ularni sharga aylantirgani uchun",
              "B": "Ular qattiq jism bo‘lgani uchun",
              "C": "Sirt taranglik kuchi sirtni eng kichik yuzaga keltirishga intilgani uchun",
              "D": "Ular juda og‘ir bo‘lgani uchun"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-32",
        "sectionNumber": 32,
        "title": "32-§. Ho‘llash. Kapillyar hodisalar",
        "questions": [
          {
            "id": 1,
            "question": "Sirt energiyasi deb nimaga aytiladi?",
            "options": {
              "A": "Suyuqlikning ichki energiyasiga",
              "B": "Suyuqlik molekulalarining kinetik energiyasiga",
              "C": "Idish devorining energiyasiga",
              "D": "Suyuqlik sirtidagi barcha molekulalarning hajmdagi molekulalarga nisbatan ortiqcha potensial energiyasiga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Sirt taranglik koeffitsiyenti qaysi formula bilan topiladi? (E – sirt energiyasi, S – sirt yuzasi)",
            "options": {
              "A": "σ = E + S",
              "B": "σ = S / E",
              "C": "σ = E · S",
              "D": "σ = E / S"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Sirt taranglik koeffitsiyentining fizik ma’nosi qanday?",
            "options": {
              "A": "Suyuqlik sirtining yuza birligiga to‘g‘ri keladigan sirt energiyasiga son jihatdan teng",
              "B": "Suyuqlikning hajmiga teng",
              "C": "Suyuqlikning massasiga teng",
              "D": "Suyuqlikning zichligiga teng"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Qachon suyuqlik qattiq jismni ho‘llaydi?",
            "options": {
              "A": "Suyuqlik molekulalari orasidagi tortishish kuchi katta bo‘lganda",
              "B": "Suyuqlik molekulalari bilan qattiq jism molekulalari orasidagi tortishish suyuqlik molekulalari orasidagi tortishishdan katta bo‘lganda",
              "C": "Suyuqlik muzlaganda",
              "D": "Suyuqlik qaynayotganda"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Quyidagi juftliklardan qaysi birida suyuqlik jismni ho‘llaydi?",
            "options": {
              "A": "Suv – yog‘li sirt",
              "B": "Simob – shisha",
              "C": "Suv – toza shisha",
              "D": "Suv – parafin"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Juda ingichka naychalar qanday ataladi?",
            "options": {
              "A": "Manometrlar",
              "B": "Barometrlar",
              "C": "Kapillyarlar",
              "D": "Termometrlar"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Ho‘llaydigan suyuqlik kapillyar ichida qanday holatda bo‘ladi?",
            "options": {
              "A": "Kapillyardan chiqib ketadi",
              "B": "Idishdagi sathdan pastga tushadi",
              "C": "Idishdagi sathdan yuqoriga ko‘tariladi",
              "D": "O‘z sathida qoladi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Ho‘llamaydigan suyuqlik (masalan, simob – shisha) kapillyarda qanday bo‘ladi?",
            "options": {
              "A": "Idish bilan bir xil sathda turadi",
              "B": "Idishdagi sathdan balandroq ko‘tariladi",
              "C": "Ko‘pikka aylanadi",
              "D": "Idishdagi sathdan pastroqda turadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Kapillyar radiusi kamaysa, suyuqlikning ko‘tarilish balandligi qanday o‘zgaradi?",
            "options": {
              "A": "Ortadi",
              "B": "Kamayadi",
              "C": "O‘zgarmaydi",
              "D": "Nolga teng bo‘ladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Quyidagilardan qaysi biri kapillyar hodisaga misol bo‘ladi?",
            "options": {
              "A": "Metall plastinkaning qizishi",
              "B": "O‘simlik tanasida suvning ko‘tarilishi",
              "C": "Tovush tarqalishi",
              "D": "Havo shari ko‘tarilishi"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-33",
        "sectionNumber": 33,
        "title": "33-§. Masalalar yechish (sirt taranglik, kapillyar hodisalar)",
        "questions": [
          {
            "id": 1,
            "question": "Radiusi 0,5 mm bo‘lgan kapillyarda kerosin qanday balandlikka ko‘tariladi? (σ = 0,024 N/m, ρ = 800 kg/m³, g = 10 m/s²; h = 2σ / (ρgr))",
            "options": {
              "A": "1,2 mm",
              "B": "24 mm",
              "C": "12 mm",
              "D": "6 mm"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Radiusi 0,5 mm bo‘lgan kapillyarda suv qanday balandlikka ko‘tariladi? (σ = 0,072 N/m, ρ = 1000 kg/m³, g = 10 m/s²)",
            "options": {
              "A": "28,8 mm",
              "B": "57,6 mm",
              "C": "2,88 mm",
              "D": "14,4 mm"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Kapillyar radiusi 2 marta ortsa, suyuqlikning ko‘tarilish balandligi necha marta o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "4 marta kamayadi",
              "C": "2 marta ortadi",
              "D": "2 marta kamayadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Chegara uzunligi 5 cm bo‘lgan suyuqlik sirtiga ta’sir etuvchi sirt taranglik kuchi qancha? (σ = 0,04 N/m)",
            "options": {
              "A": "20 mN",
              "B": "2 mN",
              "C": "0,8 mN",
              "D": "0,2 mN"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Sirt taranglik koeffitsiyenti 0,07 J/m² bo‘lgan suyuqlik sirti 0,01 m² ga teng. Sirt energiyasi qancha?",
            "options": {
              "A": "7 mJ",
              "B": "0,7 mJ",
              "C": "70 mJ",
              "D": "0,07 mJ"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Suyuqlik sirtining yuzasi 0,04 m², sirt energiyasi 2·10⁻³ J. Sirt taranglik koeffitsiyenti qancha?",
            "options": {
              "A": "5 J/m²",
              "B": "0,02 J/m²",
              "C": "0,05 J/m²",
              "D": "0,5 J/m²"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Radiuslari nisbati 1 : 2 bo‘lgan ikki kapillyarda bir xil suyuqlik ko‘tarilsa, balandliklar nisbati h₁/h₂ nimaga teng?",
            "options": {
              "A": "1/2",
              "B": "4",
              "C": "1",
              "D": "2"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "J/m² birligi qaysi birlikka teng?",
            "options": {
              "A": "N/m",
              "B": "N/m²",
              "C": "N·m",
              "D": "kg/s²·m"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Sirt yuzasi 2 marta ortsa (σ o‘zgarmas), sirt energiyasi qanday o‘zgaradi?",
            "options": {
              "A": "2 marta kamayadi",
              "B": "2 marta ortadi",
              "C": "O‘zgarmaydi",
              "D": "4 marta ortadi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Isitilgan suyuqlikning sirt taranglik koeffitsiyenti odatda qanday o‘zgaradi?",
            "options": {
              "A": "Kamayadi",
              "B": "Cheksiz ortadi",
              "C": "Ortadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-34",
        "sectionNumber": 34,
        "title": "34-§. Laboratoriya ishi. Suyuqlikning sirt taranglik koeffitsiyentini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Ishning maqsadi nima?",
            "options": {
              "A": "Suyuqlikning qaynash temperaturasini o‘lchash",
              "B": "Suyuqlikning sirt taranglik koeffitsiyentini aniqlashni o‘rganish",
              "C": "Suyuqlikning solishtirma issiqlik sig‘imini aniqlash",
              "D": "Suyuqlik zichligini aniqlash"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Ishda qaysi asbob yordamida kuch o‘lchanadi?",
            "options": {
              "A": "Psixrometr",
              "B": "Termometr",
              "C": "Barometr",
              "D": "Sezgir dinamometr"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Ishda simlar qanday shakllarda ishlatiladi?",
            "options": {
              "A": "Faqat spiral",
              "B": "Faqat sfera",
              "C": "Uchburchak, kvadrat (to‘rtburchak) va aylana",
              "D": "Faqat parabola"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Sim perimetri l qaysi asbob bilan o‘lchanadi?",
            "options": {
              "A": "Dinamometr",
              "B": "Menzurka",
              "C": "Termometr",
              "D": "Chizg‘ich (aylana uchun shtangensirkul bilan diametr)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Sirt taranglik kuchi qanday topiladi? (F₁ – simning og‘irligi, F₂ – simning suvdan uzilish paytidagi dinamometr ko‘rsatishi)",
            "options": {
              "A": "F = F₂ · F₁",
              "B": "F = F₂ + F₁",
              "C": "F = F₂ – F₁",
              "D": "F = F₂ / F₁"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Sirt taranglik koeffitsiyenti ishda qaysi formula bilan hisoblanadi? (suv plyonkasi ikki sirtga ega)",
            "options": {
              "A": "σ = F / (2l)",
              "B": "σ = F · l",
              "C": "σ = F + 2l",
              "D": "σ = 2l / F"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Sim suv sirtidan uzilish paytida dinamometr ko‘rsatishi nima uchun ortadi?",
            "options": {
              "A": "Simga sirt taranglik kuchi ham ta’sir qiladi",
              "B": "Suv simni itaradi",
              "C": "Dinamometr buziladi",
              "D": "Sim og‘irroq bo‘lib qoladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Ishda tajriba uchta shakldagi sim bilan qaytariladi va σ ning qaysi qiymati hisoblanadi?",
            "options": {
              "A": "Eng kichik qiymati",
              "B": "Yig‘indisi",
              "C": "Eng katta qiymati",
              "D": "O‘rtacha qiymati"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Sim perimetri 0,2 m, sirt taranglik kuchi 0,0288 N. σ qancha? (σ = F / (2l))",
            "options": {
              "A": "0,0072 N/m",
              "B": "0,144 N/m",
              "C": "0,072 N/m",
              "D": "0,036 N/m"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Tajriba natijalarini nima uchun bir necha marta takrorlab, o‘rtachasi olinadi?",
            "options": {
              "A": "Vaqtni uzaytirish uchun",
              "B": "O‘lchash xatoligini kamaytirish uchun",
              "C": "Asbobni sinash uchun",
              "D": "Hech qanday sababsiz"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-35",
        "sectionNumber": 35,
        "title": "35-§. Kristall va amorf jismlar",
        "questions": [
          {
            "id": 1,
            "question": "Qattiq jismlarning atom (molekula)lari qanday harakatda bo‘ladi?",
            "options": {
              "A": "Aylana bo‘ylab harakatlanadi",
              "B": "Erkin harakatlanadi",
              "C": "Harakatsiz turadi",
              "D": "Muvozanat vaziyati atrofida tebranadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Kristall jism deb qanday qattiq jismga aytiladi?",
            "options": {
              "A": "Faqat metallarga",
              "B": "Atom (molekula)lari fazoda aniq tartibli vaziyatlarni egallagan jismga",
              "C": "Faqat shaffof jismga",
              "D": "Atom (molekula)lari tartibsiz joylashgan jismga"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Kristall panjara tugunlari deb nimaga aytiladi?",
            "options": {
              "A": "Atom (molekula)lar joylashgan nuqtalarga",
              "B": "Panjaraning chekkalariga",
              "C": "Panjara tashqarisidagi nuqtalarga",
              "D": "Kristallning yuzalariga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Anizotropiya nima?",
            "options": {
              "A": "Jismning fizik xossalarining yo‘nalishga bog‘liq emasligi",
              "B": "Jismning erish hodisasi",
              "C": "Jismning fizik xossalarining yo‘nalishga bog‘liqligi",
              "D": "Jismning magnitlanishi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Quyidagilardan qaysi biri kristall jism?",
            "options": {
              "A": "Smola",
              "B": "Mum",
              "C": "Osh tuzi",
              "D": "Shisha"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Quyidagilardan qaysi biri amorf jism?",
            "options": {
              "A": "Olmos",
              "B": "Shisha",
              "C": "Muz",
              "D": "Osh tuzi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "«Kristall» so‘zi yunon tilidan qanday tarjima qilinadi?",
            "options": {
              "A": "Panjara",
              "B": "Tosh",
              "C": "Shisha",
              "D": "Muz"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Kristall jismlarda atom (molekula)lar orasidagi masofa turli yo‘nalishlarda qanday?",
            "options": {
              "A": "Bir xil emas",
              "B": "Cheksiz katta",
              "C": "Nolga teng",
              "D": "Hamma yo‘nalishda bir xil"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Qattiq jismlar tuzilishiga ko‘ra qanday turlarga bo‘linadi?",
            "options": {
              "A": "Kristall va amorf jismlarga",
              "B": "Shaffof va xira jismlarga",
              "C": "Yengil va og‘ir jismlarga",
              "D": "Elastik va noelastik jismlarga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Qattiq jism umuman qanday xossalarga ega?",
            "options": {
              "A": "Faqat shaklini saqlaydi",
              "B": "O‘z hajmini ham, shaklini ham saqlaydi",
              "C": "Hech birini saqlamaydi",
              "D": "Faqat hajmini saqlaydi"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-36",
        "sectionNumber": 36,
        "title": "36-§. Qattiq jismlarning mexanik xossalari",
        "questions": [
          {
            "id": 1,
            "question": "Deformatsiya nima?",
            "options": {
              "A": "Tashqi ta’sir natijasida jism shakli yoki o‘lchamining o‘zgarishi",
              "B": "Jismning erishi",
              "C": "Jismning harakati",
              "D": "Jismning qizishi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Elastik deformatsiya deb qanday deformatsiyaga aytiladi?",
            "options": {
              "A": "Jism o‘z shaklini tiklamaydigan deformatsiyaga",
              "B": "Jism buzilib ketadigan deformatsiyaga",
              "C": "Tashqi ta’sir olingandan keyin jism dastlabki shakl va o‘lchamini tiklaydigan deformatsiyaga",
              "D": "Jism erib ketadigan deformatsiyaga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Mexanik kuchlanish qaysi formula bilan topiladi? (F – deformatsiyalovchi kuch, S – ko‘ndalang kesim yuzi)",
            "options": {
              "A": "σ = F · S",
              "B": "σ = F / S",
              "C": "σ = S / F",
              "D": "σ = F + S"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Mexanik kuchlanishning XBS dagi birligi qaysi?",
            "options": {
              "A": "Nyuton (N)",
              "B": "Kilogramm (kg)",
              "C": "Paskal (Pa)",
              "D": "Joul (J)"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Guk qonuni qaysi formula bilan ifodalanadi? (ε – nisbiy uzayish)",
            "options": {
              "A": "σ = E + ε",
              "B": "σ = ε / E",
              "C": "σ = E / ε",
              "D": "σ = E · ε"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Yung moduli katta bo‘lgan material deformatsiyasi qanday bo‘ladi?",
            "options": {
              "A": "Deformatsiyalanmaydi",
              "B": "Yung moduli deformatsiyaga bog‘liq emas",
              "C": "Ko‘p deformatsiyalanadi",
              "D": "Kam deformatsiyalanadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Nisbiy uzayish qaysi formula bilan topiladi?",
            "options": {
              "A": "ε = l – Δl",
              "B": "ε = Δl / l",
              "C": "ε = Δl · l",
              "D": "ε = l / Δl"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Kristall va amorf jismlar orasidagi muhim farq nima?",
            "options": {
              "A": "Amorf jismlar aniq erish temperaturasiga ega",
              "B": "Ikkalasi ham aniq erish temperaturasiga ega",
              "C": "Ikkalasi ham aniq erish temperaturasiga ega emas",
              "D": "Kristall jismlar aniq erish temperaturasiga ega, amorf jismlar esa ega emas"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Tashqi ta’sir ostida amorf jismlar qanday xususiyat namoyon qiladi?",
            "options": {
              "A": "Ham sinuvchan, ham oquvchan bo‘ladi",
              "B": "Mutlaqo o‘zgarmaydi",
              "C": "Faqat oquvchan bo‘ladi",
              "D": "Faqat sinuvchan bo‘ladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Abu Rayhon Beruniy qaysi asrlarda yashab ijod etgan?",
            "options": {
              "A": "XIX–XX asrlarda",
              "B": "V–VI asrlarda",
              "C": "X–XI asrlarda",
              "D": "XV–XVI asrlarda"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-37",
        "sectionNumber": 37,
        "title": "37-§. Masalalar yechish (mexanik kuchlanish, Yung moduli)",
        "questions": [
          {
            "id": 1,
            "question": "Diametri 2 cm bo‘lgan po‘lat arqonga og‘irligi 30 kN bo‘lgan yuk osilgan. Arqondagi mexanik kuchlanish taxminan qancha? (π ≈ 3,14)",
            "options": {
              "A": "95,5 MPa",
              "B": "191 MPa",
              "C": "9,55 MPa",
              "D": "47,7 MPa"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "18 kN cho‘zuvchi kuch ta’sirida 6·10⁷ N/m² mexanik kuchlanish hosil bo‘lishi uchun sterjenning ko‘ndalang kesim yuzi qancha bo‘lishi kerak?",
            "options": {
              "A": "0,3 cm²",
              "B": "3 cm²",
              "C": "30 cm²",
              "D": "12 cm²"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Mustahkamlik chegarasi 0,5 MPa, zichligi 4000 kg/m³ bo‘lgan g‘isht devorning eng katta balandligi qancha? (g = 10 m/s²; h = σ / (ρg))",
            "options": {
              "A": "1,25 m",
              "B": "12,5 m",
              "C": "125 m",
              "D": "20 m"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Uzunligi 80 cm, kesim yuzi 0,5 mm² bo‘lgan simga 25 kg yuk osilganda sim 2 mm ga uzaydi. Yung moduli qancha? (g = 10 m/s²)",
            "options": {
              "A": "2·10¹² Pa",
              "B": "2·10¹¹ Pa",
              "C": "2·10⁹ Pa",
              "D": "5·10⁸ Pa"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Po‘lat sterjenning mustahkamlik chegarasi 400 MPa. 7,85 kN kuch ta’sirida uzilib ketgan sterjenning diametri taxminan qancha edi?",
            "options": {
              "A": "2,5 mm",
              "B": "10 mm",
              "C": "50 mm",
              "D": "5 mm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Cho‘zuvchi kuch 2 marta ortsa (kesim yuzi o‘zgarmas), mexanik kuchlanish qanday o‘zgaradi?",
            "options": {
              "A": "2 marta ortadi",
              "B": "4 marta ortadi",
              "C": "O‘zgarmaydi",
              "D": "2 marta kamayadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Uzunligi 2 m bo‘lgan sterjen 1 mm ga uzaydi. Nisbiy uzayish qancha?",
            "options": {
              "A": "5·10⁻⁴",
              "B": "2·10⁻³",
              "C": "2",
              "D": "5·10⁻³"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Yung moduli 2·10¹¹ Pa bo‘lgan po‘latning nisbiy uzayishi 10⁻³ bo‘lsa, mexanik kuchlanish qancha?",
            "options": {
              "A": "20 MPa",
              "B": "2 MPa",
              "C": "2000 MPa",
              "D": "200 MPa"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Sterjenning ko‘ndalang kesim yuzi 2 marta ortsa (kuch o‘zgarmas), mexanik kuchlanish qanday o‘zgaradi?",
            "options": {
              "A": "2 marta ortadi",
              "B": "O‘zgarmaydi",
              "C": "2 marta kamayadi",
              "D": "4 marta kamayadi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Mustahkamlik chegarasi deb nimaga aytiladi?",
            "options": {
              "A": "Jism hajmining chegarasiga",
              "B": "Jism zichligining chegarasiga",
              "C": "Jism buzilib ketadigan eng kichik mexanik kuchlanishga",
              "D": "Jism erishi uchun kerak bo‘lgan temperaturaga"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-38",
        "sectionNumber": 38,
        "title": "38-§. Qattiq jismlarning erishi va qotishi",
        "questions": [
          {
            "id": 1,
            "question": "Erish deb qanday jarayonga aytiladi?",
            "options": {
              "A": "Moddaning suyuq holatdan qattiq holatga o‘tishiga",
              "B": "Moddaning suyuq holatdan gaz holatiga o‘tishiga",
              "C": "Moddaning qattiq holatdan suyuq holatga o‘tish jarayoniga",
              "D": "Moddaning gazdan suyuqlikka o‘tishiga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Qotish deb qanday jarayonga aytiladi?",
            "options": {
              "A": "Moddaning qizishiga",
              "B": "Moddaning bug‘lanishiga",
              "C": "Moddaning qattiq holatdan suyuq holatga o‘tishiga",
              "D": "Moddaning suyuq holatdan qattiq holatga o‘tish jarayoniga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Kristall jism erish jarayonida uning temperaturasi qanday bo‘ladi?",
            "options": {
              "A": "Tebranib turadi",
              "B": "Kamayib boradi",
              "C": "O‘zgarmaydi",
              "D": "Ortib boradi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Kristall jismning erish va qotish temperaturalari o‘zaro qanday?",
            "options": {
              "A": "Bir xil",
              "B": "Hech qanday bog‘liqlik yo‘q",
              "C": "Erish temperaturasi yuqori",
              "D": "Qotish temperaturasi yuqori"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Kristall jism erish jarayonida qancha issiqlik olsa, qotish jarayonida...",
            "options": {
              "A": "shuncha issiqlik beradi",
              "B": "undan kam issiqlik beradi",
              "C": "undan ko‘p issiqlik beradi",
              "D": "issiqlik bermaydi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Erish jarayonida moddaga berilgan issiqlik nimaga sarflanadi?",
            "options": {
              "A": "Molekulalar massasini oshirishga",
              "B": "Hajmni kamaytirishga",
              "C": "Kristall panjarani buzishga (molekulalar orasidagi bog‘lanishni yengishga)",
              "D": "Temperaturani oshirishga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Quyidagi moddalardan qaysi birining erish temperaturasi eng yuqori? (alyuminiy 660 °C, mis 1083 °C, temir 1539 °C, platina 1769 °C)",
            "options": {
              "A": "Alyuminiy",
              "B": "Platina",
              "C": "Temir",
              "D": "Mis"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Qo‘rg‘oshinning erish temperaturasi qancha?",
            "options": {
              "A": "660 °C",
              "B": "327 °C",
              "C": "1083 °C",
              "D": "0 °C"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Muzning erish temperaturasi qancha?",
            "options": {
              "A": "327 °C",
              "B": "–39 °C",
              "C": "100 °C",
              "D": "0 °C"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Kristall jismning qizdirish grafigida erish jarayoni qanday ko‘rinadi?",
            "options": {
              "A": "Aylana yoyi",
              "B": "Pastga tushuvchi qism",
              "C": "Tik yuqoriga ko‘tariluvchi qism",
              "D": "Temperatura o‘zgarmaydigan gorizontal qism"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-39",
        "sectionNumber": 39,
        "title": "39-§. Moddaning solishtirma erish issiqligi. Amorf jismlarning erishi va qotishi",
        "questions": [
          {
            "id": 1,
            "question": "Solishtirma erish issiqligi deb nimaga aytiladi?",
            "options": {
              "A": "Erish temperaturasidagi 1 kg kristall moddani to‘liq eritish uchun zarur issiqlik miqdoriga",
              "B": "1 kg moddani bug‘latish uchun zarur issiqlikka",
              "C": "1 kg yoqilg‘i yonganda ajraladigan issiqlikka",
              "D": "1 kg moddani 1 K ga qizdirish uchun zarur issiqlikka"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Erish temperaturasidagi m massali moddani eritish uchun zarur issiqlik miqdori qaysi formula bilan topiladi?",
            "options": {
              "A": "Q = m / λ",
              "B": "Q = λ + m",
              "C": "Q = λ / m",
              "D": "Q = λ·m"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Solishtirma erish issiqligining XBS dagi birligi qaysi?",
            "options": {
              "A": "kg/J",
              "B": "J/kg",
              "C": "J/(kg·K)",
              "D": "J"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Amorf jismlar qizdirilganda qanday o‘zgaradi?",
            "options": {
              "A": "Avval yumshaydi, so‘ng asta-sekin suyuqlikka aylanadi",
              "B": "Aniq temperaturada birdan eriydi",
              "C": "Erimaydi",
              "D": "Darhol bug‘lanadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "0 °C temperaturadagi 2 kg muzni eritish uchun qancha issiqlik kerak? (λ = 3,3·10⁵ J/kg)",
            "options": {
              "A": "165 kJ",
              "B": "330 kJ",
              "C": "1320 kJ",
              "D": "660 kJ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Erish temperaturasidagi muzni eritish uchun 1,65 MJ issiqlik sarflandi. Muzning massasi qancha? (λ = 3,3·10⁵ J/kg)",
            "options": {
              "A": "50 kg",
              "B": "0,2 kg",
              "C": "5 kg",
              "D": "0,5 kg"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Solishtirma erish issiqligi 25 kJ/kg bo‘lgan qo‘rg‘oshindan 4 kg (erish temperaturasida) eritish uchun qancha issiqlik kerak?",
            "options": {
              "A": "6,25 kJ",
              "B": "25 kJ",
              "C": "100 kJ",
              "D": "400 kJ"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Kristall suyuqlik qotganda ajralib chiqadigan issiqlik miqdori qanday topiladi?",
            "options": {
              "A": "Q = r·m",
              "B": "Q = λ·m",
              "C": "Q = q·m",
              "D": "Q = c·m·ΔT"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Kristall va amorf jismning erishi orasidagi asosiy farq nima?",
            "options": {
              "A": "Amorf jismning aniq erish temperaturasi bo‘lmaydi",
              "B": "Kristall jismning aniq erish temperaturasi bo‘lmaydi",
              "C": "Farq yo‘q",
              "D": "Amorf jism eriganda temperaturasi o‘zgarmaydi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "0 °C dagi muz to‘liq erib, 0 °C li suvga aylandi. Bu jarayonda temperatura qanday o‘zgardi?",
            "options": {
              "A": "Kamaydi",
              "B": "O‘zgarmadi",
              "C": "Avval ortdi, keyin kamaydi",
              "D": "Ortdi"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-40",
        "sectionNumber": 40,
        "title": "40-§. Bug‘lanish va kondensatsiya",
        "questions": [
          {
            "id": 1,
            "question": "Bug‘lanish deb qanday jarayonga aytiladi?",
            "options": {
              "A": "Moddaning qotishiga",
              "B": "Moddaning gaz holatidan suyuq holatga o‘tishiga",
              "C": "Moddaning qattiq holatdan suyuq holatga o‘tishiga",
              "D": "Moddaning suyuq yoki qattiq holatdan gaz holatiga o‘tish jarayoniga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Kondensatsiya nima?",
            "options": {
              "A": "Suyuqlikning bug‘ga aylanishi",
              "B": "Qattiq jismning erishi",
              "C": "Bug‘ning suyuqlikka aylanishi",
              "D": "Suyuqlikning qotishi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Bug‘lanishda suyuqlikni qaysi molekulalar tark etadi?",
            "options": {
              "A": "Faqat og‘ir molekulalar",
              "B": "Kinetik energiyasi katta bo‘lgan molekulalar",
              "C": "Kinetik energiyasi eng kichik molekulalar",
              "D": "Barcha molekulalar bir vaqtda"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Suyuqlik bug‘langanda uning temperaturasi nima uchun pasayadi?",
            "options": {
              "A": "Atrofdan issiqlik olmaydi",
              "B": "Suyuqlik og‘irlashadi",
              "C": "Suyuqlik hajmi ortadi",
              "D": "Eng tez molekulalar chiqib ketadi va o‘rtacha kinetik energiya kamayadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Bug‘lanish tezligi qaysi omillarga bog‘liq?",
            "options": {
              "A": "Hech narsaga bog‘liq emas",
              "B": "Temperatura, sirt yuzasi va shamol mavjudligiga",
              "C": "Faqat idish shakliga",
              "D": "Faqat idish rangiga"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "To‘yingan bug‘ deb qanday bug‘ga aytiladi?",
            "options": {
              "A": "Siqilgan gazga",
              "B": "Suyuqlik bo‘lmagan joydagi bug‘ga",
              "C": "Suyuqlik bilan dinamik muvozanatda turgan bug‘ga",
              "D": "Qaynayotgan suyuqlik bug‘iga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Dinamik muvozanatda nima sodir bo‘ladi?",
            "options": {
              "A": "Suyuqlikdan chiqayotgan molekulalar soni unga qaytayotgan molekulalar soniga teng bo‘ladi",
              "B": "Suyuqlikdan molekulalar chiqmaydi",
              "C": "Bug‘lanish tezlashadi",
              "D": "Faqat molekulalar qaytadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Suyuqlik temperaturasi ortganda to‘yingan bug‘ning bosimi qanday o‘zgaradi?",
            "options": {
              "A": "Kamayadi",
              "B": "Nolga teng bo‘ladi",
              "C": "O‘zgarmaydi",
              "D": "Ortadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Qaynash vaqtida suyuqlikning temperaturasi qanday bo‘ladi?",
            "options": {
              "A": "O‘zgarmay qoladi",
              "B": "Tebranib turadi",
              "C": "Ortib boradi",
              "D": "Kamayib boradi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Og‘zi yaxshilab berkitilgan idishdagi suyuqlik miqdori nima uchun kamaymaydi?",
            "options": {
              "A": "Suyuqlik bug‘lanmaydi",
              "B": "Suyuqlik doim muzlaydi",
              "C": "Bug‘lanish va kondensatsiya o‘zaro muvozanatlashadi",
              "D": "Idish suyuqlikni so‘radi"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-41",
        "sectionNumber": 41,
        "title": "41-§. Atmosferadagi hodisalar",
        "questions": [
          {
            "id": 1,
            "question": "Absolyut namlik nimani bildiradi?",
            "options": {
              "A": "Havoning temperaturasini",
              "B": "1 m³ havodagi suv bug‘ining massasini",
              "C": "Havoning bosimini",
              "D": "Havodagi kislorod miqdorini"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Nisbiy namlik qaysi formula bilan topiladi? (p – havodagi suv bug‘i bosimi, p₀ – shu temperaturadagi to‘yingan bug‘ bosimi)",
            "options": {
              "A": "φ = (p / p₀)·100 %",
              "B": "φ = p·p₀",
              "C": "φ = (p₀ / p)·100 %",
              "D": "φ = p – p₀"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Nisbiy namlik 100 % bo‘lsa, havo qanday holatda bo‘ladi?",
            "options": {
              "A": "Sovuq",
              "B": "Kislorodsiz",
              "C": "Mutlaqo quruq",
              "D": "Suv bug‘iga to‘yingan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Havoda suv bug‘i bosimi 1,2 kPa, shu temperaturadagi to‘yingan bug‘ bosimi 2,4 kPa. Nisbiy namlik qancha?",
            "options": {
              "A": "1,2 %",
              "B": "50 %",
              "C": "200 %",
              "D": "2,88 %"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Atmosferada hosil bo‘ladigan hodisalarga qaysilar kiradi?",
            "options": {
              "A": "Faqat quyosh tutilishi",
              "B": "Faqat shamol",
              "C": "Yomg‘ir, qor, do‘l, shudring, qirov",
              "D": "Chaqmoq va zilzila faqat"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Tashqi bosim ortganda suyuqlikning qaynash temperaturasi qanday o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "Kamayadi",
              "C": "Nolga teng bo‘ladi",
              "D": "Ortadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Tashqi bosim pasayganda suyuqlikning qaynash temperaturasi qanday o‘zgaradi?",
            "options": {
              "A": "Cheksiz ortadi",
              "B": "Pasayadi",
              "C": "Ortadi",
              "D": "O‘zgarmaydi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Normal sharoitda spirt va suv qaysi temperaturalarda qaynaydi?",
            "options": {
              "A": "Ikkalasi 100 °C da",
              "B": "Spirt 100 °C da, suv 78 °C da",
              "C": "Spirt 78 °C da, suv 100 °C da",
              "D": "Ikkalasi 78 °C da"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Tog‘ning 5 km balandligida suv taxminan qaysi temperaturada qaynaydi?",
            "options": {
              "A": "84 °C da",
              "B": "120 °C da",
              "C": "100 °C da",
              "D": "50 °C da"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Tibbiyot muassasalarida jarrohlik asboblarini zararsizlantirish uchun nima uchun yuqori bosimda qaynatiladi?",
            "options": {
              "A": "Yuqori bosimda suvning qaynash temperaturasi yuqori bo‘ladi",
              "B": "Yuqori bosimda suv tezroq qaynaydi va sovuq bo‘ladi",
              "C": "Suv massasi ortadi",
              "D": "Bosim bakteriyalarni yo‘q qiladi"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-42",
        "sectionNumber": 42,
        "title": "42-§. Laboratoriya ishi. Havoning nisbiy namligini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Ishning maqsadi nima?",
            "options": {
              "A": "Havoning namligini tajribada aniqlashni o‘rganish",
              "B": "Shamol tezligini o‘lchash",
              "C": "Havo zichligini hisoblash",
              "D": "Havo bosimini o‘lchash"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Ishda qaysi asbobdan foydalaniladi?",
            "options": {
              "A": "Avgust psixrometri (yoki ikkita bir xil termometr)",
              "B": "Ampermetr",
              "C": "Manometr",
              "D": "Dinamometr"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Psixrometrning ho‘l termometri quruq termometrga nisbatan qanday ko‘rsatadi?",
            "options": {
              "A": "Nol temperaturani",
              "B": "Yuqoriroq temperaturani",
              "C": "Pastroq temperaturani",
              "D": "Aynan bir xil temperaturani"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Ho‘l termometr nima uchun past temperaturani ko‘rsatadi?",
            "options": {
              "A": "Doka muzlaydi",
              "B": "Suv termometrni sovitadi doim",
              "C": "Quruq termometr noto‘g‘ri ishlaydi",
              "D": "Ho‘l dokadan suv bug‘lanishida issiqlik olinadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Quruq va ho‘l termometrlar ko‘rsatishlarining farqi qanday belgilanadi?",
            "options": {
              "A": "Δt = t(ho‘l) / t(quruq)",
              "B": "Δt = t(quruq) – t(ho‘l)",
              "C": "Δt = t(quruq) + t(ho‘l)",
              "D": "Δt = t(quruq) · t(ho‘l)"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Nisbiy namlik qaerdan topiladi?",
            "options": {
              "A": "Dinamometr ko‘rsatishidan",
              "B": "Barometr ko‘rsatishidan",
              "C": "Termometrni qizdirib",
              "D": "Psixrometrik jadvaldan t va Δt bo‘yicha"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Quruq va ho‘l termometrlar bir xil temperaturani ko‘rsatsa (Δt = 0), nisbiy namlik qancha?",
            "options": {
              "A": "0 %",
              "B": "20 %",
              "C": "50 %",
              "D": "100 % ga yaqin"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Δt qancha katta bo‘lsa, havo qanday bo‘ladi?",
            "options": {
              "A": "Namroq",
              "B": "Bir xil",
              "C": "Quruqroq",
              "D": "To‘yingan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Agar faqat bitta termometr bo‘lsa, psixrometrni qanday yasash mumkin?",
            "options": {
              "A": "Termometrni qizdirib",
              "B": "Termometrni muzlatib",
              "C": "Termometr rezervuarini ho‘l mato (doka) bilan o‘rab, uni suvli idishga tushirib",
              "D": "Termometrni suvga botirib"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Xonadagi absolyut namlik qanday aniqlanadi?",
            "options": {
              "A": "Dinamometr bilan",
              "B": "Berilgan jadvaldan foydalanib",
              "C": "Menzurka bilan",
              "D": "Tarozida tortib"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-43",
        "sectionNumber": 43,
        "title": "43-§. Masalalar yechish (namlik, erish, bug‘lanish)",
        "questions": [
          {
            "id": 1,
            "question": "Havoning absolyut namligi 10 g/m³, shu temperaturada to‘yingan bug‘ zichligi 20 g/m³. Nisbiy namlik qancha?",
            "options": {
              "A": "50 %",
              "B": "2 %",
              "C": "200 %",
              "D": "10 %"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Havodagi suv bug‘i bosimi 1,5 kPa, to‘yingan bug‘ bosimi 2,5 kPa. Nisbiy namlik qancha?",
            "options": {
              "A": "1,67 %",
              "B": "167 %",
              "C": "60 %",
              "D": "40 %"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Nisbiy namlik 40 %, to‘yingan bug‘ zichligi 30 g/m³. Absolyut namlik qancha?",
            "options": {
              "A": "75 g/m³",
              "B": "120 g/m³",
              "C": "12 g/m³",
              "D": "0,75 g/m³"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "Erish temperaturasidagi 1 kg muzni eritish uchun qancha issiqlik kerak? (λ = 3,3·10⁵ J/kg)",
            "options": {
              "A": "3300 kJ",
              "B": "330 kJ",
              "C": "3,3 kJ",
              "D": "33 kJ"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "100 °C dagi 0,5 kg suvni bug‘lantirish uchun qancha issiqlik kerak? (r = 2,3·10⁶ J/kg)",
            "options": {
              "A": "2,3 MJ",
              "B": "4,6 MJ",
              "C": "0,46 MJ",
              "D": "1,15 MJ"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "0 °C dagi 2 kg suv muzlaganda qancha issiqlik ajraladi? (λ = 3,3·10⁵ J/kg)",
            "options": {
              "A": "660 kJ",
              "B": "1320 kJ",
              "C": "165 kJ",
              "D": "330 kJ"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Hajmi 3 m³ bo‘lgan xonada absolyut namlik 12 g/m³. Xonadagi suv bug‘i massasi qancha?",
            "options": {
              "A": "4 g",
              "B": "36 g",
              "C": "15 g",
              "D": "0,25 g"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "0 °C dagi 0,5 kg muzni to‘liq eritib, so‘ng 20 °C gacha isitish uchun qancha issiqlik kerak? (λ = 3,3·10⁵ J/kg, c = 4200 J/(kg·K))",
            "options": {
              "A": "207 kJ",
              "B": "165 kJ",
              "C": "42 kJ",
              "D": "372 kJ"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Absolyut namlik o‘zgarmasdan havo temperaturasi pasaysa, nisbiy namlik qanday o‘zgaradi?",
            "options": {
              "A": "O‘zgarmaydi",
              "B": "Kamayadi",
              "C": "Nolga teng bo‘ladi",
              "D": "Ortadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Quruq termometr 20 °C, ho‘l termometr 16 °C ni ko‘rsatsa, Δt qancha?",
            "options": {
              "A": "20 °C",
              "B": "4 °C",
              "C": "1,25 °C",
              "D": "36 °C"
            },
            "correctAnswer": "B"
          }
        ]
      }
    ]
  },
  {
    "id": "g9-test-bob-5",
    "title": "V bob. Geometrik optika va optik asboblar",
    "topics": [
      {
        "id": "g9-test-44",
        "sectionNumber": 44,
        "title": "44-§. Yorug‘lik tezligini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Yorug‘lik tezligini birinchi bo‘lib o‘lchagan olim kim va qachon?",
            "options": {
              "A": "Nyuton, 1687-yilda",
              "B": "Maksvell, 1865-yilda",
              "C": "Galiley, 1590-yilda",
              "D": "Daniyalik olim Olaf Ryomer, 1676-yilda"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Ryomer yorug‘lik tezligini qaysi astronomik kuzatuv asosida aniqlagan?",
            "options": {
              "A": "Merkuriyning Quyosh oldidan o‘tishi asosida",
              "B": "Yupiterning «Io» yo‘ldoshining tutilishi asosida",
              "C": "Oy tutilishi asosida",
              "D": "Quyosh tutilishi asosida"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Yorug‘likning vakuumdagi tezligi taxminan qancha?",
            "options": {
              "A": "3·10⁸ m/s",
              "B": "3·10¹² m/s",
              "C": "340 m/s",
              "D": "3·10⁵ m/s"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Ryomerga ko‘ra yorug‘lik Yer orbitasining diametrini (D = 2,84·10¹¹ m) taxminan 22 minutda o‘tadi. Shunga ko‘ra yorug‘lik tezligi taxminan qancha?",
            "options": {
              "A": "1,3·10⁹ m/s",
              "B": "6,5·10⁶ m/s",
              "C": "2,15·10⁸ m/s",
              "D": "3·10⁸ m/s"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Quyoshdan Yergacha masofa taxminan 1,5·10¹¹ m. Quyosh nuri Yerga necha sekundda yetib keladi? (c = 3·10⁸ m/s)",
            "options": {
              "A": "50 s",
              "B": "5 s",
              "C": "500 s",
              "D": "5000 s"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Yorug‘lik Yerdan Oygacha (3,84·10⁸ m) necha sekundda yetib boradi?",
            "options": {
              "A": "12,8 s",
              "B": "0,128 s",
              "C": "1,28 s",
              "D": "128 s"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Yorug‘likning muhitdagi tezligi vakuumdagi tezligiga nisbatan qanday?",
            "options": {
              "A": "Cheksiz katta",
              "B": "Bir xil",
              "C": "Katta",
              "D": "Kichik"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Qaysi asbob bilan odatiy sharoitda yorug‘lik tezligini to‘g‘ridan-to‘g‘ri o‘lchab bo‘lmaydi?",
            "options": {
              "A": "Maxsus astronomik usullar bilan",
              "B": "Aylanuvchi tishli g‘ildirak bilan",
              "C": "Lazer qurilmalari bilan",
              "D": "Sekundomer va o‘lchov lentasi bilan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Yer Yupiterga eng yaqin va eng uzoq bo‘lganda Io tutilishining boshlanish vaqti o‘rtacha vaqtdan taxminan necha minutga farq qiladi?",
            "options": {
              "A": "Taxminan 11 minutga oldin va 11 minutga keyin",
              "B": "Taxminan 1 soatga",
              "C": "Farq qilmaydi",
              "D": "Taxminan 1 minutga"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Ryomer yorug‘lik tezligini aniqlash uchun qaysi formuladan foydalangan? (D – Yer orbitasi diametri, t – yorug‘lik uni kesib o‘tgan vaqt)",
            "options": {
              "A": "c = t / D",
              "B": "c = D / t",
              "C": "c = D + t",
              "D": "c = D · t"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-45",
        "sectionNumber": 45,
        "title": "45-§. Yorug‘likning qaytish va sinish qonunlari",
        "questions": [
          {
            "id": 1,
            "question": "Yorug‘lik nuri deb nimaga aytiladi?",
            "options": {
              "A": "Ekranga",
              "B": "Yo‘nalishi fazoning har bir nuqtasida yorug‘lik energiyasining ko‘chish yo‘nalishi bilan ustma-ust tushgan geometrik chiziqqa",
              "C": "Yorug‘lik manbayiga",
              "D": "Soyaga"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Yorug‘likning tarqalish qonunlarini o‘rganadigan bo‘lim qanday ataladi?",
            "options": {
              "A": "Geometrik optika",
              "B": "Mexanika",
              "C": "Termodinamika",
              "D": "Elektrodinamika"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Geometrik optikaning qonunlari qaysilar?",
            "options": {
              "A": "Boyl–Mariott, Sharl va Gey-Lyussak qonunlari",
              "B": "Guk, Nyuton va Paskal qonunlari",
              "C": "Om, Joul–Lens va Kulon qonunlari",
              "D": "To‘g‘ri chiziq bo‘ylab tarqalish, mustaqillik, qaytish va sinish qonunlari"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Nuqtaviy manba bilan ekran orasiga jism qo‘yilganda soya hosil bo‘lishi qaysi qonun natijasi?",
            "options": {
              "A": "Yorug‘likning qaytishi",
              "B": "Yorug‘likning to‘g‘ri chiziq bo‘ylab tarqalishi",
              "C": "Yorug‘likning mustaqilligi",
              "D": "Yorug‘likning sinishi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Yorug‘likning qaytish qonuni qanday?",
            "options": {
              "A": "Tushish burchagi qaytish burchagiga teng",
              "B": "Tushish burchagi sinish burchagiga teng",
              "C": "Qaytish burchagi tushish burchagidan 2 marta katta",
              "D": "Qaytish burchagi 90° ga teng"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Tushgan nur, qaytgan nur va ikki muhit chegarasiga tushish nuqtasida o‘tkazilgan normal qanday joylashgan?",
            "options": {
              "A": "Parallel joylashadi",
              "B": "Bir tekislikda yotadi",
              "C": "Uch xil tekislikda yotadi",
              "D": "Bir to‘g‘ri chiziqda yotadi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "Yorug‘likning sinish qonuni qaysi formula bilan ifodalanadi?",
            "options": {
              "A": "sinα + sinβ = n",
              "B": "sinα · sinβ = n",
              "C": "sinα / sinβ = n",
              "D": "α / β = n"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Muhitning absolyut sindirish ko‘rsatkichi qaysi formula bilan topiladi? (c – vakuumdagi, v – muhitdagi yorug‘lik tezligi)",
            "options": {
              "A": "n = c · v",
              "B": "n = v / c",
              "C": "n = c / v",
              "D": "n = c – v"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Tushish burchagi 30° bo‘lsa, tushgan va qaytgan nurlar orasidagi burchak qancha bo‘ladi?",
            "options": {
              "A": "60°",
              "B": "120°",
              "C": "90°",
              "D": "30°"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Suvning absolyut sindirish ko‘rsatkichi 1,33. Suvda yorug‘lik tezligi taxminan qancha? (c = 3·10⁸ m/s)",
            "options": {
              "A": "3·10⁸ m/s",
              "B": "4·10⁸ m/s",
              "C": "1,33·10⁸ m/s",
              "D": "2,26·10⁸ m/s"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-46",
        "sectionNumber": 46,
        "title": "46-§. Masalalar yechish (qaytish va sinish)",
        "questions": [
          {
            "id": 1,
            "question": "Tushgan va qaytgan nurlar orasidagi burchak 70° bo‘lishi uchun nur yassi ko‘zguga qanday burchak ostida tushishi kerak?",
            "options": {
              "A": "35°",
              "B": "20°",
              "C": "140°",
              "D": "70°"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Yassi ko‘zguda buyum tasviri ko‘zgudan 60 cm masofada hosil bo‘lsa, buyum bilan uning tasviri orasidagi masofa qancha?",
            "options": {
              "A": "180 cm",
              "B": "60 cm",
              "C": "30 cm",
              "D": "120 cm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Absolyut sindirish ko‘rsatkichi 2 ga teng bo‘lgan muhitda yorug‘lik qanday tezlik bilan tarqaladi? (c = 3·10⁸ m/s)",
            "options": {
              "A": "6·10⁸ m/s",
              "B": "1,5·10⁸ m/s",
              "C": "3·10⁸ m/s",
              "D": "0,75·10⁸ m/s"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Havodan shishaga tushgan va qaytgan nurlar orasidagi burchak 60°. Shishaning sindirish ko‘rsatkichi 1,5 bo‘lsa, sinish burchagi taxminan qancha? (havo uchun n = 1)",
            "options": {
              "A": "30°",
              "B": "45°",
              "C": "60°",
              "D": "19,5°"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Nur suvdan (n = 1,33) shishaga (n = 1,5) o‘tmoqda. Bir xil vaqt ichida nurning suvda va shishada o‘tgan masofalari nisbati s(suv)/s(shisha) taxminan qancha?",
            "options": {
              "A": "1,33",
              "B": "0,89",
              "C": "1,13",
              "D": "1,5"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Nur n₁ = √2 muhitdan ikkinchi muhitga 45° burchak ostida tushib, 30° burchak ostida sinadi. Yorug‘likning ikkinchi muhitdagi tezligi qancha? (c = 3·10⁸ m/s)",
            "options": {
              "A": "3·10⁸ m/s",
              "B": "0,75·10⁸ m/s",
              "C": "1,5·10⁸ m/s",
              "D": "2,1·10⁸ m/s"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Yassi ko‘zguda hosil bo‘ladigan tasvir qanday bo‘ladi?",
            "options": {
              "A": "Haqiqiy, kattalashgan",
              "B": "Mavhum, kattalashgan",
              "C": "Haqiqiy, kichraygan",
              "D": "Mavhum, buyumga teng o‘lchamli"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Nur ikki muhit chegarasiga normal bo‘ylab tushsa, sinish burchagi qancha bo‘ladi?",
            "options": {
              "A": "0°",
              "B": "90°",
              "C": "Tushish burchagiga teng",
              "D": "45°"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Shishada (n = 1,5) yorug‘likning tezligi qancha? (c = 3·10⁸ m/s)",
            "options": {
              "A": "3·10⁸ m/s",
              "B": "2·10⁸ m/s",
              "C": "4,5·10⁸ m/s",
              "D": "1,5·10⁸ m/s"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Tushish burchagi 0° bo‘lsa, qaytish burchagi qancha bo‘ladi?",
            "options": {
              "A": "180°",
              "B": "45°",
              "C": "0°",
              "D": "90°"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-47",
        "sectionNumber": 47,
        "title": "47-§. To‘la ichki qaytish",
        "questions": [
          {
            "id": 1,
            "question": "To‘la ichki qaytish qaysi holda kuzatiladi?",
            "options": {
              "A": "Nur normal bo‘ylab tushganda",
              "B": "Nur optik zichroq muhitdan optik siyrakroq muhitga chegaraviy burchakdan katta burchak ostida tushganda",
              "C": "Nur optik siyrakroq muhitdan zichroq muhitga o‘tganda",
              "D": "Nur vakuumdan havoga o‘tganda"
            },
            "correctAnswer": "B"
          },
          {
            "id": 2,
            "question": "Chegaraviy burchak sinusi qaysi formula bilan topiladi? (n₁ > n₂)",
            "options": {
              "A": "sinα₀ = n₂ / n₁",
              "B": "sinα₀ = n₁ · n₂",
              "C": "sinα₀ = n₁ – n₂",
              "D": "sinα₀ = n₁ / n₂"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Suv (n = 1,33) – havo chegarasi uchun chegaraviy burchak taxminan qancha?",
            "options": {
              "A": "49°",
              "B": "90°",
              "C": "30°",
              "D": "41°"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Shisha (n = 1,5) – havo chegarasi uchun chegaraviy burchak taxminan qancha?",
            "options": {
              "A": "60°",
              "B": "42°",
              "C": "48°",
              "D": "30°"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Sindirish ko‘rsatkichi katta bo‘lgan modda uchun chegaraviy burchak qanday bo‘ladi?",
            "options": {
              "A": "Kattaroq",
              "B": "Bir xil",
              "C": "Kichikroq",
              "D": "90° ga teng"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "To‘la ichki qaytish hodisasi qaysi texnik qurilmada qo‘llaniladi?",
            "options": {
              "A": "Termometrda",
              "B": "Dinamometrda",
              "C": "Manometrda",
              "D": "Optik tolalarda"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Nur sindirish ko‘rsatkichi 1,5 bo‘lgan muhitdan ikkinchi muhitga 53° burchak ostida tushganda to‘la ichki qaytish kuzatildi (sin 53° ≈ 0,8). Ikkinchi muhit sindirish ko‘rsatkichi eng ko‘pi bilan qancha?",
            "options": {
              "A": "1,875",
              "B": "0,8",
              "C": "1,2",
              "D": "1,5"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "To‘la ichki qaytishda yorug‘lik energiyasining qanday qismi qaytadi?",
            "options": {
              "A": "Hech biri",
              "B": "Deyarli hammasi",
              "C": "Yarmi",
              "D": "Chorak qismi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Quyidagi muhitlardan qaysi birida (havoga nisbatan) to‘la ichki qaytish bo‘lishi mumkin?",
            "options": {
              "A": "Hech qaysi",
              "B": "Havo (suvga o‘tganda)",
              "C": "Vakuum",
              "D": "Suv, shisha (optik zichroq muhitlar)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "To‘la ichki qaytishda tushish burchagi qaytish burchagiga nisbatan qanday?",
            "options": {
              "A": "Teng",
              "B": "Katta",
              "C": "Kichik",
              "D": "Ikki marta katta"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-48",
        "sectionNumber": 48,
        "title": "48-§. Masalalar yechish (to‘la ichki qaytish)",
        "questions": [
          {
            "id": 1,
            "question": "Moddadan havoga o‘tishda chegaraviy burchak 30° bo‘lsa, modda sindirish ko‘rsatkichi qancha?",
            "options": {
              "A": "2",
              "B": "1,33",
              "C": "0,5",
              "D": "1,5"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Shisha (n = 1,5) – suv (n = 1,33) chegarasi uchun chegaraviy burchak taxminan qancha?",
            "options": {
              "A": "90°",
              "B": "62,5°",
              "C": "41,8°",
              "D": "48,8°"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Nur ikkinchi muhitga (n₂ = 1,2) 47° burchak ostida tushganda to‘la ichki qaytish boshlandi (sin 47° ≈ 0,73). Birinchi muhit sindirish ko‘rsatkichi taxminan qancha?",
            "options": {
              "A": "2,2",
              "B": "0,88",
              "C": "1,2",
              "D": "1,64"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Sindirish ko‘rsatkichi √2 bo‘lgan modda uchun havo bilan chegarada chegaraviy burchak qancha?",
            "options": {
              "A": "45°",
              "B": "90°",
              "C": "60°",
              "D": "30°"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Tushish burchagi chegaraviy burchakdan kichik bo‘lsa, nur nima bo‘ladi?",
            "options": {
              "A": "To‘la yutiladi",
              "B": "Sinmasdan to‘g‘ri ketadi",
              "C": "To‘la qaytadi",
              "D": "Qisman sinib, qisman qaytadi"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Sindirish ko‘rsatkichi 2 bo‘lgan modda uchun havo bilan chegaradagi chegaraviy burchak qancha?",
            "options": {
              "A": "90°",
              "B": "60°",
              "C": "30°",
              "D": "45°"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Suv ichidan havoga 40° burchak ostida tushgan nur nima bo‘ladi? (suv uchun chegaraviy burchak ≈ 49°)",
            "options": {
              "A": "Suv sirtida to‘xtaydi",
              "B": "Qisman havoga sinib o‘tadi",
              "C": "To‘la ichki qaytadi",
              "D": "To‘la yutiladi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Sindirish ko‘rsatkichi 1,6 bo‘lgan muhitdan havoga o‘tishda chegaraviy burchak sinusi qancha?",
            "options": {
              "A": "0,5",
              "B": "1",
              "C": "0,625",
              "D": "1,6"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Nurni yo‘lini 90° ga burish uchun to‘la ichki qaytishdan foydalanilganda prizma shishasi uchun asosiy shart nima?",
            "options": {
              "A": "Prizma juda qalin bo‘lishi",
              "B": "Prizma rangli bo‘lishi",
              "C": "Prizmaga tushish burchagi chegaraviy burchakdan katta bo‘lishi",
              "D": "Prizma suyuq bo‘lishi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "n₁ = 1,5 muhitdan n₂ = 1 muhitga o‘tishda chegaraviy burchak sinusi qancha?",
            "options": {
              "A": "1",
              "B": "0,5",
              "C": "1,5",
              "D": "0,667"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-49",
        "sectionNumber": 49,
        "title": "49-§. Laboratoriya ishi. Shishaning nur sindirish ko‘rsatkichini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Ishning maqsadi nima?",
            "options": {
              "A": "Yorug‘lik tezligini o‘lchash",
              "B": "Havo namligini aniqlash",
              "C": "Shishaning nur sindirish ko‘rsatkichini aniqlashni o‘rganish",
              "D": "Linzaning fokus masofasini aniqlash"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Ishda qaysi jihozlar ishlatiladi?",
            "options": {
              "A": "Termometr va kalorimetr",
              "B": "Linza va ekran",
              "C": "Dinamometr, shtativ, sim",
              "D": "Yorug‘lik manbayi, tirqishli to‘siq, uchburchakli shisha prizma, ignalar, transportir"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Ishda prizmaning yuqori uchidagi burchak α qanday aniqlanadi?",
            "options": {
              "A": "Prizmada yozib qo‘yilgan bo‘ladi",
              "B": "Hisoblab bo‘lmaydi",
              "C": "Dinamometr bilan o‘lchanadi",
              "D": "Termometr bilan o‘lchanadi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Nurning prizmada burilish burchagi γ qaysi asbob bilan o‘lchanadi?",
            "options": {
              "A": "Termometr",
              "B": "Transportir",
              "C": "Menzurka",
              "D": "Dinamometr"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Nurning singan yo‘li qanday belgilanadi?",
            "options": {
              "A": "Barometr yordamida",
              "B": "Ignalar yordamida",
              "C": "Termometr yordamida",
              "D": "Dinamometr yordamida"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Shishaning sindirish ko‘rsatkichi ishda qaysi formula bilan hisoblanadi?",
            "options": {
              "A": "n = sinα / sin(α + γ)",
              "B": "n = sinα · sin(α + γ)",
              "C": "n = α / γ",
              "D": "n = sin(α + γ) / sinα"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "α = 30° va γ = 15° bo‘lsa, shishaning sindirish ko‘rsatkichi taxminan qancha?",
            "options": {
              "A": "0,71",
              "B": "1,41",
              "C": "1,5",
              "D": "2"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Shishaning (havoga nisbatan) sindirish ko‘rsatkichi qanday bo‘ladi?",
            "options": {
              "A": "Manfiy",
              "B": "Birdan kichik",
              "C": "Birdan katta",
              "D": "Nolga teng"
            },
            "correctAnswer": "C"
          },
          {
            "id": 9,
            "question": "Nur shisha prizmadan havoga o‘tganda nurning singan yo‘nalishi normalga nisbatan qanday bo‘ladi?",
            "options": {
              "A": "Normaldan uzoqlashadi",
              "B": "Normalga yaqinlashadi",
              "C": "O‘zgarmaydi",
              "D": "Normalga parallel bo‘ladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "Ish natijalari qanday rasmiylashtiriladi?",
            "options": {
              "A": "Jadvalga yoziladi va n ning o‘rtacha qiymati hisoblanadi",
              "B": "Natijalar yozilmaydi",
              "C": "Faqat rasm chiziladi",
              "D": "Faqat bitta o‘lchash bilan chegaralanadi"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-50",
        "sectionNumber": 50,
        "title": "50-§. Linzalar",
        "questions": [
          {
            "id": 1,
            "question": "Linza deb nimaga aytiladi?",
            "options": {
              "A": "Yassi ko‘zguga",
              "B": "Uchburchak shishaga",
              "C": "Bir yoki ikki tomoni sferik sirt bilan chegaralangan shaffof jismga",
              "D": "Shaffof bo‘lmagan sferaga"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Qaysi linza qavariq linza deb ataladi?",
            "options": {
              "A": "O‘rta qismi yupqa bo‘lgan linza",
              "B": "Yassi shishadan iborat linza",
              "C": "Rangli shishadan iborat linza",
              "D": "O‘rta qismi chetki qismlariga nisbatan qalin bo‘lgan linza"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Qavariq linza yana qanday ataladi?",
            "options": {
              "A": "Yig‘uvchi linza",
              "B": "Sochuvchi linza",
              "C": "Yassi linza",
              "D": "Shaffof linza"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Botiq linza yana qanday ataladi?",
            "options": {
              "A": "Yassi linza",
              "B": "Qavariq linza",
              "C": "Sochuvchi linza",
              "D": "Yig‘uvchi linza"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Linzaning bosh optik o‘qi nima?",
            "options": {
              "A": "Linza chetidan o‘tuvchi chiziq",
              "B": "Linza sirtlarini tashkil etgan sferalar markazlaridan o‘tkazilgan to‘g‘ri chiziq",
              "C": "Linzaning diametri",
              "D": "Linza yuzasiga urinma"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "Linzaning bosh fokusi nima?",
            "options": {
              "A": "Linza markazi",
              "B": "Linzadan cheksiz uzoq nuqta",
              "C": "Bosh optik o‘qqa parallel nurlar linzadan o‘tgandan keyin yig‘iladigan nuqta",
              "D": "Linzaning chetki nuqtasi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Linzaning optik markazi orqali o‘tgan nur...",
            "options": {
              "A": "bosh fokusga yo‘naladi",
              "B": "dastlabki yo‘nalishini o‘zgartirmaydi",
              "C": "to‘la yutiladi",
              "D": "bosh optik o‘qqa parallel bo‘ladi"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Linzaning optik kuchi qaysi formula bilan topiladi?",
            "options": {
              "A": "D = 1/F",
              "B": "D = F",
              "C": "D = 2F",
              "D": "D = F²"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Optik kuchning birligi qaysi?",
            "options": {
              "A": "Joul",
              "B": "Vatt",
              "C": "Metr",
              "D": "Dioptriya (dptr)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Fokus masofasi 0,5 m bo‘lgan linzaning optik kuchi qancha?",
            "options": {
              "A": "0,5 dptr",
              "B": "5 dptr",
              "C": "0,2 dptr",
              "D": "2 dptr"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-51",
        "sectionNumber": 51,
        "title": "51-§. Yupqa linza yordamida tasvir yasash",
        "questions": [
          {
            "id": 1,
            "question": "Linzada tasvir yasash uchun qaysi nurlardan foydalaniladi?",
            "options": {
              "A": "Faqat vertikal nur",
              "B": "Faqat linza chetidan o‘tuvchi nur",
              "C": "Faqat normal bo‘ylab tushuvchi nur",
              "D": "Bosh optik o‘qqa parallel nur, fokusdan o‘tuvchi nur va optik markazdan o‘tuvchi nur"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Yupqa linza formulasi qaysi javobda to‘g‘ri yozilgan?",
            "options": {
              "A": "1/F = 1/d + 1/f",
              "B": "F = d · f",
              "C": "1/F = d + f",
              "D": "F = d + f"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Buyum yig‘uvchi linzadan d > 2F masofada turganda tasvir qanday bo‘ladi?",
            "options": {
              "A": "Haqiqiy, kattalashgan, to‘g‘ri",
              "B": "Mavhum, kichraygan",
              "C": "Mavhum, kattalashgan, to‘g‘ri",
              "D": "Haqiqiy, kichraygan, to‘nkarilgan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Buyum linzadan d = 2F masofada turganda tasvir qanday bo‘ladi?",
            "options": {
              "A": "Tasvir hosil bo‘lmaydi",
              "B": "Haqiqiy, buyumga teng, to‘nkarilgan",
              "C": "Haqiqiy, kattalashgan",
              "D": "Mavhum, kichraygan"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "F < d < 2F bo‘lganda yig‘uvchi linza tasviri qanday bo‘ladi?",
            "options": {
              "A": "Haqiqiy, kichraygan, to‘nkarilgan",
              "B": "Haqiqiy, kattalashgan, to‘nkarilgan",
              "C": "Mavhum, kichraygan, to‘g‘ri",
              "D": "Mavhum, kattalashgan, to‘g‘ri"
            },
            "correctAnswer": "B"
          },
          {
            "id": 6,
            "question": "d < F bo‘lganda yig‘uvchi linza tasviri qanday bo‘ladi?",
            "options": {
              "A": "Haqiqiy, kichraygan, to‘nkarilgan",
              "B": "Haqiqiy, kattalashgan, to‘nkarilgan",
              "C": "Mavhum, kattalashgan, to‘g‘ri",
              "D": "Tasvir hosil bo‘lmaydi"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Buyum yig‘uvchi linza fokusida (d = F) turganda tasvir...",
            "options": {
              "A": "hosil bo‘lmaydi (nurlar parallel chiqadi)",
              "B": "haqiqiy bo‘ladi",
              "C": "buyumga teng bo‘ladi",
              "D": "kichraygan bo‘ladi"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "Botiq (sochuvchi) linza qanday tasvir beradi?",
            "options": {
              "A": "Mavhum, kichraygan, to‘g‘ri",
              "B": "Mavhum, kattalashgan",
              "C": "Haqiqiy, kattalashgan, to‘nkarilgan",
              "D": "Haqiqiy, kichraygan, to‘nkarilgan"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "F = 10 cm bo‘lgan linzadan 15 cm masofada turgan buyum tasviri linzadan qancha masofada hosil bo‘ladi?",
            "options": {
              "A": "6 cm",
              "B": "30 cm",
              "C": "25 cm",
              "D": "5 cm"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "d = 15 cm, f = 30 cm bo‘lganda linzaning chiziqli kattalashtirishi (Γ = f/d) qancha?",
            "options": {
              "A": "45",
              "B": "15",
              "C": "2",
              "D": "0,5"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-52",
        "sectionNumber": 52,
        "title": "52-§. Masalalar yechish (linzalar)",
        "questions": [
          {
            "id": 1,
            "question": "F = 20 cm bo‘lgan linzadan 30 cm masofada buyum turibdi. Tasvir linzadan qancha masofada hosil bo‘ladi?",
            "options": {
              "A": "10 cm",
              "B": "12 cm",
              "C": "50 cm",
              "D": "60 cm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Linzaning optik kuchi 5 dptr. Uning fokus masofasi qancha?",
            "options": {
              "A": "5 cm",
              "B": "2 cm",
              "C": "50 cm",
              "D": "20 cm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "F = 20 cm bo‘lgan linza buyumdan 40 cm masofada turibdi (d = 2F). Tasvir qancha masofada hosil bo‘ladi?",
            "options": {
              "A": "20 cm",
              "B": "60 cm",
              "C": "40 cm",
              "D": "80 cm"
            },
            "correctAnswer": "C"
          },
          {
            "id": 4,
            "question": "F = 12 cm bo‘lgan yig‘uvchi linzadan 4 cm masofada buyum turibdi. Tasvir qaerda hosil bo‘ladi?",
            "options": {
              "A": "Linzaning narigi tomonida, 6 cm masofada (haqiqiy)",
              "B": "Cheksizlikda",
              "C": "Linzaning narigi tomonida, 3 cm masofada",
              "D": "Linzaning buyum tomonida, 6 cm masofada (mavhum)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Chiziqli kattalashtirish 3, d = 10 cm bo‘lsa, tasvirgacha masofa f qancha?",
            "options": {
              "A": "3,3 cm",
              "B": "7 cm",
              "C": "30 cm",
              "D": "13 cm"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Optik kuchi –2 dptr bo‘lgan linzaning fokus masofasi qancha?",
            "options": {
              "A": "2 cm",
              "B": "–2 cm",
              "C": "–50 cm (botiq linza)",
              "D": "50 cm (qavariq linza)"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Fokus masofasi 0,25 m bo‘lgan linzaning optik kuchi qancha?",
            "options": {
              "A": "40 dptr",
              "B": "4 dptr",
              "C": "0,25 dptr",
              "D": "2,5 dptr"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Buyum linzadan 30 cm, tasvir 15 cm masofada hosil bo‘ldi. Linzaning fokus masofasi qancha?",
            "options": {
              "A": "10 cm",
              "B": "5 cm",
              "C": "45 cm",
              "D": "7,5 cm"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Linza formulasida mavhum tasvir uchun f ning ishorasi qanday olinadi?",
            "options": {
              "A": "Ishora ahamiyatga ega emas",
              "B": "Manfiy",
              "C": "Musbat",
              "D": "Nolga teng"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "F = 5 cm bo‘lgan linzadan 5 cm masofada buyum turibdi. Tasvir qaerda hosil bo‘ladi?",
            "options": {
              "A": "Cheksizlikda (tasvir hosil bo‘lmaydi)",
              "B": "5 cm masofada",
              "C": "10 cm masofada",
              "D": "2,5 cm masofada"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-53",
        "sectionNumber": 53,
        "title": "53-§. Laboratoriya ishi. Linzaning optik kuchini aniqlash",
        "questions": [
          {
            "id": 1,
            "question": "Ishning maqsadi nima?",
            "options": {
              "A": "Linzaning fokus masofasi va optik kuchini aniqlashni o‘rganish",
              "B": "Yorug‘lik tezligini aniqlash",
              "C": "Sirt taranglikni aniqlash",
              "D": "Shishaning sindirish ko‘rsatkichini aniqlash"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Ishda qaysi jihozlar ishlatiladi?",
            "options": {
              "A": "Psixrometr",
              "B": "Qavariq linza, elektr lampa, ekran va masshtabli chizg‘ich",
              "C": "Prizma va transportir",
              "D": "Dinamometr va sim"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Ishda ekran nima uchun oldinga-orqaga suriladi?",
            "options": {
              "A": "Linzani tozalash uchun",
              "B": "Lampani sovitish uchun",
              "C": "Ekranni qizdirish uchun",
              "D": "Lampa tolasining eng aniq tasviri hosil bo‘ladigan masofani topish uchun"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Ishda linza fokus masofasi qanday formula bilan hisoblanadi?",
            "options": {
              "A": "F = d·f",
              "B": "F = (d – f) / d·f",
              "C": "F = d + f",
              "D": "F = d·f / (d + f)"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Optik kuch o‘rtacha fokus masofasidan qanday topiladi?",
            "options": {
              "A": "D = 1 / F(o‘rt)",
              "B": "D = F(o‘rt)",
              "C": "D = F(o‘rt)²",
              "D": "D = 2F(o‘rt)"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Linza lampadan d = 2F masofada turganda ekrandagi tasvir qanday bo‘ladi?",
            "options": {
              "A": "Hosil bo‘lmaydi",
              "B": "Buyumga teng, to‘nkarilgan",
              "C": "Kattalashgan, to‘g‘ri",
              "D": "Kichraygan, mavhum"
            },
            "correctAnswer": "B"
          },
          {
            "id": 7,
            "question": "F < d < 2F bo‘lganda ekrandagi tasvir qanday bo‘ladi?",
            "options": {
              "A": "Teng, to‘g‘ri",
              "B": "Kattalashgan, to‘nkarilgan",
              "C": "Kattalashgan, to‘g‘ri",
              "D": "Kichraygan, to‘nkarilgan"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "d < F bo‘lganda ekranda tasvir hosil qilish mumkinmi?",
            "options": {
              "A": "Yo‘q, tasvir mavhum bo‘ladi",
              "B": "Ha, kattalashgan",
              "C": "Ha, teng",
              "D": "Ha, kichraygan"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "d = 30 cm, f = 30 cm bo‘lganda linzaning optik kuchi taxminan qancha?",
            "options": {
              "A": "15 dptr",
              "B": "0,15 dptr",
              "C": "6,7 dptr",
              "D": "60 dptr"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "Fokus masofasining o‘rtacha qiymati qanday topiladi?",
            "options": {
              "A": "F(o‘rt) = F₁ – F₂",
              "B": "F(o‘rt) = F₁ · F₂ · F₃",
              "C": "F(o‘rt) = (F₁ + F₂ + F₃) / 3",
              "D": "F(o‘rt) = F₁ / F₂"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-54",
        "sectionNumber": 54,
        "title": "54-§. Optik asboblar",
        "questions": [
          {
            "id": 1,
            "question": "Lupa nima?",
            "options": {
              "A": "Sochuvchi linza",
              "B": "Prizma",
              "C": "Yassi ko‘zgu",
              "D": "Buyumlarni ko‘rish burchagini kattalashtirib beradigan kichik fokus masofali qavariq linza"
            },
            "correctAnswer": "D"
          },
          {
            "id": 2,
            "question": "Ko‘zning eng yaxshi ko‘rish masofasi taxminan qancha?",
            "options": {
              "A": "25 cm",
              "B": "250 cm",
              "C": "2,5 cm",
              "D": "2,5 m"
            },
            "correctAnswer": "A"
          },
          {
            "id": 3,
            "question": "Lupaning kattalashtirishi qaysi formula bilan topiladi? (D₀ = 25 cm)",
            "options": {
              "A": "K = D₀ · F",
              "B": "K = D₀ / F",
              "C": "K = D₀ + F",
              "D": "K = F / D₀"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Fokus masofasi 5 cm bo‘lgan lupaning kattalashtirishi qancha?",
            "options": {
              "A": "125",
              "B": "30",
              "C": "5",
              "D": "0,2"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Lupalarning fokus masofasi odatda qancha bo‘ladi?",
            "options": {
              "A": "1–10 m",
              "B": "10–100 m",
              "C": "1–10 cm",
              "D": "0,1–1 mm"
            },
            "correctAnswer": "C"
          },
          {
            "id": 6,
            "question": "Fotoapparat nima?",
            "options": {
              "A": "Mikroskopning bir turi",
              "B": "Termometr",
              "C": "Yassi ko‘zgu",
              "D": "Obyekt tasvirini fotoplyonka, fotoplastina yoki fotoqog‘ozga tushirib saqlaydigan asbob"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Fotoapparat kamera ekranida buyumning tasviri qanday bo‘ladi?",
            "options": {
              "A": "Mavhum, kichraygan",
              "B": "Mavhum, kattalashgan",
              "C": "Haqiqiy, kichraygan va teskari (to‘nkarilgan)",
              "D": "Haqiqiy, kattalashgan, to‘g‘ri"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Mikroskop nimalarni kuzatish uchun ishlatiladi?",
            "options": {
              "A": "Havo bosimini",
              "B": "Katta binolarni",
              "C": "Uzoqdagi yulduzlarni",
              "D": "Bakteriyalar, hujayralar kabi mayda obyektlarni"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Mikroskopning umumiy kattalashtirishi qanday topiladi?",
            "options": {
              "A": "Ularning ayirmasi sifatida",
              "B": "Obyektiv va okulyar kattalashtirishlarining ko‘paytmasi sifatida",
              "C": "Ularning yig‘indisi sifatida",
              "D": "Ularning nisbati sifatida"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Optik teleskoplar nima uchun ishlatiladi?",
            "options": {
              "A": "Uzoqdagi osmon jismlarini kuzatish uchun",
              "B": "Mikroorganizmlarni ko‘rish uchun",
              "C": "Suv temperaturasini o‘lchash uchun",
              "D": "Bosimni o‘lchash uchun"
            },
            "correctAnswer": "A"
          }
        ]
      },
      {
        "id": "g9-test-55",
        "sectionNumber": 55,
        "title": "55-§. Ko‘z va ko‘rish",
        "questions": [
          {
            "id": 1,
            "question": "Ko‘zning shaffof old qismi qanday ataladi?",
            "options": {
              "A": "Shox parda",
              "B": "Sklera",
              "C": "To‘r parda",
              "D": "Qorachiq"
            },
            "correctAnswer": "A"
          },
          {
            "id": 2,
            "question": "Ko‘zda qorachiq nima?",
            "options": {
              "A": "Tomirli qobiq",
              "B": "Kamalak qobiq o‘rtasidagi doirasimon teshik",
              "C": "Ko‘z gavhari",
              "D": "To‘r parda"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Ko‘zning qaysi qismi ikkiyoqlama qavariq linza vazifasini bajaradi?",
            "options": {
              "A": "Gavhar",
              "B": "Sklera",
              "C": "Qorachiq",
              "D": "Kamalak qobiq"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "Ko‘zda buyumning tasviri qaerda hosil bo‘ladi?",
            "options": {
              "A": "Qorachiqda",
              "B": "Shox pardada",
              "C": "To‘r pardada",
              "D": "Sklerada"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "To‘r pardada hosil bo‘ladigan tasvir qanday bo‘ladi?",
            "options": {
              "A": "Haqiqiy, kichraygan va teskari",
              "B": "Haqiqiy, kattalashgan, to‘g‘ri",
              "C": "Mavhum, kattalashgan",
              "D": "Mavhum, kichraygan"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Ko‘z turli masofadagi buyumlarni aniq ko‘rishi nima hisobiga ta’minlanadi?",
            "options": {
              "A": "To‘r pardaning surilishi hisobiga",
              "B": "Ko‘z sharining katta-kichik bo‘lishi hisobiga",
              "C": "Qorachiqning rangi o‘zgarishi hisobiga",
              "D": "Gavharning egrilik radiusi muskullar yordamida o‘zgarishi hisobiga"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Yaqindan ko‘rarlik kamchiligi qanday ko‘zoynak yordamida tuzatiladi?",
            "options": {
              "A": "Qavariq (yig‘uvchi) linzali ko‘zoynak bilan",
              "B": "Prizmali ko‘zoynak bilan",
              "C": "Botiq (sochuvchi) linzali ko‘zoynak bilan",
              "D": "Yassi shishali ko‘zoynak bilan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Uzoqdan ko‘rarlik kamchiligi qanday ko‘zoynak yordamida tuzatiladi?",
            "options": {
              "A": "Botiq (sochuvchi) linzali ko‘zoynak bilan",
              "B": "Rangli shishali ko‘zoynak bilan",
              "C": "Yassi shishali ko‘zoynak bilan",
              "D": "Qavariq (yig‘uvchi) linzali ko‘zoynak bilan"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Yaqindan ko‘rarlikda buyum tasviri qaerda hosil bo‘ladi?",
            "options": {
              "A": "To‘r pardadan orqada",
              "B": "To‘r pardadan oldinda",
              "C": "To‘r pardada",
              "D": "Shox pardada"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "Yaqindan ko‘ruvchi ko‘zoynagining optik kuchi qanday bo‘ladi?",
            "options": {
              "A": "Musbat",
              "B": "Manfiy",
              "C": "Cheksiz katta",
              "D": "Nolga teng"
            },
            "correctAnswer": "B"
          }
        ]
      },
      {
        "id": "g9-test-56",
        "sectionNumber": 56,
        "title": "56-§. Masalalar yechish (optik asboblar, ko‘z)",
        "questions": [
          {
            "id": 1,
            "question": "Fokus masofasi 2,5 cm bo‘lgan lupaning kattalashtirishi qancha? (D₀ = 25 cm)",
            "options": {
              "A": "27,5",
              "B": "62,5",
              "C": "10",
              "D": "0,1"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Lupaning kattalashtirishi 5 bo‘lsa, uning fokus masofasi qancha? (D₀ = 25 cm)",
            "options": {
              "A": "0,2 cm",
              "B": "5 cm",
              "C": "20 cm",
              "D": "125 cm"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "Ko‘zoynak linzasining optik kuchi –2 dptr. Bu qanday linza va uning fokus masofasi qancha?",
            "options": {
              "A": "Qavariq linza, F = 50 cm",
              "B": "Qavariq linza, F = 2 cm",
              "C": "Botiq linza, F = –2 cm",
              "D": "Botiq linza, F = –50 cm"
            },
            "correctAnswer": "D"
          },
          {
            "id": 4,
            "question": "Ko‘zoynak linzasining optik kuchi +2,5 dptr. Uning fokus masofasi qancha?",
            "options": {
              "A": "2,5 cm",
              "B": "0,4 cm",
              "C": "40 cm",
              "D": "25 cm"
            },
            "correctAnswer": "C"
          },
          {
            "id": 5,
            "question": "Mikroskop obyektivining kattalashtirishi 20, okulyarniki 10. Mikroskopning umumiy kattalashtirishi qancha?",
            "options": {
              "A": "10",
              "B": "30",
              "C": "2",
              "D": "200"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Fokus masofasi 10 cm bo‘lgan lupaning kattalashtirishi qancha? (D₀ = 25 cm)",
            "options": {
              "A": "2,5",
              "B": "35",
              "C": "250",
              "D": "0,4"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Fotoapparat obyektividan juda uzoqdagi buyumning tasviri qaerda hosil bo‘ladi?",
            "options": {
              "A": "Linzadan 2 marta uzoqda",
              "B": "Cheksizlikda",
              "C": "Fokal tekislikka juda yaqin",
              "D": "Linzaning o‘zida"
            },
            "correctAnswer": "C"
          },
          {
            "id": 8,
            "question": "Optik kuchi 4 dptr bo‘lgan linzaning fokus masofasi qancha?",
            "options": {
              "A": "25 cm",
              "B": "40 cm",
              "C": "2,5 cm",
              "D": "4 cm"
            },
            "correctAnswer": "A"
          },
          {
            "id": 9,
            "question": "Fokus masofasi qancha bo‘lsa, lupa buyumni ko‘proq kattalashtiradi?",
            "options": {
              "A": "Cheksiz katta",
              "B": "Fokus masofasi ahamiyatga ega emas",
              "C": "Kattaroq",
              "D": "Kichikroq"
            },
            "correctAnswer": "D"
          },
          {
            "id": 10,
            "question": "Ko‘z gavharining sindirish ko‘rsatkichi taxminan qancha?",
            "options": {
              "A": "1,33",
              "B": "1,5",
              "C": "2,4",
              "D": "1"
            },
            "correctAnswer": "B"
          }
        ]
      }
    ]
  },
  {
    "id": "g9-test-bob-6",
    "title": "VI bob. Geliotexnika va olamning yagona fizik manzarasi",
    "topics": [
      {
        "id": "g9-test-57",
        "sectionNumber": 57,
        "title": "57-§. Geliotexnika. O‘zbekistonda quyosh energiyasidan foydalanish",
        "questions": [
          {
            "id": 1,
            "question": "Geliotexnika nima bilan shug‘ullanadi?",
            "options": {
              "A": "Gidroenergiya bilan",
              "B": "Yadro energiyasi bilan",
              "C": "Quyosh energiyasidan foydalanish istiqbollari bilan",
              "D": "Shamol energiyasi bilan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "«Gelios» yunoncha so‘zi qanday ma’noni bildiradi?",
            "options": {
              "A": "Oy",
              "B": "Suv",
              "C": "Quyosh",
              "D": "Yer"
            },
            "correctAnswer": "C"
          },
          {
            "id": 3,
            "question": "Quyosh energiyasini boshqa turdagi energiyaga aylantirib beruvchi qurilmalar qanday ataladi?",
            "options": {
              "A": "Issiqlik dvigatellari",
              "B": "Geliotexnik qurilmalar",
              "C": "Gidroelektrostansiyalar",
              "D": "Atom reaktorlari"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Yil davomida Yerning 1 m² yuzasiga to‘g‘ri keladigan Quyosh energiyasi qancha oraliqda o‘zgaradi?",
            "options": {
              "A": "1 W/m² dan 10 W/m² gacha",
              "B": "10⁴ W/m² dan 10⁵ W/m² gacha",
              "C": "0 dan 50 W/m² gacha",
              "D": "300 W/m² dan 1340 W/m² gacha"
            },
            "correctAnswer": "D"
          },
          {
            "id": 5,
            "question": "Markaziy Osiyoda iyun oyida yorug‘ kun uzunligi taxminan qancha?",
            "options": {
              "A": "16 soat",
              "B": "4 soat",
              "C": "8 soat",
              "D": "24 soat"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Markaziy Osiyoda dekabrda yorug‘ kun uzunligi qancha?",
            "options": {
              "A": "8–10 soat",
              "B": "2 soat",
              "C": "24 soat",
              "D": "16 soat"
            },
            "correctAnswer": "A"
          },
          {
            "id": 7,
            "question": "Yozda oyiga qancha ochiq quyosh nuri to‘g‘ri keladi?",
            "options": {
              "A": "3200–4000 soat",
              "B": "320–400 soat",
              "C": "10 soat",
              "D": "32–40 soat"
            },
            "correctAnswer": "B"
          },
          {
            "id": 8,
            "question": "Quyosh energiyasidan qadimdan O‘zbekistonda qanday maqsadda foydalanib kelingan?",
            "options": {
              "A": "Raketa uchirishda",
              "B": "Meva va sabzavotlarni quritishda",
              "C": "Atom reaktorlarida",
              "D": "Elektr ishlab chiqarishda"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Abu Ali ibn Sino «Donishnoma» kitobida linzaning alanga oldirishiga sabab nimada deb yozgan?",
            "options": {
              "A": "Linza nurlarni bir nuqtaga yig‘ib, u joyni kuchli isitishida",
              "B": "Linza materialining o‘zi yonuvchanligida",
              "C": "Linza nur chiqarishida",
              "D": "Linza nurni yutishida"
            },
            "correctAnswer": "A"
          },
          {
            "id": 10,
            "question": "O‘zbekistonda Geliotexnika laboratoriyasi qaysi yilda Toshkentda faoliyat ko‘rsata boshlagan?",
            "options": {
              "A": "1994-yilda",
              "B": "1834-yilda",
              "C": "1704-yilda",
              "D": "1934-yilda"
            },
            "correctAnswer": "D"
          }
        ]
      },
      {
        "id": "g9-test-58",
        "sectionNumber": 58,
        "title": "58-§. Olamning yagona fizik manzarasi",
        "questions": [
          {
            "id": 1,
            "question": "Fizikaning fan sifatida shakllanishi kimdan boshlangan deb qaraladi?",
            "options": {
              "A": "Demokritdan",
              "B": "Eynshteyndan",
              "C": "G. Galileydan",
              "D": "Aristoteldan"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "Tabiat hodisalarini o‘rganishda tajriba natijalariga asoslanishni birinchi bo‘lib kim boshlab bergan?",
            "options": {
              "A": "I. Kepler",
              "B": "M. Faradey",
              "C": "R. Dekart",
              "D": "G. Galiley"
            },
            "correctAnswer": "D"
          },
          {
            "id": 3,
            "question": "Galiley qaysi g‘oyalarni ilgari surgan?",
            "options": {
              "A": "Kvant gipotezasi",
              "B": "Inersiya va nisbiylik prinsipi",
              "C": "Universal tortishish qonuni",
              "D": "Elektromagnit induksiya"
            },
            "correctAnswer": "B"
          },
          {
            "id": 4,
            "question": "Olamning mexanik manzarasini yaratishda Galiley ishini davom ettirgan olim kim?",
            "options": {
              "A": "I. Nyuton",
              "B": "J. Maksvell",
              "C": "A. Eynshteyn",
              "D": "M. Faradey"
            },
            "correctAnswer": "A"
          },
          {
            "id": 5,
            "question": "Olamning mexanik manzarasi qaysi asrda yaratilgan?",
            "options": {
              "A": "XVII asrda",
              "B": "XXI asrda",
              "C": "V asrda",
              "D": "XX asrda"
            },
            "correctAnswer": "A"
          },
          {
            "id": 6,
            "question": "Olamning mexanik manzarasida fazo va vaqt qanday deb qaralgan?",
            "options": {
              "A": "Mavjud bo‘lmagan tushuncha sifatida",
              "B": "Bir-biriga aylanuvchi kattalik sifatida",
              "C": "Materiya va harakatga bog‘liq nisbiy kattalik sifatida",
              "D": "Materiya va harakatga bog‘liq bo‘lmagan absolyut mohiyat sifatida"
            },
            "correctAnswer": "D"
          },
          {
            "id": 7,
            "question": "Olamning mexanik manzarasida o‘zaro ta’sir qanday qonun asosida bo‘lib, qanday tarqaladi?",
            "options": {
              "A": "Elektromagnit to‘lqinlar orqali chekli tezlik bilan",
              "B": "O‘zaro ta’sir yo‘q",
              "C": "Kvant qonunlari asosida",
              "D": "Universal tortishish qonuni asosida, bir onda"
            },
            "correctAnswer": "D"
          },
          {
            "id": 8,
            "question": "Elektromagnit maydon tushunchasini fanga kim kiritgan?",
            "options": {
              "A": "G. Galiley",
              "B": "M. Faradey",
              "C": "J. Maksvell",
              "D": "I. Nyuton"
            },
            "correctAnswer": "B"
          },
          {
            "id": 9,
            "question": "Elektromagnit maydon nazariyasini kim yaratgan?",
            "options": {
              "A": "I. Nyuton",
              "B": "O. Shtern",
              "C": "J. Maksvell",
              "D": "L. Bolsman"
            },
            "correctAnswer": "C"
          },
          {
            "id": 10,
            "question": "XX asrda Nyutonning absolyut fazo va vaqt haqidagi qarashini inkor etgan olim kim?",
            "options": {
              "A": "M. Faradey",
              "B": "G. Galiley",
              "C": "A. Eynshteyn",
              "D": "J. Maksvell"
            },
            "correctAnswer": "C"
          }
        ]
      },
      {
        "id": "g9-test-59",
        "sectionNumber": 59,
        "title": "59-§. Fizika va texnika taraqqiyoti. O‘zbekistonda fizika sohasidagi tadqiqotlar",
        "questions": [
          {
            "id": 1,
            "question": "Qaysi davrda bug‘ mashinasi va to‘qimachilik dastgohlari yaratilgan?",
            "options": {
              "A": "XX asr oxirida",
              "B": "Mil. av. IV asrda",
              "C": "XVIII asr oxirida",
              "D": "XV asrda"
            },
            "correctAnswer": "C"
          },
          {
            "id": 2,
            "question": "XIX asrda yaratilgan ixtirolar qatoriga qaysilar kiradi?",
            "options": {
              "A": "Faqat o‘q-yoy",
              "B": "Telegraf, fotografiya, ichki yonuv dvigateli, radio, telefon",
              "C": "Faqat tosh qurollar",
              "D": "Kompyuter va internet"
            },
            "correctAnswer": "B"
          },
          {
            "id": 3,
            "question": "XX asr davomida qaysi sohalar yuksak darajada taraqqiy etdi?",
            "options": {
              "A": "Elektronika, aviatsiya, atom texnikasi, kosmonavtika",
              "B": "Faqat dengiz kemasozligi",
              "C": "Faqat qishloq xo‘jaligi",
              "D": "Faqat hunarmandchilik"
            },
            "correctAnswer": "A"
          },
          {
            "id": 4,
            "question": "XXI asrda qaysi sohalarda buyuk kashfiyotlar bashorat qilinmoqda?",
            "options": {
              "A": "Faqat zargarlik",
              "B": "Axborot texnologiyasi, biofizika, nanotexnologiya",
              "C": "Faqat to‘qimachilik",
              "D": "Faqat tosh qurollar yasash"
            },
            "correctAnswer": "B"
          },
          {
            "id": 5,
            "question": "Qaysi buyuk allomalar yurtimizdan yetishib chiqqan?",
            "options": {
              "A": "Nyuton, Galiley, Faradey, Maksvell",
              "B": "Karno, Ryomer, Boyl, Mariott",
              "C": "Bolsman, Avogadro, Shtern, Klauzius",
              "D": "Forobiy, Beruniy, Ibn Sino, Ulug‘bek"
            },
            "correctAnswer": "D"
          },
          {
            "id": 6,
            "question": "Ibtidoiy jamoa tuzumida dastlab qanday qurollar paydo bo‘lgan?",
            "options": {
              "A": "Bug‘ mashinalari",
              "B": "Avtomobillar",
              "C": "Tosh qurollar",
              "D": "Elektr dvigatellar"
            },
            "correctAnswer": "C"
          },
          {
            "id": 7,
            "question": "Mil. av. 4–3-ming yillikda qanday materialdan mehnat qurollari yaratilgan?",
            "options": {
              "A": "Jezdan",
              "B": "Titandan",
              "C": "Alyuminiydan",
              "D": "Plastmassadan"
            },
            "correctAnswer": "A"
          },
          {
            "id": 8,
            "question": "O‘zbekistonda yuqori samarali nurlovchi turfa diodlar yaratishda qaysi akademik nomi tilga olinadi?",
            "options": {
              "A": "A. Eynshteyn",
              "B": "M. Faradey",
              "C": "D. Mendeleyev",
              "D": "M. S. Saidov"
            },
            "correctAnswer": "D"
          },
          {
            "id": 9,
            "question": "Quyidagilardan qaysi biri O‘zbekiston olimlari erishgan natijalar qatoriga kiradi?",
            "options": {
              "A": "Atom bombasini yaratilgani",
              "B": "Yarimo‘tkazgichlar xossasiga ega qattiq eritmalar, o‘ta yuksak chastotali diodlar yaratilgani",
              "C": "Termometr ixtiro qilgani",
              "D": "Yangi planetani kashf qilgani"
            },
            "correctAnswer": "B"
          },
          {
            "id": 10,
            "question": "O‘zbekistonda fizika bo‘yicha tadqiqotlar 1920–30-yillarda qaerlarda olib borilgan?",
            "options": {
              "A": "Oliy o‘quv yurtlaridagi laboratoriyalarda",
              "B": "Tadqiqotlar olib borilmagan",
              "C": "Faqat maktablarda",
              "D": "Faqat qishloqlarda"
            },
            "correctAnswer": "A"
          }
        ]
      }
    ]
  }
];
