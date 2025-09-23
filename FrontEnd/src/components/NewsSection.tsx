import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, MapPin, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";

export const NewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // صور افتراضية للاستخدام عند عدم توفر صور من API
  const defaultImages = [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  ];

  useEffect(() => {
    setIsVisible(true);
    fetchNews();
    fetchActivities();
  }, []);

  // دالة لاستخراج اسم الملف من المسار الكامل
  const extractFilename = (fullPath) => {
    if (!fullPath) return null;
    
    // فصل المسار باستخدام backslash أو forward slash
    const parts = fullPath.split(/[\\/]/);
    
    // إرجاع آخر جزء (اسم الملف)
    return parts[parts.length - 1];
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      // جلب الأخبار من API
      const response = await fetch(`http://localhost:5000/api/news`);
      const data = await response.json();

      if (data.success) {
        // معالجة البيانات وإضافة صور افتراضية إذا لزم الأمر
        const processedNews = data.data.map((item, index) => {
          // استخراج اسم الملف من المسار الكامل
          const imageFilename = extractFilename(item.imageURL);
          // رابط الصورة الصحيح
          const imageUrl = imageFilename 
            ? `http://localhost:5000/uploads/${imageFilename}`
            : defaultImages[index % defaultImages.length];

          return {
            id: item._id,
            date: new Date(item.eventDate).toLocaleDateString('ar-AR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }),
            title: item.title,
            description: item.content,
            image: imageUrl,
            time: item.eventDate ? new Date(item.eventDate).toLocaleTimeString('ar-AR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : "وقت غير محدد",
            location: item.location || "موقع غير محدد",
            category: item.category,
            featured: item.featured || false
          };
        });

        setNewsItems(processedNews);
      } else {
        setError("فشل في تحميل الأخبار");
      }
    } catch (err) {
      setError("حدث خطأ أثناء تحميل الأخبار");
      console.error("Error fetching news:", err);
    }
  };

  const fetchActivities = async () => {
    try {
      // جلب الأنشطة من API
      const response = await fetch('http://localhost:5000/api/activities');
      const data = await response.json();

      if (data.success) {
        // معالجة بيانات الأنشطة
        const processedActivities = data.data.map(activity => ({
          date: new Date(activity.date).toLocaleDateString('ar-AR', { 
            day: 'numeric', 
            month: 'long' 
          }),
          title: activity.name,
          time: activity.date ? new Date(activity.date).toLocaleTimeString('ar-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : "وقت غير محدد",
          location: activity.location
        }));

        setUpcomingEvents(processedActivities);
      } else {
        console.error("فشل في تحميل الأنشطة");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            الأخبار والفعاليات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث الفعاليات والأخبار في مجتمعنا الأكاديمي
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الأخبار...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                            onError={(e) => {
                              // إذا فشل تحميل الصورة، استخدم الصورة الافتراضية
                              // e.target.src = defaultImages[index % defaultImages.length];
                            }}
                          />
                          {item.featured && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              مميز
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3 flex-row-reverse space-x-reverse">
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
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-right">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-right">
                            {item.description}
                          </p>
                          <div className="mt-auto">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 px-0"
                            >
                              اقرأ المزيد
                              <ArrowRight className="h-4 w-4 ml-0 mr-2 group-hover:-translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-600" />
                  الفعاليات القادمة
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 4).map((event, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100 text-right"
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
                
                {/* <div className="mt-8 p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-300" />
                    أكاديمية الصيف
                  </h4>
                  <p className="text-sm text-blue-100 leading-relaxed mb-4">
                    نظرات عميقة ومقدمات أساسية: في أكاديمية الصيف في أينشتاين 28، ترون تطور العلوم الإنسانية
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-white text-blue-700 hover:bg-gray-100 w-full mt-2"
                  >
                    سجل الآن
                  </Button>
                </div> */}

                {/* Newsletter Subscription */}
                {/* <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    اشترك في النشرة الإخبارية
                  </h4>
                  <div className="flex flex-col space-y-3">
                    <input 
                      type="email" 
                      placeholder="بريدك الإلكتروني" 
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      اشتراك
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
        
        {/* Call to Action */}
        {/* <div className="mt-16 text-center text-right">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            شاهد جميع الفعاليات
            <ArrowRight className="h-5 w-5 ml-0 mr-2 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </div>
    </div>
  );
};