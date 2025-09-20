import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchNews,INews } from '../store/slices/news/newsSlice';
import NewsCard from '../component/NewsCard';
import { Link } from 'react-router-dom';

export default function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.items);
  const {error, status} = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews(undefined));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
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
