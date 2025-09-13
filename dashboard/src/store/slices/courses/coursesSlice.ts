import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type Course = {
  _id: string,
  id: string,
  title: string,
  titleEn: string,
  type: string,
  typeEn: string,
  date: string,
  time: string,
  duration: string,
  location: string,
  locationEn: string,
  status: 'available'| 'full'| 'cancelled'| 'completed',
  price: string,
  seats: number,
  enrolled: number,
  rating: number,
  reviews: number,
  description: string,
  descriptionEn: string,
  teacher: string,
  categoryId?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
};

export type CoursesState = {
  items: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
};

const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/courses/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const result = await response.json();
      console.log(result);
      
      // Handle backend response structure - return data array or empty array
      if (result.success === false) {
        throw new Error(result.message || 'Failed to fetch courses');
      }
      
      // Ensure we always return an array
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/courses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        throw new Error(result.message || 'Failed to create course');
      }
      
      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ courseId, courseData }: { courseId: string, courseData: Partial<Course> }, { rejectWithValue }) => {
    console.log('Updating course:', courseId, courseData);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        throw new Error(result.message || 'Failed to update course');
      }
      
      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        throw new Error(result.message || 'Failed to delete course');
      }
      
      return courseId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.items.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(c => c._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = coursesSlice.actions;
export { fetchCourses, addCourse, deleteCourse, updateCourse };
export default coursesSlice.reducer;
