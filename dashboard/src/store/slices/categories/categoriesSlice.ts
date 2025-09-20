import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../../const';

export interface ICategory {
  _id: string;
  name: string;
  // nameEn: string;
  description: string;
  image: string
  // descriptionEn: string;
  createdAt: string;
  updatedAt: string;
}

interface IAddCategory {
  name: string;
  // nameEn: string;
  image: HTMLInputElement
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
export const fetchCategories = createAsyncThunk<{data: ICategory[], pagination?: {totalPages: number, currentPage: number, totalItems: number, itemsPerPage: number}}, {page?: number, limit?: number} | undefined>('categories/fetchCategories', 
  async (params, {rejectWithValue}) => {
    const { page, limit } = params || {};
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());
      
      const url = `${apiUrl}/api/categories/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
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
      // console.log(res)
      return {
        data: data.data,
        pagination: data.pagination
      };

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to fetch categories');
    }
});

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (newCategory: IAddCategory, { rejectWithValue }) => {
    try {
      // 1. Create a new FormData instance. This is the correct way
      //    to handle file uploads in a browser environment.
      const formdata = new FormData();
      
      // 2. Append all fields to the FormData object. This includes
      //    the file and any other data you want to send.
      formdata.append("name", newCategory.name);
      formdata.append("description", newCategory.description);
      
      // 3. Append the actual file. The first argument is the field name
      //    the server expects ("image"). The second argument is the file object itself.
      //    The browser will automatically set the correct filename and content type.
      //    We no longer need the local file path.
      if (newCategory.image.files && newCategory.image.files[0]) {
        formdata.append("image", newCategory.image.files[0]);
      } else {
        return rejectWithValue("No image file provided.");
      }

      // 4. Make the fetch request with the formdata object as the body.
      //    IMPORTANT: Do NOT set the 'Content-Type' header. The browser will
      //    automatically set it to 'multipart/form-data' with the correct boundary.
      const res = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST',
        body: formdata,
      });

      if (!res.ok) {
        const errorData = await res.json();
        // console.log(errorData)
        if(errorData.message == 'Only image files are allowed!') return rejectWithValue('مسموح فقط برفع الصور')
        if(errorData.message == 'No file uploaded') return rejectWithValue("قم بتحميل الصورة اولا")
        return rejectWithValue('فشل باضافة الفئة');
      }

      const data = await res.json();
      return data;
    } catch (e) {
      // It's good practice to check if 'e' is an Error object before accessing its properties.
      // console.log(e.message)
      if(e.message == "Cannot read properties of undefined (reading 'files')") return rejectWithValue("قم بتحميل الصورة اولا")
      const errorMessage = 'خطا غير متوقع';
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateCategory = createAsyncThunk<ICategory, ICategory, {rejectValue: string}>('categories/updateCategory', 
  async (updatedCategory, {rejectWithValue}) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${updatedCategory._id}`, {
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
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response)
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
    clearStatus(state) {
      state.status = 'idle';
    }
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
        state.status = 'succeeded';
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
        state.status = 'succeeded';
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

export const { setCategories, updateCategoryLocally, deleteCategoryLocally, clearError, clearStatus } = categoriesSlice.actions;
export default categoriesSlice.reducer;
