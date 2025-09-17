import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface ICategory {
  _id: string;
  name: string;
  // nameEn: string;
  description: string;
  // descriptionEn: string;
  createdAt: string;
  updatedAt: string;
}

interface IAddCategory {
  name: string;
  // nameEn: string;
  description: string;
  // descriptionEn: string;
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
      console.log(res)
      return {
        data: data.data,
        pagination: data.pagination
      };

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to fetch categories');
    }
});

export const addCategory = createAsyncThunk<ICategory, IAddCategory, {rejectValue: string}>('categories/addCategory', 
  async (newCategory, {rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      
      if(!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to add category');
      }
      
      const data = await res.json();
      console.log(data)
      return data;

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to add category');
    }
});

export const updateCategory = createAsyncThunk<ICategory, ICategory, {rejectValue: string}>('categories/updateCategory', 
  async (updatedCategory, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${updatedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedCategory.name, description: updatedCategory.description,}),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update category');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk<string, string, {rejectValue: string}>('categories/deleteCategory', 
  async (categoryId, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if(response.status == 500) {
        return rejectWithValue("حدث خطا");
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to delete category');
      }
      return categoryId;
    } catch (error) {
      alert('error')
      return rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },
    updateCategoryLocally(state, action: PayloadAction<ICategory>) {
      const index = state.items.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategoryLocally(state, action: PayloadAction<string>) {
      state.items = state.items.filter(c => c._id !== action.payload);
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
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to add category';
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
        const index = state.items.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to update category';
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(category => category._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to delete category';
      });
  },
});

export const { setCategories, updateCategoryLocally, deleteCategoryLocally, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
