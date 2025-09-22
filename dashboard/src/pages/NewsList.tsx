import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchNews,INews,clearError, clearStatus } from '../store/slices/news/newsSlice';
import NewsCard  from '../component/NewsCard';
import { Link, useNavigate } from 'react-router-dom';

export default function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.items);
  const {error, status} = useSelector((state: RootState) => state.news);
  const navigate = useNavigate()
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
  useEffect(() => {
    dispatch(fetchNews(undefined));
  }, [dispatch]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* <h1 className="text-xl font-semibold">{translations.courses.title}</h1> */}
          <h1 className="text-2xl font-bold">الاخبار</h1>

        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            {/* <p className="mt-2 text-sm text-gray-600">{translations.courses.loading}</p> */}
            <p className="mt-2 text-sm text-gray-600">جاري تحميل الاخبار</p>
          </div>
        </div>
      </div>
    );
  }
  if (status === 'failed') {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">{error}</div>

  }

  return (
    <div className="space-y-6 ">
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-2xl font-bold">الأخبار</h1>
    <Link
      to="/news/new"
      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      اضافة خبر
    </Link>
  </div>

  {/* Content */}
  {news.length === 0 ? (
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500 text-center">
      لا يوجد اخبار
    </div>

        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <NewsCard {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
