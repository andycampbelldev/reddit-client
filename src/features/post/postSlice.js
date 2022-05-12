import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'post',
    initialState: {
        displayingPost: false,
        url: '',
        type: '',
        title: '',
        author: '',
        ups: 0,
        downs: 0,
        content: '',
        videoSrc: {},
        gallery: {
            items: [],
            activeIndex: 0
        },
        comments: []
    },
    reducers: {
        toggleDisplayPost: (state, action) => {
            state.displayingPost = !state.displayingPost;
        },
        setPost: (state, action) => {
            const { url, title, author, ups, downs, content, type, videoSrc, galleryData } = action.payload;
            state.url = url;
            state.type = type;
            state.title = title;
            state.author = author;
            state.ups = ups;
            state.downs = downs;
            state.content = content;
            state.videoSrc = videoSrc;
            state.gallery.items = galleryData ? galleryData.items : [];
        },
        setGalleryActiveIndex: (state, action) => {
            state.gallery.activeIndex = action.payload;
        }
    }
}

const postSlice = createSlice(options);

export const selectDisplayingPost = state => state.post.displayingPost;
export const selectPost = state => state.post;
export const selectGalleryActiveIndex = state => state.post.gallery.activeIndex;

export const { toggleDisplayPost, setPost, setGalleryActiveIndex } = postSlice.actions;
export default postSlice.reducer;