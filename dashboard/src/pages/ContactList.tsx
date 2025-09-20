import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteContact, fetchContacts, clearError } from "../store/slices/contacts/conatctsSlice";
import ErrorDisplay from "../component/ErrorDisplay";


export default function ContactList() {
  const {items,pagination,status,error} = useSelector((s:RootState)=> s.contacts);
//   const items = useSelector((s:RootState)=> s.contacts.items);
  const dispatch = useDispatch<AppDispatch>();

  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
          <h1 className="text-4xl font-extrabold text-center text-gray-800">قائمة التواصلات</h1>
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
              <div key={contact._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">من: {contact.username}</h3>
                  <p className="text-sm text-gray-500 mb-4">البريد الالكتروني: {contact.email}</p>
                  <p className="text-gray-700 mb-2">{contact.message}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => confirmDelete(contact._id)}
                    disabled={deletingContactId === contact._id}
                    className={`rounded-md border px-4 py-2 text-sm ${
                      deletingContactId === contact._id 
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                        : 'border-red-300 text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {deletingContactId === contact._id ? "جاري الحذف..." : "حذف"}
                  </button>
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