import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      site: {
        title: "Damascus Center for Adult Education"
      },
      navigation: {
        registration: "Registration & Consultation",
        services: "Services",
        about: "About Us",
        contact: "Contact",
        myAccount: "My Account",
        wishlist: "Wishlist",
        cart: "Cart"
      },
      
      search: {
        placeholder: "Enter search term or click magnifying glass for all courses"
      },
      hero: {
        slide1: {
          title: "The Damascus Card",
          subtitle: "around 800 events for 79 Euro",
          cta: "learn more"
        },
        slide2: {
          title: "Summer Academy",
          subtitle: "Fresh courses from July to September",
          cta: "learn more"
        },
        slide3: {
          title: "AI meets real thinking",
          subtitle: "The relationship between humans and machines",
          cta: "learn more"
        },
        slide4: {
          title: "Subscribe now!",
          subtitle: "Your Damascus Center Newsletter",
          cta: "learn more"
        }
      },
      categories: {
        politics: "People, Politics & Society",
        culture: "Culture, Art & Creativity",
        science: "Nature, Science & Technology",
        health: "Health, Environment & Cooking",
        languages: "Languages",
        youth: "Youth & Education",
        career: "Continuing Education & Career",
        digital: "IT & Digital"
      },
      programs: {
        youth: {
          title: "Youth Adult Education",
          description: "Creative courses and workshops designed specifically for young people to explore their talents and develop new skills."
        },
        seniors: {
          title: "Senior Adult Education",
          description: "Engaging programs tailored for older adults, promoting lifelong learning and social connections."
        },
        munich: {
          title: "Damascus – Our City",
          description: "Discover the rich history, culture, and hidden gems of Damascus through guided tours and cultural programs."
        },
        accessibility: {
          title: "Barrier-free Learning",
          description: "Inclusive educational programs designed to be accessible for people with diverse learning needs and abilities."
        },
        academy: {
          title: "Open Academy",
          description: "Academic lectures and discussions on current topics, open to all interested in intellectual exchange."
        },
        english: {
          title: "Programs in English",
          description: "International courses and workshops conducted in English for diverse, multicultural learning experiences."
        },
        online: {
          title: "Online Program",
          description: "Flexible digital learning opportunities that allow you to study from anywhere at your own pace."
        },
        buchenried: {
          title: "House Buchenried",
          description: "Residential courses in a beautiful lakeside setting, combining education with relaxation and nature."
        },
        summer: {
          title: "Summer Adult Education",
          description: "Special summer courses offering fresh perspectives and seasonal learning opportunities."
        }
      },
      news: {
        title: "From the Program",
        newProgram: "New Program Autumn/Winter 2025/2026",
        aiThinking: "AI meets real thinking"
      },
      locations: {
        districts: ["East", "West", "Center", "North", "South"]
      },
      map: {
        getDirections: "Get Directions"
      }
    }
  },
  fr: {
    translation: {
      site: {
        title: "Centre de Damas pour l'Éducation des Adultes"
      },
      navigation: {
        registration: "Inscription & Conseil",
        services: "Services",
        about: "À propos",
        contact: "Contact",
        myAccount: "Mon Compte",
        wishlist: "Liste de Souhaits",
        cart: "Panier"
      },
      search: {
        placeholder: "Entrez un terme de recherche ou cliquez sur la loupe pour tous les cours"
      },
      hero: {
        slide1: {
          title: "La Carte de Damas",
          subtitle: "environ 800 événements pour 79 euros",
          cta: "en savoir plus"
        },
        slide2: {
          title: "Académie d'Été",
          subtitle: "Cours frais de juillet à septembre",
          cta: "en savoir plus"
        },
        slide3: {
          title: "L'IA rencontre la vraie pensée",
          subtitle: "La relation entre l'homme et la machine",
          cta: "en savoir plus"
        },
        slide4: {
          title: "Abonnez-vous maintenant!",
          subtitle: "Votre newsletter du Centre de Damas",
          cta: "en savoir plus"
        }
      },
      categories: {
        politics: "Personne, Politique & Société",
        culture: "Culture, Art & Créativité",
        science: "Nature, Science & Technologie",
        health: "Santé, Environnement & Cuisine",
        languages: "Langues",
        youth: "Jeunesse & Éducation",
        career: "Formation Continue & Carrière",
        digital: "IT & Numérique"
      },
      programs: {
        youth: {
          title: "Université Populaire Jeunesse",
          description: "Cours créatifs et ateliers conçus spécifiquement pour les jeunes pour explorer leurs talents et développer de nouvelles compétences."
        },
        seniors: {
          title: "Université Populaire Seniors",
          description: "Programmes engageants adaptés aux adultes âgés, favorisant l'apprentissage tout au long de la vie et les connexions sociales."
        },
        munich: {
          title: "Damas – Notre Ville",
          description: "Découvrez la riche histoire, culture et trésors cachés de Damas à travers des visites guidées et programmes culturels."
        },
        accessibility: {
          title: "Apprentissage Sans Barrières",
          description: "Programmes éducatifs inclusifs conçus pour être accessibles aux personnes ayant des besoins d'apprentissage divers."
        },
        academy: {
          title: "Académie Ouverte",
          description: "Conférences académiques et discussions sur des sujets actuels, ouvertes à tous ceux intéressés par l'échange intellectuel."
        },
        english: {
          title: "Programmes en Anglais",
          description: "Cours et ateliers internationaux menés en anglais pour des expériences d'apprentissage diversifiées et multiculturelles."
        },
        online: {
          title: "Programme En Ligne",
          description: "Opportunités d'apprentissage numérique flexibles qui vous permettent d'étudier de n'importe où à votre propre rythme."
        },
        buchenried: {
          title: "Maison Buchenried",
          description: "Cours résidentiels dans un cadre magnifique au bord du lac, combinant éducation avec détente et nature."
        },
        summer: {
          title: "Université Populaire d'Été",
          description: "Cours d'été spéciaux offrant des perspectives fraîches et des opportunités d'apprentissage saisonnières."
        }
      },
      news: {
        title: "Du Programme",
        newProgram: "Nouveau Programme Automne/Hiver 2025/2026",
        aiThinking: "L'IA rencontre la vraie pensée"
      },
      locations: {
        districts: ["Est", "Ouest", "Centre", "Nord", "Sud"]
      },
      map: {
        getDirections: "Obtenir un Itinéraire"
      }
    }
  },
  de: {
    translation: {
      site: {
        title: "Damascus Center for Adult Education"
      },
      navigation: {
        registration: "Anmeldung & Beratung",
        services: "Services",
        about: "Über uns",
        contact: "Kontakt",
        myAccount: "Mein Konto",
        wishlist: "Merkliste",
        cart: "Warenkorb"
      },
      search: {
        placeholder: "Suchwort eingeben oder Lupe klicken für alle Kurse"
      },
      hero: {
        slide1: {
          title: "Die Damascus-Card",
          subtitle: "rund 800 Veranstaltungen für 79 Euro",
          cta: "mehr erfahren"
        },
        slide2: {
          title: "Sommer Akademie",
          subtitle: "Frische Kurse von Juli bis September",
          cta: "mehr erfahren"
        },
        slide3: {
          title: "KI trifft echtes Denken",
          subtitle: "Das Verhältnis Mensch und Maschine",
          cta: "mehr erfahren"
        },
        slide4: {
          title: "Jetzt abonnieren!",
          subtitle: "Ihr Damascus Center Newsletter",
          cta: "mehr erfahren"
        }
      },
      categories: {
        politics: "Mensch, Politik & Gesellschaft",
        culture: "Kultur, Kunst & Kreativität",
        science: "Natur, Wissenschaft & Technik",
        health: "Gesundheit, Umwelt & Kochkultur",
        languages: "Sprachen",
        youth: "Jugend & Ausbildung",
        career: "Weiterbildung & Beruf",
        digital: "IT & Digitales"
      },
      programs: {
        youth: {
          title: "Junge Volkshochschule",
          description: "Kreative Kurse und Workshops speziell für junge Menschen, um Talente zu entdecken und neue Fähigkeiten zu entwickeln."
        },
        seniors: {
          title: "Senioren Volkshochschule",
          description: "Abwechslungsreiche Programme für ältere Erwachsene, die lebenslanges Lernen und soziale Kontakte fördern."
        },
        munich: {
          title: "Damaskus – unsere Stadt",
          description: "Entdecken Sie die reiche Geschichte, Kultur und versteckten Schätze von Damaskus durch Führungen und Kulturprogramme."
        },
        accessibility: {
          title: "Barrierefrei lernen",
          description: "Inklusive Bildungsprogramme, die für Menschen mit unterschiedlichen Lernbedürfnissen zugänglich sind."
        },
        academy: {
          title: "Offene Akademie",
          description: "Akademische Vorträge und Diskussionen zu aktuellen Themen, offen für alle am intellektuellen Austausch Interessierten."
        },
        english: {
          title: "Programme in English",
          description: "Internationale Kurse und Workshops in englischer Sprache für vielfältige, multikulturelle Lernerfahrungen."
        },
        online: {
          title: "Online-Programm",
          description: "Flexible digitale Lernmöglichkeiten, die es Ihnen ermöglichen, von überall in Ihrem eigenen Tempo zu lernen."
        },
        buchenried: {
          title: "Haus Buchenried",
          description: "Wohnkurse in wunderschöner Seelage, die Bildung mit Entspannung und Natur verbinden."
        },
        summer: {
          title: "Sommer Volkshochschule",
          description: "Besondere Sommerkurse mit frischen Perspektiven und saisonalen Lernmöglichkeiten."
        }
      },
      news: {
        title: "Aus dem Programm",
        newProgram: "Neues Programm Herbst/Winter 2025/2026",
        aiThinking: "KI trifft echtes Denken"
      },
      locations: {
        districts: ["Ost", "West", "Mitte", "Nord", "Süd"]
      },
      map: {
        getDirections: "Wegbeschreibung"
      }
    }
  },
  ar: {
    translation: {
      site: {
        title: "مركز دمشق لتعليم الكبار"
      },
      navigation: {
        registration: "التسجيل والاستشارة",
        services: "الخدمات",
        about: "من نحن",
        contact: "اتصل بنا",
        myAccount: "حسابي",
        wishlist: "قائمة الأمنيات",
        cart: "عربة التسوق"
      },
      search: {
        placeholder: "أدخل كلمة البحث أو انقر على العدسة لجميع الدورات"
      },
      hero: {
        slide1: {
          title: "بطاقة دمشق",
          subtitle: "حوالي 800 فعالية مقابل 79 يورو",
          cta: "اعرف المزيد"
        },
        slide2: {
          title: "أكاديمية الصيف",
          subtitle: "دورات جديدة من يوليو إلى سبتمبر",
          cta: "اعرف المزيد"
        },
        slide3: {
          title: "الذكاء الاصطناعي يلتقي بالتفكير الحقيقي",
          subtitle: "العلاقة بين الإنسان والآلة",
          cta: "اعرف المزيد"
        },
        slide4: {
          title: "اشترك الآن!",
          subtitle: "نشرة مركز دمشق الإخبارية",
          cta: "اعرف المزيد"
        }
      },
      categories: {
        politics: "الإنسان والسياسة والمجتمع",
        culture: "الثقافة والفن والإبداع",
        science: "الطبيعة والعلوم والتكنولوجيا",
        health: "الصحة والبيئة وثقافة الطبخ",
        languages: "اللغات",
        youth: "الشباب والتعليم",
        career: "التعليم المستمر والمهنة",
        digital: "تكنولوجيا المعلومات والرقمنة"
      },
      programs: {
        youth: {
          title: "جامعة الشباب الشعبية",
          description: "دورات وورش عمل إبداعية مصممة خصيصاً للشباب لاستكشاف مواهبهم وتطوير مهارات جديدة."
        },
        seniors: {
          title: "جامعة كبار السن الشعبية",
          description: "برامج جذابة مصممة لكبار السن، تشجع التعلم مدى الحياة والروابط الاجتماعية."
        },
        munich: {
          title: "دمشق – مدينتنا",
          description: "اكتشف التاريخ الغني والثقافة والكنوز المخفية لدمشق من خلال الجولات المرشدة والبرامج الثقافية."
        },
        accessibility: {
          title: "التعلم بدون حواجز",
          description: "برامج تعليمية شاملة مصممة لتكون في متناول الأشخاص ذوي الاحتياجات التعليمية المتنوعة."
        },
        academy: {
          title: "الأكاديمية المفتوحة",
          description: "محاضرات ومناقشات أكاديمية حول المواضيع الحالية، مفتوحة لجميع المهتمين بالتبادل الفكري."
        },
        english: {
          title: "البرامج باللغة الإنجليزية",
          description: "دورات وورش عمل دولية تُقام باللغة الإنجليزية لتجارب تعليمية متنوعة ومتعددة الثقافات."
        },
        online: {
          title: "البرنامج الإلكتروني",
          description: "فرص تعلم رقمية مرنة تتيح لك الدراسة من أي مكان وفي وتيرتك الخاصة."
        },
        buchenried: {
          title: "بيت بوخنريد",
          description: "دورات سكنية في موقع جميل على ضفاف البحيرة، تجمع بين التعليم والاسترخاء والطبيعة."
        },
        summer: {
          title: "جامعة الصيف الشعبية",
          description: "دورات صيفية خاصة تقدم وجهات نظر جديدة وفرص تعلم موسمية."
        }
      },
      news: {
        title: "من البرنامج",
        newProgram: "برنامج جديد خريف/شتاء 2025/2026",
        aiThinking: "الذكاء الاصطناعي يلتقي بالتفكير الحقيقي"
      },
      locations: {
        districts: ["الشرق", "الغرب", "المركز", "الشمال", "الجنوب"]
      },
      map: {
        getDirections: "احصل على الاتجاهات"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Arabic as default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;