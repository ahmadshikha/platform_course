import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { deleteCourse } from '../store/slices/courses/coursesSlice';

export default function CourseList() {
  const courses = useSelector((s: RootState) => s.courses.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Courses</h1>
        <Link to="/courses/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Add course</Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={8}>No courses yet.</td>
              </tr>
            )}
            {courses.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.title}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">{c.time}</td>
                <td className="px-4 py-2">{c.location}</td>
                <td className="px-4 py-2">{c.price}</td>
                <td className="px-4 py-2">{c.location}</td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{c.status}</span>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button onClick={() => navigate(`/courses/${c._id}/edit`)} className="rounded-md border border-green-300 px-2 py-1 text-sm text-green-600 hover:bg-gray-50">Edit</button>
                  <button onClick={() => { if (confirm('Delete course?')) dispatch(deleteCourse(c._id)); }} className="rounded-md border border-red-300 text-red-600 px-2 py-1 text-sm hover:bg-red-50">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
