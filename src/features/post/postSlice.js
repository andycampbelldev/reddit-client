import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCommentsForPost = createAsyncThunk('post/getCommentsForPost', async (permalink, thunkAPI) => {
    const response = await fetch(`https://www.reddit.com${permalink.slice(0,-1)}.json`);
    const result = await response.json();
    return result;
})

const options = {
    name: 'post',
    initialState: {
        displayingPost: false,
        url: '',
        permalink: '',
        thumbnail: '',
        type: '',
        title: '',
        author: '',
        whenPostedDisplay: '',
        ups: 0,
        downs: 0,
        content: '',
        secure_media: {},
        gallery_data: {},
        comments: {
            isLoading: false,
            hasError: false,
            comments: []
        },
        galleryIndex: 0
    },
    reducers: {
        toggleDisplayPost: (state, action) => {
            state.displayingPost = !state.displayingPost;
        },
        setPost: (state, action) => {
            const { url, title, author, ups, downs, content, type, secure_media, gallery_data, permalink, thumbnail, whenPostedDisplay } = action.payload;
            state.url = url;
            state.permalink = permalink;
            state.thumbnail = thumbnail;
            state.type = type;
            state.title = title;
            state.author = author;
            state.whenPostedDisplay = whenPostedDisplay;
            state.ups = ups;
            state.downs = downs;
            state.content = content;
            state.secure_media = secure_media;
            state.gallery_data = gallery_data;
        },
        setGalleryIndex: (state, action) => {
            state.galleryIndex = action.payload;
        }
    },
    extraReducers: {
        [getCommentsForPost.pending]: (state, action) => {
            state.comments.isLoading = true;
            state.comments.hasError = false;
        },
        [getCommentsForPost.fulfilled]: (state, action) => {
            state.comments.comments = action.payload[1].data.children.filter(object => object.kind === 't1');
            state.comments.isLoading = false;
            state.comments.hasError = false;
        },
        [getCommentsForPost.rejected]: (state, action) => {
            state.comments.isLoading = false;
            state.comments.hasError = true;
        }
    }
}

const postSlice = createSlice(options);

export const selectDisplayingPost = state => state.post.displayingPost;
export const selectPost = state => state.post;
export const selectGalleryIndex = state => state.post.galleryIndex;
export const selectCommentsLoading = state => state.post.comments.isLoading;
export const selectCommentsError = state => state.post.comments.hasError;
export const selectComments = state => state.post.comments.comments;

export const { toggleDisplayPost, setPost, setGalleryIndex } = postSlice.actions;
export default postSlice.reducer;