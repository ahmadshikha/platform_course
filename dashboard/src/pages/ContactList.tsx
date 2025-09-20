import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteContact, fetchContacts, clearError, clearStatus } from "../store/slices/contacts/conatctsSlice";
import ErrorDisplay from "../component/ErrorDisplay";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const {items,pagination,status,error} = useSelector((s:RootState)=> s.contacts);
//   const items = useSelector((s:RootState)=> s.contacts.items);
  const dispatch = useDispatch<AppDispatch>();

  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearError())
    dispatch(fetchContacts());
  }, [dispatch]);
  useEffect(()=> {
    if(error == 'يجب تسجيل الدخول اولاً' || error == "انتهت صلاحية الجلسة ..") {
      setTimeout(() => {
        navigate('/login');
        dispatch(clearError());
        dispatch(clearStatus())
      }, 500);
    }
  }, [error])

  const handleDeleteContact = async (id: string) => {
    if (!id) return;
    setDeletingContactId(id);
    try {
      await dispatch(deleteContact(id)).unwrap();
    } catch (err) {
      // Error is handled by the slice's rejected case and displayed globally.
    }
    setDeletingContactId(null);
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (contactId: string) => {
    setShowDeleteConfirm(contactId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const contactToDelete = items.find(c => c._id === showDeleteConfirm);

  return (
    <div className="p-6 space-y-6 -100 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">قائمة التواصلات</h1>
        </div>

        <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

        {status === 'loading' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            جاري تحميل الرسائل....
          </div>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <div className="rounded-lg text-center border border-gray-200 bg-white p-6 text-gray-500">
            لا يوجد رسائل
          </div>
        )}

        {/* {status === 'succeeded' && contacts.length > 0 && ( */}
          <div className="grid gap-6">
            {items.map(contact => (
              <div key={contact._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                        {contact.username.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{contact.username}</h3>
                        <button
                          onClick={() => confirmDelete(contact._id)}
                          disabled={deletingContactId === contact._id}
                          className={`p-1.5 rounded-full transition-colors ${
                            deletingContactId === contact._id 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-red-100 hover:text-red-600'
                          }`}
                          aria-label="Delete message"
                        >
                          {deletingContactId === contact._id ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        {contact.email}
                      </p>
                      
                      <div className="bg-gray-50 border-l-4 border-blue-500 rtl:border-l-0 rtl:border-r-4 p-4 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg">
                        <p className="text-gray-800">{contact.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        {/* )} */}

        {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}


            {/* Modal content */}
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      تأكيد الحذف
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        هل أنت متأكد أنك تريد حذف هذه الرسالة من{" "}
                        <span className="font-bold">{contactToDelete?.email}</span>؟
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleDeleteContact(showDeleteConfirm!)}
                  disabled={deletingContactId === showDeleteConfirm}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                    deletingContactId === showDeleteConfirm
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {deletingContactId === showDeleteConfirm ? "جاري الحذف..." : "حذف"}
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}