import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Phone, MapPin, BookOpen, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";


const CustomStepper = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" 
             style={{ right: `${(steps.length - currentStep) * (100 / steps.length)}%`, left: '0%' }}></div>
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
              currentStep > index 
                ? 'bg-primary border-primary text-white' 
                : currentStep === index
                ? 'border-primary bg-white text-primary'
                : 'border-gray-300 bg-white text-gray-400'
            }`}>
              {currentStep > index ? <CheckCircle className="h-5 w-5" /> : index + 1}
            </div>
            <div className={`mt-2 text-xs font-medium text-center ${
              currentStep >= index ? 'text-primary' : 'text-gray-500'
            }`}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    participantType: 'individual',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    nationality: '',
    streetAddress: '',
    city: '',
    country: '',
    phone: '',
    mobile: '',
    email: '',
    confirmEmail:'',
    courseNumber: '',
    participationReason: '',
    educationLevel: '',
    companyName: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    specialNeeds: '',
    additionalInfo: '',
    agreeTerms: false,
    agreeDataProcessing: false,
    receiveNewsletter: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/api/userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  

      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || `فشل في التسجيل: ${response.status}`);
      }
  
      setCurrentStep(5); 
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setLoading(false);
    }
  };
  const steps = [
    { id: 1, title: 'المعلومات الشخصية' },
    { id: 2, title: 'تفاصيل الدورة' },
    { id: 3, title: 'معلومات إضافية' },
    { id: 4, title: 'مراجعة وإرسال' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <CategoryNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
   
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              نموذج التسجيل في الدورة
            </h1>
            <p className="text-gray-600">
              يرجى إكمال جميع الخطوات لتسجيل في الدورة
            </p>
          </div>

       
          <CustomStepper currentStep={currentStep} steps={steps} />

          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl">
                  {steps.find(step => step.id === currentStep)?.title}
                </span>
                <Badge variant="outline" className="text-sm">
                  خطوة {currentStep} من 4
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {error && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {currentStep === 5 ? (
                // Success Step
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    تم التسجيل بنجاح!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    تم تقديم طلب التسجيل الخاص بك بنجاح. سوف تتلقى تأكيدًا عبر البريد الإلكتروني قريبًا.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <a href="/">العودة إلى الرئيسية</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/courses">تصفح المزيد من الدورات</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
               
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center">
                          <User className="ml-2 h-5 w-5" />
                          نوع المشارك
                        </Label>
                        <RadioGroup
                          value={formData.participantType}
                          onValueChange={(value) => handleInputChange('participantType', value)}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="individual" id="individual" />
                            <Label htmlFor="individual" className="cursor-pointer">فرد</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="company" id="company" />
                            <Label htmlFor="company" className="cursor-pointer">شركة</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="student" id="student" />
                            <Label htmlFor="student" className="cursor-pointer">طالب</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="cursor-pointer">أخرى</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">الاسم الأول *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">اسم العائلة *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>الجنس *</Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={(value) => handleInputChange('gender', value)}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">ذكر</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">أنثى</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">الجنسية</Label>
                          <Input
                            id="nationality"
                            value={formData.nationality}
                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="streetAddress">عنوان الشارع</Label>
                        <Input
                          id="streetAddress"
                          value={formData.streetAddress}
                          onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">المدينة *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">الدولة *</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">هاتف</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">جوال *</Label>
                          <Input
                            id="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email"> تاكيد البريد الاكتروني*</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.confirmEmail}
                          onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

              
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="courseNumber">رقم الدورة *</Label>
                        <Input
                          id="courseNumber"
                          value={formData.courseNumber}
                          onChange={(e) => handleInputChange('courseNumber', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="participationReason">سبب المشاركة</Label>
                        <Textarea
                          id="participationReason"
                          value={formData.participationReason}
                          onChange={(e) => handleInputChange('participationReason', e.target.value)}
                          rows={3}
                          placeholder="ما الذي دفعك للتسجيل في هذه الدورة؟"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="educationLevel">المستوى التعليمي</Label>
                        <Select
                          value={formData.educationLevel}
                          onValueChange={(value) => handleInputChange('educationLevel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المستوى التعليمي" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="highschool">ثانوية عامة</SelectItem>
                            <SelectItem value="bachelor">بكالوريوس</SelectItem>
                            <SelectItem value="master">ماجستير</SelectItem>
                            <SelectItem value="phd">دكتوراه</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.participantType === 'company' && (
                        <div className="space-y-2">
                          <Label htmlFor="companyName">اسم الشركة</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold flex items-center">
                          <User className="ml-2 h-5 w-5" />
                          جهة الاتصال في حالات الطوارئ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyName">الاسم الكامل *</Label>
                            <Input
                              id="emergencyName"
                              value={formData.emergencyContact.name}
                              onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyRelationship">العلاقة *</Label>
                            <Input
                              id="emergencyRelationship"
                              value={formData.emergencyContact.relationship}
                              onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">رقم الهاتف *</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyContact.phone}
                            onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialNeeds">احتياجات خاصة</Label>
                        <Textarea
                          id="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                          rows={3}
                          placeholder="يرجى إخبارنا إذا كان لديك أي احتياجات خاصة تتطلب ترتيبات خاصة"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">معلومات إضافية</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          rows={3}
                          placeholder="أي معلومات أخرى ترغب في مشاركتها معنا"
                        />
                      </div>
                    </div>
                  )}

            
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 ml-2" />
                          <p className="text-blue-800">
                            يرجى مراجعة المعلومات التالية بعناية قبل الإرسال. لا يمكن تعديل المعلومات بعد الإرسال.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          المعلومات الشخصية
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">الاسم الكامل:</p>
                            <p>{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <p className="font-medium">الجنس:</p>
                            <p>{formData.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
                          </div>
                          <div>
                            <p className="font-medium">البريد الإلكتروني:</p>
                            <p>{formData.email}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium">جوال:</p>
                            <p>{formData.mobile}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          معلومات الدورة
                        </h3>
                        <div>
                          <p className="font-medium">رقم الدورة:</p>
                          <p>{formData.courseNumber}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                            required
                          />
                          <Label htmlFor="agreeTerms" className="cursor-pointer">
                            أوافق على الشروط والأحكام *
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeDataProcessing"
                            checked={formData.agreeDataProcessing}
                            onCheckedChange={(checked) => handleInputChange('agreeDataProcessing', checked)}
                            required
                          />
                          <Label htmlFor="agreeDataProcessing" className="cursor-pointer">
                            أوافق على معالجة بياناتي الشخصية وفقًا لسياسة الخصوصية *
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="receiveNewsletter"
                            checked={formData.receiveNewsletter}
                            onCheckedChange={(checked) => handleInputChange('receiveNewsletter', checked)}
                          />
                          <Label htmlFor="receiveNewsletter" className="cursor-pointer">
                            أرغب في تلقي النشرة الإخبارية والعروض الترويجية
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

               
                  <div className="flex justify-between pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ChevronRight className="ml-2 h-4 w-4" />
                      السابق
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep} className="flex items-center">
                        التالي
                        <ChevronLeft className="mr-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={loading}>
                        {loading ? 'جاري الإرسال...' : 'إرسال التسجيل'}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseRegistration;