import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiUrl } from '../../../const';

export interface IContact {
  _id: string;
  username: string;
  email: string;
  message: string;
}

export interface ContactsState {
  items: IContact[];
  pagination: {
    totalPages: number,
    currentPage: number,
    total: number,
  },
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactsState = {
  items: [],
  pagination: {
    totalPages: 0,
    currentPage: 1,
    total: 0,
  },
  status: "idle",
  error: null
}


export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "GET",
        credentials: 'include'
      });
      if (!response.ok) {
        return rejectWithValue('فشل بتحميل قائمة التواصل');
      }
      const data = await response.json();
        return {
          contacts: data.data,
          pagination: {
            totalPages: data.pagination.totalPages,
            currentPage: data.pagination.currentPage,
            total: data.pagination.total,
          }
        }
    } catch (error: any) {
      return rejectWithValue('فشل بتحميل قائمة التواصل');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/contact/admin/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.message == "لم يتم العثور على الرسالة") return rejectWithValue("لم يتم العثور على الرسالة");
        if (errorData.message == "unauthenticated") return rejectWithValue('يجب تسجيل الدخول اولاً');
        if (errorData.message == "token expired") return rejectWithValue("انتهت صلاحية الجلسة ..");
        return rejectWithValue("فشل حذف الرسالة")
      }
      return id;
    } catch (error: any) {
      return rejectWithValue("فشل حذف الرسالة")
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearStatus(state) {
      state.status = 'idle';
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.contacts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || "فشل تحميل الرسائل";
      })

      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.items = state.items.filter(contact => contact._id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
