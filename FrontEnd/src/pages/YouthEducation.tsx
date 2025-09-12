// 




















import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Phone, Mail, Users, Star, Search, Filter, Heart, Share, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import jungeVhsImage from "@/assets/junge-vhs.jpg";

export default function YouthEducation() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const courses = [
    {
      id: "V731052",
      title: "دبلوم الثانوية العامة للمدارس الإعدادية (الصف العاشر)",
      date: "الثلاثاء 16.09.2025",
      time: "08:30",
      duration: "663 ساعة تدريبية",
      location: "إنينشتات",
      category: "مدرسة، دراسة، مهنة",
      spots: 16,
      spotsTotal: 20,
      price: "2890€",
      rating: 4.8,
      reviews: 42,
      level: "متقدم",
      instructor: "د. أحمد محمد",
      description: "برنامج مكثف للتحضير لامتحان الثانوية العامة مع منهج متكامل وتمارين عملية."
    },
    {
      id: "V731020",
      title: "دبلوم EMSA/Quali للمدرسة الإعدادية (الصف التاسع)",
      date: "الثلاثاء 16.09.2025",
      time: "08:30",
      duration: "133 ساعة تدريبية",
      location: "MVHS في HP8",
      category: "مدرسة، دراسة، مهنة",
      spots: 26,
      spotsTotal: 30,
      price: "1890€",
      rating: 4.6,
      reviews: 28,
      level: "متوسط",
      instructor: "أ. سارة الخالد",
      description: "تحضير شامل لامتحان Quali مع تركيز على المواد الأساسية والتمارين التطبيقية."
    },
    {
      id: "KT001",
      title: "أدوات KI في إدارة المشاريع",
      date: "السبت 30.08.2025",
      time: "09:00",
      duration: "2 ساعة تدريبية",
      location: "عبر الإنترنت",
      category: "تكنولوجيا رقمية",
      spots: 12,
      spotsTotal: 15,
      price: "89€",
      rating: 4.9,
      reviews: 35,
      level: "مبتدئ",
      instructor: "م. علي التكنولوجي",
      description: "تعلم كيفية استخدام أدوات الذكاء الاصطناعي في إدارة وتنظيم المشاريع بكفاءة."
    },
    {
      id: "PHOTO001",
      title: "التصوير الفوتوغرافي للمبتدئين",
      date: "الأربعاء 10.09.2025",
      time: "18:00",
      duration: "8 ساعات تدريبية",
      location: "مركز دمشق",
      category: "فن وإبداع",
      spots: 15,
      spotsTotal: 20,
      price: "120€",
      rating: 4.7,
      reviews: 53,
      level: "مبتدئ",
      instructor: "م. ياسمين المصورة",
      description: "دورة شاملة تغطي أساسيات التصوير الفوتوغرافي وتقنيات الإضاءة والتكوين."
    },
    {
      id: "MUSIC001", 
      title: "تعلم العزف على الجيتار",
      date: "الإثنين 08.09.2025",
      time: "17:30",
      duration: "12 ساعة تدريبية",
      location: "مركز دمشق",
      category: "موسيقى",
      spots: 8,
      spotsTotal: 12,
      price: "180€",
      rating: 4.8,
      reviews: 47,
      level: "مبتدئ",
      instructor: "أ. عمر الموسيقي",
      description: "من الصفر إلى الاحتراف: تعلم أساسيات العزف على الجيتار وتقنيات متقدمة."
    },
    {
      id: "COOK001",
      title: "فن الطبخ الشرقي",
      date: "الخميس 12.09.2025", 
      time: "16:00",
      duration: "6 ساعات تدريبية",
      location: "مركز دمشق",
      category: "ثقافة وطبخ",
      spots: 20,
      spotsTotal: 25,
      price: "95€",
      rating: 4.9,
      reviews: 62,
      level: "جميع المستويات",
      instructor: "الشيف منى",
      description: "اكتشف أسرار المطبخ الشرقي وتعلم تحضير أطباق تقليدية بطريقة عصرية."
    }
  ];

  const categories = [
    { id: "all", name: "جميع الفئات", count: 148 },
    { id: "school", name: "مدرسة، دراسة، مهنة", count: 76 },
    { id: "tech", name: "تكنولوجيا رقمية", count: 18 },
    { id: "discussion", name: "تفكير ومناقشة", count: 36 },
    { id: "art", name: "فن وإبداع", count: 29 },
    { id: "languages", name: "لغات وبلدان", count: 4 },
    { id: "external", name: "برامج خارجية", count: 3 },
    { id: "family", name: "برامج عائلية", count: 16 },
    { id: "holiday", name: "برامج عطلات", count: 26 },
    { id: "free", name: "دخول حر", count: 34 }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "free" && course.price === "مجاني") ||
                        (priceRange === "low" && parseInt(course.price) < 100) ||
                        (priceRange === "medium" && parseInt(course.price) >= 100 && parseInt(course.price) < 500) ||
                        (priceRange === "high" && parseInt(course.price) >= 500);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const popularCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);
  // const newCourses = [...courses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={jungeVhsImage}
            alt="Youth Education"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              148 دورة تدريبية
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              مركز دمشق للتعليم المستمر للشباب
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              امنح نفسك التعليم! سواء كنت بحاجة إلى دعم في التعلم للمدرسة أو تريد تجربة شيء جديد تماماً: مركز الشباب مصمم خصيصاً لك. اختبر ما يناسبك، واتبع شغفك وعمق معرفتك!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ابحث عن دورة، موضوع، أو محاضر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              الفلاتر
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>الفئة</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>نطاق السعر</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نطاق السعر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأسعار</SelectItem>
                    <SelectItem value="free">مجاني</SelectItem>
                    <SelectItem value="low">أقل من 100€</SelectItem>
                    <SelectItem value="medium">100€ - 500€</SelectItem>
                    <SelectItem value="high">أكثر من 500€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>المستوى</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="beginner" />
                    <Label htmlFor="beginner" className="text-sm">مبتدئ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="intermediate" />
                    <Label htmlFor="intermediate" className="text-sm">متوسط</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="advanced" />
                    <Label htmlFor="advanced" className="text-sm">متقدم</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Expert Consultation */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-primary flex items-center">
                  <GraduationCap className="ml-2 h-5 w-5" />
                  الاستشارة التخصصية
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="font-semibold">رافائيل فيجاند</p>
                    <p className="text-sm text-muted-foreground">مستشار التعليم الشبابي</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span dir="ltr">(089) 48006-6761</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-primary hover:underline">Raphael.Wiegand@mvhs.de</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium mb-1">أسئلة الحجز:</p>
                    <p className="text-sm" dir="ltr">(089) 48006-0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-primary flex items-center">
                  <BookOpen className="ml-2 h-5 w-5" />
                  الفئات
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div 
                      key={category.id} 
                      className={`flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge 
                        variant={selectedCategory === category.id ? "secondary" : "outline"} 
                        className="text-xs"
                      >
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Courses */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-primary flex items-center">
                  <TrendingUp className="ml-2 h-5 w-5" />
                  الدورات الأكثر شيوعاً
                </h3>
                <div className="space-y-4">
                  {popularCourses.map((course) => (
                    <div key={course.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{course.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="all">جميع الدورات</TabsTrigger>
                <TabsTrigger value="popular">الأكثر شيوعاً</TabsTrigger>
                <TabsTrigger value="new">الجديد</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {activeTab === "all" && "جميع الدورات"}
                {activeTab === "popular" && "الدورات الأكثر شيوعاً"}
                {activeTab === "new" && "الدورات الجديدة"}
              </h2>
              <p className="text-muted-foreground">
                يتوجه برنامج مركز الشباب بشكل أساسي إلى الشباب والشباب البالغين الذين تتراوح أعمارهم بين 14 عاماً وحتى دخول الحياة المهنية، ما لم يُذكر خلاف ذلك.
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لم يتم العثور على دورات</h3>
                  <p className="text-muted-foreground">
                    لا توجد دورات تطابق معايير البحث الخاصة بك. حاول تعديل الفلاتر أو البحث بكلمات أخرى.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              رقم الدورة: {course.id}
                            </Badge>
                            <Badge variant={course.level === "متقدم" ? "default" : "outline"} className="text-xs">
                              {course.level}
                            </Badge>
                            <div className="flex items-center gap-1 ml-auto">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-sm text-muted-foreground">({course.reviews})</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                            {course.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{course.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{course.time} - {course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{course.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{course.spots} من {course.spotsTotal} مقعد متاح</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">المحاضر:</span>
                            <span className="text-primary">{course.instructor}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-3">
                          <div className="text-2xl font-bold text-primary">
                            {course.price}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleFavorite(course.id)}
                              className={`rounded-full ${
                                favorites.includes(course.id) 
                                  ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                                  : 'text-muted-foreground hover:text-primary'
                              }`}
                            >
                              <Heart className={`h-5 w-5 ${favorites.includes(course.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Share className="h-5 w-5" />
                            </Button>
                          </div>
                          
                          <Button 
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 w-full"
                          >
                            سجل الآن
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full"
                          >
                            تفاصيل أكثر
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-12"
                >
                  تحميل المزيد من الدورات
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}