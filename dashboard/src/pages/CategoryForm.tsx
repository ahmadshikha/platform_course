import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {Link} from 'react-router-dom'
import { addCategory, updateCategory, ICategory, clearError, clearStatus } from "../store/slices/categories/categoriesSlice";
import { useSelector } from "react-redux";

import en from '../lang/en.json'
import ar from '../lang/ar.json'

export function CategoryForm() {
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<HTMLInputElement>();
    const [descriptionEn, setDescriptionEn] = useState('');
    const [actionForm, setActionForm] = useState("اضافة فئة");
    
    // Error handling states
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

    // New state for success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Ref to track initial mount
    const isMounted = useRef(false);
    
    const categories = useSelector((s: RootState) => s.categories.items);
    const { status, error } = useSelector((s: RootState) => s.categories);

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
        setActionForm("تعديل فئة")
        setIsEditMode(true)
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        console.log(id)
        setEditingCategoryId(id)
        
        const category = categories.find(c => c._id === id)
        if (category) {
            setName(category.name || '')
            setDescription(category.description || '')
        } else {
            // setErrors({general: translations.categories.categoryNotFound})
            setErrors({general: "الفئة غير موجودة"})
        }
    }
  }, [categories, name, description])

  // Clear Redux errors and status when component mounts
  useEffect(() => {
    dispatch(clearError());
    // Dispatch a new action to clear the status, preventing old messages from showing.
    dispatch(clearStatus()); 
  }, [dispatch]);

  // Handle success message visibility
  useEffect(() => {
    // Only show success message if the status changes to 'succeeded' after the initial mount.
    // This prevents showing a stale success message when navigating to the form.
    if (isMounted.current && status === 'succeeded') {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Clean up the timer
    } else if (status !== 'succeeded') {
      // Ensure the message is hidden if status is not 'succeeded'
      setShowSuccessMessage(false);
    }
  }, [status, isMounted]);

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
  useEffect(()=> {
    console.log("error category list", error)
  },[error])

  // Set isMounted to true after the first render
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!name.trim()) {
      // newErrors.name = translations.categories.nameRequired
      newErrors.name = "اسم الفئة مطلوب"
    }
    // if (!nameEn.trim()) {
    //   newErrors.nameEn = translations.categories.nameEnRequired
    // }
    if (!description.trim()) {
      // newErrors.description = translations.categories.descriptionRequired
      newErrors.description = "وصف الفئة مطلوب"
    }
    // if (!descriptionEn.trim()) {
    //   newErrors.descriptionEn = translations.categories.descriptionEnRequired
    // }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  // useEffect(()=> {
  //   if(image.files) {
  //     console.log(image.files)
  //   }


  // }, [image])
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    setShowSuccessMessage(false); // Hide any previous success message

    try {
      const categoryData = {
        name,
        // nameEn,
        description,
        image,
        // descriptionEn,
        ...(isEditMode && editingCategoryId && { _id: editingCategoryId })
      }

      if (isEditMode && editingCategoryId) {
        // await dispatch(updateCategory(categoryData as ICategory)).unwrap()
      } else {
        await dispatch(addCategory(categoryData)).unwrap()
      }
      
      // Clear Redux errors after successful operation
      dispatch(clearError())
      
      // Reset form after successful submission
      if (!isEditMode) {
        setName('')
        setNameEn('')
        setDescription('')
        setDescriptionEn('')
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }

    return(
    <>
    <div className={`max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{isEditMode ? "تعديل الفئة" : "إضافة فئة جديدة"}</h1>
        
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

        {/* Success message */}
        {showSuccessMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">تم الحفظ بنجاح</p>
            </div>
        )}

        <div className="space-y-6">
            <div>
                {/* <label className="block text-sm font-medium text-gray-700">{translations.categories.name}</label> */}
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
                <label className="block text-sm font-medium text-gray-700">{translations.categories.nameEn}</label>
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
                {/* <label className="block text-sm font-medium text-gray-700">{translations.categories.description}</label> */}
                <label className="block text-gray-700 font-medium mb-2">الوصف</label>
                <textarea 
                  value={description} 
                  onChange={e => {
                    setDescription(e.target.value)
                    clearFieldError('description')
                  }} 
                  rows={4}
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div>
                {/* <label className="block text-sm font-medium text-gray-700">{translations.categories.description}</label> */}
                <label className="block text-gray-700 font-medium mb-2">الصورة</label>
                <input 
                  type="file"
                  onChange={e => {
                    setImage(e.target)
                    clearFieldError('name')
                    console.log(e.target.files[0])
                  }} 
                  className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>
                
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">{translations.categories.descriptionEn}</label>
                <label className="block text-sm font-medium text-gray-700">الوصف</label>
                <textarea 
                  value={descriptionEn} 
                  onChange={e => {
                    setDescriptionEn(e.target.value)
                    clearFieldError('descriptionEn')
                  }} 
                  rows={4}
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.descriptionEn ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.descriptionEn && <p className="mt-1 text-sm text-red-600">{errors.descriptionEn}</p>}
            </div> */}

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full sm:w-auto flex-1 inline-flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </button>
                <Link to="/categories" className="w-full sm:w-auto flex-1 text-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  {/* {translations.categories.cancel} */}
                  الغاء
                </Link>
            </div>
        </div>
    </div>
    </>
    )
}
