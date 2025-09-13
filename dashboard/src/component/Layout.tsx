import React, { PropsWithChildren, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import en from '../lang/en.json';
import ar from '../lang/ar.json';

export default function Layout({ children }: PropsWithChildren) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { lang } = useSelector((s: RootState) => s.lang);

	// Translation
	const translate = {
		en,
		ar
	};
	const translations = translate[lang];

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white border-b border-gray-200">
				<div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100"
							aria-label="Open sidebar"
							onClick={() => setSidebarOpen(true)}
						>
							<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
						</button>
						<Link to="/" className="font-semibold text-gray-900">{translations.navigation.dashboard}</Link>
					</div>
					{/* <div className="hidden sm:flex items-center gap-4">
						<NavLink to="/users" className={({ isActive }) => `text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Users</NavLink>
						<NavLink to="/teachers" className={({ isActive }) => `text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>Teachers</NavLink>
					</div> */}
				</div>
			</nav>

			{/* Mobile sidebar */}
			{sidebarOpen && (
				<div className="sm:hidden fixed inset-0 z-40">
					<div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
					<aside className="relative z-50 w-64 h-full bg-white shadow-xl p-4">
						<div className="mb-4 flex items-center justify-between">
							<span className="font-semibold">{translations.navigation.menu}</span>
							<button className="p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
								<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
							</button>
						</div>
						<nav className="space-y-2">
							<NavLink to="/users" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.users}</NavLink>
							<NavLink to="/teachers" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.teachers}</NavLink>
							<NavLink to="/categories" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.categories}</NavLink>
							<NavLink to="/courses" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.courses}</NavLink>
						</nav>
					</aside>
				</div>
			)}

			<div className="flex">
				{/* Desktop sidebar */}
				<aside className="hidden sm:block w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-56px)]">
					<div className="p-4">
						<div className="text-xs font-semibold text-gray-500 uppercase mb-2">{translations.navigation.menu}</div>
						<nav className="space-y-1">
							<NavLink to="/users" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.users}</NavLink>
							<NavLink to="/teachers" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.teachers}</NavLink>
							<NavLink to="/categories" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.categories}</NavLink>
							<NavLink to="/courses" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>{translations.navigation.courses}</NavLink>
						</nav>
					</div>
				</aside>

				<main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
					{children}
				</main>
			</div>
		</div>
	);
}
