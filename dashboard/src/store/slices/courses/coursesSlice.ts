import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ITeacher } from '../teachers/teachersSlice';
import { ICategory } from '../categories/categoriesSlice';

export type Course = {
  _id: string,
  id: string,
  title: string,
  // titleEn: string,
  type: string,
  // typeEn: string,
  date: string,
  time: string,
  duration: string,
  location: string,
  // locationEn: string,
  // status: 'available'| 'full'| 'cancelled'| 'completed',
  status: "متوفر" | "ممتلئ" | "ملغى" | "مكتمل",
  price: string,
  seats: number,
  enrolled: number,
  rating: number,
  reviews: number,
  description: string,
  details: string,
  // descriptionEn: string,
  teacher: ITeacher,
  categoryId?: ICategory,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
};

export type CoursesState = {
  items: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination?: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
};

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    total: 0,
  },
};

const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params: {page?: number, limit?: number} | undefined, { rejectWithValue }) => {
    const { page, limit } = params || {};
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());

      const url = `http://localhost:5000/api/courses/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch courses');
      }
      const result = await response.json();

      if (result.success === false) {
        return rejectWithValue(result.message || 'Failed to fetch courses');
      }

      // If backend returns paginated structure, use it; otherwise fall back to list-only
      const courses = Array.isArray(result.data) ? result.data : (result.courses || []);
      const pagination = {
        totalPages: result.totalPages ?? result.pagination?.totalPages ?? 1,
        currentPage: result.currentPage ?? result.pagination?.currentPage ?? (page || 1),
        total: result.total ?? result.pagination?.total ?? courses.length,
      };

      return { courses, pagination };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const fetchTeacherCourses = createAsyncThunk(
  'courses/fetchTeacherCourses',
  async ({ teacherId }: { teacherId: string}, { rejectWithValue }) => {
    try {


      const url = `http://localhost:5000/api/courses/teacher/${teacherId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch teacher courses');
      }
      const result = await response.json();
      console.log('teacher courses result:', result)
      if (result.success === false) {
       return rejectWithValue(result.message || 'Failed to fetch teacher courses');
      }

      return result;
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
        return rejectWithValue(errorData.message || 'Failed to create course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        return rejectWithValue(result.message || 'Failed to create course');
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
        return rejectWithValue(errorData.message || 'Failed to update course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        return rejectWithValue(result.message || 'Failed to update course');
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
        return rejectWithValue(errorData.message || 'Failed to delete course');
      }
      
      const result = await response.json();
      
      if (result.success === false) {
        return rejectWithValue(result.message || 'Failed to delete course');
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
        clearError()
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.courses;
        state.pagination = action.payload.pagination;
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
      })
      .addCase(fetchTeacherCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeacherCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchTeacherCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = coursesSlice.actions;
export { fetchCourses, addCourse, deleteCourse, updateCourse, fetchTeacherCourses as _fetchTeacherCourses };
export default coursesSlice.reducer;
