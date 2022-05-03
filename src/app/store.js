import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchForm/searchTermSlice';
import subredditReducer from '../features/SubredditNav/SubredditSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    subreddit: subredditReducer
  }
});
