import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { deleteUser } from '../store/slices/users/usersSlice';

export default function UsersList() {
	const users = useSelector((s: RootState) => s.users.items);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Users</h1>
				<Link to="/users/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Add user</Link>
			</div>
			<div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
							<th className="px-4 py-2" />
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{users.length === 0 && (
							<tr>
								<td className="px-4 py-6 text-gray-500" colSpan={4}>No users yet.</td>
							</tr>
						)}
						{users.map(u => (
							<tr key={u.id} className="hover:bg-gray-50">
								<td className="px-4 py-2">{u.name}</td>
								<td className="px-4 py-2">{u.email}</td>
								<td className="px-4 py-2">
									<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{u.role}</span>
								</td>
								<td className="px-4 py-2 text-right space-x-2">
									<button onClick={() => navigate(`/users/${u.id}/edit`)} className="rounded-md border border-green-300 px-2 py-1 text-sm text-green-600 hover:bg-gray-50">Edit</button>
									<button onClick={() => { if (confirm('Delete user?')) dispatch(deleteUser(u.id)); }} className="rounded-md border border-red-300 text-red-600 px-2 py-1 text-sm hover:bg-red-50">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
