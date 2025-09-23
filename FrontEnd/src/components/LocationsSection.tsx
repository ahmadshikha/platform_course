import { useTranslation } from "react-i18next";

export const LocationsSection = () => {
  const { t, i18n } = useTranslation();
  
  const districts = t('locations.districts', { returnObjects: true }) as string[];

  const locations = [
    "Allach-Untermenzing", "Alte Heide", "Altstadt", "Am Hart", "Au", "Aubing",
    "Berg am Laim", "Bogenhausen", "Dachau", "Daglfing", "Einstein 28", "Englschalking",
    "Fasangarten", "Feldmoching", "Forstenried", "Freiham", "Freimann", "Freising",
    "Fröttmaning", "Fürstenried", "Fürstenried-Ost", "Fürstenried-West", "Garching",
    "Gasteig", "Gern", "Giesing", "Großhadern", "Grünwald", "Gärtnerplatzviertel",
    "Hadern", "Haidhausen"
  ];

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className={`flex justify-center space-x-8 mb-8 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* {districts.map((district, index) => (
            <a
              key={index}
              href="#"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {district}
            </a>
          ))} */}
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm ${i18n.language === 'ar' ? 'text-right' : ''}`}>
          {locations.map((location) => (
            <div key={location}>
              <a
                href="#"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                {location}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};