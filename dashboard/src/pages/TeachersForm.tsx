import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {Link, useNavigate} from 'react-router-dom'
import { addTeacher, updateTeacher, ITeacher, clearError, clearStatus } from "../store/slices/teachers/teachersSlice";
import { useSelector } from "react-redux";

import en from '../lang/en.json'
import ar from '../lang/ar.json'
import ErrorDisplay from "../component/ErrorDisplay";

export type Education = {
  degree: string;
  institution: string;
  year: string;
};

export type Contact = {
  email: string;
  phone: string;
};

export type Social = {
  linkedin?: string;
  twitter?: string;
};
  




export function TeachersForm() {
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [image, setImage] = useState<HTMLInputElement>()
    const [bio, setBio] = useState("")
    const [bioEn, setBioEn] = useState("")
    const [experience, setExperience] = useState("")
    const [actionForm, setActionForm] = useState("اضافة استاذ")
    const [specialties, setSpecialties] = useState<string[]>([])
    const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([])
    const [isActive, setActive] = useState(true)
    const navigate = useNavigate();
    // Education
    const [education, setEducation] = useState<Education[]>([])
    const [newEducation, setNewEducation] = useState<Education>({
        degree: '',
        institution: '',
        year: ''
    })
    
    // Contact
    const [contact, setContact] = useState<Contact>({
        email: '',
        phone: ''
    })
    
    // Social
    const [social, setSocial] = useState<Social>({
        linkedin: '',
        twitter: ''
    })
    
    // Stats
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState(0)
    const [students, setStudents] = useState(0)
    const [course, setCourse] = useState(0)
    
    // Error handling states
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Ref to track initial mount
    const isMounted = useRef(false);

    const teachers = useSelector((s: RootState) => s.teachers.items);
    const { status, error } = useSelector((s: RootState) => s.teachers);

    const dispatch = useDispatch<AppDispatch>();
  useEffect((): any => {
    const url = window.location.href
    if(url.includes("/edit")) {
        setActionForm("تعديل استاذ")
        setIsEditMode(true)
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        // console.log(id)
        setEditingTeacherId(id)
        
        const teacher = teachers.find(t => t._id === id)
        if (teacher) {
            setName(teacher.name || '')
            // setNameEn(teacher.nameEn || '')
            setTitle(teacher.title || '')
            // setTitleEn(teacher.titleEn || '')
            setBio(teacher.bio || '')
            // setBioEn(teacher.bioEn || '')
            // setExperience(teacher.experience || '')
            // setImage(teacher.image)
            setSpecialties(teacher.specialties || [])
            // setSpecialtiesEn(teacher.specialtiesEn || [])
            setActive(teacher.isActive !== undefined ? teacher.isActive : true)
            setEducation(teacher.education || [])
            setContact(teacher.contact || { email: '', phone: '' })
            setSocial(teacher.social || { linkedin: '', twitter: '' })
            setRating(teacher.rating || 0)
            setReview(teacher.review || 0)
            setStudents(teacher.students || 0)
            setCourse(teacher.course || 0)
        } else {
            setErrors({general: "الاستاذ غير موجود"})
        }
    }
  }, [teachers,])

  // Clear Redux errors when component mounts
  useEffect(() => {
    // dispatch(clearError());
    // dispatch(clearStatus());
  }, []);


  useEffect(() => {
        if(status == 'succeeded') {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            dispatch(clearError());
            dispatch(clearStatus())
        }
        if(error == 'يجب تسجيل الدخول اولاً' || error == "انتهت صلاحية الجلسة ..") {
            setTimeout(() => {
                navigate('/login');
                dispatch(clearError());
                dispatch(clearStatus())
            }, 500);
        }
    }, [status, error]);
  // Clear errors when user starts typing
  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }
  // Add specialty


  const addSpecialty = (specialty: string, isEn: boolean = false) => {
    if (specialty.trim()) {
      if (isEn) {
        setSpecialtiesEn(prev => [...prev, specialty.trim()])
      } else {
        setSpecialties(prev => [...prev, specialty.trim()])
      }
    }
  }

  // Remove specialty
  const removeSpecialty = (index: number, isEn: boolean = false) => {
    if (isEn) {
      setSpecialtiesEn(prev => prev.filter((_, i) => i !== index))
    } else {
      setSpecialties(prev => prev.filter((_, i) => i !== index))
    }
  }

  // Add education
  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setEducation(prev => [...prev, { ...newEducation }])
      setNewEducation({ degree: '', institution: '', year: '' })
    }
  }

  // Remove education
  const removeEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!name.trim()) {
      newErrors.name = "الاسم مطلوب"
    }
    // if (!nameEn.trim()) {
    //   newErrors.nameEn = translations.form.validation.nameEnRequired
    // }
    if (!title.trim()) {
      newErrors.title = "اللقب مطلوب"
    }
    // if (!titleEn.trim()) {
    //   newErrors.titleEn = translations.form.validation.titleEnRequired
    // }
    if (!bio.trim()) {
      newErrors.bio = "السيرة الذاتية مطلوبة"
    }
    // if (!bioEn.trim()) {
    //   newErrors.bioEn = translations.form.validation.bioEnRequired
    // }
    // if (!experience.trim()) {
    //   newErrors.experience = translations.form.validation.experienceRequired
    // }
    if (!contact.email.trim()) {
      newErrors.email = "البريد الالكتروني مطلوب"
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = "البريد الالكتروني غير صالح"
    }
    if (!contact.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب"
    } else if(!/^09\d{8}$/.test(contact.phone)) {
      newErrors.phone = "09xxxxxxxxرقم الهاتف غير صالح مثال:"
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    setShowSuccessMessage(false);

    try {
      const teacherData = {
        name,
        nameEn,
        title,
        titleEn,
        bio,
        bioEn,
        // experience,
        image,
        specialties,
        specialtiesEn,
        education,
        contact,
        social,
        rating,
        review,
        students,
        course,
        isActive,
        ...(isEditMode && editingTeacherId && { _id: editingTeacherId })
      }

      if (isEditMode && editingTeacherId) {
        await dispatch(updateTeacher(teacherData))
      } else {
        // console.log(teacherData)
        await dispatch(addTeacher(teacherData)).unwrap()
      }      
      // Reset form after successful submission
      if (!isEditMode) {
        setName('')

        setTitle('')

        setBio('')

        // setExperience('')
        setSpecialties([])
        setEducation([])
        setContact({ email: '', phone: '' })
        setSocial({ linkedin: '', twitter: '' })
        setRating(0)
        setReview(0)
        setStudents(0)
        setCourse(0)
        setActive(true)
      }
    } catch (error: any) {
      setErrors({ general: error || "خطأاثناء حفظ الاستاذ" })
    } finally {
      setIsLoading(false)
      window.scrollTo(0, 0);
      if(status !== 'failed') {
          setTimeout(() => {
            navigate('/teachers');
          }, 3000);
      }
    }
  }

    return(
    <>
    <div className={`max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100`}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{isEditMode ? "تعديل بيانات الأستاذ" : "إضافة أستاذ جديد"}</h1>
        {/* Global error message */}
        {/* {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )} */}

        {/* Redux error message */}
        <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />
        {showSuccessMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">تم الحفظ بنجاح</p>
            </div>
        )}
        <div className="space-y-6">
            <div>
                <label className="block text-gray-700 font-medium mb-2">الاسم</label>
                <input 
                  value={name} 
                  onChange={e => {
                    setName(e.target.value)
                    clearFieldError('name')
                  }} 
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.nameEn}</label>
                <input 
                  value={nameEn} 
                  onChange={e => {
                    setNameEn(e.target.value)
                    clearFieldError('nameEn')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.nameEn ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.nameEn && <p className="mt-1 text-sm text-red-600">{errors.nameEn}</p>}
            </div> */}
            <div>
                {/* <label className="block text-sm font-medium text-gray-700">{translations.form.fields.title}</label> */}
                <label className="block text-gray-700 font-medium mb-2">اللقب</label>
                <input 
                  value={title} 
                  onChange={e => {
                    setTitle(e.target.value)
                    clearFieldError('title')
                  }} 
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.titleEn}</label>
                <input 
                  value={titleEn} 
                  onChange={e => {
                    setTitleEn(e.target.value)
                    clearFieldError('titleEn')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.titleEn ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.titleEn && <p className="mt-1 text-sm text-red-600">{errors.titleEn}</p>}
            </div> */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">رابط الصورة</label>
                <input 
                  type="file"
                  onChange={e => {
                    setImage(e.target)
                    clearFieldError('name')
                    // console.log(e.target.files[0])
                  }} 
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-2">السيرة الذاتية</label>
                <textarea 
                  value={bio} 
                  onChange={e => {
                    setBio(e.target.value)
                    clearFieldError('bio')
                  }} 
                  rows={4}
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.bioEn}</label>
                <input 
                  value={bioEn} 
                  onChange={e => {
                    setBioEn(e.target.value)
                    clearFieldError('bioEn')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.bioEn ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.bioEn && <p className="mt-1 text-sm text-red-600">{errors.bioEn}</p>}
            </div> */}
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">الخبرة</label>
                <input 
                  value={experience} 
                  onChange={e => {
                    setExperience(e.target.value)
                    clearFieldError('experience')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.experience ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
            </div> */}

            {/* Contact Section */}
            <div className="border-t border-gray-200 pt-6">
                {/* <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.contactInfo}</h3> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات الاتصال</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.fields.email}</label> */}
                        <label className="block text-gray-700 font-medium mb-2">البريد الالكتروني</label>
                        <input 
                          type="email"
                          value={contact.email} 
                          onChange={e => {
                            setContact(prev => ({ ...prev, email: e.target.value }))
                            clearFieldError('email')
                          }} 
                          className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.fields.phone}</label> */}
                        <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                        <input 
                          value={contact.phone} 
                          onChange={e => {
                            setContact(prev => ({ ...prev, phone: e.target.value }))
                            clearFieldError('phone')
                          }} 
                          className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="border-t border-gray-200 pt-6">
                {/* <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.socialMedia}</h3> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">وسائل التواصل الاجتماعي</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.fields.linkedin}</label> */}
                        <label className="block text-gray-700 font-medium mb-2">لينكد ان</label>
                        <input 
                          value={social.linkedin || ''} 
                          onChange={e => setSocial(prev => ({ ...prev, linkedin: e.target.value }))} 
                          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.fields.twitter}</label> */}
                        <label className="block text-gray-700 font-medium mb-2">تويتر</label>
                        <input 
                          value={social.twitter || ''} 
                          onChange={e => setSocial(prev => ({ ...prev, twitter: e.target.value }))} 
                          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Specialties Section */}
            <div className="border-t border-gray-200 pt-6">
                {/* <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.specialties}</h3> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">التخصصات</h3>
        <div className="space-y-4">
            <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.sections.specialtiesAr}</label> */}
                        <label className="block text-sm font-medium text-gray-700">التخصص</label>
                        <div className="flex gap-2">
                            <input 
                              type="text"
                              // placeholder={translations.form.placeholders.addSpecialty}
                              placeholder="اضافة تخصص"
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addSpecialty(e.currentTarget.value)
                                  e.currentTarget.value = ''
                                }
                              }}
                              className="flex-1 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <button 
                              type="button"
                              onClick={e => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                addSpecialty(input.value)
                                input.value = ''
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              {/* {translations.form.buttons.add} */}
                              اضافة
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {specialties.map((specialty, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {specialty}
                              <button 
                                type="button"
                                onClick={() => removeSpecialty(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">{translations.form.sections.specialtiesEn}</label>
                        <div className="flex gap-2">
                            <input 
                              type="text"
                              placeholder={translations.form.placeholders.addSpecialty}
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addSpecialty(e.currentTarget.value, true)
                                  e.currentTarget.value = ''
                                }
                              }}
                              className="mt-1 flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                            <button 
                              type="button"
                              onClick={e => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                addSpecialty(input.value, true)
                                input.value = ''
                              }}
                              className="mt-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              {translations.form.buttons.add}
                            </button>
                        </div> */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {specialtiesEn.map((specialty, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {specialty}
                              <button 
                                type="button"
                                onClick={() => removeSpecialty(index, true)}
                                className="text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">التعليم</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">الدرجة العلمية</label>
                            <input 
                              value={newEducation.degree} 
                              onChange={e => setNewEducation(prev => ({ ...prev, degree: e.target.value }))} 
                              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.form.fields.degreeEn}</label>
                            <input 
                              value={newEducation.degreeEn} 
                              onChange={e => setNewEducation(prev => ({ ...prev, degreeEn: e.target.value }))} 
                              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div> */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">المؤسسة</label>
                            <input 
                              value={newEducation.institution} 
                              onChange={e => setNewEducation(prev => ({ ...prev, institution: e.target.value }))} 
                              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
            </div>
            <div>
                            <label className="block text-gray-700 font-medium mb-2">السنة</label>
                            <input 
                              type="number"
                              min={1}
                              value={newEducation.year} 
                              onChange={e => setNewEducation(prev => ({ ...prev, year: e.target.value }))} 
                              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>
                    <button 
                      type="button"
                      onClick={addEducation}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {/* {translations.form.buttons.addEducation} */}
                      اضافة تعليم
                    </button>
                    <div className="space-y-2">
                      {education.map((edu, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div>
                            <span className="font-medium">{edu.degree}</span> - {edu.institution} ({edu.year})
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            {/* {translations.form.buttons.remove} */}
                            ازالة
                          </button>
                        </div>
                      ))}
                    </div>
                </div>
            </div>


            {/* Active Status */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={isActive} 
                      onChange={e => setActive(e.target.checked)} 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                        {/* {translations.form.activeTeacher} */}
                        استاذ نشط؟
                    </label>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full sm:w-auto flex-1 inline-flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </button>
                <Link to="/teachers" className="w-full sm:w-auto flex-1 text-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  {/* {translations.form.buttons.cancel} */}
                  الغاء
                </Link>
            </div>
        </div>
    </div>
    </>
    )
}