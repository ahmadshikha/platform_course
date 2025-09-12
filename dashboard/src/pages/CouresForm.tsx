import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {Course} from "../store/slices/courses/coursesSlice"

export function CourseForm() {
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
	const [email, setEmail] = useState('');
	const [type, setType] = useState('')
	const [time, setTime] = useState("")
	const [duration, setDuration] = useState("")
	const [location, setLocation] = useState("")
	const [locationEn, setLocationEn] = useState("")
	const [status, setStatus] = useState<"available" | "full" | "cancelled" | "completed">("available")
	const [price, setPrice] = useState(0)
	const [seats, setSeats] = useState(1)
	const [description, setDescription] = useState("")
	const [descriptionEn, setDescriptionEn] = useState("")
	const [teacher, setTeacher] = useState("")
	const [isActive, setActive] = useState(true)

	const dispatch = useDispatch();
    const {} = useSelector((s: RootState) => s.courses.items);
    return(
    <>
    <div className="max-w-xl">
		<h1 className="text-xl font-semibold mb-4">Add Course</h1>
			<form className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">title</label>
					<input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">english title</label>
					<input value={titleEn} onChange={e => setTitleEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">type</label>
					<input value={type} onChange={e => setType(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Email</label>
					<input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">time</label>
					<input value={time} onChange={e => setTime(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">duration</label>
					<input value={duration} onChange={e => setDuration(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">location</label>
					<input value={location} onChange={e => setLocation(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">english location</label>
					<input value={locationEn} onChange={e => setLocationEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">status</label>
					<input value={status} onChange={e => setStatus('available')} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">price</label>
					<input value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">seats</label>
					<input value={seats} onChange={e => setSeats(Number(e.target.value))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">description</label>
					<input value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">english description</label>
					<input value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">teacher</label>
					<select name="" id="">
						<option value="">awd</option>
					</select>
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">is active</label>
					<input type="checkbox" checked={isActive} onChange={e => setActive(e.target.checked)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{/* {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>} */}
				</div>
                

				<div>
					{/* <label className="block text-sm font-medium text-gray-700">Role</label> */}

				</div>
				<div className="flex items-center gap-2">
					<button type="submit" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Save</button>
					<Link to="/users" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
				</div>
			</form>
		</div>        
    </>
    )
}

