import React from 'react';

interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageURL: string;
  category: string;
  eventDate: Date;
}

export default function NewsCard({ _id, title, content, imageURL, category, eventDate }: NewsCardProps) {
  return (
    <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageURL} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-base">
          {content.length > 100 ? content.substring(0, 100) + '...' : content}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-gray-500">{category}</span>
          <span className="text-gray-500">{new Date(eventDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
