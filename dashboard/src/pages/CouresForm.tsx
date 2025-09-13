import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Course } from "../store/slices/courses/coursesSlice";
import { fetchTeachers } from '../store/slices/teachers/teachersSlice';
import { fetchCategories } from '../store/slices/categories/categoriesSlice';
import { addCourse, updateCourse } from '../store/slices/courses/coursesSlice';

export function CourseForm() {
    const { id: idww } = useParams<{ id?: string }>();
	const courseId = idww; // Rename `id` to `courseId` for consistency
    const isEditMode = true;
    
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [type, setType] = useState('');
    const [typeEn, setTypeEn] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [locationEn, setLocationEn] = useState("");
    const [status, setStatus] = useState<"available" | "full" | "cancelled" | "completed">("available");
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState(1);
    const [description, setDescription] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [teacher, setTeacher] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isActive, setActive] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
        if (isEditMode) {
			console.log(11111, courseId)
            const course = courses.items.find(c => c._id === courseId);
            if (course) {
                setId(course.id);
                setTitle(course.title);
                setTitleEn(course.titleEn);
                setType(course.type);
                setTypeEn(course.typeEn);
                setDate(course.date);
                setTime(course.time);
                setDuration(course.duration);
                setLocation(course.location);
                setLocationEn(course.locationEn);
                setStatus(course.status);
                setPrice(course.price);
                setSeats(course.seats);
                setDescription(course.description);
                setDescriptionEn(course.descriptionEn);
                setTeacher(course.teacher);
                setCategoryId(course.categoryId || '');
                setActive(course.isActive);
            }
        }
    }, [isEditMode, courseId, courses.items]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        // Basic validation
        if (!idww.trim() || !title.trim() || !titleEn.trim() || !type.trim() || !typeEn.trim() || 
            !date.trim() || !time.trim() || !duration.trim() || !location.trim() || !locationEn.trim() || 
            !price.trim() || !description.trim() || !descriptionEn.trim() || !teacher.trim()) {
            setSubmitError('Please fill in all required fields');
            setIsSubmitting(false);
            return;
        }

        if (seats < 1) {
            setSubmitError('Seats must be at least 1');
            setIsSubmitting(false);
            return;
        }

        try {
            const courseData = {
                id: id.trim(),
                title: title.trim(),
                titleEn: titleEn.trim(),
                type: type.trim(),
                typeEn: typeEn.trim(),
                date: date.trim(),
                time: time.trim(),
                duration: duration.trim(),
                location: location.trim(),
                locationEn: locationEn.trim(),
                status,
                price: price.trim(),
                seats,
                description: description.trim(),
                descriptionEn: descriptionEn.trim(),
                teacher: teacher.trim(),
                categoryId: categoryId.trim() || undefined,
                isActive
            };

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
            navigate('/courses');
        } catch (error) {
            setSubmitError('Failed to create course. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
    <>
    <div className="max-w-xl">
		<h1 className="text-xl font-semibold mb-4">Add Course</h1>
		
		{/* Error Messages */}
		{(submitError || coursesError) && (
			<div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
						</svg>
					</div>
					<div className="ml-3">
						<h3 className="text-sm font-medium text-red-800">Error</h3>
						<div className="mt-2 text-sm text-red-700">
							<p>{submitError || coursesError}</p>
						</div>
					</div>
				</div>
			</div>
		)}

		<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Course ID *</label>
					<input value={id} onChange={e => {setId(e.target.value); console.log(id)}} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
					<p className="mt-1 text-xs text-gray-500">Unique identifier for the course</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Title (Arabic) *</label>
					<input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Title (English) *</label>
					<input value={titleEn} onChange={e => setTitleEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Type (Arabic) *</label>
					<input value={type} onChange={e => setType(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Type (English) *</label>
					<input value={typeEn} onChange={e => setTypeEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Date *</label>
					<input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g., 2024-01-15, January 15, 2024" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
					<p className="mt-1 text-xs text-gray-500">Enter date as string (e.g., "2024-01-15" or "January 15, 2024")</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Time *</label>
					<input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g., 09:00, 2:30 PM, 14:30" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
					<p className="mt-1 text-xs text-gray-500">Enter time as string (e.g., "09:00", "2:30 PM", "14:30")</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Duration *</label>
					<input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 2 hours, 3 days" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Location (Arabic) *</label>
					<input value={location} onChange={e => setLocation(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Location (English) *</label>
					<input value={locationEn} onChange={e => setLocationEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Status</label>
					<select value={status} onChange={e => setStatus(e.target.value as "available" | "full" | "cancelled" | "completed")} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
						<option value="available">Available</option>
						<option value="full">Full</option>
						<option value="cancelled">Cancelled</option>
						<option value="completed">Completed</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Price *</label>
					<input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 100, 150.50" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
					<p className="mt-1 text-xs text-gray-500">Enter price as string (e.g., "100" or "150.50")</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Seats *</label>
					<input type="number" min="1" value={seats} onChange={e => setSeats(Number(e.target.value))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Description (Arabic) *</label>
					<textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Description (English) *</label>
					<textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Teacher *</label>
					<select value={teacher} onChange={e => setTeacher(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
						<option value="">Select a teacher</option>
						{teachersStatus === 'loading' ? (
							<option value="" disabled>Loading teachers...</option>
						) : (
							teachers.map((teacherItem) => (
								<option key={teacherItem._id} value={teacherItem._id}>
									{lang === 'ar' ? teacherItem.name : teacherItem.nameEn} - {lang === 'ar' ? teacherItem.title : teacherItem.titleEn}
								</option>
							))
						)}
					</select>
					{teachersStatus === 'failed' && (
						<p className="mt-1 text-sm text-red-600">Failed to load teachers. Please try again.</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Category</label>
					<select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
						<option value="">Select a category (optional)</option>
						{categoriesStatus === 'loading' ? (
							<option value="" disabled>Loading categories...</option>
						) : (
							categories.map((category) => (
								<option key={category._id} value={category._id}>
									{lang === 'ar' ? category.name : category.nameEn}
								</option>
							))
						)}
					</select>
					{categoriesStatus === 'failed' && (
						<p className="mt-1 text-sm text-red-600">Failed to load categories. Please try again.</p>
					)}
				</div>
				<div className="flex items-center">
					<input type="checkbox" id="isActive" checked={isActive} onChange={e => setActive(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
					<label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Course is active</label>
				</div>
                

				<div>
					{/* <label className="block text-sm font-medium text-gray-700">Role</label> */}

				</div>
				<div className="flex items-center gap-2">
					<button 
						type="submit" 
						disabled={isSubmitting || coursesStatus === 'loading'}
						className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting || coursesStatus === 'loading' ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Creating Course...
							</>
						) : (
							'Save Course'
						)}
					</button>
					<Link to="/courses" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
				</div>
			</form>
		</div>        
    </>
    )
}

