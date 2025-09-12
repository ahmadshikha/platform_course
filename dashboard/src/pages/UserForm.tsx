import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addUser, updateUser, User } from '../store/slices/users/usersSlice';
import { RootState } from '../store/store';

export default function UserForm() {
	const { id } = useParams();
	const isEdit = Boolean(id);
	const existing = useSelector((s: RootState) => s.users.items.find(u => u.id === id));
	const [name, setName] = useState(existing?.name ?? '');
	const [email, setEmail] = useState(existing?.email ?? '');
	const [role, setRole] = useState<User['role']>(existing?.role ?? 'viewer');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const title = useMemo(() => (isEdit ? 'Edit user' : 'Create user'), [isEdit]);

	function validate() {
		const e: Record<string, string> = {};
		if (!name.trim()) e.name = 'Name is required';
		if (!email.trim()) e.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
		return e;
	}

	function handleSubmit(ev: React.FormEvent) {
		ev.preventDefault();
		const e = validate();
		setErrors(e);
		if (Object.keys(e).length > 0) return;
		if (isEdit && id) {
			dispatch(updateUser({ id, name, email, role }));
		} else {
			dispatch(addUser({ name, email, role }));
		}
		navigate('/users');
	}

	return (
		<div className="max-w-xl">
			<h1 className="text-xl font-semibold mb-4">{title}</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Name</label>
					<input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Email</label>
					<input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
					{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Role</label>
					<select value={role} onChange={e => setRole(e.target.value as User['role'])} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
						<option value="admin">admin</option>
						<option value="manager">manager</option>
						<option value="viewer">viewer</option>
					</select>
				</div>
				<div className="flex items-center gap-2">
					<button type="submit" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Save</button>
					<Link to="/users" className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
				</div>
			</form>
		</div>
	);
}
