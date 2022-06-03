import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk('posts/getPosts', async (url, thunkAPI) => {
    const response = await fetch(url);
    const result = await response.json();
    return result.data.children;
})

const options = {
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setPosts: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
}

const postsSlice = createSlice(options);

export const selectPosts = state => state.posts.posts;
export const selectPostsIsLoading = state => state.posts.isLoading;
export const selectPostsHasError = state => state.posts.hasError;

export default postsSlice.reducer;