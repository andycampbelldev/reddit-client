import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchForm/searchTermSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer
  }
});
