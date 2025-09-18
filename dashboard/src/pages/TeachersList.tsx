import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { deleteTeacher, fetchTeachers, clearError } from '../store/slices/teachers/teachersSlice';
import en from '../lang/en.json';
import ar from '../lang/ar.json';

import image from '../images/teacher-1758091670690-778911984.png'

function TeachersList() {
  const teachers = useSelector((s: RootState) => {
    const activTeachers = s.teachers.items.filter(t => t.isActive);
    return activTeachers;
  });
  const pagination = useSelector((s: RootState) => s.teachers.pagination);
  const status = useSelector((s: RootState) => s.teachers.status);
  const error = useSelector((s: RootState) => s.teachers.error);
  const { lang } = useSelector((s: RootState) => s.lang);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Translation
  const translate = {
    en,
    ar
  };
  const translations = translate[lang];
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Delete state
  const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  useEffect(() => {
    dispatch(fetchTeachers({ page: currentPage, limit: itemsPerPage }));
    console.log(pagination.currentPage === pagination.totalPages)
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear errors when user interacts
  const clearErrors = () => {
    setDeleteError(null);
  };

  // Handle delete teacher
  const handleDeleteTeacher = async (teacherId: string) => {
    setDeletingTeacherId(teacherId);
    setDeleteError(null);
    
    try {
      await dispatch(deleteTeacher(teacherId)).unwrap();
      setShowDeleteConfirm(null);
      // Clear Redux errors after successful operation
      dispatch(clearError());
      
      // Handle pagination after delete
      const remainingItems = pagination.total - 1; // Total items minus the deleted one
      const totalPages = Math.ceil(remainingItems / itemsPerPage);
      
      // If current page is empty and not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (currentPage > totalPages && totalPages > 0) {
        // If current page exceeds total pages, go to last page
        setCurrentPage(totalPages);
      } else {
        // Refresh current page data
        dispatch(fetchTeachers({ page: currentPage, limit: itemsPerPage }));
      }
    } catch (error: any) {
      setDeleteError(error || 'Failed to delete teacher');
    } finally {
      setDeletingTeacherId(null);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (teacherId: string) => {
    setShowDeleteConfirm(teacherId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
    setDeleteError(null);
  };

  // Helper function to get language-specific properties
  // const getLocalizedProperty = (teacher: any, property: string) => {
  //   if (lang === 'ar') {
  //     return teacher[property] || teacher[property + 'En'] || '';
  //   } else {
  //     return teacher[property + 'En'] || teacher[property] || '';
  //   }
  // };

  return (
    <div className={`space-y-6 `}>
      <div className="flex items-center justify-between">
        {/* <h1 className="text-xl font-semibold">{translations.teachers.title}</h1> */}
        <h1 className="text-xl font-semibold">الاساتذة</h1>
        <Link to="/teachers/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">اضافة استاذ</Link>
      </div>

      {/* Global error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">حدث خطأ</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearErrors}
                  className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  {/* {translations.teachers.dismiss} */}
                  تجاهل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete error message */}
      {deleteError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">خطأ بالحذف</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{deleteError}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearErrors}
                  className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  {/* {translations.teachers.dismiss} */}
                  تجاهل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    {status === 'loading' && (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">جاري تحميل الاساتذة</div>
    )}

    {status === 'failed' && (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">خطا بنحميل الاساتذة</div>
    )}

    {status === 'succeeded' && teachers.length === 0 && (
      <div className="rounded-lg text-center border border-gray-200 bg-white p-6 text-gray-500">لا يوجد اساتذة</div>
    )}

    {status === 'succeeded' && teachers.length > 0 && (
      <>
        {/* Pagination info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            عرض {((pagination.currentPage - 1) * itemsPerPage) + 1}-{Math.min(pagination.currentPage * itemsPerPage, pagination.total)} من {pagination.total} اساتذة
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map(t => 
          {
          return (
          <div  key={t._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div onClick={() => navigate(`/teacher-courses/id=${t._id}`)} className={`flex items-center gap-4 p-4 `}>
              <img src={`http://localhost:5000${t.image}`} alt="الاسم"
              onError={(e)=> {
                e.currentTarget.src = image
              }}
              className="h-16 w-16 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className={`flex items-center justify-between `}>
                  <h3 className="truncate text-base font-semibold text-gray-900">{t.name}</h3>
                  <span className={` inline-flex items-center rounded-full px-2 py-0.5 text-xs ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{t.isActive ? "نشط" : "غير نشط"}</span>
                </div>
                {/* <p className="truncate text-sm text-gray-600">{t.}</p> */}
              </div>
            </div>
            <div className="px-4 pb-4 text-sm text-gray-700">
              <p className="line-clamp-3">{t.bio}</p>
              {(() => {
                const specialties = t.specialties;
                return t.specialties && specialties.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {specialties.slice(0, 4).map((sp, i) => (
                      <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{sp}</span>
                    ))}
                  </div>
                );
              })()}
            </div>
            <div className={`flex items-center justify-between border-t border-gray-100 px-4 py-3 `}>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>⭐ {t.rating ?? 0}</span>
                <span>👥 {t.students ?? 0}</span>
                <span>📚 {t.course ?? 0}</span>
              </div>
              <div className={`space-x-2 `}>
                <button 
                  onClick={() => navigate(`/teachers/id=${t._id}/edit`)} 
                  className="rounded-md border border-green-300 px-2 py-1 text-sm text-green-600 hover:bg-gray-50"
                >
                  {/* {translations.teachers.edit} */}
                  تعديل
                </button>
                <button 
                  onClick={() => confirmDelete(t._id)} 
                  disabled={deletingTeacherId === t._id}
                  className={`rounded-md border px-2 py-1 text-sm ${
                    deletingTeacherId === t._id 
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                      : 'border-red-300 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {deletingTeacherId === t._id ? "جاري الحذف..." : "حذف"}
                </button>
              </div>
            </div>
          </div>
        )})}
        </div>

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage == 1}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translations.teachers.previous}
            </button>
            
            {/* Page numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-md px-3 py-1 text-sm ${
                    pagination.currentPage == page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(Number(pagination.currentPage) + 1)}
              disabled={pagination.currentPage == pagination.totalPages}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translations.teachers.next}
            </button>
          </div>
        )}
      </>
    )}

    {/* Delete Confirmation Dialog */}
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
                  {/* <h3 className="text-lg font-medium leading-6 text-gray-900">{translations.teachers.deleteConfirm}</h3> */}
                  <h3 className="text-lg font-medium leading-6 text-gray-900">حذف الاستاذ</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {/* {translations.teachers.deleteMessage} */}
                      هل انت متاكد من حذف الاستاذ
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleDeleteTeacher(showDeleteConfirm)}
                disabled={deletingTeacherId === showDeleteConfirm}
                className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                  deletingTeacherId === showDeleteConfirm
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deletingTeacherId === showDeleteConfirm ? "جاري الحذف..." : "حذف"}
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                disabled={deletingTeacherId === showDeleteConfirm}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* {translations.teachers.cancel} */}
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

export default TeachersList;