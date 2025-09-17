import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  _id: string;
  email: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserState {
  user: IUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  islogged: boolean;
}


const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null,
  islogged: false
};


export const loginUser = createAsyncThunk<IUser, LoginCredentials>(
  'users/loginUser',
  async (credentials, { rejectWithValue }) => {
    const user: IUser = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then((res)=> {
      console.log(res)
      var data = res.json()
      if(res.ok) {
          return data
      }
      return data.then(err => {throw err;});
    })
    .then((data)=> {
        console.log(data)
        console.log(data)
        return data;
    })
    .catch((err) => {
      console.log(err)
      return rejectWithValue(err.message || 'Failed to fetch user');
    })
    console.log("user from login", user)

    return user;
  }
);
export const authUser = createAsyncThunk(
  'users/auth',
  async (credentials, { rejectWithValue }) => {
    const user = await fetch('http://localhost:5000/api/admin/auth', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res)=> {
      console.log(res)
      var data = res.json()
      if(res.ok) {
          return data
      }
      return data.then(err => {throw err;});
    })
    .then((data)=> {
        console.log(data)
        console.log(data)
        return data;
    })
    .catch((err) => {
      console.log(err)
      return rejectWithValue(err.message || 'Failed to fetch user');
    })
    console.log("user from auth", user)

    return user;
  }
);



const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {

    },
    setManualLoading: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = 'succeeded';
        console.log(action.payload)
        state.user = action.payload;
        state.islogged = true;
      
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Failed to fetch users';
        state.islogged = false
      })
      .addCase(authUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.error = null;
        state.islogged = true
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || action.error.message || 'خطأ بالجلسة';
        state.islogged = false
      })

  },
});

export const { setManualLoading } = usersSlice.actions;
export default usersSlice.reducer;
