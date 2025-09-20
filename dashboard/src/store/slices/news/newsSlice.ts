import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../../const';

export interface INews {
    _id: string;
    title: string;
    content: string;
    category: string;
    eventDate: Date;
    imageURL: string;
}

interface IAddNews {
    title: string;
    content: string;
    category: string;
    eventDate: Date;
    imageURL: HTMLInputElement;
}

export type NewsState = {
    items: INews[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;

};

const initialState: NewsState = {
    items: [],
    status: 'idle',
    error: null,

};

// Async Thunks
export const fetchNews = createAsyncThunk<{ data: INews[]}>('news/fetchNews',
    async (_, { rejectWithValue }) => {

        try {


            const url = `${apiUrl}/api/news/`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                // // console.log(errorData)
                return rejectWithValue('فشل بتحميل الاخبار');
            }

            const data = await res.json();
            // console.log(res)
            return {
                data: data.data,
            };

        } catch (e) {
            return rejectWithValue('فشل بتحميل الاخبار');
        }
    });

export const addNews = createAsyncThunk<INews, IAddNews, { rejectValue: string }>(
  'news/addNews',
  async (newNews, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', newNews.title);
      formData.append('content', newNews.content);
      formData.append('category', newNews.category);
      formData.append('eventDate', newNews.eventDate.toString());

      if (newNews.imageURL.files && newNews.imageURL.files[0]) {
        formData.append("image", newNews.imageURL.files[0]);
      } else {
        return rejectWithValue("لم يتم اضافة صورة");
      }

      const res = await fetch(`${apiUrl}/api/news`, {
        method: 'POST',
        body: formData, // no Content-Type header
      });

      const data = await res.json();

      if (!res.ok) {
        if(data.message = "ValidationError") rejectWithValue("تحقق من صحة البيانات")
        return rejectWithValue('فشل باضافة الخبر');
      }

      return data.data;
    } catch (e) {
      return rejectWithValue('فشل باضافة الخبر');
    }
  }
);




export const deleteNews = createAsyncThunk<string, string, { rejectValue: string }>('news/deleteNews',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/news/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response)
            if (response.status == 500) {
                return rejectWithValue("حدث خطا");
            }
            if (!response.ok) {
                const errorData = await response.json();
                // console.log(errorData)
                if(errorData.message == "News article not found") return rejectWithValue("هذا الخبر غير موجود")
                return rejectWithValue('فشل حذف الخبر');
            }
            return _id;
        } catch (error) {
            return rejectWithValue('فشل حذف الخبر');
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews(state, action: PayloadAction<INews[]>) {
            state.items = action.payload;
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
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.toString() || "فشل بتحميل الاخبار";
            })
            .addCase(addNews.fulfilled, (state, action: PayloadAction<INews>) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'فشل باضافة الخبر';
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.status = 'failed';
                // console.log(action.payload)
                state.error = action.payload || 'فشل حذف الخبر';
            })
            .addCase(deleteNews.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item._id !== action.payload);
                // console.log(state.items)
            })
    },
});

export const { setNews, clearError, clearStatus } = newsSlice.actions;
export default newsSlice.reducer;