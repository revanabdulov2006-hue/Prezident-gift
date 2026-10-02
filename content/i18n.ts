import type { Locale } from "./types";

/**
 * Saytın bütün sabit mətnləri. Məhsul mətnləri `products.ts`-dədir.
 * TODO ilə işarələnmiş sahələr real rekvizitlərlə əvəz olunmalıdır.
 */
export const DICT = {
  az: {
    localeName: "Azərbaycanca",
    localeShort: "AZ",

    nav: {
      collection: "Kolleksiya",
      corporate: "Korporativ",
      about: "Haqqımızda",
      contact: "Əlaqə",
      menu: "Menyu",
      close: "Bağla",
    },

    hero: {
      eyebrow: "Dövlət protokolu üçün hədiyyələr",
      title: "Ləyaqətlə təqdim olunan hədiyyə",
      lead: "Azərbaycan sənətkarlığı, İsveçrə mexanizmi və təbii dəri. Rəsmi görüşlər üçün hazırlanır.",
      ctaPrimary: "Kolleksiyaya baxın",
      ctaSecondary: "Korporativ sifariş",
    },

    trust: {
      a: "Dövlət protokolu üçün",
      b: "İsveçrə mexanizmi",
      c: "Təbii dəri",
      d: "Əl işi",
    },

    categories: {
      title: "Üç istiqamət",
      lead: "Saat, dəri məmulat və sayı məhdud kolleksiya əşyaları. Hər biri eyni standartla hazırlanır.",
      view: "Baxın",
    },

    featured: {
      eyebrow: "Seçilmiş",
      cta: "Məhsula baxın",
    },

    watches: {
      title: "Saat kolleksiyası",
      lead: "Sapfir şüşə, İsveçrə mexanizmi və dövlət gerbi daşıyan siferblat.",
      hint: "Sürüşdürün",
    },

    craft: {
      title: "Hazırlanma qaydası",
      lead: "Hər məhsul eyni dörd mərhələdən keçir. Heç biri qısaldılmır.",
      steps: [
        {
          title: "Material seçimi",
          body: "Təbii dəri, paslanmayan polad, qızıl və gümüş örtük. Partiya daxilində rəng və faktura uyğunluğu əl ilə yoxlanılır.",
        },
        {
          title: "Əl işi",
          body: "Oyma naxışlar, tikiş və emal nişanlar usta tərəfindən işlənir. Bir xəncərin bəzəyi günlərlə davam edir.",
        },
        {
          title: "Fərdiləşdirmə",
          body: "Ad, vəzifə, təşkilatın loqosu və ya xatirə yazısı həkk olunur. Nümunə təsdiqdən sonra işə salınır.",
        },
        {
          title: "Qablaşdırma",
          body: "Lak və ya məxmər astarlı qutu, nömrələnmiş sertifikat və təqdimat qovluğu. Dəst halında çatdırılır.",
        },
      ],
    },

    corporate: {
      eyebrow: "Korporativ sifariş",
      title: "Təşkilatınız üçün hazırlanır",
      lead: "Həcmli sifariş, vahid qablaşdırma və fərdi həkk. Protokol şöbələri və səfirliklərlə işləyirik.",
      points: [
        {
          title: "Fərdi həkk",
          body: "Loqo, ad və ya xatirə yazısı. Hər predmet üzərində ayrıca mətn mümkündür.",
        },
        {
          title: "Vahid qablaşdırma",
          body: "Bütün dəst eyni qutu, eyni sertifikat və eyni təqdimat qovluğu ilə çatdırılır.",
        },
        {
          title: "Həcmli sifariş",
          body: "On ədəddən başlayaraq. Böyük sifarişlərdə hazırlanma müddəti əvvəlcədən razılaşdırılır.",
        },
        {
          title: "Nümunə",
          body: "İstehsalatdan əvvəl təsdiq üçün nümunə hazırlanır. Təsdiq olunmayan iş işə salınmır.",
        },
      ],
    },

    inquiry: {
      eyebrow: "Sorğu",
      title: "Sifarişinizi müzakirə edək",
      lead: "Formanı doldurun, bir iş günü ərzində cavab verək. Və ya birbaşa yazın.",
      name: "Ad, soyad",
      org: "Təşkilat",
      email: "E-poçt",
      phone: "Telefon",
      interest: "Maraqlandığınız istiqamət",
      quantity: "Təxmini say",
      message: "Mesaj",
      messagePlaceholder: "Tədbirin tarixi, büdcə çərçivəsi və ya fərdiləşdirmə tələbləri",
      submit: "Sorğunu göndərin",
      submitting: "Göndərilir",
      success: "Sorğunuz qeydə alındı. Bir iş günü ərzində əlaqə saxlayacağıq.",
      error: "Göndərmə alınmadı. Zəhmət olmasa birbaşa yazın.",
      required: "Bu sahə mütləqdir",
      invalidEmail: "E-poçt ünvanı düzgün deyil",
      optional: "istəyə bağlı",
      any: "Fərqi yoxdur",
      whatsapp: "WhatsApp ilə yazın",
    },

    collection: {
      title: "Bütün kolleksiya",
      lead: "On üç məhsul, üç istiqamət. Seçin və səbətə əlavə edin.",
      all: "Hamısı",
      count: "məhsul",
      empty: "Bu kateqoriyada məhsul yoxdur.",
    },

    product: {
      back: "Kolleksiyaya qayıt",
      specs: "Xüsusiyyətlər",
      inquire: "Bu məhsul barədə sorğu",
      related: "Eyni istiqamətdə",
      priceNote: "Qiymət sorğu əsasında bildirilir.",
      gallery: "Qalereya",
    },

    about: {
      title: "PRESIDENT haqqında",
      lead: "Rəsmi təqdimat hədiyyələri hazırlayırıq. İşimiz protokol tələbləri ilə başlayır və sertifikatla bitir.",
      body: [
        "PRESIDENT Azərbaycanda rəsmi və korporativ təqdimat hədiyyələri istehsal edir. Kolleksiyamızda İsveçrə mexanizmli saatlar, təbii dəridən məmulatlar və qiymətli metallarla işlənmiş kolleksiya əşyaları var.",
        "Hər məhsul dövlət protokolunun tələblərini nəzərə alaraq hazırlanır. Dövlət gerbi, səkkizguşəli ulduz və milli ornament motivləri bəzək deyil, məhsulun strukturunun hissəsidir.",
        "Sifarişlər nümunə təsdiqindən sonra işə salınır. Hazır məhsul nömrələnmiş sertifikat və təqdimat qablaşdırması ilə təhvil verilir.",
      ],
      statsTitle: "Rəqəmlərlə",
    },

    footer: {
      tagline: "Rəsmi və korporativ təqdimat hədiyyələri",
      nav: "Naviqasiya",
      contact: "Əlaqə",
      language: "Dil",
      rights: "Bütün hüquqlar qorunur",
      address: "TODO: ünvan",
      phone: "+994 10 239 60 15",
      email: "TODO: e-poçt",
    },

    shop: {
      add: "Səbətə əlavə et",
      addShort: "Səbətə",
      buyNow: "İndi al",
      quantity: "Say",
      price: "Qiymət",
      cartTitle: "Səbət",
      cartOpen: "Səbəti aç",
      cartClose: "Səbəti bağla",
      cartEmpty: "Səbətiniz boşdur",
      cartEmptyLead: "Bəyəndiyiniz məhsulu seçib səbətə əlavə edin.",
      continueShopping: "Alış-verişə davam et",
      subtotal: "Cəmi",
      checkout: "Sifarişə keç",
      remove: "Çıxar",
      increase: "Artır",
      decrease: "Azalt",
      itemsLabel: "məhsul",
      deliveryNote: "Çatdırılma haqqı sifarişin təsdiqi zamanı bildirilir.",
      backAria: "Geri qayıt",
      menuOpen: "Menyunu aç",
      menuClose: "Menyunu bağla",
      galleryAria: "Məhsul qalereyası",
      galleryItem: "Kadr",
      checkoutTitle: "Sifarişin rəsmiləşdirilməsi",
      checkoutLead: "Məlumatlarınızı yazın. Komandamız sifarişi təsdiq edib çatdırılma vaxtını bildirəcək.",
      yourDetails: "Məlumatlarınız",
      name: "Ad və soyad",
      phone: "Nömrə",
      email: "E-poçt",
      address: "Çatdırılma ünvanı",
      city: "Şəhər",
      note: "Qeyd",
      optional: "istəyə bağlı",
      payment: "Ödəniş",
      paymentCod: "Çatdırılma zamanı ödəniş",
      paymentNote: "Onlayn kart ödənişi hələ qoşulmayıb. Sifarişi təsdiq etdikdən sonra ödəniş qaydası sizinlə razılaşdırılır.",
      summary: "Sifarişiniz",
      place: "Sifarişi WhatsApp ilə göndər",
      placing: "Göndərilir",
      required: "Bu sahə mütləqdir",
      invalidPhone: "Telefon nömrəsi düzgün deyil",
      invalidEmail: "E-poçt ünvanı düzgün deyil",
      error: "Sifariş göndərilmədi. Bir azdan yenidən cəhd edin və ya bizimlə birbaşa əlaqə saxlayın.",
      doneTitle: "Sifarişiniz WhatsApp-a hazırdır",
      doneLead: "WhatsApp açıldı. Hazır mesajı göndərməyi unutmayın: sifariş yalnız mesaj göndəriləndən sonra bizə çatır.",
      orderNo: "Sifariş nömrəsi",
      backHome: "Ana səhifəyə qayıt",
      emptyCheckout: "Sifariş verməzdən əvvəl səbətə məhsul əlavə edin.",
      finalTitle: "Hədiyyənizi seçin",
      finalLead: "On üç məhsul, hər biri sertifikat və təqdimat qablaşdırması ilə.",
      finalCta: "Kolleksiyaya keç",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      social: "Sosial şəbəkələr",
      openWhatsapp: "WhatsApp-da yenidən aç",
      waNote: "Düyməyə basanda WhatsApp hazır sifariş mesajı ilə açılır.",
      qtyShort: "Miqdar",
    },

    meta: {
      title: "PRESIDENT · Business Gifts",
      description:
        "Azərbaycanda rəsmi və korporativ təqdimat hədiyyələri. İsveçrə mexanizmli saatlar, təbii dəri məmulatlar və qiymətli metallarla işlənmiş kolleksiya əşyaları.",
    },

    notFound: {
      title: "Səhifə tapılmadı",
      lead: "Axtardığınız səhifə mövcud deyil və ya ünvanı dəyişib.",
      cta: "Ana səhifəyə qayıt",
    },
  },

  en: {
    localeName: "English",
    localeShort: "EN",

    nav: {
      collection: "Collection",
      corporate: "Corporate",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },

    hero: {
      eyebrow: "Gifts made for state protocol",
      title: "A gift presented with dignity",
      lead: "Azerbaijani craft, Swiss movement and full grain leather. Made for official occasions.",
      ctaPrimary: "View the collection",
      ctaSecondary: "Corporate orders",
    },

    trust: {
      a: "Made for state protocol",
      b: "Swiss movement",
      c: "Full grain leather",
      d: "Hand finished",
    },

    categories: {
      title: "Three directions",
      lead: "Timepieces, leather goods and limited collection pieces. Each held to the same standard.",
      view: "View",
    },

    featured: {
      eyebrow: "Featured",
      cta: "View the piece",
    },

    watches: {
      title: "The timepieces",
      lead: "Sapphire crystal, Swiss movement and a dial bearing the state emblem.",
      hint: "Scroll",
    },

    craft: {
      title: "How it is made",
      lead: "Every piece passes through the same four stages. None of them is shortened.",
      steps: [
        {
          title: "Material selection",
          body: "Full grain leather, stainless steel, gold and silver plating. Colour and texture are matched by hand within each batch.",
        },
        {
          title: "Hand work",
          body: "Engraving, stitching and enamel badges are worked by a craftsman. The decoration of a single dagger takes days.",
        },
        {
          title: "Personalisation",
          body: "A name, a title, an organisation logo or a commemorative inscription is engraved. Production starts once the sample is approved.",
        },
        {
          title: "Packaging",
          body: "A lacquered or velvet lined case, a numbered certificate and a presentation folder. Delivered as a complete set.",
        },
      ],
    },

    corporate: {
      eyebrow: "Corporate orders",
      title: "Made for your organisation",
      lead: "Volume orders, consistent packaging and individual engraving. We work with protocol departments and embassies.",
      points: [
        {
          title: "Individual engraving",
          body: "A logo, a name or a commemorative line. Separate text on each piece is possible.",
        },
        {
          title: "Consistent packaging",
          body: "The whole set arrives in the same case, with the same certificate and the same presentation folder.",
        },
        {
          title: "Volume orders",
          body: "From ten pieces upward. For larger orders the production window is agreed in advance.",
        },
        {
          title: "Sample first",
          body: "A sample is prepared for approval before production. Nothing goes into production unapproved.",
        },
      ],
    },

    inquiry: {
      eyebrow: "Inquiry",
      title: "Let us discuss your order",
      lead: "Fill in the form and we will reply within one working day. Or write to us directly.",
      name: "Full name",
      org: "Organisation",
      email: "Email",
      phone: "Phone",
      interest: "Area of interest",
      quantity: "Approximate quantity",
      message: "Message",
      messagePlaceholder: "Event date, budget range or personalisation requirements",
      submit: "Send the inquiry",
      submitting: "Sending",
      success: "Your inquiry has been received. We will be in touch within one working day.",
      error: "The message could not be sent. Please write to us directly.",
      required: "This field is required",
      invalidEmail: "That email address is not valid",
      optional: "optional",
      any: "No preference",
      whatsapp: "Message on WhatsApp",
    },

    collection: {
      title: "The full collection",
      lead: "Thirteen pieces across three directions. Choose and add to your cart.",
      all: "All",
      count: "pieces",
      empty: "There are no pieces in this category.",
    },

    product: {
      back: "Back to the collection",
      specs: "Specification",
      inquire: "Inquire about this piece",
      related: "In the same direction",
      priceNote: "Price is quoted on request.",
      gallery: "Gallery",
    },

    about: {
      title: "About PRESIDENT",
      lead: "We make official presentation gifts. Our work begins with protocol requirements and ends with a certificate.",
      body: [
        "PRESIDENT produces official and corporate presentation gifts in Azerbaijan. The collection covers watches with Swiss movements, full grain leather goods and collection pieces worked in precious metals.",
        "Every piece is made with the requirements of state protocol in mind. The state emblem, the eight pointed star and national ornamental motifs are part of the structure of the object, not decoration applied to it.",
        "Orders go into production once a sample has been approved. The finished piece is handed over with a numbered certificate and presentation packaging.",
      ],
      statsTitle: "In numbers",
    },

    footer: {
      tagline: "Official and corporate presentation gifts",
      nav: "Navigation",
      contact: "Contact",
      language: "Language",
      rights: "All rights reserved",
      address: "TODO: address",
      phone: "+994 10 239 60 15",
      email: "TODO: email",
    },

    shop: {
      add: "Add to cart",
      addShort: "Add",
      buyNow: "Buy now",
      quantity: "Quantity",
      price: "Price",
      cartTitle: "Cart",
      cartOpen: "Open cart",
      cartClose: "Close cart",
      cartEmpty: "Your cart is empty",
      cartEmptyLead: "Choose a piece you like and add it to the cart.",
      continueShopping: "Continue shopping",
      subtotal: "Total",
      checkout: "Checkout",
      remove: "Remove",
      increase: "Increase",
      decrease: "Decrease",
      itemsLabel: "items",
      deliveryNote: "Delivery cost is confirmed when the order is approved.",
      backAria: "Go back",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      galleryAria: "Product gallery",
      galleryItem: "Frame",
      checkoutTitle: "Complete your order",
      checkoutLead: "Enter your details. Our team will confirm the order and arrange delivery.",
      yourDetails: "Your details",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      address: "Delivery address",
      city: "City",
      note: "Note",
      optional: "optional",
      payment: "Payment",
      paymentCod: "Pay on delivery",
      paymentNote: "Online card payment is not connected yet. The payment method is agreed with you once the order is confirmed.",
      summary: "Your order",
      place: "Send the order on WhatsApp",
      placing: "Sending",
      required: "This field is required",
      invalidPhone: "That phone number is not valid",
      invalidEmail: "That email address is not valid",
      error: "The order could not be sent. Please try again shortly or contact us directly.",
      doneTitle: "Your order is ready on WhatsApp",
      doneLead: "WhatsApp has opened. Remember to send the prepared message: the order only reaches us once it is sent.",
      orderNo: "Order number",
      backHome: "Back to the home page",
      emptyCheckout: "Add something to the cart before placing an order.",
      finalTitle: "Choose your gift",
      finalLead: "Thirteen pieces, each with a certificate and presentation packaging.",
      finalCta: "Go to the collection",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      social: "Social",
      openWhatsapp: "Open WhatsApp again",
      waNote: "Pressing the button opens WhatsApp with the order message already written.",
      qtyShort: "Quantity",
    },

    meta: {
      title: "PRESIDENT · Business Gifts",
      description:
        "Official and corporate presentation gifts from Azerbaijan. Watches with Swiss movements, full grain leather goods and collection pieces worked in precious metals.",
    },

    notFound: {
      title: "Page not found",
      lead: "The page you are looking for does not exist or has moved.",
      cta: "Back to the home page",
    },
  },

  ru: {
    localeName: "Русский",
    localeShort: "RU",

    nav: {
      collection: "Коллекция",
      corporate: "Для бизнеса",
      about: "О нас",
      contact: "Контакты",
      menu: "Меню",
      close: "Закрыть",
    },

    hero: {
      eyebrow: "Подарки для государственного протокола",
      title: "Подарок, вручаемый с достоинством",
      lead: "Азербайджанское мастерство, швейцарский механизм и натуральная кожа. Создано для официальных случаев.",
      ctaPrimary: "Смотреть коллекцию",
      ctaSecondary: "Корпоративный заказ",
    },

    trust: {
      a: "Для государственного протокола",
      b: "Швейцарский механизм",
      c: "Натуральная кожа",
      d: "Ручная работа",
    },

    categories: {
      title: "Три направления",
      lead: "Часы, кожаные изделия и лимитированные коллекционные предметы. Каждое по единому стандарту.",
      view: "Смотреть",
    },

    featured: {
      eyebrow: "Избранное",
      cta: "Смотреть изделие",
    },

    watches: {
      title: "Коллекция часов",
      lead: "Сапфировое стекло, швейцарский механизм и циферблат с государственным гербом.",
      hint: "Прокрутите",
    },

    craft: {
      title: "Как это делается",
      lead: "Каждое изделие проходит одни и те же четыре этапа. Ни один не сокращается.",
      steps: [
        {
          title: "Выбор материала",
          body: "Натуральная кожа, нержавеющая сталь, золотое и серебряное покрытие. Цвет и фактура подбираются вручную внутри каждой партии.",
        },
        {
          title: "Ручная работа",
          body: "Гравировка, строчка и эмалевые знаки выполняются мастером. Отделка одного кинжала занимает несколько дней.",
        },
        {
          title: "Персонализация",
          body: "Гравируется имя, должность, логотип организации или памятная надпись. Производство начинается после утверждения образца.",
        },
        {
          title: "Упаковка",
          body: "Лакированный футляр или футляр с бархатной подкладкой, нумерованный сертификат и презентационная папка. Поставляется комплектом.",
        },
      ],
    },

    corporate: {
      eyebrow: "Корпоративный заказ",
      title: "Изготавливается для вашей организации",
      lead: "Объёмные заказы, единая упаковка и индивидуальная гравировка. Работаем с протокольными отделами и посольствами.",
      points: [
        {
          title: "Индивидуальная гравировка",
          body: "Логотип, имя или памятная надпись. Возможен отдельный текст на каждом предмете.",
        },
        {
          title: "Единая упаковка",
          body: "Весь комплект поставляется в одинаковых футлярах, с одинаковым сертификатом и презентационной папкой.",
        },
        {
          title: "Объёмный заказ",
          body: "От десяти экземпляров. Для крупных заказов сроки согласуются заранее.",
        },
        {
          title: "Сначала образец",
          body: "Перед производством готовится образец на утверждение. Неутверждённое в работу не запускается.",
        },
      ],
    },

    inquiry: {
      eyebrow: "Запрос",
      title: "Обсудим ваш заказ",
      lead: "Заполните форму, и мы ответим в течение одного рабочего дня. Или напишите напрямую.",
      name: "Имя и фамилия",
      org: "Организация",
      email: "Электронная почта",
      phone: "Телефон",
      interest: "Интересующее направление",
      quantity: "Примерное количество",
      message: "Сообщение",
      messagePlaceholder: "Дата мероприятия, бюджетные рамки или требования к персонализации",
      submit: "Отправить запрос",
      submitting: "Отправка",
      success: "Ваш запрос принят. Мы свяжемся с вами в течение одного рабочего дня.",
      error: "Отправить не удалось. Пожалуйста, напишите нам напрямую.",
      required: "Это поле обязательно",
      invalidEmail: "Некорректный адрес электронной почты",
      optional: "необязательно",
      any: "Без предпочтений",
      whatsapp: "Написать в WhatsApp",
    },

    collection: {
      title: "Вся коллекция",
      lead: "Тринадцать изделий по трём направлениям. Выберите и добавьте в корзину.",
      all: "Все",
      count: "изделий",
      empty: "В этой категории нет изделий.",
    },

    product: {
      back: "Назад к коллекции",
      specs: "Характеристики",
      inquire: "Запрос по этому изделию",
      related: "В том же направлении",
      priceNote: "Цена сообщается по запросу.",
      gallery: "Галерея",
    },

    about: {
      title: "О компании PRESIDENT",
      lead: "Мы изготавливаем официальные презентационные подарки. Наша работа начинается с протокольных требований и завершается сертификатом.",
      body: [
        "PRESIDENT производит в Азербайджане официальные и корпоративные презентационные подарки. В коллекцию входят часы со швейцарским механизмом, изделия из натуральной кожи и коллекционные предметы из драгоценных металлов.",
        "Каждое изделие создаётся с учётом требований государственного протокола. Государственный герб, восьмиконечная звезда и национальные орнаментальные мотивы являются частью структуры предмета, а не нанесённым украшением.",
        "Заказы запускаются в производство после утверждения образца. Готовое изделие передаётся с нумерованным сертификатом и презентационной упаковкой.",
      ],
      statsTitle: "В цифрах",
    },

    footer: {
      tagline: "Официальные и корпоративные презентационные подарки",
      nav: "Навигация",
      contact: "Контакты",
      language: "Язык",
      rights: "Все права защищены",
      address: "TODO: адрес",
      phone: "+994 10 239 60 15",
      email: "TODO: электронная почта",
    },

    shop: {
      add: "В корзину",
      addShort: "В корзину",
      buyNow: "Купить сейчас",
      quantity: "Количество",
      price: "Цена",
      cartTitle: "Корзина",
      cartOpen: "Открыть корзину",
      cartClose: "Закрыть корзину",
      cartEmpty: "Ваша корзина пуста",
      cartEmptyLead: "Выберите понравившееся изделие и добавьте его в корзину.",
      continueShopping: "Продолжить покупки",
      subtotal: "Итого",
      checkout: "Оформить заказ",
      remove: "Удалить",
      increase: "Увеличить",
      decrease: "Уменьшить",
      itemsLabel: "шт.",
      deliveryNote: "Стоимость доставки сообщается при подтверждении заказа.",
      backAria: "Назад",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      galleryAria: "Галерея изделия",
      galleryItem: "Кадр",
      checkoutTitle: "Оформление заказа",
      checkoutLead: "Укажите свои данные. Наша команда подтвердит заказ и согласует доставку.",
      yourDetails: "Ваши данные",
      name: "Имя и фамилия",
      phone: "Телефон",
      email: "Электронная почта",
      address: "Адрес доставки",
      city: "Город",
      note: "Комментарий",
      optional: "необязательно",
      payment: "Оплата",
      paymentCod: "Оплата при доставке",
      paymentNote: "Онлайн оплата картой пока не подключена. Способ оплаты согласуется с вами после подтверждения заказа.",
      summary: "Ваш заказ",
      place: "Отправить заказ в WhatsApp",
      placing: "Отправка",
      required: "Это поле обязательно",
      invalidPhone: "Некорректный номер телефона",
      invalidEmail: "Некорректный адрес электронной почты",
      error: "Заказ не отправлен. Попробуйте ещё раз чуть позже или свяжитесь с нами напрямую.",
      doneTitle: "Ваш заказ готов в WhatsApp",
      doneLead: "WhatsApp открыт. Не забудьте отправить подготовленное сообщение: заказ поступит к нам только после отправки.",
      orderNo: "Номер заказа",
      backHome: "Вернуться на главную",
      emptyCheckout: "Перед оформлением добавьте изделие в корзину.",
      finalTitle: "Выберите свой подарок",
      finalLead: "Тринадцать изделий, каждое с сертификатом и презентационной упаковкой.",
      finalCta: "Перейти в коллекцию",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      social: "Соцсети",
      openWhatsapp: "Открыть WhatsApp снова",
      waNote: "По нажатию откроется WhatsApp с уже подготовленным сообщением заказа.",
      qtyShort: "Количество",
    },

    meta: {
      title: "PRESIDENT · Business Gifts",
      description:
        "Официальные и корпоративные презентационные подарки из Азербайджана. Часы со швейцарским механизмом, изделия из натуральной кожи и коллекционные предметы из драгоценных металлов.",
    },

    notFound: {
      title: "Страница не найдена",
      lead: "Запрашиваемая страница не существует или её адрес изменился.",
      cta: "Вернуться на главную",
    },
  },
} as const;

export type Dict = (typeof DICT)["az"];

export const t = (locale: Locale): Dict => DICT[locale] as unknown as Dict;
