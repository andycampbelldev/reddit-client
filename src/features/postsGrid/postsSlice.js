import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'posts',
    initialState: [],
    reducers: {
        setPosts: (state, action) => {
            return action.payload;
        }
    }
}

const postsSlice = createSlice(options);

export const selectPosts = state => state.posts;

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;