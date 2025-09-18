import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteContact, fetchContacts } from "../store/slices/contacts/conatctsSlice";


export default function ContactList() {
  const { items: contacts, status, error } = useSelector((s:RootState)=> s.conatcts);
  const dispatch = useDispatch<AppDispatch>();

  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = async (id: string) => {
    setDeletingContactId(id);
    await dispatch(deleteContact(id));
    setDeletingContactId(null);
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (contactId: string) => {
    setShowDeleteConfirm(contactId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">Contact List</h1>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 mb-4">
            <div className="flex items-center">
              <p className="text-sm font-medium text-red-800">Error: {error}</p>
              <button
                // onClick={() => fetchContactsAsync(dispatch); }}
                className="ml-auto rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            Loading contacts...
          </div>
        )}

        {status === 'succeeded' && contacts.length === 0 && (
          <div className="rounded-lg text-center border border-gray-200 bg-white p-6 text-gray-500">
            No contacts found.
          </div>
        )}

        {status === 'succeeded' && contacts.length > 0 && (
          <div className="grid gap-6">
            {contacts.map(contact => (
              <div key={contact._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">From: {contact.username}</h3>
                  <p className="text-sm text-gray-500 mb-4">Email: {contact.email}</p>
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
                    {deletingContactId === contact._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this contact message? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  disabled={deletingContactId === showDeleteConfirm}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteContact(showDeleteConfirm)}
                  disabled={deletingContactId === showDeleteConfirm}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingContactId === showDeleteConfirm ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}