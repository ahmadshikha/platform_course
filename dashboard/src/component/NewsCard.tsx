import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNews, clearError } from '../store/slices/news/newsSlice';

import Image from "../images/teacher-1758091670690-778911984.png"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

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
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const {error, status} = useSelector((s: RootState)=> s.news)
  // console.log(`http://localhost:5000${imageURL}`)
  const handleDelete = () => {
    // Dispatch the deleteNews async thunk, passing the unique ID of the news item.
    dispatch(deleteNews(_id) as any);
  };
    const handleDeleteCategory = async (categoryId: string) => {
      // setDeleteError(null);
      
      try {
        await dispatch(deleteNews(_id)as any);
        setShowDeleteConfirm(null);
      } catch (error: any) {
        setDeleteError(error || 'فشل بحذف الخبر');
      } finally {
        setDeletingNewsId(null);
      }
    };
  
    // Handle delete confirmation
    const confirmDelete = (categoryId: string) => {
      setShowDeleteConfirm(categoryId);
    };
  
    const cancelDelete = () => {
      setShowDeleteConfirm(null);
      setDeleteError(null);
    };
    {status == "failed" && (
      <>
      </>
    )}
  return (
    <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-contain" src={`http://localhost:5000${imageURL}`} alt={title} 
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
            <div className={`flex items-center justify-between border-t border-gray-100 px-4 py-3 `}>
              {/* <div className="text-xs text-gray-500">
                {new Date(category.createdAt).toLocaleDateString()}
              </div> */}
              <div className={`space-x-2 `}>
                {/* <button 
                  onClick={() => navigate(`/categories/id=${category._id}/edit`)} 
                  className="rounded-md border border-green-300 px-2 py-1 text-sm text-green-600 hover:bg-gray-50"
                >
                  {translations.categories.edit}
                </button> */}
                <button 
                  onClick={() => confirmDelete(_id)} 
                  disabled={deletingNewsId === _id}
                  className={`rounded-md border px-2 py-1 text-sm ${
                    deletingNewsId === _id 
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                      : 'border-red-300 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {deletingNewsId === _id ? "جاري الحذف..." : "حذف"}
                </button>
              </div>
            </div>
      </div>
          {showDeleteConfirm && (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={cancelDelete}></div> */}
          
          <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {/* <h3 className="text-lg font-medium leading-6 text-gray-900">{translations.categories.deleteConfirm}</h3> */}
                  <h3 className="text-lg font-medium leading-6 text-gray-900">تاكيد الحذف</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {/* {translations.categories.deleteMessage} */}
                      هل انت متاكد من حذف الفئة
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleDeleteCategory(showDeleteConfirm)}
                disabled={deletingNewsId === showDeleteConfirm}
                className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                  deletingNewsId === showDeleteConfirm
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deletingNewsId === showDeleteConfirm ? "جاري الحذف..." : "حذف"}
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                disabled={deletingNewsId === showDeleteConfirm}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* {translations.categories.cancel} */}
                الغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
