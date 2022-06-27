import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCommentsForPost = createAsyncThunk('post/getCommentsForPost', async (permalink, thunkAPI) => {
    const response = await fetch(`https://www.reddit.com${permalink.slice(0,-1)}.json`);
    const result = await response.json();
    return result;
})

const options = {
    name: 'post',
    initialState: {
        displayingPost: false,
        activePostId: '',
        comments: {
            isLoading: false,
            hasError: false,
            comments: []
        },
        galleryIndex: 0,
        threadLength: 3
    },
    reducers: {
        toggleDisplayPost: (state, action) => {
            state.displayingPost = !state.displayingPost;
        },
        setActivePostId: (state, action) => {
            state.activePostId = action.payload;
        },
        setGalleryIndex: (state, action) => {
            state.galleryIndex = action.payload;
        },
        setPostThreadLength: (state, action) => {
            state.threadLength = action.payload;
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

export const selectActivePostId = state => state.post.activePostId;
export const selectDisplayingPost = state => state.post.displayingPost;
export const selectPost = state => {
    const  { type, ups, downs, title, author, content, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail, name, num_comments } = state.post
    return { type, ups, downs, title, author, content, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail, name, num_comments }
}
export const selectGalleryIndex = state => state.post.galleryIndex;
export const selectCommentsLoading = state => state.post.comments.isLoading;
export const selectCommentsError = state => state.post.comments.hasError;
export const selectPostThreadLength = state => state.post.threadLength;
export const selectComments = state => state.post.comments.comments;

export const { toggleDisplayPost, setActivePostId, setGalleryIndex, setPostThreadLength } = postSlice.actions;
export default postSlice.reducer;