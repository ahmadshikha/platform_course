import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {apiUrl} from '../../../const'
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface UserRegister {
    participantType: 'individual' | 'group';
    title: string;
    firstName: string;
    lastName: string;
    birthDate: string; // ISO date string
    gender: 'male' | 'female';
    nationality: string;
    idNumber: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    mobile: string;
    email: string;
    confirmEmail: string;
    courseNumber: string;
    courseTitle: string;
    participationReason?: string;
    educationLevel: string;
    occupation: string;
    companyName?: string;
    companyAddress?: string;
    emergencyContact: EmergencyContact;
    specialNeeds?: string;
    additionalInfo?: string;
    agreeTerms: boolean;
    agreeDataProcessing: boolean;
    receiveNewsletter?: boolean;
    status?: "معلق"|"مؤكد";
    registrationDate?: string; // ISO date string
    notes?: string;
    _id?: string;
}

export const fetchUserRegisters = createAsyncThunk<UserRegister[]>(`${apiUrl}/api/userRegister`,
    async (_, {rejectWithValue}) => {
    try {      
      const url = `${apiUrl}/api/userRegister`;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res)
      if(!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to fetch users Registration');
      }
      
      const data = await res.json();
      console.log("users registrers", data)
        return data.data;

    } catch(e) {
      return rejectWithValue(e.message || 'Failed to fetch Users Registration');
    }
})
// update user register status by id in params
export const updateUserRegisterStatus = createAsyncThunk<
  UserRegister,
  { id: string; status: UserRegister['status'] },
  { rejectValue: string }
>(
  'usersRegister/updateUserRegisterStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const url = `${apiUrl}/api/userRegister/${id}/status`;
      const res = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      // console.log("update user register status", res)
      if (!res.ok) {
          const errorData = await res.json();
          // console.log(errorData)
          if(errorData.message == 'لا توجد مقاعد متاحة في هذا الكورس') return rejectWithValue(errorData.message)
          if(errorData.message == 'لم يتم العثور على الكورس') return rejectWithValue(errorData.message)
          if (errorData.message == "unauthenticated") return rejectWithValue('يجب تسجيل الدخول اولاً');
          if (errorData.message == "token expired") return rejectWithValue("انتهت صلاحية الجلسة ..");
          return rejectWithValue("فشل تحديث حالة التسجيل");
        }
        
        const data = await res.json();
        // console.log("update user register status", data)
        return data.data;
    } catch (e: any) {
      return rejectWithValue("فشل تحديث حالة التسجيل");
    }
  }
);

export interface UserRegisterState {
    items: UserRegister[]
 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
// Minimal slice to store an array of user registrations
const initialState: UserRegisterState = {
    items: [],
    status: 'idle',
    error: null,
};

const usersRegisterSlice = createSlice({
    name: 'usersRegister',
    initialState,
    reducers: {
        addRegister(state, action: PayloadAction<UserRegister>) {
            // state.push(action.payload);
        },
        removeRegister(state, action: PayloadAction<{ idNumber: string }>) {
            // return state.filter(r => r.idNumber !== action.payload.idNumber);
        }
        ,
        updateRegisterStatus(state, action: PayloadAction<{ idNumber: string; status: UserRegister['status'] }>) {
            const { idNumber, status } = action.payload;
            const idx = state.items.findIndex(i => i.idNumber === idNumber);
            if (idx !== -1) {
                state.items[idx].status = status;
            }
        },
        clearError(state) {
          state.error = null;
          state.status = "succeeded"
            
        }
    },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserRegisters.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserRegisters.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // console.log(action.payload)
      state.items = action.payload.filter((i) => {
        // console.log(i.status !== "معلق");
        // console.log("-------");
        
        return i.status == "معلق";
      })
      // console.log(action.payload)
      
      // state.items = action.payload
    })
    .addCase(updateUserRegisterStatus.pending, (state) => {
      // keep previous status but mark loading if desired
      state.status = 'loading';
    })
    .addCase(updateUserRegisterStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = state.items.filter((i) => {
        // console.log(i.status !== action.payload.status);
        // console.log(i.status, action.payload.status);
        // console.log("-------");
        
        return i.status == action.payload.status;
      })
      // const updated = action.payload;
      // if (!updated) return;
      // const idx = state.items.findIndex(i => (i._id && updated._id && i._id === updated._id) || i.idNumber === updated.idNumber);
      // if (idx !== -1) {
      //   // replace the item so React/Redux sees the change
      //   state.items[idx] = {
      //     ...state.items[idx],
      //     ...updated
      //   };
      // } else {
      //   // if not found, optionally add it
      //   state.items.push(updated);
      // }
    })
    .addCase(updateUserRegisterStatus.rejected, (state, action) => {
      state.status = 'failed';
      // action.payload will be the rejectWithValue string when available
      // console.log(action.payload)
      state.error = action.payload || 'فشل بتحديث حالة التسجيل';
    })
  }
});

export const { addRegister, removeRegister, updateRegisterStatus, clearError } = usersRegisterSlice.actions;

export default usersRegisterSlice.reducer;
