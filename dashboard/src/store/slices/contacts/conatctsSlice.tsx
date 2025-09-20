import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiUrl } from '../../../const';

// --- INTERFACES ---
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

// --- ASYNC THUNKS (CRUD OPERATIONS) ---
// Thunk to fetch all contacts from a real API
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint for fetching contacts
      const response = await fetch(`${apiUrl}/api/contact/admin/contacts`, {
        method: "GET"
      });
      if (!response.ok) {
        return rejectWithValue('فشل بتحميل قائمة التواصل');
      }
      const data = await response.json();
      // console.log(data)
        return {
          contacts: data.data,
          pagination: {
            totalPages: data.pagination.totalPages,
            currentPage: data.pagination.currentPage,
            total: data.pagination.total,
          }
        }
    } catch (error: any) {
      // // console.log(error)
      return rejectWithValue('فشل بتحميل قائمة التواصل');
    }
  }
);

// Thunk to delete a specific contact from a real API
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint for deleting a contact
      const response = await fetch(`${apiUrl}/api/contact/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json()
        if(errorData.message == "لم يتم العثور على الرسالة") return rejectWithValue("لم يتم العثور على الرسالة")
        return rejectWithValue("فشل حذف الرسالة")
      }
      // The API should ideally return the ID of the deleted item
      return id;
    } catch (error: any) {
      return rejectWithValue("فشل حذف الرسالة")
    }
  }
);

// --- REDUX SLICE ---
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
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
      // Delete Contact
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

export const { clearError } = contactsSlice.actions;
export default contactsSlice.reducer;
