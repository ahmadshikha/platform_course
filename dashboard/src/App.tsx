import React from "react";
import './App.css';
import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import UsersList from "./pages/UsersList";
import CourseList from "./pages/CourseList";
import { CourseForm } from "./pages/CouresForm";
import { TeachersForm } from "./pages/TeachersForm";
import TeachersList from "./pages/TeachersList";
import CategoriesList from "./pages/CategoriesList";
import { CategoryForm } from "./pages/CategoryForm";
import UsersRegisters from "./pages/UsersRegisters";
import UserRegister from "./pages/UserRegister";
import TeacherCourses from "./pages/TeacherCourses";

function App() {
	return <>
		<HashRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/courses" replace />} />
					<Route path="/courses" element={<CourseList />} />
					<Route path="/courses/new" element={<CourseForm />} />
					<Route path="/courses/:id/edit" element={<CourseForm />} />
					<Route path="/courses/teachers/:id" element={<TeacherCourses />} />
					<Route path="/courses/teachers/:id/edit" element={<CourseForm />} />
					<Route path="/teachers/" element={<TeachersList />} />
					<Route path="/teachers/new" element={<TeachersForm />} />
					<Route path="/teachers/:id/edit" element={<TeachersForm />} />
					<Route path="/categories" element={<CategoriesList />} />
					<Route path="/categories/new" element={<CategoryForm />} />
					<Route path="/categories/:id/edit" element={<CategoryForm />} />
					{/* <Route path="/users/new" element={<UserForm />} /> */}
					{/* <Route path="/users/:id/edit" element={<UserForm />} /> */}
					<Route path="/users-register/" element={<UsersRegisters />} />
					<Route path="/user-register/:id/details" element={<UserRegister />} />
				</Routes>
			</Layout>
		</HashRouter>
	</>
}

export default App;
