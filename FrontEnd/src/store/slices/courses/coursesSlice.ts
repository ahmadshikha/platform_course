import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ITeacher } from '../teachers/teachersSlice';
import { ICategory } from '../categories/categoriesSlice';

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
        throw new Error(errorData.message || 'Failed to fetch courses');
      }
      const result = await response.json();

      if (result.success === false) {
        throw new Error(result.message || 'Failed to fetch courses');
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
        // action.payload has shape { courses, pagination }
        state.items = action.payload.courses;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

  },
});

export const { clearError } = coursesSlice.actions;
export { fetchCourses };
export default coursesSlice.reducer;
