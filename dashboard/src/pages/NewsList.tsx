import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchNews,INews } from '../store/slices/news/newsSlice';
import NewsCard from '../component/NewsCard';

export default function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.items);
  const status = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);

  useEffect(() => {
    dispatch(fetchNews(undefined));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">الأخبار</h1>

      {news.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          لا توجد أخبار متاحة حالياً.
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
