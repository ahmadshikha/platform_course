import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Heart, 
  Plus, 
  Mail, 
  Phone, 
  BookOpen, 
  Award, 
  GraduationCap,
  Briefcase,
  Languages,
  Share2,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const TeacherDetails = () => {
  const { t, i18n } = useTranslation();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Courses");

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Sample teacher data
  const teacher = {
    name: "د. محمد أحمد",
    nameEn: "Dr. Mohammad Ahmad",
    title: "أستاذ في علوم الحاسوب",
    titleEn: "Professor in Computer Science",
    image: "/placeholder.svg",
    bio: "خبير في مجال الذكاء الاصطناعي والتعلم الآلي مع أكثر من 15 سنة من الخبرة في التدريس والبحث. حاصل على درجة الدكتوراه من جامعة دمشق وعلى العديد من الشهادات الدولية في مجال التربية والتعليم.",
    bioEn: "Expert in artificial intelligence and machine learning with over 15 years of experience in teaching and research. Holds a PhD from Damascus University and several international certifications in education.",
    location: "دمشق",
    locationEn: "Damascus",
    rating: 4.8,
    review: 42,
    students: 350,
    course: 12,
    experience: "15 سنة",
    specialties: ["الذكاء الاصطناعي", "التعلم الآلي", "برمجة Python", "تحليل البيانات"],
    specialtiesEn: ["Artificial Intelligence", "Machine Learning", "Python Programming", "Data Analysis"],
    education: [
      {
        degree: "دكتوراه في علوم الحاسوب",
        degreeEn: "PhD in Computer Science",
        institution: "جامعة دمشق",
        year: "2010"
      },
      {
        degree: "ماجستير في الذكاء الاصطناعي",
        degreeEn: "Masters in Artificial Intelligence",
        institution: "جامعة القاهرة",
        year: "2006"
      }
    ],
    contact: {
      email: "m.ahmed@university.edu",
      phone: "+963 11 123 4567"
    },
    social: {
      linkedin: "/m-ahmed",
      twitter: "@dr_m_ahmed"
    },
    Courses: [
      {
        id: "V731050",
        title: "مقدمة في الذكاء الاصطناعي للمبتدئين",
        titleEn: "Introduction to Artificial Intelligence for Beginners",
        type: "مستوى مبتدئ",
        typeEn: "Beginner Level",
        date: "02.09.2025",
        time: "10:00 - 14:00",
        duration: "4 أسابيع",
        location: "مدرسة المدينة",
        locationEn: "City School",
        status: "available",
        price: "€65",
        seats: 25,
        enrolled: 22,
        rating: 4.5,
        reviews: 31,
        description: "دورة تمهيدية تغطي الأساسيات والمفاهيم الأولية للذكاء الاصطناعي",
        descriptionEn: "Introductory course covering the basics and initial concepts of artificial intelligence"
      },
      {
        id: "V731051",
        title: "التعلم الآلي وتطبيقاته العملية",
        titleEn: "Machine Learning and its Practical Applications",
        type: "مستوى متقدم",
        typeEn: "Advanced Level",
        date: "16.09.2025",
        time: "14:00 - 18:00",
        duration: "6 أسابيع",
        location: "مدرسة المدينة",
        locationEn: "City School",
        status: "available",
        price: "€85",
        seats: 15,
        enrolled: 10,
        rating: 4.9,
        reviews: 18,
        description: "دورة متقدمة تركز على الخوارزميات والتطبيقات العملية للتعلم الآلي",
        descriptionEn: "Advanced course focusing on algorithms and practical applications of machine learning"
      },
      {
        id: "V731052",
        title: "شهادة احترافية في الذكاء الاصطناعي",
        titleEn: "Professional Certificate in Artificial Intelligence",
        type: "برنامج متكامل",
        typeEn: "Comprehensive Program",
        date: "23.09.2025",
        time: "16:00 - 20:00",
        duration: "8 أسابيع",
        location: "مدرسة المدينة",
        locationEn: "City School",
        status: "available",
        price: "€120",
        seats: 20,
        enrolled: 15,
        rating: 4.7,
        reviews: 23,
        description: "برنامج intensif يغطي جميع جوانب الذكاء الاصطناعي مع مشروع تخرج",
        descriptionEn: "Intensive program covering all aspects of AI with a graduation project"
      }
    ],
    reviews: [
      {
        id: 1,
        student: "سارة محمد",
        rating: 5,
        date: "15 أغسطس 2023",
        comment: "أستاذ رائع وشرحه واضح جداً. ساعدني في فهم مفاهيم كانت صعبة بالنسبة لي.",
        commentEn: "Excellent teacher with very clear explanations. Helped me understand concepts that were difficult for me.",
        course: "مقدمة في الذكاء الاصطناعي"
      },
      {
        id: 2,
        student: "أحمد خالد",
        rating: 4.5,
        date: "22 يوليو 2023",
        comment: "المحتوى كان غنياً والتمارين عملية جداً. أنصح بهذا المحاضر بشدة.",
        commentEn: "The content was rich and the exercises were very practical. I highly recommend this instructor.",
        course: "التعلم الآلي وتطبيقاته"
      },
      {
        id: 3,
        student: "فاطمة علي",
        rating: 4,
        date: "10 سبتمبر 2023",
        comment: "المحاضر متمكن ولكن كان يحتاج إلى مزيد من الأمثلة العملية.",
        commentEn: "The instructor is knowledgeable but needed more practical examples.",
        course: "شهادة احترافية في الذكاء الاصطناعي"
      },
      {
        id: 4,
        student: "يوسف أحمد",
        rating: 4.7,
        date: "05 أكتوبر 2023",
        comment: "تجربة رائعة، استفدت كثيراً من المشروع النهائي.",
        commentEn: "Great experience, I benefited a lot from the final project.",
        course: "شهادة احترافية في الذكاء الاصطناعي"
      },
      {
        id: 5,
        student: "ليلى مصطفى",
        rating: 4.3,
        date: "18 نوفمبر 2023",
        comment: "كانت الدورة جيدة ولكن الإيقاع سريع بعض الشيء للمبتدئين.",
        commentEn: "The course was good but the pace was a bit fast for beginners.",
        course: "مقدمة في الذكاء الاصطناعي"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <CategoryNavigation />
      
      <div className="container mx-auto px-4 py-8" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Google Translate Widget */}
        <div className="flex justify-end mb-4">
          <GoogleTranslate />
        </div>
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">{t('home', 'الرئيسية')}</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">{t('instructors', 'المحاضرين')}</a>
          <span>/</span>
          <span className="text-foreground">{t('instructorDetails', 'تفاصيل المحاضر')}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Teacher Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage src={teacher.image} alt={teacher.name} />
                    <AvatarFallback className="text-3xl bg-primary text-primary-foreground">د.م</AvatarFallback>
                  </Avatar>
                  {/* <Badge className="absolute bottom-2 right-2 bg-green-500">
                    <div className="w-2 h-2 rounded-full bg-white mr-1"></div>
                    متصل
                  </Badge> */}
                </div>
                <CardTitle className="text-xl">{teacher.name}</CardTitle>
                <CardTitle className="text-lg font-normal text-muted-foreground">{teacher.nameEn}</CardTitle>
                <p className="text-muted-foreground">{teacher.title}</p>
                <p className="text-sm text-muted-foreground">{teacher.titleEn}</p>
                
                {/* <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="mx-1 font-semibold">{teacher.rating}</span>
                  <span className="text-muted-foreground">({teacher.reviews} {t('reviews', 'تقييم')})</span>
                </div> */}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>{teacher.location} | {teacher.locationEn}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center py-3 border-y">
                  <div>
                    {/* <div className="font-bold text-lg">{teacher.Courses}</div> */}
                    <div className="text-xs text-muted-foreground">{t('Courses', 'دورات')}</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{teacher.students}</div>
                    <div className="text-xs text-muted-foreground">{t('students', 'طالب')}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <Award className="w-4 h-4 ml-2" />
                    {t('specialties', 'التخصصات')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full mb-2">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    {t('contactTeacher', 'تواصل مع المحاضر')}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 ml-2" />
                    {t('shareProfile', 'مشاركة الملف')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="Courses" className="flex items-center">
                  <BookOpen className="w-4 h-4 ml-2" />
                  {t('Courses', 'الدورات')}
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center">
                  <User className="w-4 h-4 ml-2" />
                  {t('about', 'عن المحاضر')}
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center">
                  <Star className="w-4 h-4 ml-2" />
                  {t('reviews', 'التقييمات')}
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center">
                  <Phone className="w-4 h-4 ml-2" />
                  {t('contact', 'التواصل')}
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="Courses">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{t('instructorCourses', 'دورات المحاضر')}</h2>
                  <Badge variant="secondary">{teacher.Courses.length} {t('Courses', 'دورات')}</Badge>
                </div>

                <div className="space-y-6">
                  {teacher.Courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-2/3 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {course.id}
                                  </Badge>
                                  <Badge 
                                    variant={course.status === 'available' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {course.status === 'available' ? '✓ متاح' : 'مكتمل'}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-lg mb-1">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {course.titleEn}
                                </p>
                                <p className="text-sm text-primary font-medium mb-3">
                                  {course.type} | {course.typeEn}
                                </p>
                              </div>
                              <div className="text-left">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {course.price}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {t('perCourse', 'لكل دورة')}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 ml-2" />
                                <span>{course.date}</span>
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
                                <span>{course.enrolled}/{course.seats} {t('students', 'طالب')}</span>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <div className="flex items-center mr-4">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="mx-1 font-medium">{course.rating}</span>
                                <span className="text-muted-foreground">({course.reviews})</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{course.duration}</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => toggleFavorite(course.id)}
                                  className={favorites.includes(course.id) ? 'text-red-500 border-red-200' : ''}
                                >
                                  <Heart className={`w-4 h-4 ml-1 ${favorites.includes(course.id) ? 'fill-current' : ''}`} />
                                  {t('save', 'حفظ')}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 ml-1" />
                                  {t('details', 'تفاصيل')}
                                </Button>
                              </div>
                              <Button>
                                {t('register', 'تسجيل')}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground flex flex-col justify-center">
                            <h4 className="font-semibold mb-2">{t('courseIncludes', 'تشمل الدورة')}:</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                {t('videoLessons', 'دروس فيديو')}
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                {t('practiceExercises', 'تمارين عملية')}
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                {t('certificate', 'شهادة إتمام')}
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                                {t('qnaSupport', 'دعم الأسئلة والأجوبة')}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('aboutInstructor', 'عن المحاضر')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('biography', 'السيرة الذاتية')}</h3>
                      <p className="text-muted-foreground mb-3">{teacher.bio}</p>
                      <p className="text-muted-foreground">{teacher.bioEn}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <GraduationCap className="w-5 h-5 ml-2" />
                        {t('education', 'التعليم')}
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
                              <p className="text-sm text-muted-foreground">{edu.degreeEn}</p>
                              <p className="text-sm">{edu.institution} • {edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 ml-2" />
                        {t('experience', 'الخبرة')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">{teacher.experience}</div>
                          <div className="text-sm text-muted-foreground">{t('teachingExperience', 'خبرة في التدريس')}</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">5+</div>
                          <div className="text-sm text-muted-foreground">{t('internationalCertifications', 'شهادات دولية')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Languages className="w-5 h-5 ml-2" />
                        {t('languages', 'اللغات')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm py-1">العربية (اللغة الأم)</Badge>
                        <Badge variant="secondary" className="text-sm py-1">الإنجليزية (متقدم)</Badge>
                        <Badge variant="secondary" className="text-sm py-1">الفرنسية (متوسط)</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    {/* <CardTitle className="flex items-center">
                      {t('studentReviews', 'تقييمات الطلاب')}
                      <Badge variant="outline" className="mr-2">
                        {teacher.reviews} {t('reviews', 'تقييم')}
                      </Badge>
                    </CardTitle> */}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="md:w-1/3 text-center">
                        <div className="text-5xl font-bold text-primary">{teacher.rating}</div>
                        <div className="flex justify-center my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${star <= Math.floor(teacher.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        {/* <div className="text-sm text-muted-foreground">
                          {teacher.reviews} {t('ratings', 'تقييم')}
                        </div> */}
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                              <div className="w-12 text-sm">{rating} {t('stars', 'نجوم')}</div>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                <div 
                                  className="h-2 bg-yellow-400 rounded-full" 
                                  style={{ width: `${(rating / 5) * 100}%` }}
                                ></div>
                              </div>
                              <div className="w-12 text-sm text-right">{(rating / 5) * 100}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {teacher.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{review.student}</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">{review.date}</div>
                          <p className="mb-2">{review.comment}</p>
                          <p className="text-sm text-muted-foreground">{review.commentEn}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contactInstructor', 'تواصل مع المحاضر')}</CardTitle>
                    <CardDescription>
                      {t('contactDescription', 'يمكنك التواصل مع المحاطر مباشرة عبر البريد الإلكتروني أو الهاتف')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">{t('contactInfo', 'معلومات التواصل')}</h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Mail className="w-5 h-5 ml-2 text-primary" />
                              <div>
                                <div className="font-medium">{t('email', 'البريد الإلكتروني')}</div>
                                <a href={`mailto:${teacher.contact.email}`} className="text-primary hover:underline">
                                  {teacher.contact.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-5 h-5 ml-2 text-primary" />
                              <div>
                                <div className="font-medium">{t('phone', 'الهاتف')}</div>
                                <a href={`tel:${teacher.contact.phone}`} className="text-primary hover:underline">
                                  {teacher.contact.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">{t('responseTime', 'وقت الاستجابة')}</h3>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="font-medium text-blue-800">⏱️ {t('usuallyResponds', 'عادةً ما يتم الرد خلال')} 2-4 ساعات</div>
                            <div className="text-sm text-blue-600 mt-1">
                              {t('responseTimeDescription', 'المحاضر يرد على الرسائل خلال ساعات العمل من الإثنين إلى الجمعة')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t('sendMessage', 'إرسال رسالة')}</h3>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t('yourName', 'اسمك')}</Label>
                            <Input id="name" placeholder={t('enterYourName', 'أدخل اسمك')} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">{t('yourEmail', 'بريدك الإلكتروني')}</Label>
                            <Input id="email" type="email" placeholder={t('enterYourEmail', 'أدخل بريدك الإلكتروني')} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">{t('message', 'الرسالة')}</Label>
                            <Textarea 
                              id="message" 
                              placeholder={t('writeYourMessage', 'اكتب رسالتك هنا...')} 
                              rows={5}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            {t('sendMessage', 'إرسال الرسالة')}
                          </Button>
                        </form>
                      </div>
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