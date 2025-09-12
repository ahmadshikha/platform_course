import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { deleteTeacher, fetchTeachers } from '../store/slices/teachers/teachersSlice';

function TeachersList() {
  const teachers = useSelector((s: RootState) => s.teachers.items);
  const pagination = useSelector((s: RootState) => s.teachers.pagination);
  const status = useSelector((s: RootState) => s.teachers.status);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    dispatch(fetchTeachers({ page: currentPage, limit: itemsPerPage }));
    console.log(pagination.currentPage === pagination.totalPages)
  }, [currentPage, itemsPerPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Teachers</h1>
        <Link to="/teachers/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Add teacher</Link>
      </div>

    {status === 'loading' && (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">Loading teachers...</div>
    )}

    {status === 'failed' && (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">Failed to load teachers. Please try again.</div>
    )}

    {status === 'succeeded' && teachers.length === 0 && (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">No teachers yet.</div>
    )}

    {status === 'succeeded' && teachers.length > 0 && (
      <>
        {/* Pagination info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((pagination.currentPage - 1) * itemsPerPage) + 1}-{Math.min(pagination.currentPage * itemsPerPage, pagination.total)} of {pagination.total} teachers
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map(t => (
          <div key={t._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-4 p-4">
              <img src={t.image || '/placeholder.svg'} alt={t.name} className="h-16 w-16 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-base font-semibold text-gray-900">{t.name}</h3>
                  <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{t.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                {t.title && <p className="truncate text-sm text-gray-600">{t.title}</p>}
              </div>
            </div>
            <div className="px-4 pb-4 text-sm text-gray-700">
              {t.bio && <p className="line-clamp-3">{t.bio}</p>}
              {t.specialties && t.specialties.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {t.specialties.slice(0, 4).map((sp, i) => (
                    <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{sp}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>⭐ {t.rating ?? 0}</span>
                <span>👥 {t.students ?? 0}</span>
                <span>📚 {t.course ?? 0}</span>
              </div>
              <div className="space-x-2">
                <button onClick={() => navigate(`/teachers/id=${t._id}/edit`)} className="rounded-md border border-green-300 px-2 py-1 text-sm text-green-600 hover:bg-gray-50">Edit</button>
                <button onClick={() => { if (confirm('Delete teacher?')) dispatch(deleteTeacher(t._id) as any); }} className="rounded-md border border-red-300 px-2 py-1 text-sm text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
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
              Previous
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
              Next
            </button>
          </div>
        )}
      </>
    )}
    </div>
  );
}

export default TeachersList;