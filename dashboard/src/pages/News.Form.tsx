import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addNews } from '../store/slices/news/newsSlice';

export default function AddNewsForm() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    eventDate: '',
    imageURL: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    category: '',
    eventDate: '',
    imageURL: '',
  });

  const validate = () => {
    let valid = true;
    const newErrors = { title: '', content: '', category: '', eventDate: '', imageURL: '' };

    if (!form.title.trim()) {
      newErrors.title = 'العنوان مطلوب';
      valid = false;
    }
    if (!form.content.trim()) {
      newErrors.content = 'المحتوى مطلوب';
      valid = false;
    }
    if (!form.category.trim()) {
      newErrors.category = 'التصنيف مطلوب';
      valid = false;
    }
    if (!form.eventDate) {
      newErrors.eventDate = 'تاريخ الحدث مطلوب';
      valid = false;
    }
    if (!form.imageURL.trim()) {
      newErrors.imageURL = 'رابط الصورة مطلوب';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddNews = () => {
    if (!validate()) return;
    dispatch(addNews({ ...form, eventDate: new Date(form.eventDate) }));
    setForm({ title: '', content: '', category: '', eventDate: '', imageURL: '' }); // إعادة تعيين الحقول بعد الإضافة
  };

return (
<div className="space-y-6 max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
    📰 إضافة خبر جديد
  </h2>

  {/* العنوان */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">العنوان</label>
    <input
      type="text"
      placeholder="أدخل عنوان الخبر"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {errors.title && (
      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
    )}
  </div>

  {/* المحتوى */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">المحتوى</label>
    <textarea
      placeholder="أدخل تفاصيل الخبر"
      value={form.content}
      onChange={(e) => setForm({ ...form, content: e.target.value })}
      className="border border-gray-300 rounded-lg p-3 w-full h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {errors.content && (
      <p className="text-red-500 text-sm mt-1">{errors.content}</p>
    )}
  </div>

  {/* التصنيف */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">التصنيف</label>
    <input
      type="text"
      placeholder="مثال: رياضة، سياسة، تقنية..."
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
      className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {errors.category && (
      <p className="text-red-500 text-sm mt-1">{errors.category}</p>
    )}
  </div>

  {/* تاريخ الحدث */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">تاريخ الحدث</label>
    <input
      type="date"
      value={form.eventDate}
      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
      className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {errors.eventDate && (
      <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
    )}
  </div>

  {/* رابط الصورة */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">رابط الصورة</label>
    <input
      type="text"
      placeholder="ضع رابط الصورة هنا"
      value={form.imageURL}
      onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
      className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
    {errors.imageURL && (
      <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>
    )}
  </div>

  {/* زر الإرسال */}
  <button
    type="button"
    onClick={handleAddNews}
    disabled={status === "loading"}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
  >
    {status === "loading" ? "⏳ جاري الإضافة..." : "➕ إضافة الخبر"}
  </button>

  {/* رسالة خطأ عامة */}
  {/* {error && <p className="text-red-500 mt-3 text-center">{error}</p>} */}
</div>

);

}
