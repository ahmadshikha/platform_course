import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {apiUrl} from '../../../const'

export interface IActivity {
    _id: string;
    name: string;
    description: string;
    date: Date; 
    location: string;
    createdAt?: string;
    updatedAt?: string;
}

interface NewActivityData {
    name: string;
    description: string;
    date: Date; 
    location: string;
};

export interface ActivitiesState {
    items: IActivity[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ActivitiesState = {
    items: [],
    status: 'idle',
    error: null,
};




export const fetchActivities = createAsyncThunk<IActivity[], void, { rejectValue: string }>(
    'activities/fetchActivities',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiUrl}/api/activities`);
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue('فشل بتحميل النشاطات')
            };
            const data = await res.json();
            return data.data;
        } catch (error: any) {
            return rejectWithValue("فشل بتحميل النشاطات");
        }
    }
);

export const addActivity = createAsyncThunk<IActivity, NewActivityData, { rejectValue: string }>(
    'activities/addActivity',
    async (activityData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/activities`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activityData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message == 'ValidationError') return rejectWithValue("تحقق من صحة البيانات");
                if (errorData.message == "unauthenticated") return rejectWithValue('يجب تسجيل الدخول اولاً');
                if (errorData.message == "token expired") return rejectWithValue("انتهت صلاحية الجلسة ..");
                return rejectWithValue("فشل اضافة نشاط")
            }
            const data = await response.json()
            return data.data;
        } catch (error: any) {
            return rejectWithValue("فشل اضافة نشاط")
        }
    }
);

export const deleteActivity = createAsyncThunk<string, string, { rejectValue: string }>(
    'activities/deleteActivity',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/activities/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                if (errorData.message == 'Activity not found') return rejectWithValue('هذا النشاط غير موجود');
                if (errorData.message == "unauthenticated") return rejectWithValue('يجب تسجيل الدخول اولاً');
                if (errorData.message == "token expired") return rejectWithValue("انتهت صلاحية الجلسة ..");
                return rejectWithValue('فشل حذف النشاط')
            }
            return id;
        } catch (error: any) {
            return rejectWithValue('فشل حذف النشاط')
        }
    
    }
);


const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = 'idle';
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<IActivity[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "فشل بتحميل النشاطات"
            })
            .addCase(addActivity.fulfilled, (state, action: PayloadAction<IActivity>) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addActivity.pending, (state, action: PayloadAction<IActivity>) => {
                state.status = 'loading';
            })
            .addCase(addActivity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'فشل اضافة نشاط'
            })

            .addCase(deleteActivity.pending, (state, action: PayloadAction<string>) => {
                state.status = 'loading';
            })
            .addCase(deleteActivity.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item._id !== action.payload);

            })
            .addCase(deleteActivity.rejected, (state, action: PayloadAction<string>) => {
                state.status = 'failed';
                state.error = action.payload || 'فشل حذف النشاط';

            })

    },
});

export const { clearStatus, clearError } = activitiesSlice.actions;

export default activitiesSlice.reducer;
