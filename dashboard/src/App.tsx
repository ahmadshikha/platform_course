// importing modules and methods
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

function App() {
	return <>
		<HashRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/users" replace />} />
					<Route path="/users" element={<UsersList />} />
					<Route path="/courses" element={<CourseList />} />
					<Route path="/courses/new" element={<CourseForm />} />
					<Route path="/teachers/" element={<TeachersList />} />
					<Route path="/teachers/new" element={<TeachersForm />} />
					<Route path="/users/new" element={<UserForm />} />
					<Route path="/teachers/:id/edit" element={<TeachersForm />} />
					<Route path="/users/:id/edit" element={<UserForm />} />
				</Routes>
			</Layout>
		</HashRouter>
	</>
}

export default App;
