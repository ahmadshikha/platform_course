import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNews } from '../store/slices/news/newsSlice';

import Image from "../images/teacher-1758091670690-778911984.png"

interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageURL: string;
  category: string;
  eventDate: Date;
}

export default function NewsCard({ _id, title, content, imageURL, category, eventDate }: NewsCardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Dispatch the deleteNews async thunk, passing the unique ID of the news item.
    dispatch(deleteNews(_id) as any);
  };
  
  return (
    <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-contain" src={imageURL} alt={title} 
      onError={(e)=> {
        e.currentTarget.src = Image
      }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-base">
          {content.length > 100 ? content.substring(0, 100) + '...' : content}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-gray-500">{category}</span>
          <span className="text-gray-500">{new Date(eventDate).toLocaleDateString()}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button
          onClick={handleDelete}
           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
