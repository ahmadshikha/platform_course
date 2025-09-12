import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {Link} from 'react-router-dom'
import { addTeacher, ITeacher } from "../store/slices/teachers/teachersSlice";
import { useSelector } from "react-redux";


export type Education = {
  degree: string;
  degreeEn: string;
  institution: string;
  year: string;
};

export type Contact = {
  email: string;
  phone: string;
};

export type Social = {
  linkedin?: string;
  twitter?: string;
};



export function TeachersForm() {
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [image, setImage] = useState('')
    const [bio, setBio] = useState("")
    const [bioEn, setBioEn] = useState("")
    const [experience, setExperience] = useState("")
    const [specialties, setSpecialties] = useState<string[]>([])
    const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([])
    const [isActive, setActive] = useState(true)
    // education
    const [degree, setDegree] = useState("")
    const [degreeEn, setDegreeEn] = useState("")
    const [institution, setInstitution] = useState("")
    const [year, setYear] = useState("")
    // contact
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    // social
    const [linkedin, setLinkedin] = useState("")
    const a = useSelector((s: { teachers: { items: ITeacher[]; }; }) => s.teachers.items);
    const dispatch = useDispatch<AppDispatch>();
  useEffect((): any => {

    const url = window.location.href
    if(url.includes("/edit")) {
        const start = url.indexOf('=')
        const end = url.indexOf('/edit')
        const id = url.slice(start+1, end)
        console.log(id)
        const teacher = a.find(t => t._id === id)
        setName(teacher.name)
        setNameEn(teacher.nameEn)
        setBio(teacher.bio)
        setBioEn(teacher.bioEn)
        setExperience(teacher.experience)
    }
  }, [])

    return(
    <>
    <div className="max-w-xl">
        <h1 className="text-xl font-semibold mb-4">شصي</h1>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">english name</label>
                <input value={nameEn} onChange={e => setNameEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">bio</label>
                <input value={bio} onChange={e => setBio(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">english bio</label>
                <input value={bioEn} onChange={e => setBioEn(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">experience</label>
                <input value={experience} onChange={e => setExperience(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                {/* {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} */}
            </div>
            <div className="flex items-center gap-2">
                <button onClick={ ()=>{dispatch(addTeacher({name, nameEn, bio, bioEn, experience}))}} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Save</button>
                <Link to="/teacher" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
            </div>
        </div>
    </div>
    </>
    )
}