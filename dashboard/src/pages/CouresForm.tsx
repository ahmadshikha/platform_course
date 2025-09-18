import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Course } from "../store/slices/courses/coursesSlice";
import { fetchTeachers } from '../store/slices/teachers/teachersSlice';
import { fetchCategories } from '../store/slices/categories/categoriesSlice';
import { addCourse, updateCourse } from '../store/slices/courses/coursesSlice';
import { ITeacher } from '../store/slices/teachers/teachersSlice';

export function CourseForm() {
    const { id: idww } = useParams<{ id?: string }>();
	const courseId = idww; // Rename `id` to `courseId` for consistency
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
    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");
    const [teacher, setTeacher] = useState<ITeacher | null>(null);
    // store selected category id as a string (or empty when none)
    const [categoryId, setCategoryId] = useState<string>("");
    const [isActive, setActive] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
    const { lang } = useSelector((s: RootState) => s.lang);
    const teachers = useSelector((s: RootState) => s.teachers.items);
    const categories = useSelector((s: RootState) => s.categories.items);
    const courses = useSelector((s: RootState) => s.courses);
    const teachersStatus = useSelector((s: RootState) => s.teachers.status);
    const categoriesStatus = useSelector((s: RootState) => s.categories.status);
    const coursesStatus = useSelector((s: RootState) => s.courses.status);
    const coursesError = useSelector((s: RootState) => s.courses.error);

    // Fetch teachers and categories on component mount
    useEffect(() => {
        if (teachersStatus === 'idle') {
            dispatch(fetchTeachers({}));
        }
        if (categoriesStatus === 'idle') {
            dispatch(fetchCategories({}));
        }
    }, [dispatch, teachersStatus, categoriesStatus]);

    // Load course data in edit mode
    useEffect(() => {
        setErrors({});
        const url = window.location.href
        if(url.includes("/edit")) {
            setActionForm("تعديل كورس")
            setIsEditMode(true)
			console.log(11111, courseId)
            const course = courses.items.find(c => c._id === courseId);
            if (course) {
                setId(course.id);
                setTitle(course.title);
                // setTitleEn(course.titleEn);
                setType(course.type);
                // setTypeEn(course.typeEn)
                setDate(course.date ? new Date(course.date) : null);
                setTime(course.time);
                setDuration(course.duration);
                setLocation(course.location);
                // setLocationEn(course.locationEn);
                setStatus(course.status);
                setPrice(course.price);
                setSeats(course.seats);
                setDescription(course.description);
                setDetails(course.details)
                // setDescriptionEn(course.descriptionEn);
                // set teacher if present on the course
                setTeacher((course as any).teacher || null);
                // normalize categoryId to be the category _id string when editing
                const courseCat = (course as any).categoryId;
                setCategoryId(courseCat ? (courseCat._id || courseCat) : '');
                setActive(course.isActive);
            }
        }
        return ()=> {
            setErrors({});
        }
    }, [isEditMode, courseId, courses.items]);

    // Add validation logic
    const validateForm = () => {
        // clear previous errors before validating to avoid showing stale messages
        const newErrors: { [key: string]: string } = {};
        console.log(teacher)
        if (!id.trim()) {
            newErrors.id = 'معرف الكورس مطلوب';
        }
        if (!title.trim()) {
            newErrors.title = 'العنوان مطلوب';
        }
        // if (!titleEn.trim()) {
        //     newErrors.titleEn = 'Title (English) is required';
        // }
        if (!type.trim()) {
            newErrors.type = 'النوع مطلوب';
        }
        // if (!typeEn.trim()) {
        //     newErrors.typeEn = 'Type (English) is required';
        // }
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
        // if (!locationEn.trim()) {
        //     newErrors.locationEn = 'Location (English) is required';
        // }
        if (!price.trim()) {
            newErrors.price = 'السعر مطلوب';
        }
        if (!description.trim()) {
            newErrors.description = 'الوصف مطلوب';
        }
        if (!details.trim()) {
            newErrors.details = 'تفاصيل الكورس مطلوبة';
        }
        // if (!descriptionEn.trim()) {
        //     newErrors.descriptionEn = 'Description (English) is required';
        // }
        if (!teacher) {
            newErrors.teacher = 'الاستاذ مطلوب';
        }

        setErrors(newErrors);
        // return whether the form is valid
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        // clear any previous errors when starting a submit attempt
        setErrors({});

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Update courseData to include the full teacher object
            // find selected category object (the API/store expects the full object)
            const selectedCategory = categoryId ? categories.find((c: any) => c._id === categoryId) : undefined;

            const courseData = {
                id: id.trim(),
                title: title.trim(),
                // titleEn: titleEn.trim(),
                type: type.trim(),
                // typeEn: typeEn.trim(),
                date: date,
                time: time.trim(),
                duration: duration.trim(),
                location: location.trim(),
                // locationEn: locationEn.trim(),
                status,
                price: price.trim(),
                seats,
                description: description.trim(),
                details: details.trim(),
                // descriptionEn: descriptionEn.trim(),
                teacher, // Assign the full ITeacher object
                // if a category is selected, ensure we pass the category object expected by the API/store
                categoryId: selectedCategory || undefined,
                isActive
            };
			console.log(courseData)
            if (isEditMode && courseId) {
                await dispatch(updateCourse({ courseId, courseData }));
            } else {
                // Add additional fields only needed for new courses
                    const newCourseData = {
                    ...courseData,
                    enrolled: 0,
                    rating: 0,
                    reviews: 0,
                };
                await dispatch(addCourse(newCourseData));
            }
            // On successful submit, clear validation errors and navigate away
            setErrors({});
            // navigate('/courses');
        } catch (error) {
            setSubmitError('Failed to create course. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
    <>
    <div className={`max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-100`}>
		<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{actionForm}</h1>
		
		{/* Error Messages */}
		{(submitError || coursesError) && (
			<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-sm font-medium text-red-800">خطأ</h3>
						<div className="mt-2 text-sm text-red-700">
							<p>{submitError || coursesError}</p>
						</div>
					</div>
				</div>
			</div>
		)}

		<form className="space-y-6">
				<div>
					<label className="block text-gray-700 font-medium mb-2">معرف الكورس *</label>
					<input value={id} onChange={e => {setId(e.target.value); console.log(id)}} className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.id ? 'border-red-500' : 'border-gray-300'}`} required />
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
