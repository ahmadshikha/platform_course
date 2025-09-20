import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addNews, clearStatus, clearError } from "../store/slices/news/newsSlice";
import { Link, useNavigate } from "react-router-dom";
import ErrorDisplay from "../component/ErrorDisplay";

export default function AddNewsForm() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const isMounted = useRef(false);

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
  }, [dispatch]);



  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imageURL, setImageURL] = useState<HTMLInputElement>();

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: "",
    eventDate: "",
    imageURL: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { title: "", content: "", category: "", eventDate: "", imageURL: "" };

    if (!title.trim()) {
      newErrors.title = "العنوان مطلوب";
      valid = false;
    }
    if (!content.trim()) {
      newErrors.content = "المحتوى مطلوب";
      valid = false;
    }
    if (!category.trim()) {
      newErrors.category = "التصنيف مطلوب";
      valid = false;
    }
    if (!eventDate) {
      newErrors.eventDate = "تاريخ الحدث مطلوب";
      valid = false;
    }
    if (!imageURL) {
      newErrors.imageURL = "رابط الصورة مطلوب";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddNews = () => {
    if (!validate()) return;
    try{
      setIsLoading(true)
      setShowSuccessMessage(false);
      const newsData = {
        title: title,
        content: content,
        category: category,
        eventDate: new Date(eventDate),
        imageURL: imageURL,
      }
      // console.log(newsData)
      dispatch(addNews(newsData));
      setTitle('')
      setContent('')
      setCategory('')
      setEventDate('')
      setImageURL(undefined)
            
    }catch(e) {
      
    } finally {
      setIsLoading(false)
      if(status !== 'failed') {
          setTimeout(() => {
            navigate('/news');
          }, 3000);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header row like Activities UI */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">إضافة خبر جديد</h1>
      </div>

      {/* Form card */}
      <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100 space-y-6">
        {/* Success message */}
        {showSuccessMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">تم إضافة الخبر بنجاح</p>
          </div>
        )}

        {/* Global error message */}
        <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

        {/* العنوان */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">العنوان</label>
          <input
            type="text"
            placeholder="أدخل عنوان الخبر"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* المحتوى */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">المحتوى</label>
          <textarea
            placeholder="أدخل تفاصيل الخبر"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        {/* التصنيف */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">التصنيف</label>
          <input
            type="text"
            placeholder="مثال: رياضة، سياسة، تقنية..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* تاريخ الحدث */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">تاريخ الحدث</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
        </div>

        {/* رابط الصورة */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">رابط الصورة</label>
          <input
            type="file"
            placeholder="ضع رابط الصورة هنا"
            // value={form.imageURL}
            onChange={(e) => setImageURL(e.target)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.imageURL && <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>}
        </div>

        {/* زر الإرسال */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button onClick={handleAddNews} disabled={isLoading} className={`w-full sm:w-auto flex-1 inline-flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {isLoading ? "جاري الحفظ..." : "حفظ"}
                    </button>
                    <Link to="/news" className="w-full sm:w-auto flex-1 text-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                        الغاء
                    </Link>
                </div>
      </div>
    </div>
  );
}
