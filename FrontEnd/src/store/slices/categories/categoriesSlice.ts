import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface ICategory {
  _id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  createdAt: string;
  updatedAt: string;
}

interface IAddCategory {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
}

export type CategoriesState = {
  items: ICategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

// Async Thunks
export const fetchCategories = createAsyncThunk<{data: ICategory[], pagination: {totalPages: number, currentPage: number, totalItems: number, itemsPerPage: number}}, {page?: number, limit?: number} | undefined>('categories/fetchCategories', 
  async (params, {rejectWithValue}) => {
    const { page, limit } = params || {};
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());
      
      const url = `http://localhost:5000/api/categories/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if(!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to fetch categories');
      }
      
      const data = await res.json();
      return {
        data: data.data,
        pagination: data.pagination
      };

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to fetch categories');
    }
});


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })

  },
});

export const { setCategories, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
