import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchHistory: string[];  // قائمة لتخزين تاريخ البحث
}

const initialState: SearchState = {
  searchHistory: [],  // قائمة فارغة في البداية
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchHistory: (state, action: PayloadAction<string>) => {
      // إضافة القيمة الجديدة إلى القائمة الموجودة
      state.searchHistory = [...state.searchHistory, action.payload];
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];  // تفريغ القائمة
    },
  },
});

export const { setSearchHistory, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
