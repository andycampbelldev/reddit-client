import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/SearchForm/SearchTermSlice';
import subredditReducer from '../features/SubredditNav/SubredditSlice';
import postsReducer from '../features/PostsGrid/PostsSlice';
import postReducer from '../features/Post/PostSlice';
import themeReducer from '../features/Theme/ThemeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    searchTerm: searchTermReducer,
    subreddits: subredditReducer,
    posts: postsReducer,
    post: postReducer
  }
});
