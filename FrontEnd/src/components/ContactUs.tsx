import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GoogleTranslate } from "@/components/GoogleTranslate";

export const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت ممكن.');
        reset();
      } else {
        throw new Error(result.message || 'حدث خطأ أثناء الإرسال');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
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
            <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-foreground font-medium">اتصل بنا</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">اتصل بنا</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك والإجابة على استفساراتك. لا تتردد في التواصل معنا عبر النموذج أدناه أو عبر معلومات الاتصال المباشرة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* معلومات الاتصال */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-primary">معلومات التواصل</CardTitle>
                <CardDescription>يمكنك التواصل معنا عبر الوسائل التالية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold">العنوان</h3>
                    <p className="text-gray-600">دمشق ساحة المحافظة </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold">الهاتف</h3>
                    <p className="text-gray-600">+999999999</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@academy.edu.sa</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold">ساعات العمل</h3>
                    <p className="text-gray-600">الأحد - الخميس: 8 ص - 5 م</p>
                    <p className="text-gray-600">الجمعة والسبت: مغلق</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-primary">الرد السريع</CardTitle>
                <CardDescription>نسعى للرد على جميع الاستفسارات خلال 24 ساعة</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                    <span className="text-green-800 font-medium">متاح للرد على الاستفسارات</span>
                  </div>
                  <p className="text-green-700 text-sm mt-2">فريق الدعم متاح حالياً للرد على استفساراتك</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-primary">أرسل رسالة</CardTitle>
                <CardDescription>املأ النموذج وسنكون سعداء بالرد عليك</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${submitStatus === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 ml-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 ml-2" />
                      )}
                      <p>{submitMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        {...register("username", {
                          required: "الاسم مطلوب",
                          minLength: {
                            value: 2,
                            message: "يجب أن يكون الاسم على الأقل حرفين"
                          }
                        })}
                        className={errors.username ? "border-red-500 focus:ring-red-500" : ""}
                      />
                      {/* {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                      )} */}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        البريد الإلكتروني *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        {...register("email", {
                          required: "البريد الإلكتروني مطلوب",
                          pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "البريد الإلكتروني غير صالح"
                          }
                        })}
                        className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                      />
                      {/* {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )} */}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      الرسالة *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="اكتب رسالتك هنا..."
                      rows={5}
                      {...register("message", {
                        required: "الرسالة مطلوبة",
                        minLength: {
                          value: 10,
                          message: "يجب أن تكون الرسالة على الأقل 10 أحرف"
                        }
                      })}
                      className={errors.message ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {/* {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message.message}</p>
                    )} */}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="ml-2">جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="ml-2 h-5 w-5" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};