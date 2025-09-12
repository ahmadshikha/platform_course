import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {

        siteTitle: {
            title: 'dashboard'
        },
        teachers: {
            forms: {
                add: "Add Teacher",
                edit: "Edite Teacher",
            }
        }
    
},
ar: {
        siteTitle: {
            title:'لوحة التحكم',

        },
        teachers: {
            forms: {
                add: "اضافة استاذ",
                edit: "تعديل استاذ",
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