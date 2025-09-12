import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, Phone, Mail, Users, BookOpen, FileText, Euro, Share2, Printer, Heart, ArrowLeft, Download, Star, CheckCircle } from "lucide-react";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { useState } from "react";

export const CourseDetails = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // بيانات الدورة التدريبية باللغة العربية
  const courseData = {
    id: "U731063",
    title: "اختبار تحديد المستوى للمسار M/الشهادة المتوسطة/التأهيل",
    titleEn: "Placement Test M-Track/Middle School Certificate/Qualification",
    description: "اختبار تحديد المستوى هو شرط أساسي للتسجيل في الدورات السنوية للتحضير لشهادة الثانوية التأهيلية (Quali)، وللمسار M وكذلك للشهادة المتوسطة.",
    descriptionEn: "The placement test is a prerequisite for registration to the annual courses as preparation for the qualifying secondary school certificate (Quali), for the M-track as well as for the middle school certificate.",
    details: "يستغرق كل اختبار كتابي 30 دقيقة لكل مادة. بالنسبة للمسار M والشهادة المتوسطة، يتم اختبار مواد اللغة الألمانية والرياضيات واللغة الإنجليزية. بالنسبة لاختبار التأهيل، يشمل الاختبار مواد اللغة الألمانية والرياضيات.",
    detailsEn: "The written tests each last 30 minutes per subject. For the M-track and middle school certificate, the subjects German, Mathematics and English are tested. For the Quali, the test includes the subjects German and Mathematics.",
    results: "تساعد النتائج في تحديد مستوى الدورة المناسب. خلال أسبوع إلى أسبوعين بعد اختبار تحديد المستوى، تتم استشارة فردية مع معلم أو مرافق اجتماعي متطوع. ستحصل على موعد الاستشارة مباشرة في موعد الاختبار.",
    resultsEn: "The results help determine the appropriate course level. Within one to two weeks after the placement test, an individual consultation with a teacher or volunteer social worker takes place. You will receive the appointment for the consultation directly at the test appointment.",
    instructor: "يانا كوربرماير-مانجيرت",
    instructorBio: "معلمة ذات خبرة تزيد عن 15 عامًا في التحضير لامتحانات الشهادات المدرسية. متخصصة في اللغة الألمانية والرياضيات.",
    date: "الإثنين، 17.09.2025",
    time: "14:00 - 17:00",
    duration: "موعد واحد",
    location: "المركز الرئيسي MVHS، Landwehrstr. 32a",
    room: "الغرفة 301، الطابق الثالث",
    fee: "مجاني",
    feeEn: "free",
    participants: "لا تزال هناك أماكن متاحة",
    participantsEn: "Still places available",
    minParticipants: "تم الوصول إلى الحد الأدنى لعدد المشاركين",
    maxParticipants: "العدد الأقصى للمشاركين: 24",
    materials: "أقلام، قلم رصاص، مثلث هندسي وفرجار",
    materialsEn: "Pens, pencil, set square and compass",
    requirements: "المعارف المسبقة: المعرفة الأساسية باللغة الألمانية والرياضيات",
    requirementsEn: "Prerequisites: Basic knowledge of German and Mathematics",
    rating: 4.7,
    reviews: 23,
    contact: {
      phone: "(089) 48006-6969",
      email: "schulabschluesse@mvhs.de"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <Header />
      <GoogleTranslate />
      
      {/* مسار التنقل (Breadcrumb) */}
      <div className="bg-white border-b py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link to="/youth-education" className="hover:text-primary transition-colors">الشباب والتعليم</Link>
            <span>/</span>
            <Link to="/school-certificates" className="hover:text-primary transition-colors">استكمال الشهادات المدرسية</Link>
            <span>/</span>
            <span className="text-foreground font-medium">الدورات السنوية للشهادات المدرسية</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/school-certificates" className="flex items-center">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى النظرة العامة
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary" className="ml-2">اختبار</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {courseData.participants}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {courseData.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {courseData.titleEn}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center ml-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="font-medium text-gray-700">{courseData.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{courseData.reviews} تقييم</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-1" />
                      <span>{courseData.maxParticipants}</span>
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
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Share2 className="h-5 w-5" />
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
                <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                  التقييمات
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">وصف الدورة</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {courseData.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {courseData.descriptionEn}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">تفاصيل سير الاختبار</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {courseData.details}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {courseData.detailsEn}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">النتائج والاستشارة</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {courseData.results}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {courseData.resultsEn}
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
                    <h3 className="text-xl font-semibold mb-4">المكان والتجهيزات</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">مكان الفعالية</p>
                          <p className="text-gray-600">{courseData.location}</p>
                          <p className="text-gray-500 text-sm">{courseData.room}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">المواد المطلوبة</p>
                          <p className="text-gray-600">{courseData.materials}</p>
                          <p className="text-gray-500 text-sm">{courseData.materialsEn}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary ml-3 mt-0.5" />
                        <div>
                          <p className="font-medium">المتطلبات</p>
                          <p className="text-gray-600">{courseData.requirements}</p>
                          <p className="text-gray-500 text-sm">{courseData.requirementsEn}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{courseData.instructor}</h3>
                    <p className="text-gray-600 mt-2">{courseData.instructorBio}</p>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="font-medium text-gray-700">4.9</span>
                      <span className="mx-2">•</span>
                      <span>15 دورة</span>
                      <span className="mx-2">•</span>
                      <span>8 سنوات خبرة</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">لا توجد تقييمات حتى الآن.</p>
                  <Button className="mt-4">كتابة أول تقييم</Button>
                </div>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <Phone className="ml-2 h-5 w-5" />
                  مزيد من المعلومات والاتصال
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">طرق الاتصال</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="ml-3 h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${courseData.contact.phone}`} className="text-primary hover:underline">
                          {courseData.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${courseData.contact.email}`} className="text-primary hover:underline">
                          {courseData.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">المستندات</h4>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="ml-2 h-4 w-4" />
                      تحميل المعلومات (PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الشريط الجانبي */}
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
                    {courseData.fee}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {courseData.feeEn}
                  </div>
                  <Badge variant="secondary" className="text-sm py-1 px-3">
                    {courseData.participants}
                  </Badge>
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
                      <div className="text-xs text-muted-foreground">{courseData.room}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="ml-3 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">المدرب/ة</div>
                      <div className="text-sm text-primary">
                        {courseData.instructor}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-3">
                    <div>{courseData.minParticipants}</div>
                    <div>{courseData.maxParticipants}</div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <span className="ml-2">📝</span>
                  سجل الآن
                </Button>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Printer className="ml-1 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="ml-1 h-4 w-4" />
                    مشاركة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">دورات مشابهة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm">تحضير Quali للرياضيات</div>
                    <div className="text-xs text-muted-foreground">ابتداءً من 22.09.2025</div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm">المسار M للغة الألمانية</div>
                    <div className="text-xs text-muted-foreground">ابتداءً من 25.09.2025</div>
                  </div>
                  <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="font-medium text-sm">الشهادة المتوسطة للغة الإنجليزية</div>
                    <div className="text-xs text-muted-foreground">ابتداءً من 20.09.2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};