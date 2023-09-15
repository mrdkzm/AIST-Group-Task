import { configureStore } from '@reduxjs/toolkit';
import recentSearchesReducer from '../features/recentSearchesSlice';
import temperatureReducer from "../features/temperatureSlice"


export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    recentSearches: recentSearchesReducer,
    temperature: temperatureReducer,

  },
});

export default store;