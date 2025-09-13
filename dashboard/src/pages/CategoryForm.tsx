import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {Link} from 'react-router-dom'
import { addCategory, updateCategory, ICategory, clearError } from "../store/slices/categories/categoriesSlice";
import { useSelector } from "react-redux";

import en from '../lang/en.json'
import ar from '../lang/ar.json'

export function CategoryForm() {
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [actionForm, setActionForm] = useState("Add Category");
    
    // Error handling states
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
    
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
        setActionForm(translations.categories.editCategory)
        setIsEditMode(true)
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        console.log(id)
        setEditingCategoryId(id)
        
        const category = categories.find(c => c._id === id)
        if (category) {
            setName(category.name || '')
            setNameEn(category.nameEn || '')
            setDescription(category.description || '')
            setDescriptionEn(category.descriptionEn || '')
        } else {
            setErrors({general: translations.categories.categoryNotFound})
        }
    }
  }, [categories, translations.categories.editCategory, translations.categories.categoryNotFound, nameEn, descriptionEn])

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

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!name.trim()) {
      newErrors.name = translations.categories.nameRequired
    }
    if (!nameEn.trim()) {
      newErrors.nameEn = translations.categories.nameEnRequired
    }
    if (!description.trim()) {
      newErrors.description = translations.categories.descriptionRequired
    }
    if (!descriptionEn.trim()) {
      newErrors.descriptionEn = translations.categories.descriptionEnRequired
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
      const categoryData = {
        name,
        nameEn,
        description,
        descriptionEn,
        ...(isEditMode && editingCategoryId && { _id: editingCategoryId })
      }

      if (isEditMode && editingCategoryId) {
        await dispatch(updateCategory(categoryData as ICategory)).unwrap()
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
      setErrors({ general: error || translations.categories.saveError })
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
                <label className="block text-sm font-medium text-gray-700">{translations.categories.name}</label>
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
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.categories.description}</label>
                <textarea 
                  value={description} 
                  onChange={e => {
                    setDescription(e.target.value)
                    clearFieldError('description')
                  }} 
                  rows={4}
                  className={`mt-1 w-full rounded-md border shadow-sm focus:ring-blue-500 ${
                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`} 
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
 
            <div>
                <label className="block text-sm font-medium text-gray-700">{translations.categories.descriptionEn}</label>
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
                  {isLoading ? translations.categories.saving : translations.categories.save}
                </button>
                <Link to="/categories" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                  {translations.categories.cancel}
                </Link>
            </div>
        </div>
    </div>
    </>
    )
}
