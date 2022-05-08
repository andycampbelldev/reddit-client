import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'post',
    initialState: {
        displayingPost: false,
        url: '',
        title: '',
        author: '',
        ups: 0,
        downs: 0,
        content: '',
        comments: []
    },
    reducers: {
        toggleDisplayPost: (state, action) => {
            state.displayingPost = !state.displayingPost;
        },
        setPost: (state, action) => {
            const { url, title, author, ups, downs, content } = action.payload;
            state.url = url;
            state.title = title;
            state.author = author;
            state.ups = ups;
            state.downs = downs;
            state.content = content;
        }
    }
}

const postSlice = createSlice(options);

export const selectDisplayingPost = state => state.post.displayingPost;
export const selectPost = state => state.post;

export const { toggleDisplayPost, setPost } = postSlice.actions;
export default postSlice.reducer;