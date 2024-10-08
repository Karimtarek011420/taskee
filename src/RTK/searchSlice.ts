import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchHistory: string[];
}

const initialState: SearchState = {
  searchHistory: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<string>) => {
      const newHistory = state.searchHistory.filter(
        (history) => history !== action.payload
      );
      state.searchHistory = [action.payload, ...newHistory].slice(0, 10);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { addSearchHistory, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
