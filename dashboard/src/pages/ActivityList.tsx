import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchActivities, IActivity, deleteActivity, clearError, clearStatus } from "../store/slices/activity/activitySlice";
import { Link, useNavigate } from "react-router-dom";
import ErrorDisplay from "../component/ErrorDisplay";

export default function ActivityList() {
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector((state: RootState) => state.activities.items);
  const { error, status } = useSelector((state: RootState) => state.activities);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchActivities(undefined));
  }, [dispatch]);
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">الأنشطة</h1>
        <Link
          to="/activities/new"
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          اضافة نشاط
        </Link>
      </div>

      <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />

      {/* Content */}
      {activities.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500 text-center">
          لا يوجد أنشطة
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((item: IActivity) => (
            <ActivityCard 
            key={item.name + item.date} 
            activity={item}
            onDelete={(id) => {
                // Dispatch Redux action or call API here
                dispatch(deleteActivity(item._id));
            }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


interface Props {
  activity: IActivity;
  onDelete: (id: string) => void;
  deletingId?: string | null; // optional: track which activity is being deleted
}

const ActivityCard: React.FC<Props> = ({ activity, onDelete, deletingId }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const cancelDelete = () => setShowDeleteConfirm(false);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{activity.name}</h2>

      {/* Date + Location */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>📅 {new Date(activity.date).toLocaleDateString()}</span>
        <span>📍 {activity.location}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 line-clamp-3 mb-4">{activity.description}</p>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          حذف
        </button>
      </div>

      {/* Delete Confirmation Modal */}
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
                        هل أنت متأكد أنك تريد حذف النشاط{" "}
                        <span className="font-bold">{activity.name}</span>؟
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    onDelete(activity.name); // or activity.id
                    setShowDeleteConfirm(false);
                  }}
                  disabled={deletingId === activity.name}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                    deletingId === activity.name
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {deletingId === activity.name ? "جاري الحذف..." : "حذف"}
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={deletingId === activity.name}
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
  );
};
