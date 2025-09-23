import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Phone, Mail, Users, Heart, ArrowLeft, Star, CheckCircle } from "lucide-react";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';
export const CourseDetails = () => {
  const { courseId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleclick=()=>{
    navigate("/course-registration")
  }
  const handleTeacherClick = (teacherId) => {
    navigate(`/teacher/${teacherId}`);
  };
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('فشل في جلب بيانات الدورة');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setCourseData(data.data);
        } else {
          throw new Error(data.message || 'حدث خطأ ما');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <Header />
        <GoogleTranslate />
        <div className="container mx-auto px-4 py-8">
          {/* <Skeleton className="h-12 w-40 mb-6" /> */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                {/* <Skeleton className="h-8 w-1/3 mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-2/3" /> */}
              </div>
              {/* <div className="bg-white rounded-xl shadow-sm border">
                <Skeleton className="h-12 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              </div> */}
            </div>
            <div className="space-y-6">
              {/* <Card className="border-primary/20 shadow-lg"> */}
                {/* <CardHeader className="bg-primary/5 pb-4">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-5 pt-4">
                  <Skeleton className="h-10 w-1/2 mx-auto" />
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </CardContent> */}
              {/* </Card> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <Header />
        <GoogleTranslate />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button asChild>
                <Link to="/">العودة إلى الدورات</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <Header />
        <GoogleTranslate />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">لم يتم العثور على الدورة</h2>
              <p className="text-gray-600 mb-6">الدورة المطلوبة غير موجودة أو تم حذفها</p>
              <Button asChild>
                <Link to="/">العودة إلى الدورات</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // تحديد حالة الدورة بناءً على عدد المسجلين
  const getStatusBadge = () => {
    if (courseData.enrolled >= courseData.seats) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">مكتمل</Badge>;
    } else if (courseData.enrolled >= courseData.seats * 0.8) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">أماكن محدودة</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">متاح</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <Header />
      <GoogleTranslate />
      
     
      <div className="bg-white border-b py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            {/* <span>/</span>
            <Link to="/youth-education" className="hover:text-primary transition-colors">الشباب والتعليم</Link>
            <span>/</span> */}
            {/* <Link to="/school-certificates" className="hover:text-primary transition-colors">استكمال الشهادات المدرسية</Link> */}
            <span>/</span>
            <span className="text-foreground font-medium">تفاصيل الدورة</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى النظرة العامة
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary" className="ml-2">{courseData.type}</Badge>
                    {getStatusBadge()}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {courseData.title}
                  </h1>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center ml-4">
                      <Users className="h-4 w-4 ml-1" />
                      <span>{courseData.enrolled} مسجل من {courseData.seats} مقعد</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="h-10 w-10"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="description" className="bg-white rounded-xl shadow-sm border">
              <TabsList className="w-full justify-start rounded-b-none h-12 px-6 border-b">
                <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                  الوصف
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                  التفاصيل والمواعيد
                </TabsTrigger>
                <TabsTrigger value="instructor" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                  المدرب/ة
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">وصف الدورة</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {courseData.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">تفاصيل الدورة</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {courseData.details}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">معلومات الموعد</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">التاريخ</p>
                          <p className="text-gray-600">{courseData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">الوقت</p>
                          <p className="text-gray-600">{courseData.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">المدة</p>
                          <p className="text-gray-600">{courseData.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">المكان</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">مكان الفعالية</p>
                          <p className="text-gray-600">{courseData.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="p-6">
  {courseData.teacher ? (
    <div 
      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
      onClick={() => handleTeacherClick(courseData.teacher._id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
        <User className="h-8 w-8 text-gray-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {courseData.teacher.name}
        </h3>
        <p className="text-gray-600 mt-2 line-clamp-2">
          {courseData.teacher.bio}
        </p>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
          <span className="font-medium text-gray-700">{courseData.teacher.rating}</span>
          <span className="mx-2">•</span>
          <span>{courseData.teacher.experience} سنوات خبرة</span>
        </div>
        
 
        <div className="mt-3">
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleTeacherClick(courseData.teacher._id);
            }}
          >
            عرض الملف الشخصي الكامل
            <ArrowLeft className="h-3 w-3 mr-1 transform rotate-180" />
          </button>
        </div>
      </div>
      
    
      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
      </div>
    </div>
  ) : (
    <p className="text-gray-500">لا تتوفر معلومات عن المدرب</p>
  )}
</TabsContent>
            </Tabs>
          </div>

     
          <div className="space-y-6">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-center text-primary text-xl">
                  حجز الدورة
                </CardTitle>
                <CardDescription className="text-center">
                  رقم الدورة: {courseData.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {courseData.price}
                  </div>
                  {getStatusBadge()}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="ml-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">الموعد</div>
                      <div className="text-sm">{courseData.date}</div>
                      <div className="text-xs text-muted-foreground">{courseData.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="ml-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">المكان</div>
                      <div className="text-sm">{courseData.location}</div>
                    </div>
                  </div>

                  {courseData.teacher && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <User className="ml-3 h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">المدرب/ة</div>
                        <div className="text-sm text-primary">
                          {courseData.teacher.name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-3">
                    <div>{courseData.enrolled} مسجل من {courseData.seats} مقعد</div>
                  </div>
                </div>

                <Button
                  className="w-full" 
                  size="lg"
                  disabled={courseData.enrolled >= courseData.seats}
                  onClick={()=>handleclick()}
                >

                  {courseData.enrolled >= courseData.seats ? 'مكتمل' : 'سجل الآن'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};