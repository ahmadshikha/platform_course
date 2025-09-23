import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { fetchUserRegisters, updateUserRegisterStatus, UserRegister, clearError,clearStatus } from '../store/slices/usersRegisters/usersRegisterSlice'
import { useNavigate } from 'react-router-dom'
import ErrorDisplay from '../component/ErrorDisplay'

export default function UsersRegisters() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {items, error, status} = useSelector((s: RootState) => s.usersRegisters)
    // console.log(error)
    const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const newStatus = e.target.value as UserRegister['status']
        if (id) {
            dispatch(updateUserRegisterStatus({id, status: newStatus }))
        }
    }
    useEffect(() => {
        if(status == 'succeeded') {
            dispatch(clearError());
            dispatch(clearStatus())
        }
        if(error == 'يجب تسجيل الدخول اولاً' || error == "انتهت صلاحية الجلسة ..") {
        setTimeout(() => {
            navigate('/login');
            dispatch(clearError());
            dispatch(clearStatus())
        }, 500);
        }
    }, [status, error]);
    useEffect(()=> {
        dispatch(fetchUserRegisters({}))
        dispatch(clearError());
    }, [dispatch])
  // Loading state
  if (status === 'loading') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* <h1 className="text-xl font-semibold">{translations.courses.title}</h1> */}
          <h1 className="text-2xl font-bold">الحجوزات</h1>

        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            {/* <p className="mt-2 text-sm text-gray-600">{translations.courses.loading}</p> */}
            <p className="mt-2 text-sm text-gray-600">جاري تحميل الحجوزات</p>
          </div>
        </div>
      </div>
    );
  }
    return (
        <div className="md:p-6 md:space-y-6 min-h-screen">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">حجوزات الطلاب</h1>
                </div>

                <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

                {/* {status === 'loading' && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
                        جاري تحميل الحجوزات...
                    </div>
                )} */}

                {status === 'succeeded' && items.length === 0 && (
                    <div className="rounded-lg text-center border border-gray-200 bg-white p-6 text-gray-500">
                        لا يوجد حجوزات
                    </div>
                )}

                {items.length > 0 && (
                    <div className="flex flex-wrap gap-6">
                        {items.map((r) => (
                            <div key={r._id} className="flex-1 min-w-[350px]">
                                <UserRegisterCard onChangeStatus={onChangeStatus} reg={r} />
                            </div>
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
        <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-3 sm:p-6 flex-grow">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                            {reg.firstName.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{reg.firstName} {reg.lastName}</h3>
                                <p className="text-sm text-gray-500">{reg.title} - {reg.participantType}</p>
                            </div>
                            <div className="relative">
                                <select 
                                    value={reg.status ?? 'معلق'} 
                                    onChange={(e) => onChangeStatus(e, reg._id!)}
                                    className={`text-xs font-bold rounded-full pl-8 pr-3 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${currentStatusStyle.bg} ${currentStatusStyle.text} ${currentStatusStyle.border} focus:${currentStatusStyle.border}`}
                                >
                                    <option value="معلق">معلق</option>
                                    <option value="مؤكد">مؤكد</option>
                                </select>
                                <div className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-2 ${currentStatusStyle.text}`}>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span>{reg.email}</span></div>
                            <div className="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg><span>{reg.phone}</span></div>
                            <div className="flex items-start text-gray-600 mt-2 pt-3 border-t border-gray-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.342.12L10 12.42l4.408-4.249a.999.999 0 01.342-.12l2.644-1.23a1 1 0 000-1.84l-7-3zM10 15a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" /></svg><span className="font-medium">{reg.courseTitle} <span className="text-gray-500">({reg.courseNumber})</span></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50/70 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-500">تاريخ التسجيل: {new Date(reg.registrationDate || Date.now()).toLocaleDateString()}</p>
                <button onClick={() => navigate(`/user-register/${reg._id}/details`)} className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline'>
                    عرض التفاصيل
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </article>
    )
}