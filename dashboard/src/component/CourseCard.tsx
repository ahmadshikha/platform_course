import React from 'react';
import { Course } from '../store/slices/courses/coursesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import en from '../lang/en.json';
import ar from '../lang/ar.json';

interface CourseCardProps {
  course: Course;
  onEdit: (courseId: string) => void;
  onDelete: (courseId: string) => void;
}

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  // const { lang } = useSelector((s: RootState) => s.lang);
  let date = new Date(course.date);
  // Use toLocaleDateString for better formatting and localization potential
  let dateString = date.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' });
  // Translation
  // const translate = {
  //   en,
  //   ar
  // };
  // const translations = translate[lang];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متوفر':
        return 'bg-green-100 text-green-800';
      case 'ممتلئ':
        return 'bg-yellow-100 text-yellow-800';
      case 'ملغى':
        return 'bg-red-100 text-red-800';
      case 'مكتمل':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // const getStatusText = (status: string) => {
  //   return translations.courses.status[status as keyof typeof translations.courses.status] || status;
  // };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate" title={course.title}>{course.title}</h3>
            <p className="text-sm text-gray-500">{course.type}</p>
          </div>
          <span className={`flex-shrink-0 ml-2 rtl:ml-0 rtl:mr-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4 border-t border-b border-gray-100 py-4">
          <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg><span>{dateString}</span></div>
          <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg><span>{course.time}</span></div>
          <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg><span>{course.location}</span></div>
          <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM13.25 4.97a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM6.75 12.97a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM17.25 9.25a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM2.75 9.25a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM13.25 12.97a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM6.75 4.97a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L5.69 6.03a.75.75 0 010-1.06z" /></svg><span>{course.duration}</span></div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-800">{course.price}</span>
            <span className="text-sm text-gray-500 ml-1 rtl:mr-1 rtl:ml-0">/ليرة</span>
          </div>
          <div className="text-right rtl:text-left">
            <p className="text-sm font-medium text-gray-700">{course.enrolled}/{course.seats}</p>
            <p className="text-xs text-gray-500">مقعد</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2" title={course.description}>
          {course.description}
        </p>
      </div>

      <div className="bg-gray-50/70 px-6 py-3 border-t border-gray-200 flex items-center justify-end space-x-2 rtl:space-x-reverse">
        <button
          onClick={() => onEdit(course._id)}
          className="p-2 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
          aria-label="Edit course"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
        </button>
        <button
          onClick={() => onDelete(course._id)}
          className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
          aria-label="Delete course"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </div>
  );
}
