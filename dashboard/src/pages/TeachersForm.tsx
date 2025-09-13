import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {Link} from 'react-router-dom'
import { addTeacher, updateTeacher, ITeacher, clearError } from "../store/slices/teachers/teachersSlice";
import { useSelector } from "react-redux";

import en from '../lang/en.json'
import ar from '../lang/ar.json'

export type Education = {
  degree: string;
  degreeEn: string;
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
    const [image, setImage] = useState('')
    const [bio, setBio] = useState("")
    const [bioEn, setBioEn] = useState("")
    const [experience, setExperience] = useState("")
    const [actionForm, setActionForm] = useState("Add Teacher")
    const [specialties, setSpecialties] = useState<string[]>([])
    const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([])
    const [isActive, setActive] = useState(true)
    
    // Education
    const [education, setEducation] = useState<Education[]>([])
    const [newEducation, setNewEducation] = useState<Education>({
        degree: '',
        degreeEn: '',
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
    
    const teachers = useSelector((s: RootState) => s.teachers.items);
    const { status, error } = useSelector((s: RootState) => s.teachers);

    const {lang} = useSelector((s: RootState) => s.lang);
    const translate = {
        en,
        ar
    }
    const translations = translate[lang];
    const dispatch = useDispatch<AppDispatch>();
  useEffect((): any => {
    const url = window.location.href
    if(url.includes("/edit")) {
        setActionForm(translations.form.editTeacher)
        setIsEditMode(true)
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        console.log(id)
        setEditingTeacherId(id)
        
        const teacher = teachers.find(t => t._id === id)
        if (teacher) {
            setName(teacher.name || '')
            setNameEn(teacher.nameEn || '')
            setTitle(teacher.title || '')
            setTitleEn(teacher.titleEn || '')
            setBio(teacher.bio || '')
            setBioEn(teacher.bioEn || '')
            setExperience(teacher.experience || '')
            setImage(teacher.image || '')
            setSpecialties(teacher.specialties || [])
            setSpecialtiesEn(teacher.specialtiesEn || [])
            setActive(teacher.isActive !== undefined ? teacher.isActive : true)
            setEducation(teacher.education || [])
            setContact(teacher.contact || { email: '', phone: '' })
            setSocial(teacher.social || { linkedin: '', twitter: '' })
            setRating(teacher.rating || 0)
            setReview(teacher.review || 0)
            setStudents(teacher.students || 0)
            setCourse(teacher.course || 0)
        } else {
            setErrors({general: translations.form.validation.teacherNotFound})
        }
    }
  }, [teachers, translations.form.editTeacher])

  // Clear Redux errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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
      setNewEducation({ degree: '', degreeEn: '', institution: '', year: '' })
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
      newErrors.name = translations.form.validation.nameRequired
    }
    if (!nameEn.trim()) {
      newErrors.nameEn = translations.form.validation.nameEnRequired
    }
    if (!title.trim()) {
      newErrors.title = translations.form.validation.titleRequired
    }
    if (!titleEn.trim()) {
      newErrors.titleEn = translations.form.validation.titleEnRequired
    }
    if (!bio.trim()) {
      newErrors.bio = translations.form.validation.bioRequired
    }
    if (!bioEn.trim()) {
      newErrors.bioEn = translations.form.validation.bioEnRequired
    }
    if (!experience.trim()) {
      newErrors.experience = translations.form.validation.experienceRequired
    }
    if (!contact.email.trim()) {
      newErrors.email = translations.form.validation.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = translations.form.validation.emailInvalid
    }
    if (!contact.phone.trim()) {
      newErrors.phone = translations.form.validation.phoneRequired
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

    try {
      const teacherData = {
        name,
        nameEn,
        title,
        titleEn,
        bio,
        bioEn,
        experience,
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
        await dispatch(updateTeacher(teacherData as ITeacher)).unwrap()
      } else {
        await dispatch(addTeacher(teacherData)).unwrap()
      }
      
      // Clear Redux errors after successful operation
      dispatch(clearError())
      
      // Reset form after successful submission
      if (!isEditMode) {
        setName('')
        setNameEn('')
        setTitle('')
        setTitleEn('')
        setBio('')
        setBioEn('')
        setExperience('')
        setImage('')
        setSpecialties([])
        setSpecialtiesEn([])
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
      setErrors({ general: error || translations.form.validation.saveError })
    } finally {
      setIsLoading(false)
    }
  }

    return(
    <>
    <div className={`max-w-xl ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <h1 className="text-xl font-semibold mb-4">{actionForm}</h1>
        
        {/* Global error message */}
        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Redux error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.name}</label>
                <input 
                  value={name} 
                  onChange={e => {
                    setName(e.target.value)
                    clearFieldError('name')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
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
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.title}</label>
                <input 
                  value={title} 
                  onChange={e => {
                    setTitle(e.target.value)
                    clearFieldError('title')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            <div>
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
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.image}</label>
                <input 
                  value={image} 
                  onChange={e => setImage(e.target.value)} 
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.bio}</label>
                <input 
                  value={bio} 
                  onChange={e => {
                    setBio(e.target.value)
                    clearFieldError('bio')
                  }} 
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.bio ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>
            <div>
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
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.form.fields.experience}</label>
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
            </div>

            {/* Contact Section */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.contactInfo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.email}</label>
                        <input 
                          type="email"
                          value={contact.email} 
                          onChange={e => {
                            setContact(prev => ({ ...prev, email: e.target.value }))
                            clearFieldError('email')
                          }} 
                          className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                            errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`} 
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.phone}</label>
                        <input 
                          value={contact.phone} 
                          onChange={e => {
                            setContact(prev => ({ ...prev, phone: e.target.value }))
                            clearFieldError('phone')
                          }} 
                          className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                            errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                          }`} 
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.socialMedia}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.linkedin}</label>
                        <input 
                          value={social.linkedin || ''} 
                          onChange={e => setSocial(prev => ({ ...prev, linkedin: e.target.value }))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.twitter}</label>
                        <input 
                          value={social.twitter || ''} 
                          onChange={e => setSocial(prev => ({ ...prev, twitter: e.target.value }))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                    </div>
                </div>
            </div>

            {/* Specialties Section */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.specialties}</h3>
        <div className="space-y-4">
            <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.sections.specialtiesAr}</label>
                        <div className="flex gap-2">
                            <input 
                              type="text"
                              placeholder={translations.form.placeholders.addSpecialty}
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addSpecialty(e.currentTarget.value)
                                  e.currentTarget.value = ''
                                }
                              }}
                              className="mt-1 flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                            <button 
                              type="button"
                              onClick={e => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                addSpecialty(input.value)
                                input.value = ''
                              }}
                              className="mt-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              {translations.form.buttons.add}
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
                        <label className="block text-sm font-medium text-gray-700">{translations.form.sections.specialtiesEn}</label>
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
                        </div>
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
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.education}</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.form.fields.degree}</label>
                            <input 
                              value={newEducation.degree} 
                              onChange={e => setNewEducation(prev => ({ ...prev, degree: e.target.value }))} 
                              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.form.fields.degreeEn}</label>
                            <input 
                              value={newEducation.degreeEn} 
                              onChange={e => setNewEducation(prev => ({ ...prev, degreeEn: e.target.value }))} 
                              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.form.fields.institution}</label>
                            <input 
                              value={newEducation.institution} 
                              onChange={e => setNewEducation(prev => ({ ...prev, institution: e.target.value }))} 
                              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
            </div>
            <div>
                            <label className="block text-sm font-medium text-gray-700">{translations.form.fields.year}</label>
                            <input 
                              type="number"
                              value={newEducation.year} 
                              onChange={e => setNewEducation(prev => ({ ...prev, year: e.target.value }))} 
                              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                            />
                        </div>
                    </div>
                    <button 
                      type="button"
                      onClick={addEducation}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {translations.form.buttons.addEducation}
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
                            {translations.form.buttons.remove}
                          </button>
                        </div>
                      ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{translations.form.sections.statistics}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.rating}</label>
                        <input 
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={rating} 
                          onChange={e => setRating(Number(e.target.value))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.reviews}</label>
                        <input 
                          type="number"
                          min="0"
                          value={review} 
                          onChange={e => setReview(Number(e.target.value))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.students}</label>
                        <input 
                          type="number"
                          min="0"
                          value={students} 
                          onChange={e => setStudents(Number(e.target.value))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium text-gray-700">{translations.form.fields.courses}</label>
                        <input 
                          type="number"
                          min="0"
                          value={course} 
                          onChange={e => setCourse(Number(e.target.value))} 
                          className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                    </div>
                </div>
            </div>

            {/* Active Status */}
            <div className="border-t pt-4">
                <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={isActive} 
                      onChange={e => setActive(e.target.checked)} 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                        {translations.form.activeTeacher}
                    </label>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isLoading 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? translations.form.buttons.saving : translations.form.buttons.save}
                </button>
                <Link to="/teachers" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                  {translations.form.buttons.cancel}
                </Link>
            </div>
        </div>
    </div>
    </>
    )
}