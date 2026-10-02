import type { Product, Category, Localized } from "./types";

const spec = (
  label: [string, string, string],
  value: [string, string, string],
) => ({
  label: { az: label[0], en: label[1], ru: label[2] },
  value: { az: value[0], en: value[1], ru: value[2] },
});

export const CATEGORY_LABELS: Record<Category, Localized> = {
  saat: { az: "Saatlar", en: "Timepieces", ru: "Часы" },
  deri: { az: "Dəri məmulatlar", en: "Leather goods", ru: "Кожаные изделия" },
  kolleksiya: { az: "Kolleksiya", en: "Collection", ru: "Коллекция" },
};

export const CATEGORY_INTRO: Record<Category, Localized> = {
  saat: {
    az: "İsveçrə mexanizmi, sapfir şüşə və Azərbaycan Respublikasının dövlət gerbi ilə bəzədilmiş siferblat.",
    en: "Swiss movement, sapphire crystal and a dial bearing the state emblem of the Republic of Azerbaijan.",
    ru: "Швейцарский механизм, сапфировое стекло и циферблат с государственным гербом Азербайджанской Республики.",
  },
  deri: {
    az: "Təbii dəridə ifadə olunan zərif klassika. Hər tikiş əl ilə yoxlanılır.",
    en: "Quiet classicism expressed in full grain leather. Every stitch is checked by hand.",
    ru: "Сдержанная классика в натуральной коже. Каждый шов проверяется вручную.",
  },
  kolleksiya: {
    az: "Qızıl, gümüş və qiymətli daşlarla işlənmiş, sayı məhdud sənətkarlıq əsərləri.",
    en: "Limited artisanal pieces worked in gold, silver and precious stones.",
    ru: "Лимитированные изделия ручной работы из золота, серебра и драгоценных камней.",
  },
};

export const PRODUCTS: Product[] = [
  /* ===================== SAATLAR ===================== */
  {
    slug: "aze-series-silver",
    category: "saat",
    featured: true,
    name: {
      az: "AZE Series Silver",
      en: "AZE Series Silver",
      ru: "AZE Series Silver",
    },
    tagline: {
      az: "Ağ siferblat, Roma rəqəmləri, gümüşü korpus",
      en: "White dial, Roman numerals, steel case",
      ru: "Белый циферблат, римские цифры, стальной корпус",
    },
    description: {
      az: "Ağ siferblatı və Roma rəqəmləri ilə tamamlanan klassik gümüşü korpuslu saat. Bal pətəyi naxışlı siferblat işığı hər bucaqdan fərqli qaytarır, rifli bezel və jubilee bilərziyi isə modelə tanınan klassik siluet verir. Gündəlik geyim üçün nəzərdə tutulub, protokol tədbirlərində də yerindədir.",
      en: "A classic steel cased watch finished with a white dial and Roman numerals. The honeycomb guilloche catches light differently from every angle, while the fluted bezel and jubilee bracelet give the piece its familiar classical silhouette. Made for daily wear, equally at home at a protocol event.",
      ru: "Классические часы в стальном корпусе с белым циферблатом и римскими цифрами. Гильошированный узор «соты» по-разному отражает свет под каждым углом, а рифлёный безель и браслет jubilee придают модели узнаваемый классический силуэт. Рассчитаны на ежедневное ношение и уместны на протокольных мероприятиях.",
    },
    specs: [
      spec(["Mexanizm", "Movement", "Механизм"], ["İsveçrə kvars", "Swiss quartz", "Швейцарский кварц"]),
      spec(["Şüşə", "Crystal", "Стекло"], ["Sapfir", "Sapphire", "Сапфировое"]),
      spec(["Korpus", "Case", "Корпус"], ["Paslanmayan polad", "Stainless steel", "Нержавеющая сталь"]),
      spec(["Siferblat", "Dial", "Циферблат"], ["Ağ, bal pətəyi naxışı", "White, honeycomb guilloche", "Белый, гильоше «соты»"]),
      spec(["Bilərzik", "Bracelet", "Браслет"], ["Jubilee, polad", "Jubilee, steel", "Jubilee, сталь"]),
    ],
    images: ["aze-series-silver-1", "aze-series-silver-2"],
    video: "aze-series-silver",
  },
  {
    slug: "aze-series-blue",
    category: "saat",
    name: {
      az: "AZE Series Blue",
      en: "AZE Series Blue",
      ru: "AZE Series Blue",
    },
    tagline: {
      az: "Mavi siferblat, inteqrə edilmiş bilərzik",
      en: "Blue dial, integrated bracelet",
      ru: "Синий циферблат, интегрированный браслет",
    },
    description: {
      az: "Dərin mavi siferblat və korpusa birbaşa keçən inteqrə bilərzik. Saat ikinci saat işarəsinin yanında Azərbaycan Respublikasının dövlət gerbini daşıyır, arxa qapaq isə səkkizguşəli ulduz oyması ilə işlənib. Lak qutu və nömrələnmiş sertifikatla təqdim olunur.",
      en: "A deep blue dial with a bracelet that flows straight out of the case. The emblem of the Republic of Azerbaijan sits beside the two hour marker, and the case back carries an engraved eight pointed star. Presented in a lacquered box with a numbered certificate.",
      ru: "Глубокий синий циферблат и браслет, переходящий прямо из корпуса. Рядом с отметкой «два часа» расположен герб Азербайджанской Республики, а на задней крышке выгравирована восьмиконечная звезда. Поставляется в лакированной шкатулке с нумерованным сертификатом.",
    },
    specs: [
      spec(["Mexanizm", "Movement", "Механизм"], ["İsveçrə kvars", "Swiss quartz", "Швейцарский кварц"]),
      spec(["Şüşə", "Crystal", "Стекло"], ["Sapfir", "Sapphire", "Сапфировое"]),
      spec(["Korpus", "Case", "Корпус"], ["Paslanmayan polad", "Stainless steel", "Нержавеющая сталь"]),
      spec(["Siferblat", "Dial", "Циферблат"], ["Dərin mavi", "Deep blue", "Глубокий синий"]),
      spec(["Qablaşdırma", "Packaging", "Упаковка"], ["Lak qutu, sertifikat", "Lacquered box, certificate", "Лакированная шкатулка, сертификат"]),
    ],
    images: ["aze-series-blue-1", "aze-series-blue-4", "aze-series-blue-3", "aze-series-blue-2"],
  },
  {
    slug: "signature-gold",
    category: "saat",
    name: {
      az: "Signature Gold Limited Edition",
      en: "Signature Gold Limited Edition",
      ru: "Signature Gold Limited Edition",
    },
    tagline: {
      az: "Qızılı korpus, imzalı siferblat, 100 ədəd",
      en: "Gold case, signature dial, 100 pieces",
      ru: "Золотой корпус, циферблат с подписью, 100 экземпляров",
    },
    description: {
      az: "Kolleksiyanın ən məhdud modeli. Qızılı korpus, süd rəngli siferblat və qara timsah fakturalı dəri qayış. Siferblatın mərkəzindəki imza və altındakı nömrə hər nüsxəni ayrıca edir. Yüz ədəd buraxılıb, hər biri öz nömrəsi ilə sertifikatlaşdırılır.",
      en: "The most limited model in the collection. A gold case, cream dial and a black crocodile grain leather strap. The signature at the centre of the dial and the number beneath it make every piece individual. One hundred were made, each certified with its own number.",
      ru: "Самая лимитированная модель коллекции. Золотой корпус, кремовый циферблат и кожаный ремешок с фактурой крокодила. Подпись в центре циферблата и номер под ней делают каждый экземпляр индивидуальным. Выпущено сто экземпляров, каждый сертифицирован своим номером.",
    },
    specs: [
      spec(["Buraxılış", "Edition", "Тираж"], ["100 ədəd, nömrələnmiş", "100 pieces, numbered", "100 экземпляров, нумерованные"]),
      spec(["Korpus", "Case", "Корпус"], ["Qızılı örtük", "Gold finish", "Золотое покрытие"]),
      spec(["Siferblat", "Dial", "Циферблат"], ["Süd rəngi, imzalı", "Cream, signature", "Кремовый, с подписью"]),
      spec(["Qayış", "Strap", "Ремешок"], ["Təbii dəri", "Full grain leather", "Натуральная кожа"]),
      spec(["İndeks", "Indices", "Индексы"], ["Roma rəqəmləri", "Roman numerals", "Римские цифры"]),
    ],
    images: ["signature-gold-1"],
  },
  {
    slug: "bt-24-green",
    category: "saat",
    name: { az: "BT-24 Green", en: "BT-24 Green", ru: "BT-24 Green" },
    tagline: {
      az: "Yaşıl guilloche siferblat, dəri qayış",
      en: "Green guilloche dial, leather strap",
      ru: "Зелёный гильошированный циферблат, кожаный ремешок",
    },
    description: {
      az: "Nazik korpus və dərin yaşıl guilloche siferblat. Altıncı saat işarəsinin üstündə AZERBAIJAN yazısı, on ikinin yerində isə səkkizguşəli ulduz dayanır. Eyni tonda tikilmiş dəri qayış modeli tamamlayır. Kostyumla geyinmək üçün nəzərdə tutulub.",
      en: "A slim case and a deep green guilloche dial. The word AZERBAIJAN sits above the six hour marker, with an eight pointed star in place of the twelve. A leather strap stitched in the same tone completes the piece. Designed to be worn with a suit.",
      ru: "Тонкий корпус и глубокий зелёный гильошированный циферблат. Над отметкой «шесть часов» надпись AZERBAIJAN, а на месте двенадцати восьмиконечная звезда. Кожаный ремешок в тон завершает модель. Создана для ношения с костюмом.",
    },
    specs: [
      spec(["Siferblat", "Dial", "Циферблат"], ["Yaşıl guilloche", "Green guilloche", "Зелёный гильоше"]),
      spec(["Korpus", "Case", "Корпус"], ["Nazik polad", "Slim steel", "Тонкая сталь"]),
      spec(["Qayış", "Strap", "Ремешок"], ["Yaşıl təbii dəri", "Green full grain leather", "Зелёная натуральная кожа"]),
      spec(["İndeks", "Indices", "Индексы"], ["Roma rəqəmləri", "Roman numerals", "Римские цифры"]),
    ],
    images: ["bt-24-green-1"],
  },

  /* ===================== DƏRİ ===================== */
  {
    slug: "aze-travel",
    category: "deri",
    featured: true,
    name: {
      az: "Dəri səyahət çantası «AZE»",
      en: "AZE Travel case",
      ru: "Дорожная кожаная сумка «AZE»",
    },
    tagline: {
      az: "Üç rəngdə, çiyin qayışı ilə",
      en: "Three colourways, with shoulder strap",
      ru: "Три цвета, с плечевым ремнём",
    },
    description: {
      az: "AZE Travel çantası təbii dəridən hazırlanıb və praktikliyi ifadəli dizaynla birləşdirir. Epi faktura cızıqları gizlədir, ikiqat zəncir açılış isə içəridəki bölməyə tam çıxış verir. Tünd göy, yaşıl və qara variantlarda təqdim olunur, önündəki emal nişan dövlət gerbini daşıyır.",
      en: "The AZE Travel case is made from full grain leather and pairs practicality with a considered design. The epi texture hides scuffs, and the double zip opens the main compartment completely. Offered in navy, green and black, with an enamel badge carrying the state emblem on the front.",
      ru: "Сумка AZE Travel выполнена из натуральной кожи и сочетает практичность с выразительным дизайном. Фактура epi скрывает царапины, а двойная молния полностью открывает основное отделение. Доступна в тёмно-синем, зелёном и чёрном цветах, спереди эмалевый знак с государственным гербом.",
    },
    specs: [
      spec(["Material", "Material", "Материал"], ["Təbii epi dəri", "Full grain epi leather", "Натуральная кожа epi"]),
      spec(["Rənglər", "Colours", "Цвета"], ["Tünd göy, yaşıl, qara", "Navy, green, black", "Тёмно-синий, зелёный, чёрный"]),
      spec(["Açılış", "Opening", "Застёжка"], ["İkiqat zəncir", "Double zip", "Двойная молния"]),
      spec(["Qayış", "Strap", "Ремень"], ["Çıxarıla bilən çiyin qayışı", "Detachable shoulder strap", "Съёмный плечевой ремень"]),
      spec(["Nişan", "Badge", "Знак"], ["Emal, dövlət gerbi", "Enamel, state emblem", "Эмаль, государственный герб"]),
    ],
    images: ["aze-travel-1", "aze-travel-2"],
    video: "aze-travel",
  },
  {
    slug: "aze-barsetka",
    category: "deri",
    name: {
      az: "AZE dəri barsetkası",
      en: "AZE leather clutch",
      ru: "Кожаная барсетка AZE",
    },
    tagline: {
      az: "Təbii dəridə ifadə olunan zərif klassika",
      en: "Quiet classicism in full grain leather",
      ru: "Сдержанная классика в натуральной коже",
    },
    description: {
      az: "AZE barsetkası yüksək keyfiyyətli təbii dəridən tikilib. Əl qayışı biləyə rahat oturur, daxili bölmələr sənəd, telefon və kart üçün ayrılıb. Zərif xətlər və ölçülü mütənasiblik onu gündəlik iş görüşlərinin təbii hissəsinə çevirir.",
      en: "The AZE clutch is cut from high grade full grain leather. The wrist strap sits comfortably, and the interior is divided for documents, a phone and cards. Restrained lines and measured proportions make it a natural part of a working day.",
      ru: "Барсетка AZE сшита из натуральной кожи высокого качества. Ремешок удобно ложится на запястье, внутренние отделения рассчитаны на документы, телефон и карты. Сдержанные линии и выверенные пропорции делают её естественной частью рабочего дня.",
    },
    specs: [
      spec(["Material", "Material", "Материал"], ["Təbii dəri", "Full grain leather", "Натуральная кожа"]),
      spec(["Rəng", "Colour", "Цвет"], ["Tünd göy", "Navy", "Тёмно-синий"]),
      spec(["Daxili", "Interior", "Внутри"], ["Üç bölmə, kart yuvaları", "Three compartments, card slots", "Три отделения, слоты для карт"]),
      spec(["Qayış", "Strap", "Ремешок"], ["Əl qayışı", "Wrist strap", "Ремешок на запястье"]),
    ],
    images: ["aze-barsetka-1", "aze-barsetka-2"],
    video: "aze-barsetka",
  },
  {
    slug: "personal-mark-folio",
    category: "deri",
    name: {
      az: "Personal Mark dəri sənəd çantası",
      en: "Personal Mark document folio",
      ru: "Кожаная папка для документов Personal Mark",
    },
    tagline: {
      az: "Fərdi həkk olunma imkanı ilə",
      en: "With personal engraving",
      ru: "С индивидуальной гравировкой",
    },
    description: {
      az: "A4 sənədlər, planşet və qeyd dəftəri üçün nazik dəri qovluq. Səthi hamar saffiano dəridir, önündə emal nişan dayanır. Sifariş zamanı daxili üzlüyə ad, vəzifə və ya təşkilatın adı həkk oluna bilər, bu da onu rəsmi təqdimat hədiyyəsi kimi uyğun edir.",
      en: "A slim leather folio for A4 documents, a tablet and a notebook. The surface is smooth saffiano leather with an enamel badge at the front. A name, title or organisation can be engraved on the inner panel at the time of order, which makes it suitable as a formal presentation gift.",
      ru: "Тонкая кожаная папка для документов формата A4, планшета и блокнота. Поверхность из гладкой кожи saffiano, спереди эмалевый знак. При заказе на внутренней панели можно выгравировать имя, должность или название организации, что делает её подходящим официальным подарком.",
    },
    specs: [
      spec(["Material", "Material", "Материал"], ["Saffiano dəri", "Saffiano leather", "Кожа saffiano"]),
      spec(["Ölçü", "Size", "Размер"], ["A4 sənəd üçün", "Fits A4", "Под формат A4"]),
      spec(["Fərdiləşdirmə", "Personalisation", "Персонализация"], ["Ad, vəzifə və ya loqo həkki", "Name, title or logo engraving", "Гравировка имени, должности или логотипа"]),
      spec(["Rəng", "Colour", "Цвет"], ["Tünd göy", "Navy", "Тёмно-синий"]),
    ],
    images: ["personal-mark-folio-2", "personal-mark-folio-1"],
  },
  {
    slug: "aze-boston",
    category: "deri",
    name: {
      az: "«AZE» dəri səyahət çantası",
      en: "AZE leather holdall",
      ru: "Кожаная дорожная сумка AZE",
    },
    tagline: {
      az: "Epi faktura, dəri ad etiketi",
      en: "Epi texture, leather name tag",
      ru: "Фактура epi, кожаная бирка",
    },
    description: {
      az: "Qısa səfərlər üçün nəzərdə tutulmuş boston formalı çanta. Dalğavari epi dəri gündəlik istifadənin izlərini udur, gücləndirilmiş dəstəklər isə dolu çantada da formasını saxlayır. Komplektə səkkizguşəli ulduz basılmış dəri ad etiketi daxildir.",
      en: "A boston shaped bag intended for short trips. The rippled epi leather absorbs the marks of daily use, and the reinforced handles hold their shape even when the bag is full. A leather name tag embossed with the eight pointed star is included.",
      ru: "Сумка формы boston, рассчитанная на короткие поездки. Волнистая кожа epi скрывает следы повседневного использования, а усиленные ручки держат форму даже при полной загрузке. В комплект входит кожаная бирка с тиснением восьмиконечной звезды.",
    },
    specs: [
      spec(["Material", "Material", "Материал"], ["Təbii epi dəri", "Full grain epi leather", "Натуральная кожа epi"]),
      spec(["Forma", "Shape", "Форма"], ["Boston", "Boston", "Boston"]),
      spec(["Dəstək", "Handles", "Ручки"], ["Gücləndirilmiş dəri", "Reinforced leather", "Усиленная кожа"]),
      spec(["Komplekt", "Included", "В комплекте"], ["Dəri ad etiketi", "Leather name tag", "Кожаная бирка"]),
    ],
    images: ["aze-boston-1", "aze-boston-2"],
  },
  {
    slug: "korporativ-kolleksiya",
    category: "deri",
    name: {
      az: "Təbii dəridən korporativ kolleksiya",
      en: "Corporate leather collection",
      ru: "Корпоративная коллекция из натуральной кожи",
    },
    tagline: {
      az: "Altı predmetli tam dəst",
      en: "A complete six piece set",
      ru: "Полный комплект из шести предметов",
    },
    description: {
      az: "Bir kolleksiya daxilində toplanmış altı predmet: noutbuk çantası, səyahət çantası, sənəd qovluğu, iki pul kisəsi və eynək futlyarı. Hamısı eyni epi dəridən, eyni tikiş rəngi və eyni qızılı nişanla hazırlanır. Komanda və ya rəhbərlik heyəti üçün vahid hədiyyə dəsti kimi sifariş edilir.",
      en: "Six pieces gathered into one collection: a laptop bag, a travel case, a document folio, two wallets and a glasses case. All are made from the same epi leather, with the same stitch colour and the same gold badge. Ordered as a single coherent gift set for a team or a board.",
      ru: "Шесть предметов, собранных в одну коллекцию: сумка для ноутбука, дорожный кейс, папка для документов, два портмоне и футляр для очков. Все изготовлены из одной кожи epi, с одинаковым цветом строчки и одинаковым золотым знаком. Заказывается как единый подарочный комплект для команды или руководства.",
    },
    specs: [
      spec(["Tərkib", "Contents", "Состав"], ["6 predmet", "6 pieces", "6 предметов"]),
      spec(["Material", "Material", "Материал"], ["Təbii epi dəri", "Full grain epi leather", "Натуральная кожа epi"]),
      spec(["Nişan", "Badge", "Знак"], ["Qızılı səkkizguşəli ulduz", "Gold eight pointed star", "Золотая восьмиконечная звезда"]),
      spec(["Sifariş", "Order", "Заказ"], ["Dəst və ya ayrıca", "As a set or separately", "Комплектом или по отдельности"]),
    ],
    images: ["korporativ-kolleksiya-1"],
  },

  /* ===================== KOLLEKSİYA ===================== */
  {
    slug: "strateq-chess",
    category: "kolleksiya",
    featured: true,
    name: {
      az: "«Strateq» şahmat dəsti",
      en: "The Strategists chess set",
      ru: "Шахматный набор «Стратег»",
    },
    tagline: {
      az: "24 karatlı qızıl və gümüş fiqurlar",
      en: "24 carat gold and silver pieces",
      ru: "Фигуры из 24-каратного золота и серебра",
    },
    description: {
      az: "Zəkanın və yüksək statusun rəmzi. «Strateq» şahmat dəsti sənətkarlığı, nəcib materialları və Azərbaycan memarlığını bir lövhədə birləşdirir. Fiqurlar 24 karatlı qızıl və gümüşlə örtülüb, lak qutunun yan üzlərində Bakının, Şəkinin və Şuşanın siluetləri oyulub. Qızıl gümüşə qarşı, hər hərəkət ləyaqətlə.",
      en: "A symbol of intellect and standing. The Strategists chess set brings craft, noble materials and Azerbaijani architecture together on one board. The pieces are plated in 24 carat gold and silver, and the sides of the lacquered case are engraved with the silhouettes of Baku, Sheki and Shusha. Gold against silver, every move made with dignity.",
      ru: "Символ интеллекта и высокого статуса. Шахматный набор «Стратег» объединяет на одной доске мастерство, благородные материалы и азербайджанскую архитектуру. Фигуры покрыты 24-каратным золотом и серебром, а на боковых гранях лакированного корпуса выгравированы силуэты Баку, Шеки и Шуши. Золото против серебра, каждый ход с достоинством.",
    },
    specs: [
      spec(["Fiqurlar", "Pieces", "Фигуры"], ["24 karatlı qızıl və gümüş örtük", "24 carat gold and silver plating", "Покрытие 24-каратным золотом и серебром"]),
      spec(["Lövhə", "Board", "Доска"], ["Lak ağac, qızıl inlay", "Lacquered wood, gold inlay", "Лакированное дерево, золотая инкрустация"]),
      spec(["Oyma", "Engraving", "Гравировка"], ["Bakı, Şəki, Şuşa siluetləri", "Baku, Sheki, Shusha silhouettes", "Силуэты Баку, Шеки, Шуши"]),
      spec(["Saxlama", "Storage", "Хранение"], ["Fiqurlar üçün daxili çəkmə", "Internal drawer for the pieces", "Внутренний ящик для фигур"]),
      spec(["Hazırlanma", "Production", "Изготовление"], ["Əl işi", "Hand finished", "Ручная работа"]),
    ],
    images: ["strateq-chess-2", "strateq-chess-1"],
    video: "strateq-chess",
  },
  {
    slug: "xan-xencer",
    category: "kolleksiya",
    featured: true,
    name: {
      az: "«Xan» bebut xəncəri",
      en: "The Khan bebut dagger",
      ru: "Кинжал бебут «Хан»",
    },
    tagline: {
      az: "Gücün, ləyaqətin və hörmətin rəmzi",
      en: "A symbol of strength, dignity and respect",
      ru: "Символ силы, достоинства и уважения",
    },
    description: {
      az: "«Xan» bebut xəncəri Şərq silah sənəti ənənələrindən ilham alır. Tiyə üzərindəki qızıl oyma naxışlar əl ilə işlənir, qəbzə və qın zümrüd daşlarla bəzədilir. Əyri bebut forması tarixi nümunələrə sadiq qalır. Məxmər astarlı ağac qutuda təqdim olunur, divara asmaq üçün dayaq komplektə daxildir.",
      en: "The Khan bebut dagger draws on the traditions of Eastern weapon craft. The gold engraving across the blade is worked by hand, and the hilt and scabbard are set with emeralds. The curved bebut form stays faithful to historical examples. Presented in a velvet lined wooden case, with a wall mount included.",
      ru: "Кинжал бебут «Хан» вдохновлён традициями восточного оружейного искусства. Золотая гравировка по клинку выполняется вручную, рукоять и ножны украшены изумрудами. Изогнутая форма бебута верна историческим образцам. Поставляется в деревянном футляре с бархатной подкладкой, настенное крепление входит в комплект.",
    },
    specs: [
      spec(["Tiyə", "Blade", "Клинок"], ["Polad, qızıl oyma", "Steel, gold engraving", "Сталь, золотая гравировка"]),
      spec(["Qəbzə", "Hilt", "Рукоять"], ["Qızıl və gümüş, zümrüd", "Gold and silver, emerald", "Золото и серебро, изумруд"]),
      spec(["Forma", "Form", "Форма"], ["Əyri bebut", "Curved bebut", "Изогнутый бебут"]),
      spec(["Qutu", "Case", "Футляр"], ["Məxmər astarlı ağac", "Velvet lined wood", "Дерево с бархатной подкладкой"]),
      spec(["Hazırlanma", "Production", "Изготовление"], ["Əl işi, sayı məhdud", "Hand made, limited", "Ручная работа, ограниченный выпуск"]),
    ],
    images: ["xan-xencer-1", "xan-xencer-2"],
    video: "xan-xencer",
  },
  {
    slug: "azerbaycan-plaketi",
    category: "kolleksiya",
    name: {
      az: "«Azərbaycan» xatirə plaketi",
      en: "Azerbaijan commemorative plaque",
      ru: "Памятный плакет «Азербайджан»",
    },
    tagline: {
      az: "Altı şəhərin simvolu, mərkəzdə dövlət gerbi",
      en: "Six cities, the state emblem at the centre",
      ru: "Шесть городов, герб в центре",
    },
    description: {
      az: "Dairəvi qızılı plaket Azərbaycanın tanınan abidələrini bir səth üzərində toplayır: Bakı, Gəncə, Şəki, Şuşa, Naxçıvan və Qarabağ. Mərkəzdə emal işlənmiş dövlət gerbi dayanır, kənar boyunca ölkənin adı iki dildə oyulub. Rəsmi qəbul və dövlətlərarası görüşlər üçün hazırlanıb.",
      en: "A circular gold plaque gathering recognised Azerbaijani landmarks on a single surface: Baku, Ganja, Sheki, Shusha, Nakhchivan and Karabakh. The enamelled state emblem sits at the centre, with the country name engraved around the rim in two languages. Made for official receptions and intergovernmental meetings.",
      ru: "Круглый золотой плакет собирает на одной поверхности узнаваемые азербайджанские памятники: Баку, Гянджа, Шеки, Шуша, Нахчыван и Карабах. В центре расположен эмалевый государственный герб, по краю выгравировано название страны на двух языках. Создан для официальных приёмов и межгосударственных встреч.",
    },
    specs: [
      spec(["Forma", "Form", "Форма"], ["Dairəvi plaket", "Circular plaque", "Круглый плакет"]),
      spec(["Örtük", "Finish", "Покрытие"], ["Qızılı", "Gold", "Золотое"]),
      spec(["Mərkəz", "Centre", "Центр"], ["Emal dövlət gerbi", "Enamelled state emblem", "Эмалевый государственный герб"]),
      spec(["Qutu", "Case", "Футляр"], ["Məxmər astarlı ağac", "Velvet lined wood", "Дерево с бархатной подкладкой"]),
    ],
    images: ["azerbaycan-plaketi-2", "azerbaycan-plaketi-1"],
  },
  {
    slug: "xatire-stellasi",
    category: "kolleksiya",
    name: {
      az: "«Xatirə» stellası",
      en: "The Xatire stele",
      ru: "Стела «Хатире»",
    },
    tagline: {
      az: "Buta motivi, mis və qızıl işləmə",
      en: "Buta motif, copper and gold work",
      ru: "Мотив «бута», медь и золото",
    },
    description: {
      az: "Ağac üzərində quraşdırılmış mis və qızıl lövhə. Mərkəzdə Azərbaycan ornamentinin əsas motivi olan buta dayanır, çərçivə boyunca isə ənənəvi xalça naxışı keçir. Lövhənin arxasına xatirə yazısı həkk oluna bilər. Hədiyyə qutusu komplektə daxildir.",
      en: "A copper and gold panel mounted on wood. At the centre stands the buta, the central motif of Azerbaijani ornament, with a traditional carpet pattern running along the frame. A commemorative inscription can be engraved on the reverse. A gift box is included.",
      ru: "Медная с золотом панель, установленная на дереве. В центре расположена бута, основной мотив азербайджанского орнамента, а по периметру рамы проходит традиционный ковровый узор. На обратной стороне может быть выгравирована памятная надпись. Подарочная коробка входит в комплект.",
    },
    specs: [
      spec(["Material", "Material", "Материал"], ["Mis, qızıl örtük, ağac", "Copper, gold finish, wood", "Медь, золотое покрытие, дерево"]),
      spec(["Motiv", "Motif", "Мотив"], ["Buta, xalça naxışı", "Buta, carpet pattern", "Бута, ковровый узор"]),
      spec(["Fərdiləşdirmə", "Personalisation", "Персонализация"], ["Arxada xatirə yazısı", "Inscription on the reverse", "Памятная надпись на обороте"]),
      spec(["Komplekt", "Included", "В комплекте"], ["Hədiyyə qutusu", "Gift box", "Подарочная коробка"]),
    ],
    images: ["xatire-stellasi-1"],
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (c: Category) => PRODUCTS.filter((p) => p.category === c);
export const featured = () => PRODUCTS.filter((p) => p.featured);
