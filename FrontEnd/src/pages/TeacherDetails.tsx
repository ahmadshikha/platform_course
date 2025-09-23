import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  MessageCircle,
  Share2,
  BookOpen,
  User,
  Phone,
  MapPin,
  Award,
  Calendar,
  Clock,
  Users,
  Heart,
  Plus,
  GraduationCap,
  Briefcase,
  Languages,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface Course {
  _id: string;
  id: string;
  title: string;
  price: string;
  status: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  enrolled: number;
  seats: number;
  maxParticipants: number;
  description: string;
  details: string;
  categoryId: {
    _id: string;
    name: string;
  } | null;
  rating: number;
  reviews: number;
}

interface TeacherData {
  _id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  rating: number;
  review: number;
  students: number;
  course: number;
  specialties: string[];
  education: Education[];
  contact: Contact;
}

interface CoursesResponse {
  success: boolean;
  data: Course[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const TeacherDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<TeacherData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [favorites, setFavorites] = useState<string[]>([]);

  const defaultImages = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ];

  const extractFilename = (fullPath: string | null | undefined): string | null => {
    if (!fullPath) return null;
    
    const parts = fullPath.split(/[\\/]/);
    

    return parts[parts.length - 1];
  };

 
  const getImageUrl = (imagePath: string | null | undefined, index: number = 0): string => {
    if (!imagePath) return defaultImages[index % defaultImages.length];
    
 
    const imageFilename = extractFilename(imagePath);
    
   
    return imageFilename 
      ? `http://localhost:5000/uploads/${imageFilename}`
      : defaultImages[index % defaultImages.length];
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/teachers/${id}`);
        
        if (!response.ok) {
          throw new Error('فشل في تحميل بيانات المحاضر');
        }
        
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'courses' && id) {
      fetchTeacherCourses(1);
    }
  }, [activeTab, id]);

  const fetchTeacherCourses = async (page: number) => {
    try {
      setCoursesLoading(true);
      setCoursesError(null);
      
      const response = await fetch(
        `http://localhost:5000/api/courses/teacher/${id}`
      );
      
      if (!response.ok) {
        throw new Error('فشل في تحميل دورات المحاضر');
      }
      
      const data: CoursesResponse = await response.json();
      
      if (data.success) {
        setCourses(data.data || []); 
        setPagination(data.pagination);
      } else {
        throw new Error('فشل في تحميل دورات المحاضر');
      }
    } catch (err) {
      setCoursesError(err.message || 'حدث خطأ أثناء تحميل الدورات');
      setCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  const toggleFavorite = (courseId: string) => {
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter(id => id !== courseId));
    } else {
      setFavorites([...favorites, courseId]);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
      case 'متوفر':
        return <Badge variant="default" className="text-xs">✓ متاح</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="text-xs">مكتمل</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات المحاضر...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-800">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            المحاولة مرة أخرى
          </Button>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-800">لم يتم العثور على المحاضر</p>
        </div>
      </div>
    );
  }


  const teacherImageUrl = getImageUrl(teacher.image, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <CategoryNavigation />
      
      <div className="container mx-auto px-4 py-8" dir="rtl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">الرئيسية</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">المحاضرين</a>
          <span>/</span>
          <span className="text-foreground">تفاصيل المحاضر</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Teacher Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage 
                      src={teacherImageUrl} 
                      alt={teacher.name}
                      onError={(e) => {
                       
                        e.currentTarget.src = defaultImages[0];
                      }}
                    />
                    <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{teacher.name}</CardTitle>
                <p className="text-muted-foreground">{teacher.title}</p>
                
                <div className="flex items-center justify-center mt-2">
                  {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
                  {/* <span className="mx-1 font-semibold">{teacher.rating}</span> */}
                  {/* <span className="text-muted-foreground">({teacher.review} تقييم)</span> */}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* <div className="grid grid-cols-2 gap-4 text-center py-3 border-y">
                  <div>
                    <div className="font-bold text-lg">{teacher.course}</div>
                    <div className="text-xs text-muted-foreground">دورات</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{teacher.students}</div>
                    <div className="text-xs text-muted-foreground">طالب</div>
                  </div>
                </div> */}
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Award className="w-4 h-4 ml-2" />
                    التخصصات
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* <div className="pt-4">
                  <Button className="w-full mb-2">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    تواصل مع المحاضر
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة الملف
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="courses" className="flex items-center">
                  <BookOpen className="w-4 h-4 ml-2" />
                  الدورات
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center">
                  <User className="w-4 h-4 ml-2" />
                  عن المحاضر
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center">
                  <Phone className="w-4 h-4 ml-2" />
                  التواصل
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">دورات المحاضر</h2>
                  {/* <Badge variant="secondary">{pagination.totalItems} دورات</Badge> */}
                </div>

                {coursesLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mr-2">جاري تحميل الدورات...</p>
                  </div>
                ) : coursesError ? (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center my-6">
                    <p className="text-red-600">{coursesError}</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => fetchTeacherCourses(1)}
                    >
                      المحاولة مرة أخرى
                    </Button>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center my-6">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">لا توجد دورات متاحة حالياً</h3>
                    <p className="text-gray-500 mt-1">هذا المحاضر ليس لديه أي دورات نشطة في الوقت الحالي.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {courses.map((course) => (
                        <Card key={course._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-2/3 p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {course.categoryId?.name || 'بدون تصنيف'}
                                      </Badge>
                                      {getStatusBadge(course.status)}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">
                                      {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                      {course.description}
                                    </p>
                                  </div>
                                  <div className="text-left">
                                    <div className="text-2xl font-bold text-primary mb-1">
                                      {course.price}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      لكل دورة
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 ml-2" />
                                    <span>{formatDate(course.date)}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 ml-2" />
                                    <span>{course.time}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 ml-2" />
                                    <span>{course.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="w-4 h-4 ml-2" />
                                    <span>{course.enrolled}/{course.seats} طالب</span>
                                  </div>
                                </div>

                                <div className="flex items-center mb-4">
                                  <div className="text-sm">
                                    <span className="font-medium">{course.duration}</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <div className="flex gap-2">
                                    {/* <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => toggleFavorite(course._id)}
                                      className={favorites.includes(course._id) ? 'text-red-500 border-red-200' : ''}
                                    >
                                      <Heart className={`w-4 h-4 ml-1 ${favorites.includes(course._id) ? 'fill-current' : ''}`} />
                                      حفظ
                                    </Button> */}
                                    <Button variant="outline" size="sm">
                                      <Plus className="w-4 h-4 ml-1" />
                                      تفاصيل
                                    </Button>
                                  </div>
                                  {/* <Button disabled={course.status !== 'available' && course.status !== 'متوفر'}>
                                    {course.status === 'available' || course.status === 'متوفر' ? 'تسجيل' : 'مكتمل'}
                                  </Button> */}
                                </div>
                              </div>
                              
                              <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground flex flex-col justify-center">
                                <h4 className="font-semibold mb-2">تشمل الدورة:</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                    دروس فيديو
                                  </li>
                                  <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                    تمارين عملية
                                  </li>
                                  <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                    شهادة إتمام
                                  </li>
                                  <li className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                    دعم الأسئلة والأجوبة
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center items-center mt-8 space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={pagination.currentPage === 1}
                          onClick={() => fetchTeacherCourses(pagination.currentPage - 1)}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={pagination.currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => fetchTeacherCourses(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={pagination.currentPage === pagination.totalPages}
                          onClick={() => fetchTeacherCourses(pagination.currentPage + 1)}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>عن المحاضر</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">السيرة الذاتية</h3>
                      <p className="text-muted-foreground mb-3">{teacher.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <GraduationCap className="w-5 h-5 ml-2" />
                        التعليم
                      </h3>
                      <div className="space-y-4">
                        {teacher.education.map((edu, index) => (
                          <div key={index} className="flex">
                            <div className="flex flex-col items-center mr-4">
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                              {index < teacher.education.length - 1 && (
                                <div className="w-0.5 h-16 bg-border mt-1"></div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-sm">{edu.institution} • {edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 ml-2" />
                        الخبرة
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">5+</div>
                          <div className="text-sm text-muted-foreground">سنوات خبرة في التدريس</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">5+</div>
                          <div className="text-sm text-muted-foreground">شهادات دولية</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Languages className="w-5 h-5 ml-2" />
                        اللغات
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm py-1">العربية (اللغة الأم)</Badge>
                        <Badge variant="secondary" className="text-sm py-1">الإنجليزية (متقدم)</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>تواصل مع المحاضر</CardTitle>
                    <CardDescription>
                      يمكنك التواصل مع المحاضر مباشرة عبر البريد الإلكتروني أو الهاتف
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">معلومات التواصل</h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Mail className="w-5 h-5 ml-2 text-primary" />
                              <div>
                                <div className="font-medium">البريد الإلكتروني</div>
                                <a href={`mailto:${teacher.contact.email}`} className="text-primary hover:underline">
                                  {teacher.contact.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-5 h-5 ml-2 text-primary" />
                              <div>
                                <div className="font-medium">الهاتف</div>
                                <a href={`tel:${teacher.contact.phone}`} className="text-primary hover:underline">
                                  {teacher.contact.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">وقت الاستجابة</h3>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="font-medium text-blue-800">⏱️ عادةً ما يتم الرد خلال 2-4 ساعات</div>
                            <div className="text-sm text-blue-600 mt-1">
                              المحاضر يرد على الرسائل خلال ساعات العمل من الإثنين إلى الجمعة
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* <div>
                        <h3 className="text-lg font-semibold mb-4">إرسال رسالة</h3>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">اسمك</Label>
                            <Input id="name" placeholder="أدخل اسمك" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">بريدك الإلكتروني</Label>
                            <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">الرسالة</Label>
                            <Textarea 
                              id="message" 
                              placeholder="اكتب رسالتك هنا..." 
                              rows={5}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            إرسال الرسالة
                          </Button>
                        </form>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDetails;