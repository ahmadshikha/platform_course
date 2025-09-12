import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export type User = {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'manager' | 'viewer';
};

export type UsersState = {
	items: User[];
};

const initialState: UsersState = {
	items: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: {
			prepare(user: Omit<User, 'id'>) {
				return { payload: { ...user, id: nanoid() } };
			},
			reducer(state, action: PayloadAction<User>) {
				state.items.push(action.payload);
			},
		},
		updateUser(state, action: PayloadAction<User>) {
			const index = state.items.findIndex(u => u.id === action.payload.id);
			if (index !== -1) state.items[index] = action.payload;
		},
		deleteUser(state, action: PayloadAction<string>) {
			state.items = state.items.filter(u => u.id !== action.payload);
		},
	},
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
