import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { fetchUserRegisters, updateUserRegisterStatus, UserRegister, clearError } from '../store/slices/usersRegisters/usersRegisterSlice'
import { useNavigate } from 'react-router-dom'
import ErrorDisplay from '../component/ErrorDisplay'

export default function UsersRegisters() {
    const dispatch = useDispatch<AppDispatch>()
    const {items, error, status} = useSelector((s: RootState) => s.usersRegisters)
    // console.log(error)
    const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const newStatus = e.target.value as UserRegister['status']
        if (id) {
            dispatch(updateUserRegisterStatus({id, status: newStatus }))
        }
    }
    
    useEffect(()=> {
        dispatch(fetchUserRegisters())
    }, [dispatch])

    return (
        <div className="p-6 space-y-6 min-h-screen">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">حجوزات الطلاب</h1>
                </div>

                <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

                {status === 'loading' && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
                        جاري تحميل الحجوزات...
                    </div>
                )}

                {status === 'succeeded' && items.length === 0 && (
                    <div className="rounded-lg text-center border border-gray-200 bg-white p-6 text-gray-500">
                        لا يوجد حجوزات
                    </div>
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((r) => (
                            <UserRegisterCard
                                key={r._id} 
                                onChangeStatus={onChangeStatus}
                                reg={r}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function UserRegisterCard({ reg, onChangeStatus }: { reg: UserRegister, onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void }) {
    const navigate = useNavigate()

    const statusClasses: { [key: string]: { bg: string; text: string; border: string } } = {
        "معلق": { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' },
        "مؤكد": { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
    };
    const currentStatusStyle = statusClasses[reg.status || 'معلق'] || statusClasses['معلق'];

    return (
        <article className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="text-xl font-bold text-gray-900">{reg.firstName} {reg.lastName}</div>
                        <div className="text-sm text-gray-500">{reg.title} - {reg.participantType}</div>
                    </div>
                    <select 
                        value={reg.status ?? 'معلق'} 
                        onChange={(e) => onChangeStatus(e, reg._id!)}
                        className={`text-sm font-semibold rounded-full px-3 py-1 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentStatusStyle.bg} ${currentStatusStyle.text} ${currentStatusStyle.border} focus:${currentStatusStyle.border}`}
                    >
                        <option value="معلق">معلق</option>
                        <option value="مؤكد">مؤكد</option>
                    </select>
                </div>

                <div>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">البريد:</span> {reg.email}</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">الهاتف:</span> {reg.phone}</p>
                    <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">الكورس:</span> {reg.courseTitle} ({reg.courseNumber})</p>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">تاريخ التسجيل: {new Date(reg.registrationDate || Date.now()).toLocaleDateString()}</p>
                <button onClick={() => navigate(`/user-register/${reg._id}/details`)} className='text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline'>
                    عرض التفاصيل
                </button>
            </div>
        </article>
    )
}