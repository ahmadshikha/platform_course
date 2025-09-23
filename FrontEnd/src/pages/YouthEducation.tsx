import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Star, Search, Heart, Share, BookOpen, Filter } from "lucide-react";
import { Header } from "@/components/Header";
import jungeVhsImage from "@/assets/junge-vhs.jpg";
import { useNavigate } from 'react-router-dom';

interface Course {
  _id: string;
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: string;
  price: string;
  seats: number;
  enrolled: number;
  rating: number;
  reviews: number;
  description: string;
  details: string;
  teacher: {
    _id: string;
    name: string;
    nameEn?: string;
    title?: string;
  };
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  data: Course[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }
}

export default function CategoryCoursesPage() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
    // navigate(`/course-details?id=${courseId}`);
  };
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId)

  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!categoryId) {
          setError("معرف الفئة غير متوفر");
          setLoading(false);
          return;
        }
        
        const categoryResponse = await fetch(`http://localhost:5000/api/courses/category/${categoryId}`);
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategory(categoryData);
          console.log("Category Data:", categoryData);
        } else {
          console.error("Failed to fetch category");
          setError("فشل في جلب بيانات الفئة");
        }
        
        const queryParams = new URLSearchParams({
          page: pagination.currentPage.toString(),
          limit: pagination.itemsPerPage.toString(),
          ...(statusFilter !== 'all' && { status: statusFilter })
        });
        
        const coursesResponse = await fetch(`http://localhost:5000/api/courses/category/${categoryId}?${queryParams}`);
        
        if (!coursesResponse.ok) {
          throw new Error(`HTTP error! status: ${coursesResponse.status}`);
        }
        
        const responseData: ApiResponse = await coursesResponse.json();
        
        if (responseData.success) {
          setCourses(responseData.data);
          setPagination(responseData.pagination);
        } else {
          setError("فشل في جلب بيانات الكورسات");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("حدث خطأ أثناء جلب البيانات: " + (error instanceof Error ? error.message : "خطأ غير معروف"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, pagination.currentPage, statusFilter]);

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "free" && (course.price === "0" || course.price === "مجاني")) ||
                        (priceRange === "low" && parseInt(course.price) < 300000) ||
                        (priceRange === "medium" && parseInt(course.price) >= 300000 && parseInt(course.price) < 500000) ||
                        (priceRange === "high" && parseInt(course.price) >= 500000);
    
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-lg text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
          </div>
        </div>
      </div>
    );
  }

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
              {pagination.totalItems} دورة تدريبية
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category?.name || "فئة الكورسات"}
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              {category?.description || "اكتشف مجموعة متنوعة من الكورسات في هذه الفئة."}
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
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نطاق السعر</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نطاق السعر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأسعار</SelectItem>
                    <SelectItem value="free">مجاني</SelectItem>
                    <SelectItem value="low">أقل من 300000</SelectItem>
                    <SelectItem value="medium">300000 - 500000</SelectItem>
                    <SelectItem value="high">أكثر من 500000  ل. س.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>حالة الكورس</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="available">متاح</SelectItem>
                    <SelectItem value="full">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories Navigation */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-primary flex items-center">
                  <BookOpen className="ml-2 h-5 w-5" />
                  الفئات
                </h3>
                <div className="space-y-2">
                  <div 
                    className={`flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer transition-colors bg-primary text-primary-foreground`}
                  >
                    <span className="text-sm">{category?.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {pagination.totalItems}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="all">جميع الدورات</TabsTrigger>

              </TabsList>
            </Tabs>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {activeTab === "all" && `جميع دورات `}
                {activeTab === "available" && `الدورات المتاحة في ${category?.name}`}
                {activeTab === "popular" && `الدورات الأكثر شيوعاً في ${category?.name}`}
              </h2>
              <p className="text-muted-foreground">
                اكتشف مجموعة متنوعة من الكورسات المتاحة في هذه الفئة.
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لم يتم العثور على دورات</h3>
                  <p className="text-muted-foreground">
                    {courses.length === 0 
                      ? "لا توجد دورات في هذه الفئة حالياً." 
                      : "لا توجد دورات تطابق معايير البحث الخاصة بك. حاول تعديل الفلاتر أو البحث بكلمات أخرى."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-6 mb-8">
                  {filteredCourses.map((course) => (
                    <Card key={course._id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="text-xs">
                                {course.type}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                رقم الدورة: {course.id}
                              </Badge>
                              <Badge variant={
                                course.status === 'available' ? 'default' : 
                                course.status === 'full' ? 'destructive' : 
                                course.status === 'cancelled' ? 'outline' : 'secondary'
                              } className="text-xs">
                                {course.status === 'available' ? 'متاح' : 
                                course.status === 'full' ? 'مكتمل' : 
                                course.status === 'cancelled' ? 'ملغي' : 'مكتمل'}
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
                                <span>{course.enrolled} من {course.seats} مقعد متاح</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">المحاضر:</span>
                              <span className="text-primary">{course.teacher.name}</span>
                              {course.teacher.title && (
                                <span className="text-muted-foreground">({course.teacher.title})</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center md:items-end gap-3">
                            <div className="text-2xl font-bold text-primary">
                              {course.price}€
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => toggleFavorite(course._id)}
                                className={`rounded-full ${
                                  favorites.includes(course._id) 
                                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                              >
                                <Heart className={`h-5 w-5 ${favorites.includes(course._id) ? 'fill-current' : ''}`} />
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <Share className="h-5 w-5" />
                              </Button>
                            </div>
                            
                            <Button 
                              size="lg"
                              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 w-full"
                              disabled={course.status !== 'available'}
                            >
                              {course.status === 'available' ? 'سجل الآن' : 
                              course.status === 'full' ? 'مكتمل' : 
                              course.status === 'cancelled' ? 'ملغي' : 'مكتمل'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full"
                              onClick={() => handleCourseClick(course._id)} 

                            >
                              تفاصيل أكثر
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      السابق
                    </Button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={pagination.currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      التالي
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}