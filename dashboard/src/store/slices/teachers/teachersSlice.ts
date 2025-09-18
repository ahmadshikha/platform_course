import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type Education = {
  degree: string;
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
  // nameEn: string;
  title: string;
  // titleEn: string;
  image: string;
  bio: string;
  // bioEn: string;
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
  title: string;
  bio: string;
  // experience: string;
  image: HTMLInputElement;
  specialties: string[];
  education: Education[];
  contact: Contact;
  social: Social;

  isActive: boolean;
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
      const formdata = new FormData();
      formdata.append('name', newTeacher.name);
      formdata.append('title', newTeacher.title);
      formdata.append('bio', newTeacher.bio);
      formdata.append('education', JSON.stringify(newTeacher.education));
      formdata.append('contact', JSON.stringify(newTeacher.contact));
      formdata.append('social', JSON.stringify(newTeacher.social));
      // formdata.append('specialties', JSON.stringify(newTeacher.specialties));
      formdata.append('isActive', newTeacher.isActive.toString());

      const spec = newTeacher.specialties
      spec.forEach(item=> {
        formdata.append('specialties', item);
      })

      if (newTeacher.image.files && newTeacher.image.files[0]) {
        formdata.append("image", newTeacher.image.files[0]);
      } else {
        return rejectWithValue("No image file provided.");
      }
      console.log(formdata)
      const res = await fetch('http://localhost:5000/api/teachers/', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(newTeacher),
        body: formdata,
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
      console.log(e)
      return rejectWithValue(e.message || 'Failed to add techer');
    }
});

export const updateTeacher = createAsyncThunk<ITeacher, ITeacher, {rejectValue: string}>('teachers/updateTeacher', 
  async (updatedTeacher, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${updatedTeacher._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeacher),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update teacher');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update teacher');
    }
  }
);

export const deleteTeacher = createAsyncThunk<string, string, {rejectValue: string}>('teachers/deleteTeacher', 
  async (teacherId, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to delete teacher');
      }
      
      return teacherId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete teacher');
    }
  }
);

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
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
        clearError()
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
      .addCase(updateTeacher.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to update teacher';
      })
      .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(teacher => teacher._id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to delete teacher';
      });
  },
});

export const { setTeachers, updateTeacherLocally, deleteTeacherLocally, clearError } = teachersSlice.actions;
export default teachersSlice.reducer;