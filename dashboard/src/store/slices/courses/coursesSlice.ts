import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type Course = {
  _id: string,
  title: string,
  titleEn: string,
  type: string,
  typeEn: string,
  date: string,
  time: string,
  duration: string,
  location: string,
  locationEn: string,
  status: 'available'| 'full'| 'cancelled'| 'completed'
  price: number,
  seats: { type: Number, required: true, min: 1 },
  enrolled: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  description: string,
  descriptionEn: string,
  // teacher: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Teacher', 
  //   required: true 
  // },
  // categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
};

export type CoursesState = {
  items: Course[];
};

const initialState: CoursesState = {
  items: [],
};

const addCourse = createAsyncThunk(
  'course/addCourse',
  async() => {
    const respone = await fetch('http://localhost:5000/api/courses/', {
      method: 'POST'
    })
  }
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {

    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.items.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.items = state.items.filter(c => c._id !== action.payload);
    },
  },
});

export const { updateCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
