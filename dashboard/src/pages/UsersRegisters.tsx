import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { fetchUserRegisters, updateUserRegisterStatus, UserRegister } from '../store/slices/usersRegisters/usersRegisterSlice'
import { useNavigate } from 'react-router-dom'

// Minimal interfaces matching the backend model (subset used by the UI)
interface EmergencyContact {
    name: string
    relationship: string
    phone: string
}


export default function UsersRegisters() {
    const dispatch = useDispatch<AppDispatch>()
    const {items,error} = useSelector((s: RootState) => s.usersRegisters)

    const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newStatus = e.target.value as UserRegister['status']
        dispatch(updateUserRegisterStatus({id: items[index]._id, status: newStatus }))
        console.log({newStatus})
        // dispatch({ type: 'usersRegister/updateRegisterStatus', payload: { idNumber: reg.idNumber, status: newStatus } })
    }
    
    useEffect(()=> {
        dispatch(fetchUserRegisters())
        console.log("dispatched fetchUserRegisters", items)
    }, [dispatch])
    return (
        <div className="users-registers">
            <h2>Registrations</h2>
            <div className="grid gap-4">
                {items.length === 0 && <div>No registrations found.</div>}
                {items.map((r, idx) =>{ 
                    console.log(idx)
                return (
                    <UserRegisterCard
                     key={`${r.email}-${idx}`} 
                     onChangeStatus={onChangeStatus}
                     reg={r}
                     idx={idx} />
                )})}
            </div>
        </div>
    )
}

function UserRegisterCard({ reg, onChangeStatus, idx }: { reg: UserRegister, onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void, idx: number }) {
    // data show in card: firstName, lastName, email, phone, participantType, status, courseTitle
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    return (
        <article className="p-4 border rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <div className="text-lg font-semibold">{reg.firstName} {reg.lastName}</div>
                    <div className="text-sm text-gray-600">{reg.title}</div>
                </div>
                <div className="text-sm">
                    <span className="mr-2">{reg.participantType}</span>
                    <select value={reg.status ?? 'معلق'} onChange={(e) => onChangeStatus(e, idx)}
                        className="ml-2 rounded border px-2 py-1 text-sm">
                        <option value="معلق">معلق</option>
                        <option value="مؤكد">مؤكد</option>
                        <option value="ملغى">ملغى</option>
                        <option value="مكتمل">مكتمل</option>
                        <option value="قائمة الانظار">قائمة الانظار</option>
                    </select>
                </div>
            </div>

            <div className="text-sm text-gray-700 mb-2">
                <div>البريد الالكتروني: {reg.email}</div>
                <div>الهاتف: {reg.phone}</div>
                <div>الكورسات: {reg.courseTitle} ({reg.courseNumber})</div>
            </div>

            <div className="text-xs text-gray-500">تم تسجيله: {new Date(reg.registrationDate || Date.now()).toLocaleString()}</div>
            <button onClick={() => navigate(`/user-register/${reg._id}/details`)} className='text-blue-500 hover:text-blue-700'>Details</button>
        </article>
    )
}