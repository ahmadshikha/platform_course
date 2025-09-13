import React from "react";
import './App.css';
import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import UsersList from "./pages/UsersList";
import UserForm from "./pages/UserForm";
import CourseList from "./pages/CourseList";
import { CourseForm } from "./pages/CouresForm";
import { TeachersForm } from "./pages/TeachersForm";
import TeachersList from "./pages/TeachersList";
import CategoriesList from "./pages/CategoriesList";
import { CategoryForm } from "./pages/CategoryForm";

function App() {
	return <>
		<HashRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/users" replace />} />
					<Route path="/users" element={<UsersList />} />
					<Route path="/courses" element={<CourseList />} />
					<Route path="/courses/new" element={<CourseForm />} />
					<Route path="/courses/:id/edit" element={<CourseForm />} />
					<Route path="/teachers/" element={<TeachersList />} />
					<Route path="/teachers/new" element={<TeachersForm />} />
					<Route path="/categories" element={<CategoriesList />} />
					<Route path="/categories/new" element={<CategoryForm />} />
					<Route path="/users/new" element={<UserForm />} />
					<Route path="/teachers/:id/edit" element={<TeachersForm />} />
					<Route path="/users/:id/edit" element={<UserForm />} />
					<Route path="/categories/:id/edit" element={<CategoryForm />} />
				</Routes>
			</Layout>
		</HashRouter>
	</>
}

export default App;
