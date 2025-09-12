import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Phone, MapPin, BookOpen, CreditCard, FileText, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";

// مكون Stepper البديل
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
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    participantType: 'individual',
    title: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    nationality: '',
    idNumber: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    mobile: '',
    email: '',
    confirmEmail: '',
    courseNumber: 'U731063',
    courseTitle: 'اختبار تحديد المستوى للمسار M/الشهادة المتوسطة/التأهيل',
    participationReason: '',
    educationLevel: '',
    occupation: '',
    companyName: '',
    companyAddress: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    specialNeeds: '',
    additionalInfo: '',
    // paymentMethod: 'creditCard',
    agreeTerms: false,
    agreeDataProcessing: false,
    receiveNewsletter: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    // Here you would typically send the data to your backend
    setCurrentStep(5); // Success step
  };

  const steps = [
    { id: 1, title: t('personalInfo', 'المعلومات الشخصية') },
    { id: 2, title: t('courseDetails', 'تفاصيل الدورة') },
    { id: 3, title: t('additionalInfo', 'معلومات إضافية') },
    { id: 4, title: t('reviewSubmit', 'مراجعة وإرسال') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <CategoryNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Google Translate Widget */}
        <div className="flex justify-end mb-6">
          <GoogleTranslate />
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Header with progress */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('registrationForm', 'نموذج التسجيل')} - Registration Form
            </h1>
            <p className="text-gray-600">
              {t('completeSteps', 'يرجى إكمال جميع الخطوات لتسجيل في الدورة')} - Please complete all steps to register for the course
            </p>
          </div>

          {/* Stepper */}
          <CustomStepper currentStep={currentStep} steps={steps} />

          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl">
                  {steps.find(step => step.id === currentStep)?.title}
                </span>
                <Badge variant="outline" className="text-sm">
                  {t('step', 'خطوة')} {currentStep} {t('of', 'من')} 4
                </Badge>
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && t('step1Desc', 'أدخل معلوماتك الشخصية الأساسية')}
                {currentStep === 2 && t('step2Desc', 'حدد الدورة والمعلومات ذات الصلة')}
                {currentStep === 3 && t('step3Desc', 'أضف أي معلومات إضافية')}
                {currentStep === 4 && t('step4Desc', 'راجع معلوماتك وأرسل الطلب')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {currentStep === 5 ? (
                // Success Step
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('registrationSuccess', 'تم التسجيل بنجاح!')}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {t('successMessage', 'تم تقديم طلب التسجيل الخاص بك بنجاح. سوف تتلقى تأكيدًا عبر البريد الإلكتروني قريبًا.')}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <a href="/">{t('backToHome', 'العودة إلى الرئيسية')}</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/courses">{t('browseMoreCourses', 'تصفح المزيد من الدورات')}</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center">
                          <User className="ml-2 h-5 w-5" />
                          {t('participantType', 'نوع المشارك')} - Participant Type
                        </Label>
                        <RadioGroup
                          value={formData.participantType}
                          onValueChange={(value) => handleInputChange('participantType', value)}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="individual" id="individual" />
                            <Label htmlFor="individual" className="cursor-pointer">{t('individual', 'فرد')} - Individual</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="company" id="company" />
                            <Label htmlFor="company" className="cursor-pointer">{t('company', 'شركة')} - Company</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="student" id="student" />
                            <Label htmlFor="student" className="cursor-pointer">{t('student', 'طالب')} - Student</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="cursor-pointer">{t('other', 'أخرى')} - Other</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t('firstName', 'الاسم الأول')} * - First Name</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t('lastName', 'اسم العائلة')} * - Last Name</Label>
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
                          <Label htmlFor="birthDate">{t('birthDate', 'تاريخ الميلاد')} - Birth Date</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{t('gender', 'الجنس')} - Gender</Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={(value) => handleInputChange('gender', value)}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">{t('male', 'ذكر')} - Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">{t('female', 'أنثى')} - Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">{t('nationality', 'الجنسية')} - Nationality</Label>
                          <Input
                            id="nationality"
                            value={formData.nationality}
                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idNumber">{t('idNumber', 'رقم الهوية')} - ID Number</Label>
                        <Input
                          id="idNumber"
                          value={formData.idNumber}
                          onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <MapPin className="ml-2 h-5 w-5" />
                          {t('addressInfo', 'معلومات العنوان')} - Address Information
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="streetAddress">{t('streetAddress', 'عنوان الشارع')} - Street Address</Label>
                          <Input
                            id="streetAddress"
                            value={formData.streetAddress}
                            onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">{t('postalCode', 'الرمز البريدي')} - Postal Code</Label>
                            <Input
                              id="postalCode"
                              value={formData.postalCode}
                              onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">{t('city', 'المدينة')} - City</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">{t('country', 'الدولة')} - Country</Label>
                            <Input
                              id="country"
                              value={formData.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('phone', 'هاتف')} - Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">{t('mobile', 'جوال')} - Mobile *</Label>
                          <Input
                            id="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('email', 'البريد الإلكتروني')} * - Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmEmail">{t('confirmEmail', 'تأكيد البريد الإلكتروني')} * - Confirm Email</Label>
                          <Input
                            id="confirmEmail"
                            type="email"
                            value={formData.confirmEmail}
                            onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Course Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="courseNumber">{t('courseNumber', 'رقم الدورة')} * - Course Number</Label>
                        <Input
                          id="courseNumber"
                          value={formData.courseNumber}
                          onChange={(e) => handleInputChange('courseNumber', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="courseTitle">{t('courseTitle', 'عنوان الدورة')} - Course Title</Label>
                        <Input
                          id="courseTitle"
                          value={formData.courseTitle}
                          onChange={(e) => handleInputChange('courseTitle', e.target.value)}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="participationReason">{t('participationReason', 'سبب المشاركة')} - Reason for Participation</Label>
                        <Textarea
                          id="participationReason"
                          value={formData.participationReason}
                          onChange={(e) => handleInputChange('participationReason', e.target.value)}
                          rows={3}
                          placeholder={t('reasonPlaceholder', 'ما الذي دفعك للتسجيل في هذه الدورة؟')}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="educationLevel">{t('educationLevel', 'المستوى التعليمي')} - Education Level</Label>
                          <Select
                            value={formData.educationLevel}
                            onValueChange={(value) => handleInputChange('educationLevel', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectEducation', 'اختر المستوى التعليمي')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="highschool">{t('highschool', 'ثانوية عامة')}</SelectItem>
                              <SelectItem value="bachelor">{t('bachelor', 'بكالوريوس')}</SelectItem>
                              <SelectItem value="master">{t('master', 'ماجستير')}</SelectItem>
                              <SelectItem value="phd">{t('phd', 'دكتوراه')}</SelectItem>
                              <SelectItem value="other">{t('other', 'أخرى')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="occupation">{t('occupation', 'المهنة')} - Occupation</Label>
                          <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                          />
                        </div>
                      </div>

                      {formData.participantType === 'company' && (
                        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                          <h3 className="text-lg font-semibold">{t('companyInfo', 'معلومات الشركة')} - Company Information</h3>
                          <div className="space-y-2">
                            <Label htmlFor="companyName">{t('companyName', 'اسم الشركة')} - Company Name</Label>
                            <Input
                              id="companyName"
                              value={formData.companyName}
                              onChange={(e) => handleInputChange('companyName', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companyAddress">{t('companyAddress', 'عنوان الشركة')} - Company Address</Label>
                            <Input
                              id="companyAddress"
                              value={formData.companyAddress}
                              onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Additional Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold flex items-center">
                          <User className="ml-2 h-5 w-5" />
                          {t('emergencyContact', 'جهة الاتصال في حالات الطوارئ')} - Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyName">{t('fullName', 'الاسم الكامل')} - Full Name</Label>
                            <Input
                              id="emergencyName"
                              value={formData.emergencyContact.name}
                              onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyRelationship">{t('relationship', 'العلاقة')} - Relationship</Label>
                            <Input
                              id="emergencyRelationship"
                              value={formData.emergencyContact.relationship}
                              onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">{t('phoneNumber', 'رقم الهاتف')} - Phone Number</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyContact.phone}
                            onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialNeeds">{t('specialNeeds', 'احتياجات خاصة')} - Special Needs</Label>
                        <Textarea
                          id="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                          rows={3}
                          placeholder={t('specialNeedsPlaceholder', 'يرجى إخبارنا إذا كان لديك أي احتياجات خاصة تتطلب ترتيبات خاصة')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">{t('additionalInfo', 'معلومات إضافية')} - Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          rows={3}
                          placeholder={t('additionalInfoPlaceholder', 'أي معلومات أخرى ترغب في مشاركتها معنا')}
                        />
                      </div>

                      {/* <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CreditCard className="ml-2 h-5 w-5" />
                          {t('paymentMethod', 'طريقة الدفع')} - Payment Method
                        </h3>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange('paymentMethod', value)}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="creditCard" id="creditCard" />
                            <Label htmlFor="creditCard" className="cursor-pointer">{t('creditCard', 'بطاقة ائتمان')} - Credit Card</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                            <Label htmlFor="bankTransfer" className="cursor-pointer">{t('bankTransfer', 'تحويل بنكي')} - Bank Transfer</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="cursor-pointer">{t('cash', 'نقدي')} - Cash</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:border-primary">
                            <RadioGroupItem value="installments" id="installments" />
                            <Label htmlFor="installments" className="cursor-pointer">{t('installments', 'أقساط')} - Installments</Label>
                          </div>
                        </RadioGroup>
                      </div> */}
                    </div>
                  )}

                  {/* Step 4: Review and Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 ml-2" />
                          <p className="text-blue-800">
                            {t('reviewWarning', 'يرجى مراجعة المعلومات التالية بعناية قبل الإرسال. لا يمكن تعديل المعلومات بعد الإرسال.')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          {t('personalInfo', 'المعلومات الشخصية')} - Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">{t('fullName', 'الاسم الكامل')}:</p>
                            <p>{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('birthDate', 'تاريخ الميلاد')}:</p>
                            <p>{formData.birthDate || t('notProvided', 'غير مقدم')}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('gender', 'الجنس')}:</p>
                            <p>{formData.gender === 'male' ? t('male', 'ذكر') : formData.gender === 'female' ? t('female', 'أنثى') : t('notProvided', 'غير مقدم')}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('nationality', 'الجنسية')}:</p>
                            <p>{formData.nationality || t('notProvided', 'غير مقدم')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          {t('contactInfo', 'معلومات الاتصال')} - Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">{t('email', 'البريد الإلكتروني')}:</p>
                            <p>{formData.email}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('mobile', 'جوال')}:</p>
                            <p>{formData.mobile}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('address', 'العنوان')}:</p>
                            <p>{formData.streetAddress}, {formData.postalCode} {formData.city}, {formData.country}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          {t('courseInfo', 'معلومات الدورة')} - Course Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">{t('courseNumber', 'رقم الدورة')}:</p>
                            <p>{formData.courseNumber}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t('courseTitle', 'عنوان الدورة')}:</p>
                            <p>{formData.courseTitle}</p>
                          </div>
                          {/* <div>
                            <p className="font-medium">{t('paymentMethod', 'طريقة الدفع')}:</p>
                            <p>
                              {formData.paymentMethod === 'creditCard' ? t('creditCard', 'بطاقة ائتمان') :
                               formData.paymentMethod === 'bankTransfer' ? t('bankTransfer', 'تحويل بنكي') :
                               formData.paymentMethod === 'cash' ? t('cash', 'نقدي') : t('installments', 'أقساط')}
                            </p>
                          </div> */}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                            required
                          />
                          <Label htmlFor="agreeTerms" className="cursor-pointer">
                            {t('agreeTerms', 'أوافق على الشروط والأحكام')} - I agree to the terms and conditions *
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeDataProcessing"
                            checked={formData.agreeDataProcessing}
                            onCheckedChange={(checked) => handleInputChange('agreeDataProcessing', checked as boolean)}
                            required
                          />
                          <Label htmlFor="agreeDataProcessing" className="cursor-pointer">
                            {t('agreeDataProcessing', 'أوافق على معالجة بياناتي الشخصية وفقًا لسياسة الخصوصية')} - I agree to the processing of my personal data according to the privacy policy *
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="receiveNewsletter"
                            checked={formData.receiveNewsletter}
                            onCheckedChange={(checked) => handleInputChange('receiveNewsletter', checked as boolean)}
                          />
                          <Label htmlFor="receiveNewsletter" className="cursor-pointer">
                            {t('receiveNewsletter', 'أرغب في تلقي النشرة الإخبارية والعروض الترويجية')} - I would like to receive the newsletter and promotional offers
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      {i18n.language === 'ar' ? <ChevronRight className="ml-2 h-4 w-4" /> : <ChevronLeft className="mr-2 h-4 w-4" />}
                      {t('previous', 'السابق')}
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep} className="flex items-center">
                        {t('next', 'التالي')}
                        {i18n.language === 'ar' ? <ChevronLeft className="mr-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                      </Button>
                    ) : (
                      <Button type="submit">
                        {t('submitRegistration', 'إرسال التسجيل')}
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