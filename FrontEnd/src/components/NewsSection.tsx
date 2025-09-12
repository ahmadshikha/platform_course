import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowRight, MapPin, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";

// استخدام صور من الإنترنت للاختبار
const sommerVhsImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
const eventImage1 = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
const eventImage2 = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
const eventImage3 = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";

export const NewsSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const newsItems = [
    {
      id: 1,
      date: "1. September 2024",
      title: i18n.language === 'ar' ? "أخلاقيات الطب ومجالات صراعاتها" : 
            i18n.language === 'fr' ? "Éthique médicale et ses domaines de conflit" :
            "Medical Ethics and its Conflict Areas",
      description: i18n.language === 'ar' ? "ما هو التصرف الأخلاقي الجيد فيما يتعلق بالصحة والمرض؟ ندوة تمهيدية مع محفزات للتفكير ومناقشات مثيرة حول مستقبل الطب." :
                   i18n.language === 'fr' ? "Qu'est-ce qu'une action moralement bonne en matière de santé et de maladie ? Un séminaire d'introduction avec des stimulations de pensée et des discussions passionnantes sur l'avenir de la médecine." :
                   "What is morally good action regarding health and disease? An introductory seminar with thought stimulators and exciting discussions about the future of medicine.",
      image: sommerVhsImage,
      time: "18:00-20:00",
      location: i18n.language === 'ar' ? "القاعة الرئيسية" : "Main Hall",
      category: "academic",
      featured: true
    },
    {
      id: 2,
      date: "24. August 2024", 
      title: i18n.language === 'ar' ? "مغامرة علم الآثار: المجموعة الأثرية الحكومية" :
             i18n.language === 'fr' ? "Aventure archéologique : la Collection archéologique d'État" :
             "Archaeology Adventure: the State Archaeological Collection",
      description: i18n.language === 'ar' ? "استكشف كنوز التاريخ القديم والمعرض الخاص 'الأشكال الأولية - فن العصر الجليدي التشكيلي في أوروبا'" :
                   i18n.language === 'fr' ? "Explorez les trésors de l'histoire ancienne et l'exposition spéciale 'Formes primitives - Art figuratif de l'âge de glace en Europe'" :
                   "Explore treasures of ancient history and the special exhibition 'Primitive Forms - Figurative Ice Age Art in Europe'",
      image: eventImage1,
      time: "10:00-16:00",
      location: i18n.language === 'ar' ? "المتحف الوطني" : "National Museum",
      category: "cultural",
      featured: false
    },
    {
      id: 3,
      date: "25. August 2024",
      title: i18n.language === 'ar' ? "الإيطالية A2 الاستماع والتحدث" :
             i18n.language === 'fr' ? "Italien A2 Écoute et Expression orale" :
             "Italian A2 Listening and Speaking",
      description: i18n.language === 'ar' ? "طور مهاراتك في اللغة الإيطالية مع التركيز على التواصل العملي" :
                   i18n.language === 'fr' ? "Développez vos compétences en italien en mettant l'accent sur la communication pratique" :
                   "Develop your Italian language skills with focus on practical communication",
      image: eventImage2,
      time: "14:00-16:00",
      location: i18n.language === 'ar' ? "قاعة اللغات" : "Language Hall",
      category: "language",
      featured: false
    },
    {
      id: 4,
      date: "26. August 2024",
      title: i18n.language === 'ar' ? "النحت وتشكيل الأشكال بالشبكة المطاطية" :
             i18n.language === 'fr' ? "Sculpture et formation de formes avec grille extensible" :
             "Sculpture and Form Design with Stretch Grid",
      description: i18n.language === 'ar' ? "ورشة عمل إبداعية لتعلم تقنيات النحت المعاصرة باستخدام مواد مرنة" :
                   i18n.language === 'fr' ? "Atelier créatif pour apprendre les techniques de sculpture contemporaine avec des matériaux flexibles" :
                   "Creative workshop to learn contemporary sculpture techniques with flexible materials",
      image: eventImage3,
      time: "15:00-18:00",
      location: i18n.language === 'ar' ? "استوديو الفنون" : "Art Studio",
      category: "art",
      featured: true
    }
  ];

  const upcomingEvents = [
    {
      date: "26. August",
      title: i18n.language === 'ar' ? "النحت وتشكيل الأشكال بالشبكة المطاطية" :
             i18n.language === 'fr' ? "Sculpture et formation de formes avec grille extensible" :
             "Sculpture and Form Design with Stretch Grid",
      time: "15:00-18:00"
    },
    {
      date: "27. August",
      title: i18n.language === 'ar' ? "توقف عن التوتر - المزيد من السهولة والاسترخاء في الحياة اليومية" :
             i18n.language === 'fr' ? "Arrêtez le stress - Plus de légèreté et de détente au quotidien" :
             "Stop Stress - More Lightness and Relaxation in Daily Life",
      time: "10:00-12:00"
    },
    {
      date: "28. August",
      title: i18n.language === 'ar' ? "استوديو الصيف: الطي والثني والتمزيق - من الورق إلى المنتج التصميمي" :
             i18n.language === 'fr' ? "Atelier d'été : Plier, courber, déchirer - du papier au produit design" :
             "Summer Studio: Folding, Bending, Tearing - From Paper to Design Product",
      time: "13:00-16:00"
    },
    {
      date: "29. August",
      title: i18n.language === 'ar' ? "من ميونيخ بالحب - مبادرة المهاجرين الروس الشباب في ميونيخ" :
             i18n.language === 'fr' ? "De Munich avec amour - Une initiative de jeunes immigrants russes à Munich" :
             "From Munich with Love - An Initiative of Young Russian Immigrants in Munich",
      time: "17:00-19:00"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header with animated entrance */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('news.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {i18n.language === 'ar' 
              ? 'اكتشف أحدث الفعاليات والأخبار في مجتمعنا الأكاديمي'
              : i18n.language === 'fr'
              ? 'Découvrez les derniers événements et actualités de notre communauté académique'
              : 'Discover the latest events and news in our academic community'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Featured News */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.featured && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {i18n.language === 'ar' ? 'مميز' : 'Featured'}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className={`flex items-center space-x-2 text-xs text-gray-500 mb-3 ${i18n.language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                          {item.time && (
                            <>
                              <Clock className="h-4 w-4" />
                              <span>{item.time}</span>
                            </>
                          )}
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                          {item.title}
                        </h3>
                        <p className={`text-gray-600 leading-relaxed mb-4 flex-1 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                          {item.description}
                        </p>
                        <div className="mt-auto">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 px-0"
                          >
                            {i18n.language === 'ar' ? 'اقرأ المزيد' : i18n.language === 'fr' ? 'Lire plus' : 'Read more'}
                            <ArrowRight className={`h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform ${i18n.language === 'ar' ? 'ml-0 mr-2 group-hover:-translate-x-1' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                {i18n.language === 'ar' ? 'الفعاليات القادمة' : i18n.language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100 ${i18n.language === 'ar' ? 'text-right' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-blue-800 text-sm">{event.date}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{event.time}</span>
                    </div>
                    <a 
                      href="#" 
                      className="text-gray-900 font-medium hover:text-blue-700 transition-colors block leading-tight"
                    >
                      {event.title}
                    </a>
                  </div>
                ))}
              </div>
              
              {/* Summer Academy Highlight */}
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <h4 className="font-bold text-lg mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-300" />
                  {i18n.language === 'ar' ? 'أكاديمية الصيف' : i18n.language === 'fr' ? 'Académie d\'été' : 'Summer Academy'}
                </h4>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">
                  {i18n.language === 'ar' 
                    ? 'نظرات عميقة ومقدمات أساسية: في أكاديمية الصيف في أينشتاين 28، ترون تطور العلوم الإنسانية'
                    : i18n.language === 'fr'
                    ? 'Aperçus approfondis et introductions fondamentales : à l\'académie d\'été d\'Einstein 28, vous voyez le développement des sciences humaines'
                    : 'Deep insights and fundamental introductions: In the summer academy at Einstein 28, you see the development of humanities'
                  }
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white text-blue-700 hover:bg-gray-100 w-full mt-2"
                >
                  {i18n.language === 'ar' ? 'سجل الآن' : i18n.language === 'fr' ? 'Inscrivez-vous' : 'Register Now'}
                </Button>
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {i18n.language === 'ar' ? 'اشترك في النشرة الإخبارية' : i18n.language === 'fr' ? 'Abonnez-vous à la newsletter' : 'Subscribe to Newsletter'}
                </h4>
                <div className="flex flex-col space-y-3">
                  <input 
                    type="email" 
                    placeholder={i18n.language === 'ar' ? 'بريدك الإلكتروني' : i18n.language === 'fr' ? 'Votre email' : 'Your email'} 
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    {i18n.language === 'ar' ? 'اشتراك' : i18n.language === 'fr' ? 'S\'abonner' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className={`mt-16 text-center ${i18n.language === 'ar' ? 'text-right' : ''}`}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {i18n.language === 'ar' ? 'شاهد جميع الفعاليات' : i18n.language === 'fr' ? 'Voir tous les événements' : 'View All Events'}
            <ArrowRight className={`h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform ${i18n.language === 'ar' ? 'ml-0 mr-2 group-hover:-translate-x-1' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};