import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users/usersSlice';
import coursesReducer from './slices/courses/coursesSlice';
import teachersReducer from './slices/teachers/teachersSlice';
import categoriesReducer from './slices/categories/categoriesSlice';
import langReducer from './slices/lang';
import type { UsersState } from './slices/users/usersSlice';
import type { CoursesState } from './slices/courses/coursesSlice';
import type { TeachersState } from './slices/teachers/teachersSlice';
import type { CategoriesState } from './slices/categories/categoriesSlice';
import type { ILang } from './slices/lang';

const LOCAL_STORAGE_KEY = 'app_state';


function loadState() {
	try {
		const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!serialized) return undefined;
		return JSON.parse(serialized);
	} catch {
		return undefined;
	}
}

function saveState(state: unknown) {
	try {
		const serialized = JSON.stringify(state);
		localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
	} catch {
		// ignore write errors
	}
}

export const store = configureStore({
	reducer: {
		users: usersReducer,
		courses: coursesReducer,
		teachers: teachersReducer,
		categories: categoriesReducer,
		lang: langReducer
	},
	preloadedState: loadState() as {
		users: UsersState, 
		courses: CoursesState, 
		teachers: TeachersState,
		categories: CategoriesState,
		lang: ILang
	} | undefined,
});

store.subscribe(() => {
	saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
