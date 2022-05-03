import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchForm/searchTermSlice';
import subredditReducer from '../features/SubredditLink/SubredditSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    subreddit: subredditReducer
  }
});
