import { configureStore } from '@reduxjs/toolkit';
import recentSearchesReducer from '../features/recentSearchesSlice';



export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    recentSearches: recentSearchesReducer,
  },
});

export default store;