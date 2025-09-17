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
  const { lang } = useSelector((s: RootState) => s.lang);

  // Translation
  // const translate = {
  //   en,
  //   ar
  // };
  // const translations = translate[lang];
  const translate = {
    en,
    ar
  };
  const translations = translate[lang];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // const getStatusText = (status: string) => {
  //   return translations.courses.status[status as keyof typeof translations.courses.status] || status;
  // };
  const getStatusText = (status: string) => {
    return translations.courses.status[status as keyof typeof translations.courses.status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {/* {lang === 'ar' ? course.title : course.titleEn} */}
              {course.title}
            </h3>
            <p className="text-sm text-gray-600">
              {/* {lang === 'ar' ? course.type : course.typeEn} */}
              {course.type}
            </p>
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(course.status)}`}>
            {/* {course.status} */}
            {getStatusText(course.status)}
          </span>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {/* {translations.courses.card.date} */}
              التاريخ
            </p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.date}</p>
            <p className="text-sm text-gray-900">{course.date}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {/* {translations.courses.card.time} */}
              الوقت
            </p>
            {/* <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.time}</p> */}
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">الوقت</p>
            <p className="text-sm text-gray-900">{course.time}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {/* {translations.courses.card.location} */}
              الموقع
            </p>
            {/* <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.location}</p> */}
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">الموقع</p>
            <p className="text-sm text-gray-900">
              {/* {lang === 'ar' ? course.location : course.locationEn} */}
              {course.location}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {/* {translations.courses.card.duration} */}
              المدة
            </p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.duration}</p>
            <p className="text-sm text-gray-900">{course.duration}</p>
          </div>
        </div>

        {/* Price and Seats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {/* {translations.courses.card.price} */}
                السعر
              </p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.price}</p>
              <p className="text-lg font-semibold text-gray-900">${course.price}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {/* {translations.courses.card.seats} */}
                المقاعد
              </p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{translations.courses.card.seats}</p>
              <p className="text-sm text-gray-900">
                {course.enrolled}/{course.seats}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">{course.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {/* {translations.courses.card.description} */}
            وصف الكورس
          </p>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{translations.courses.card.description}</p>
          <p className="text-sm text-gray-700 line-clamp-2">
            {/* {lang === 'ar' ? course.description : course.descriptionEn} */}
            {course.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onEdit(course._id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {/* {translations.courses.edit} */}
            تعديل
          </button>
          <button
            onClick={() => onDelete(course._id)}
            className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            حذف
            {/* {translations.courses.delete} */}
          </button>
        </div>
      </div>
    </div>
  );
}
