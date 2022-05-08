import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchForm/searchTermSlice';
import subredditReducer from '../features/subredditNav/subredditSlice';
import postsReducer from '../features/postsGrid/postsSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    subreddit: subredditReducer,
    posts: postsReducer,
    post: postReducer
  }
});
