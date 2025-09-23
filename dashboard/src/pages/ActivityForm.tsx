import React, { useState, useEffect, useRef, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addActivity, clearError, clearStatus } from '../store/slices/activity/activitySlice';
import { AppDispatch, RootState } from '../store/store';
import ErrorDisplay from '../component/ErrorDisplay';

interface IActivity {
    name: string;
    description: string;
    date: string;
    location: string;
}

export default function ActivityForm() {
    const dispatch = useDispatch<AppDispatch>()
    const { status, error } = useSelector((s: RootState) => s.activities);
    const navigate = useNavigate();
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
    const [form, setForm] = useState<IActivity>({
        name: '',
        description: '',
        date: '',
        location: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const isMounted = useRef(false);
    const isEditMode = false; 

    // useEffect(() => {
    //     isMounted.current = true;
    //     // Assuming clearStatus exists in activitySlice, if not, it should be added.
    //     dispatch(clearStatus()); 
    //     dispatch(clearError());
    //     return () => {
    //         isMounted.current = false;
    //     };
    // }, [dispatch]);

  useEffect(() => {
    if(status == 'succeeded') {
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


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.name.trim()) newErrors.name = "اسم النشاط مطلوب";
        if (!form.description.trim()) newErrors.description = "وصف النشاط مطلوب";
        if (!form.date) newErrors.date = "تاريخ النشاط مطلوب";
        if (!form.location.trim()) newErrors.location = "موقع النشاط مطلوب";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            await dispatch(addActivity({ ...form, date: new Date(form.date) })).unwrap();
            
            if (!isEditMode) {
                setForm({ name: '', description: '', date: '', location: '' });
            }
        } catch (error: any) {
        } finally {
            setIsLoading(false);
            window.scrollTo(0, 0);
            if(status !== 'failed') {
                setTimeout(() => {
                    navigate('/activities');
                }, 3000);

            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <div className={`max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100 rtl`}>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{isEditMode ? "تعديل النشاط" : "إضافة نشاط جديد"}</h1>
            
            {/* Global error message */}
            <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

            {/* Success message */}
            {showSuccessMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-600">تم حفظ النشاط بنجاح</p>
              </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">اسم النشاط</label>
                    <input name="name" value={form.name} onChange={handleInputChange} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">الوصف</label>
                    <textarea name="description" value={form.description} onChange={handleInputChange} rows={4} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">التاريخ</label>
                    <input type="date" name="date" value={form.date} onChange={handleInputChange} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.date ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">الموقع</label>
                    <input name="location" value={form.location} onChange={handleInputChange} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.location ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button onClick={handleSubmit} disabled={isLoading} className={`w-full sm:w-auto flex-1 inline-flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {isLoading ? "جاري الحفظ..." : "حفظ"}
                    </button>
                    <Link to="/activities" className="w-full sm:w-auto flex-1 text-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                        الغاء
                    </Link>
                </div>
            </div>
        </div>
    );
}