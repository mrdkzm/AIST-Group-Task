import { WeatherData } from '../types/weatherTypes.js';
import { createSlice } from '@reduxjs/toolkit';

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState: [] as WeatherData[], 
  reducers: {
    addSearch: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addSearch } = recentSearchesSlice.actions;

export default recentSearchesSlice.reducer;