import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { deleteCourse, fetchCourses, clearError, _fetchTeacherCourses, fetchCategoryCourses } from '../store/slices/courses/coursesSlice';
import CourseCard from '../component/CourseCard';
import en from '../lang/en.json';
import ar from '../lang/ar.json';

export default function CategoryCourses() {
  const courses = useSelector((s: RootState) => s.courses.items);
  const status = useSelector((s: RootState) => s.courses.status);
  const error = useSelector((s: RootState) => s.courses.error);
  const { lang } = useSelector((s: RootState) => s.lang);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const pagination = useSelector((s: RootState) => (s.courses as any).pagination || { totalPages: 1, currentPage: 1, total: 0 });

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Translation
  const translate = {
    en,
    ar
  };
  const translations = translate[lang];

  // Delete state
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    // console.log({id});
    const _id = id.split('id=')[1]
    // console.log(_id)
    dispatch(fetchCategoryCourses({categoryId: _id,params: {page: currentPage, limit: itemsPerPage}}));
  }, [navigate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // // console.log('pagination')
  };

  // Validate date strings: accept ISO (YYYY-MM-DD) or long form (e.g., "January 15, 2024")
  const isValidDateFormat = (s: string | undefined) => {
    if (!s) return false;
    const iso = /^\d{2}-\d{2}-\d{4}$/;
    // const long = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s*\d{4}$/i;
    return iso.test(s.trim());
  };

  // Clear errors when user interacts
  const clearErrors = () => {
    setDeleteError(null);
  };

  const handleDeleteCourse = async (courseId: string) => {
    setDeletingCourseId(courseId);
    setDeleteError(null);
    
    try {
      await (dispatch(deleteCourse(courseId)) as any).unwrap();
      setShowDeleteConfirm(null);
      dispatch(clearError());

      // Handle pagination after delete similar to TeachersList
      const remainingItems = (pagination.total || 0) - 1; // Total items minus the deleted one
      const totalPages = Math.ceil(remainingItems / itemsPerPage);

      // If current page is empty and not the first page, go to previous page
      if (remainingItems === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (currentPage > totalPages && totalPages > 0) {
        // If current page exceeds total pages, go to last page
        setCurrentPage(totalPages);
      } else {
        // Refresh current page data
        dispatch(fetchCourses({ page: currentPage, limit: itemsPerPage }));
      }
    } catch (error) {
      setDeleteError('فشل حذف الكورس');
    } finally {
      setDeletingCourseId(null);
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">كورسات الفئة</h1>
          <Link to="/courses/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {translations.courses.addCourse}
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">جاري تحميل الفئات...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">كورسات الصنف</h1>
          <Link to="/courses/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {/* {translations.courses.addCourse} */}
            اضافة كورس
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">حصل خطأ</h3>
              <div className="mt-2 text-sm text-red-700">
                {/* <p>{error || translations.teacherCourses.failed}</p> */}
                {error == "معرف غير صالح"? "الاستاذ غير موجود": "حدث خطأ"}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/courses')}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  تجاهل
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-2xl font-bold text-gray-900">{translations.teacherCourses.title}</h1> */}
        <h1 className="text-2xl font-bold text-gray-900">كورسات الصنف</h1>
        <Link to="/courses/new" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {/* {translations.courses.addCourse} */}
          اضافة كورس
        </Link>
      </div>

      {/* Error Messages */}
      {deleteError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              {/* <h3 className="text-sm font-medium text-red-800">{translations.courses.deleteError}</h3> */}
              <h3 className="text-sm font-medium text-red-800">خطأ بالحذف</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{deleteError}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearErrors}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  تجاهل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {!Array.isArray(courses) || courses.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {/* <h3 className="mt-2 text-sm font-medium text-gray-900">{translations.courses.noCourses}</h3> */}
          <h3 className="mt-2 text-sm font-medium text-gray-900">لايوجد كورسات</h3>
          {/* <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p> */}
          <p className="mt-1 text-sm text-gray-500">ابدأ بإنشاء كورس جديد.</p>
          <div className="mt-6">
            <Link to="/courses/new" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {/* {translations.courses.addCourse} */}
              اضافة كورس
            </Link>
          </div>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(courses) && courses.map((course) => (
            <div key={course._id}>
              <CourseCard
                course={course}
                onEdit={(courseId) => navigate(`/courses/${courseId}/edit`)}
                onDelete={(courseId) => setShowDeleteConfirm(courseId)}
              />

            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage == 1}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
              التالي
            </button>
          </div>
        )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDeleteConfirm(null)}></div> */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{translations.courses.deleteConfirm}</h3>
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">{translations.courses.deleteMessage}</p> */}
                      <p className="text-sm text-gray-500">هل انت متاكد من حذف الكورس؟</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleDeleteCourse(showDeleteConfirm)}
                  disabled={deletingCourseId === showDeleteConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {/* {deletingCourseId === showDeleteConfirm ? translations.courses.deleting : translations.courses.delete} */}
                  {deletingCourseId === showDeleteConfirm ? "جاري الحذف..." : "حذف"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {/* {translations.courses.cancel} */}
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
