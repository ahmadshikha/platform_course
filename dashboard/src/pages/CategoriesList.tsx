import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { deleteCategory, fetchCategories, clearError, clearStatus } from '../store/slices/categories/categoriesSlice';
import en from '../lang/en.json';
import ar from '../lang/ar.json';
import ErrorDisplay from '../component/ErrorDisplay';


import avatar from '../images/teacher-1758091670690-778911984.png'

function CategoriesList() {
  const categories = useSelector((s: RootState) => s.categories.items);
  const pagination = useSelector((s: RootState) => s.categories.pagination);
  const status = useSelector((s: RootState) => s.categories.status);
  const error = useSelector((s: RootState) => s.categories.error);
  // const { lang } = useSelector((s: RootState) => s.lang);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Translation
  // const translate = {
  //   en,
  //   ar
  // };
  // const translations = translate[lang];
      // console.log(categories)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Delete state
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
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
    dispatch(fetchCategories({ page: currentPage, limit: itemsPerPage }));
    // if(status !== "idle") dispatch(clearStatus())
    
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [currentPage, itemsPerPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear errors when user interacts
  const clearErrors = () => {
    setDeleteError(null);
    dispatch(clearError())
  };
  // Handle delete category
  const handleDeleteCategory = async (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setDeleteError(null);
    
    try {
      await dispatch(deleteCategory(categoryId)).unwrap();
      setShowDeleteConfirm(null);
      // Clear Redux errors after successful operation
      dispatch(clearError());
      
      // Handle pagination after delete
      const remainingItems = pagination.totalItems - 1; // Total items minus the deleted one
      const totalPages = Math.ceil(remainingItems / itemsPerPage);
      
      // If current page is empty and not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (currentPage > totalPages && totalPages > 0) {
        // If current page exceeds total pages, go to last page
        setCurrentPage(totalPages);
      } else {
        // Refresh current page data
        dispatch(fetchCategories({ page: currentPage, limit: itemsPerPage }));
      }
    } catch (error: any) {
      setDeleteError(error || 'Failed to delete category');
    } finally {
      setDeletingCategoryId(null);
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



  return (
    <div className={`space-y-4`}>
      <div className="flex items-center justify-between">
        {/* <h1 className="text-xl font-semibold">{translations.categories.title}</h1> */}
        <h1 className="text-2xl font-bold">الفئات</h1>
        {/* <Link to="/categories/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">{translations.categories.addCategory}</Link> */}
        <Link to="/categories/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">اضافة فئة</Link>
      </div>

      {/* Global error message */}
      <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

      {/* Delete error message */}
      {/* {deleteError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">خطا بالحذف</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{deleteError}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearErrors}
                  className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  تجاهل
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

    {status === 'loading' && (
      // <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">{translations.categories.loading}</div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">جاري تحميل الفئات</div>
    )}

    {status === 'failed' && (
      // <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">{translations.categories.failed}</div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">فشل بتحميل الفئات</div>
    )}

    {status !== "loading" && status !== "failed" && categories.length === 0 && (
      // <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">{translations.categories.noCategories}</div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">لايوجد فئات</div>
    )}

    {categories.length > 0 && (
      <>
        {/* Pagination info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            {/* {translations.categories.showing} {((pagination.currentPage - 1) * itemsPerPage) + 1}-{Math.min(pagination.currentPage * itemsPerPage, pagination.totalItems)} {translations.categories.of} {pagination.totalItems} {translations.categories.categories} */}
            اظهار {((pagination.currentPage - 1) * itemsPerPage) + 1}-{Math.min(pagination.currentPage * itemsPerPage, pagination.totalItems)} من {pagination.totalItems} فئات
          </div>
        </div>
        {/* categories list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category)=> {
            return (
              <div key={category._id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={`http://localhost:5000${category.image}`} 
                    alt={category.name} 
                    className="w-full h-full object-fill"
                    onError={(e) => { e.currentTarget.src = avatar }}
                  />
                  <div 
                    onClick={() => navigate(`/category-courses/id=${category._id}`)} 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent cursor-pointer"
                  ></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold truncate">{category.name}</h3>
                  </div>
                  <button
                    onClick={() => confirmDelete(category._id)}
                    disabled={deletingCategoryId === category._id}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-red-500/80 transition-colors"
                    aria-label="Delete category"
                  >
                    {deletingCategoryId === category._id ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{category.description}</p>
                </div>
              </div>
            )
          } )}
        </div>

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage == 1}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* {translations.categories.previous} */}
              السابق
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
              {/* {translations.categories.next} */}
              التالي
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
                disabled={deletingCategoryId === showDeleteConfirm}
                className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                  deletingCategoryId === showDeleteConfirm
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deletingCategoryId === showDeleteConfirm ? "جاري الحذف..." : "حذف"}
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                disabled={deletingCategoryId === showDeleteConfirm}
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

export default CategoriesList;