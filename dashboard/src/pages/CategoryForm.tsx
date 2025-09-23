import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {Link, useNavigate} from 'react-router-dom'
import { addCategory, clearError, clearStatus } from "../store/slices/categories/categoriesSlice";
import { useSelector } from "react-redux";

import en from '../lang/en.json'
import ar from '../lang/ar.json'

export function CategoryForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<HTMLInputElement>();
  const [descriptionEn, setDescriptionEn] = useState('');
  const [actionForm, setActionForm] = useState("اضافة فئة");
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const isMounted = useRef(false);
  
  const categories = useSelector((s: RootState) => s.categories.items);
  const { status, error } = useSelector((s: RootState) => s.categories);


  const dispatch = useDispatch<AppDispatch>();
  useEffect((): any => {
    const url = window.location.href
    if(url.includes("/edit")) {
        setActionForm("تعديل فئة")
        setIsEditMode(true)
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        setEditingCategoryId(id)
        
        const category = categories.find(c => c._id === id)
        if (category) {
            setName(category.name || '')
            setDescription(category.description || '')
        } else {
            setErrors({general: "الفئة غير موجودة"})
        }
    }
  }, [categories, name, description])

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

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }


  useEffect(() => {
    isMounted.current = true;
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!name.trim()) {
      newErrors.name = "اسم الفئة مطلوب"
    }

    if (!description.trim()) {
      newErrors.description = "وصف الفئة مطلوب"
    }

    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }




  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    setShowSuccessMessage(false);

    try {
      const categoryData = {
        name,
        description,
        image,
        ...(isEditMode && editingCategoryId && { _id: editingCategoryId })
      }

      if (isEditMode && editingCategoryId) {
      } else {
        await dispatch(addCategory(categoryData)).unwrap()
      }
      
      dispatch(clearError())
      
      if (!isEditMode) {
        setName('')
        setNameEn('')
        setDescription('')
        setDescriptionEn('')
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false)
      window.scrollTo(0, 0); 
      if(status !== 'failed') {
        setTimeout(() => {
          navigate('/categories');
        }, 3000);
      }
        
    }
  }

  return(
    <>
    <div className={`max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100`}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{isEditMode ? "تعديل الفئة" : "إضافة فئة جديدة"}</h1>
        
        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}



        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}



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
                <label className="block text-gray-700 font-medium mb-2">الصورة</label>
                <input 
                  type="file"
                  onChange={e => {
                    setImage(e.target)
                    clearFieldError('name')
                  }} 
                  className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>
                

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
                  الغاء
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}
