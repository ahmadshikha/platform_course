import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type Education = {
  degree: string;
  degreeEn: string;
  institution: string;
  year: string;
};

export type Contact = {
  email: string;
  phone: string;
};

export type Social = {
  linkedin?: string;
  twitter?: string;
};

export interface ITeacher {
  _id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  image: string;
  bio: string;
  bioEn: string;
  rating: number;
  review: number;
  students: number;
  course: number;
  experience: string;
  specialties: string[];
  specialtiesEn: string[];
  education: Education[];
  contact: Contact;
  social: Social;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

interface IAddTeacher {
  name: string;
  nameEn: string;
  bio: string;
  bioEn: string;
  experience: string;
}

export type TeachersState = {
  items: ITeacher[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
};

const initialState: TeachersState = {
  items: [],
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    total: 0,
  },
};

// Async Thunks
export const fetchTeachers = createAsyncThunk<{teachers: ITeacher[], pagination: {totalPages: number, currentPage: number, total: number}}, {page?: number, limit?: number} | undefined>('teachers/fetchTeachers', 
  async (params, {rejectWithValue}) => {
    const { page, limit } = params || {};
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());
      
      const url = `http://localhost:5000/api/teachers/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("get teachers",{res})
      if(!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to fetch teachers');
      }
      const data = await res.json();
      console.log(res)
      console.log({data})
      return {
        teachers: data.teachers,
        pagination: {
          totalPages: data.totalPages,
          currentPage: data.currentPage,
          total: data.total,
        }
      };

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to fetch teachers');
    }
});

export const addTeacher = createAsyncThunk<ITeacher,IAddTeacher>('teachers/addTeacher', 
  async (newTeacher, {rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:5000/api/teachers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacher),
      });
      if(!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to add teacher');
      }
      const data = await res.json();
      console.log(res)
      console.log({data})
      return data;

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to add techer');
    }
});

export const updateTeacher = createAsyncThunk('teachers/updateTeacher', async (updatedTeacher: ITeacher) => {
  const response = await fetch(`/api/teachers/${updatedTeacher._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTeacher),
  });
  const data = await response.json();
  return data;
});

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (teacherId: string) => {
  await fetch(`/api/teachers/${teacherId}`, {
    method: 'DELETE',
  });
  return teacherId;
});

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    // These reducers can be used for immediate UI updates if needed, 
    // but for persistence, async thunks are preferred.
    setTeachers(state, action: PayloadAction<ITeacher[]>) {
      state.items = action.payload;
    },
    updateTeacherLocally(state, action: PayloadAction<ITeacher>) {
      const index = state.items.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTeacherLocally(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.teachers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch teachers';
      })
      .addCase(addTeacher.fulfilled, (state, action: PayloadAction<ITeacher>) => {
        state.items.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to add teacher';
      })


      .addCase(updateTeacher.fulfilled, (state, action: PayloadAction<ITeacher>) => {
        const index = state.items.findIndex(teacher => teacher._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(teacher => teacher._id !== action.payload);
      });
  },
});

export const { setTeachers, updateTeacherLocally, deleteTeacherLocally } = teachersSlice.actions;
export default teachersSlice.reducer;