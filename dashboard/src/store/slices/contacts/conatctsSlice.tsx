import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// --- INTERFACES ---
export interface IContact {
  _id: string;
  username: string;
  email: string;
  message: string;
}

export interface ContactsState {
  items: IContact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// --- ASYNC THUNKS (CRUD OPERATIONS) ---
// Thunk to fetch all contacts from a real API
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint for fetching contacts
      const response = await fetch('http://localhost:5000/api/contact/admin/contacts', {
        method: "GET"
      });
      if (!response.ok) {
        return rejectWithValue('Failed to fetch contacts');
      }
      const data: IContact[] = await response.json();
      return data;
    } catch (error: any) {
      // console.log(error)
      return rejectWithValue('Failed to fetch contacts');
    }
  }
);

// Thunk to delete a specific contact from a real API
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint for deleting a contact
      const response = await fetch(`http://localhost:5000/api/contact/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return rejectWithValue("فشل حذف التواصل")
      }
      // The API should ideally return the ID of the deleted item
      return id;
    } catch (error: any) {
      return rejectWithValue("فشل حذف التواصل")
    }
  }
);

// --- REDUX SLICE ---
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  } as ContactsState,
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
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
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
