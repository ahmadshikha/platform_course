import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface ILang {
    lang: "en" | "ar"
}

const initialState: ILang = {
	lang: 'en',
};

const langSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
        changeLang(state, action: PayloadAction<ILang>) {
            state.lang = action.payload.lang
        },
	},
});

export const { changeLang } = langSlice.actions;
export default langSlice.reducer;