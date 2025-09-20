import React from "react";
import './App.css';
import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import CourseList from "./pages/CourseList";
import { CourseForm } from "./pages/CouresForm";
import { TeachersForm } from "./pages/TeachersForm";
import TeachersList from "./pages/TeachersList";
import CategoriesList from "./pages/CategoriesList";
import { CategoryForm } from "./pages/CategoryForm";
import UsersRegisters from "./pages/UsersRegisters";
import UserRegister from "./pages/UserRegister";
import TeacherCourses from "./pages/TeacherCourses";
import Login from "./pages/Login";
import CategoryCourses from "./pages/CategoryCourses";
import NewsList from "./pages/NewsList";
import AddNewsForm from "./pages/News.Form";
import ActivityForm from "./pages/ActivityForm";
import ActivityList from "./pages/ActivityList";
import ContactList from "./pages/ContactList";

function App() {
	return (
		<HashRouter>
			<Routes>
				{/* Public route - login rendered outside the main layout */}
				<Route path="/login" element={<Login />} />

				{/* Protected app routes rendered inside Layout */}
				<Route path="/" element={<Layout />}>
					{/* <Route index element={<Navigate to="/courses" replace />} /> */}
					<Route path="/courses" element={<CourseList />} />
					<Route path="courses/new" element={<CourseForm />} />
					<Route path="courses/:id/edit" element={<CourseForm />} />
					<Route path="teacher-courses/:id" element={<TeacherCourses />} />
					<Route path="category-courses/:id" element={<CategoryCourses />} />
					<Route path="courses/teachers/:id/edit" element={<CourseForm />} />
					<Route path="teachers" element={<TeachersList />} />
					<Route path="teachers/new" element={<TeachersForm />} />
					<Route path="teachers/:id/edit" element={<TeachersForm />} />
					<Route path="categories" element={<CategoriesList />} />
					<Route path="categories/new" element={<CategoryForm />} />
					<Route path="categories/:id/edit" element={<CategoryForm />} />
					<Route path="users-register" element={<UsersRegisters />} />
					<Route path="user-register/:id/details" element={<UserRegister />} />
					{/* News */}
					<Route path="news" element={<NewsList/>}/>
					<Route path="news/new" element={<AddNewsForm/>}/>
					{/* activity */}
					<Route path="activities/" element={<ActivityList/>}/>
					<Route path="activities/new" element={<ActivityForm/>}/>
					{/* contacts */}
					<Route path="contacts" element={<ContactList/>}/>

				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
