import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserRegisters } from '../store/slices/usersRegisters/usersRegisterSlice';

const Detail: React.FC<{ label: string; value?: string | number | boolean | null }> = ({ label, value }) => {
    if (value === null || value === undefined || value === '') return null;

    const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;

    return (
        <div className="grid grid-cols-3 gap-4 py-2">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 col-span-2">{displayValue}</dd>
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                {React.Children.map(children, (child, index) => (
                    <div className={`sm:px-6 ${index > 0 ? 'border-t border-gray-200 sm:border-t-0' : ''}`}>
                        {child}
                    </div>
                ))}
            </dl>
        </div>
    </div>
);

export default function UserRegister() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((s: RootState) => s.usersRegisters);

    const registration = items.find(r => r._id === id);

    // useEffect(() => {
    //     if (items.length === 0 && status === 'idle') {
    //         dispatch(fetchUserRegisters());
    //     }
    // }, [dispatch, items.length, status]);

    // if (status === 'loading') {
    //     return <div className="p-6 text-center">Loading registration details...</div>;
    // }

    // if (status === 'failed') {
    //     return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    // }

    if (!registration) {
        return (
            <div className="p-6 text-center">
                <p>Registration not found.</p>
                <Link to="/users-register" className="text-blue-500 hover:underline mt-4 inline-block">Back to Registrations</Link>
            </div>
        );
    }

    const statusClasses: { [key: string]: string } = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
        waiting_list: 'bg-indigo-100 text-indigo-800',
    };

    return (
        <div className="user-register-details p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Registration Details</h1>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${statusClasses[registration.status || 'pending']}`}>
                        {registration.status?.replace('_', ' ')}
                    </span>
                </div>

                <div className="space-y-6">
                    <Section title="Personal Information">
                        <Detail label="Full Name" value={`${registration.title} ${registration.firstName} ${registration.lastName}`} />
                        <Detail label="Date of Birth" value={new Date(registration.birthDate).toLocaleDateString()} />
                        <Detail label="Gender" value={registration.gender} />
                        <Detail label="Nationality" value={registration.nationality} />
                        <Detail label="ID Number" value={registration.idNumber} />
                    </Section>

                    <Section title="Contact Information">
                        <Detail label="Email" value={registration.email} />
                        <Detail label="Phone" value={registration.phone} />
                        <Detail label="Mobile" value={registration.mobile} />
                        <Detail label="Address" value={`${registration.streetAddress}, ${registration.city}, ${registration.postalCode}, ${registration.country}`} />
                    </Section>

                    <Section title="Course Information">
                        <Detail label="Course Title" value={registration.courseTitle} />
                        <Detail label="Course Number" value={registration.courseNumber} />
                        <Detail label="Participant Type" value={registration.participantType} />
                        <Detail label="Reason for Participation" value={registration.participationReason} />
                        <Detail label="Registration Date" value={new Date(registration.registrationDate || '').toLocaleString()} />
                    </Section>

                    <Section title="Professional Information">
                        <Detail label="Education Level" value={registration.educationLevel} />
                        <Detail label="Occupation" value={registration.occupation} />
                        <Detail label="Company Name" value={registration.companyName} />
                        <Detail label="Company Address" value={registration.companyAddress} />
                    </Section>

                    <Section title="Emergency Contact">
                        <Detail label="Name" value={registration.emergencyContact.name} />
                        <Detail label="Relationship" value={registration.emergencyContact.relationship} />
                        <Detail label="Phone" value={registration.emergencyContact.phone} />
                    </Section>

                    <Section title="Additional Information & Agreements">
                        <Detail label="Special Needs" value={registration.specialNeeds} />
                        <Detail label="Additional Info" value={registration.additionalInfo} />
                        <Detail label="Agreed to Terms" value={registration.agreeTerms} />
                        <Detail label="Agreed to Data Processing" value={registration.agreeDataProcessing} />
                        <Detail label="Wants Newsletter" value={registration.receiveNewsletter} />
                        <Detail label="Admin Notes" value={registration.notes} />
                    </Section>
                </div>
                <div className="mt-8 text-center">
                    <Link to="/users-register" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        Back to All Registrations
                    </Link>
                </div>
            </div>
        </div>
    );
}