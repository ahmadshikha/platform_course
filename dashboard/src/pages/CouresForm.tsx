import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Course } from "../store/slices/courses/coursesSlice";
import { fetchTeachers } from '../store/slices/teachers/teachersSlice';
import { fetchCategories } from '../store/slices/categories/categoriesSlice';
import { addCourse, updateCourse, clearStatus, clearError } from '../store/slices/courses/coursesSlice';
import { ITeacher } from '../store/slices/teachers/teachersSlice';

import ErrorDisplay from "../component/ErrorDisplay";
export function CourseForm() {
    const { id: idww } = useParams<{ id?: string }>();
	const courseId = idww; 
    const [isEditMode, setIsEditMode] = useState(false)
    const [actionForm, setActionForm] = useState("اضافة كورس")
    
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState<Date | null>();
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<"متوفر" | "ممتلئ" | "ملغى" | "مكتمل">("متوفر");
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState(1);
    const [enrolled, setEnrolled] = useState(0)
    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");
    const [teacher, setTeacher] = useState<ITeacher | null>(null);
    const [categoryId, setCategoryId] = useState<string>("");
    const [isActive, setActive] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const isMounted = useRef(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
    const teachers = useSelector((s: RootState) => s.teachers.items);
    const categories = useSelector((s: RootState) => s.categories.items);
    const courses = useSelector((s: RootState) => s.courses);
    const teachersStatus = useSelector((s: RootState) => s.teachers.status);
    const categoriesStatus = useSelector((s: RootState) => s.categories.status);
    const coursesStatus = useSelector((s: RootState) => s.courses.status);
    const coursesError = useSelector((s: RootState) => s.courses.error);
    useEffect(() => {
        if(coursesStatus == 'succeeded') {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            dispatch(clearError());
            dispatch(clearStatus())
        }
        if(coursesError == 'يجب تسجيل الدخول اولاً' || coursesError == "انتهت صلاحية الجلسة ..") {
            setTimeout(() => {
                navigate('/login');
                dispatch(clearError());
                dispatch(clearStatus())
            }, 500);
        }
    }, [coursesStatus, coursesError]);
    useEffect(() => {
        dispatch(clearStatus());
        dispatch(clearError());
    }
    ,[dispatch]
    );


    useEffect(() => {
        setErrors({});
        const url = window.location.href
        if(url.includes("/edit")) {
            setActionForm("تعديل كورس")
            setIsEditMode(true)
            const course = courses.items.find(c => c._id === courseId);
            if (course) {
                setId(course.id);
                setTitle(course.title);
                setType(course.type);
                setDate(course.date ? new Date(course.date) : null);
                setTime(course.time);
                setDuration(course.duration);
                setLocation(course.location);
                setStatus(course.status);
                setEnrolled(course.enrolled)
                setPrice(course.price);
                setSeats(course.seats);
                setDescription(course.description);
                setDetails(course.details)
                setTeacher((course as any).teacher || null);
                const courseCat = (course as any).categoryId;
                setCategoryId(courseCat ? (courseCat._id || courseCat) : '');
                setActive(course.isActive);
            }
        }
        else {
            dispatch(fetchTeachers({}))
            dispatch(fetchCategories({}))
        }
        return ()=> {
            setErrors({});
        }
    }, [isEditMode, courseId, courses.items]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!id.trim()) {
            newErrors.id = 'معرف الكورس مطلوب';
        }
        if (!title.trim()) {
            newErrors.title = 'العنوان مطلوب';
        }

        if (!type.trim()) {
            newErrors.type = 'النوع مطلوب';
        }

        if (!date) {
            newErrors.date = 'التاريخ مطلوب';
        }
        if (!time.trim()) {
            newErrors.time = 'الوقت مطلوب';
        }
        if (!duration.trim()) {
            newErrors.duration = 'فترة الكورس مطلوبة';
        }
        if (!location.trim()) {
            newErrors.location = 'الموقع مطلوب';
        }

        if (!price.trim()) {
            newErrors.price = 'السعر مطلوب';
        }
        if (!description.trim()) {
            newErrors.description = 'الوصف مطلوب';
        }
        if (!details.trim()) {
            newErrors.details = 'تفاصيل الكورس مطلوبة';
        }

        if (!teacher) {
            newErrors.teacher = 'الاستاذ مطلوب';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setShowSuccessMessage(false);
        setErrors({});

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const selectedCategory = categoryId ? categories.find((c: any) => c._id === categoryId) : undefined;

            const courseData = {
                id: id.trim(),
                title: title.trim(),
                type: type.trim(),
                date: date,
                time: time.trim(),
                duration: duration.trim(),
                location: location.trim(),
                status,
                price: price.trim(),
                seats,
                description: description.trim(),
                details: details.trim(),
                teacher,
                categoryId: selectedCategory || undefined,
                isActive
            };

            if (isEditMode && courseId) {
                await dispatch(updateCourse({ courseId, courseData }));
            } else {
                    const newCourseData = {
                    ...courseData,
                    enrolled: 0,
                    rating: 0,
                    reviews: 0,
                };
                await dispatch(addCourse(newCourseData));
            }
            setErrors({});
        } catch (error) {
            setSubmitError('Failed to create course. Please try again.');
        } finally {
            setIsSubmitting(false);
            window.scrollTo(0, 0);
            if(coursesStatus !== 'failed') {
                setTimeout(() => {
                    navigate('/courses');
                }, 3000);
            }
        }
    };

    return(
    <>
    <div className={`max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100`}>
		<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{actionForm}</h1>
		
		<ErrorDisplay error={submitError || coursesError} onDismiss={() => { setSubmitError(null); dispatch(clearError()); }} />

        {showSuccessMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">تم حفظ الكورس بنجاح</p>
            </div>
        )}
		<form className="space-y-6">
				<div>
					<label className="block text-gray-700 font-medium mb-2">معرف الكورس *</label>
					<input value={id} onChange={e => {setId(e.target.value); }} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.id ? 'border-red-500' : 'border-gray-300'}`} required />
					<p className="mt-1 text-sm text-gray-500">معرف فريد للطلب</p>
					{errors.id && <p className="mt-1 text-sm text-red-600">{errors.id}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">العنوان *</label>
					<input value={title} onChange={e => setTitle(e.target.value)} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">نوع *</label>
					<input value={type} onChange={e => setType(e.target.value)} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.type ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">التاريخ *</label>
					<input type="date" value={date ? date.toISOString().split('T')[0] : ''} onChange={e => setDate(e.target.value ? new Date(e.target.value) : null)} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.date ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">الوقت *</label>
					<input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g., 09:00, 2:30 PM, 14:30" className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.time ? 'border-red-500' : 'border-gray-300'}`} required />
					<p className="mt-1 text-sm text-gray-500">ادخل الوقت كنص (e.g., "09:00", "2:30 PM", "14:30")</p>
					{errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">خلال *</label>
					<input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 2 hours, 3 days" className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.duration ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2"> الموقع*</label>
					<input value={location} onChange={e => setLocation(e.target.value)} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.location ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">الحالة</label>
					<select value={status} onChange={e => setStatus(e.target.value as 'متوفر' | 'ممتلئ' | 'ملغى' | 'مكتمل')} className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border-gray-300">
						<option value="متوفر">متوفر</option>
						<option value="ممتلئ">ممتلئ</option>
						<option value="ملغى">ملغى</option>
						<option value="مكتمل">مكتمل</option>
					</select>
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">السعر *</label>
					<input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 100, 150.50" className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.price ? 'border-red-500' : 'border-gray-300'}`} required />
					<p className="mt-1 text-sm text-gray-500">(e.g., "100" or "150.50") ادخل السعر </p>
					{errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">المقاعد *</label>
					<input type="number" min="1" value={seats} onChange={e => setSeats(Number(e.target.value))} className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border-gray-300" required />
				</div>
				<div>
					<label className=" text-gray-700 font-medium mb-2"><p className="inline text-red-500 text-xs">للقراءة فقط</p> عدد المسجلين</label>
					<input type="number" disabled={true} min="1" value={enrolled} onChange={e => setSeats(Number(e.target.value))} className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border-gray-300" required />
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">الوصف *</label>
					<textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">التفاصيل *</label>
					<textarea value={details} onChange={e => setDetails(e.target.value)} rows={3} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.details ? 'border-red-500' : 'border-gray-300'}`} required />
					{errors.details && <p className="mt-1 text-sm text-red-600">{errors.details}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">الاستاذ *</label>
					<select
                        value={teacher?._id || ''}
                        onChange={(e) => {
                            const selectedTeacher = teachers.find(t => t._id === e.target.value);
                            setTeacher(selectedTeacher || null);
                        }}
                        className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.teacher ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    >
                        <option value="">اختر استاذ</option>
                        {teachers.map((teacherItem) => (
                            <option key={teacherItem._id} value={teacherItem._id}>
                                {teacherItem.name} - {teacherItem.title}
                            </option>
                        ))}
                    </select>
					{teachersStatus === 'failed' && (
						<p className="mt-1 text-sm text-red-600">فشل بتحميل الاساتذة. حاول مرة اخرى.</p>
					)}
					{errors.teacher && <p className="mt-1 text-sm text-red-600">{errors.teacher}</p>}
				</div>
				<div>
					<label className="block text-gray-700 font-medium mb-2">الصنف</label>
					<select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border-gray-300">
						<option value="">اختر صنف</option>
						{categoriesStatus === 'loading' ? (
							<option value="" disabled>تحميل الفئات....</option>
						) : (
							categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))
						)}
					</select>
					{categoriesStatus === 'failed' && (
						<p className="mt-1 text-sm text-red-600">فشل بتحميل الاصناف</p>
					)}
				</div>
				<div className="flex items-center pt-2">
					<input type="checkbox" id="isActive" checked={isActive} onChange={e => setActive(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
					<label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">الكورس مفعل؟</label>
				</div>

				<div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
					<button 
						onClick={handleSubmit}
						disabled={isSubmitting || coursesStatus === 'loading'}
						className={`w-full sm:w-auto flex-1 inline-flex justify-center items-center rounded-lg px-4 py-3 text-sm font-semibold text-white ${isSubmitting || coursesStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
					>
						{isSubmitting || coursesStatus === 'loading' ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								جاري الحفظ....
							</>
						) : (
							'حفظ الكورس'
						)}
					</button>
					<Link to="/courses" className="w-full sm:w-auto flex-1 text-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">الغاء</Link>
				</div>
			</form>
		</div>        
    </>
    )
}
