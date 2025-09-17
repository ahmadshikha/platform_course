import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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
    imageURL: string;
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


            const url = `http://localhost:5000/api/news/`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.message || 'Failed to fetch news');
            }

            const data = await res.json();
            console.log(res)
            return {
                data: data.data,
            };

        } catch (e) {
            return rejectWithValue(e.message || 'Failed to fetch news');
        }
    });

export const addNews = createAsyncThunk<INews, IAddNews, { rejectValue: string }>('news/addNews',
    async (newNews, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNews),
                
            });

            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.message || 'Failed to add news');
            }

            const data = await res.json();
            console.log(data)
            return data.data;

        } catch (e) {
            return rejectWithValue(e.message || 'Failed to add news');
        }
    });

export const updateNews = createAsyncThunk<INews, INews, { rejectValue: string }>('news/updateNews',
    async (updatedNews, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/news/${updatedNews._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNews),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to update news');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update news');
        }
    }
);

export const deleteNews = createAsyncThunk<string, string, { rejectValue: string }>('news/deleteNews',
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/news/${newsId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.status == 500) {
                return rejectWithValue("حدث خطا");
            }
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to delete news');
            }
            return newsId;
        } catch (error) {
            alert('error')
            return rejectWithValue(error.message || 'Failed to delete news');
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
                state.error = action.error.message || 'Failed to fetch news';
            })
            .addCase(addNews.fulfilled, (state, action: PayloadAction<INews>) => {
                state.items.push(action.payload);
            })
            .addCase(addNews.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || 'Failed to add news';
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || 'Failed to delete news';
            });
    },
});

export const { setNews, clearError } = newsSlice.actions;
export default newsSlice.reducer;