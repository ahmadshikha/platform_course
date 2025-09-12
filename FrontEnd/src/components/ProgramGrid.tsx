import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import jungeVhsImage from "@/assets/junge-vhs.jpg";
import seniorenVhsImage from "@/assets/senioren-vhs.jpg";
import muenchenStadtImage from "@/assets/muenchen-stadt.jpg";
import barrierefreiImage from "@/assets/barrierefrei.jpg";
import offeneAkademieImage from "@/assets/offene-akademie.jpg";
import englishProgramsImage from "@/assets/english-programs.jpg";
import onlineProgramImage from "@/assets/online-program.jpg";
import hausBuchenriedImage from "@/assets/haus-buchenried.jpg";
import sommerVhsImage from "@/assets/sommer-vhs.jpg";

export const ProgramGrid = () => {
  const { t } = useTranslation();
  
  const programs = [
    {
      title: t('programs.youth.title'),
      description: t('programs.youth.description'),
      image: jungeVhsImage,
      alt: "Young people creating graffiti art",
      link: "/youth-education"
    },
    {
      title: t('programs.seniors.title'),
      description: t('programs.seniors.description'),
      image: seniorenVhsImage,
      alt: "Snowy owl against golden-blue background"
    },
    {
      title: t('programs.munich.title'),
      description: t('programs.munich.description'),
      image: muenchenStadtImage,
      alt: "Monopteros in Nymphenburg Park"
    },
    {
      title: t('programs.accessibility.title'),
      description: t('programs.accessibility.description'),
      image: barrierefreiImage,
      alt: "Bridge against green-blue background"
    },
    {
      title: t('programs.academy.title'),
      description: t('programs.academy.description'),
      image: offeneAkademieImage,
      alt: "Einstein 28 courtyard with colorful steel sculpture"
    },
    {
      title: t('programs.english.title'),
      description: t('programs.english.description'),
      image: englishProgramsImage,
      alt: "Green tea cup with British tea bag"
    },
    {
      title: t('programs.online.title'),
      description: t('programs.online.description'),
      image: onlineProgramImage,
      alt: "Young man with curly hair at computer"
    },
    {
      title: t('programs.buchenried.title'),
      description: t('programs.buchenried.description'),
      image: hausBuchenriedImage,
      alt: "Red boat graphic on yellow-blue background"
    },
    {
      title: t('programs.summer.title'),
      description: t('programs.summer.description'),
      image: sommerVhsImage,
      alt: "Two red cherries on yellow-blue background"
    }
  ];
        
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                <img
                  src={program.image}
                  alt={program.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary hover:text-primary/80 transition-colors mb-3">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                {program.link ? (
                  <Link to={program.link}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      {t('hero.slide1.cta')} →
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    {t('hero.slide1.cta')} →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};