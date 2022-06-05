import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCommentsForPost = createAsyncThunk('post/getCommentsForPost', async (permalink, thunkAPI) => {
    const response = await fetch(`https://www.reddit.com${permalink.slice(0,-1)}.json`);
    const result = await response.json();
    return result;
})

//locate a given comment in state.comments.comments from an array of comment names, ordered by parent to child
const findComment = (state, nameArr) => {
    // first, find top level comment
    let comment = state.comments.comments.find(comment => comment.data.name === nameArr[0]);
    // drill down into replies if necessary
    if (nameArr.length > 1) {
        for (let parent of nameArr.slice(1)) {
            comment = comment.data.replies.data.children.find(reply => reply.data.name === parent)
        }
    }
    return comment;
}

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
        num_comments: 0,
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
        setPost: (state, action) => {
            const { url, title, author, ups, downs, content, type, secure_media, gallery_data, permalink, thumbnail, whenPostedDisplay, num_comments } = action.payload;
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
            state.num_comments = num_comments;
        },
        setGalleryIndex: (state, action) => {
            state.galleryIndex = action.payload;
        },
        setPostThreadLength: (state, action) => {
            state.threadLength = action.payload;
        },
        setCommentThreadLength: (state, action) => {
            const comment = findComment(state, action.payload.parents);
            comment.threadLength = action.payload.threadLength
        },
        toggleCommentHighlight: (state, action) => {
            const comment = findComment(state, action.payload);
            comment.highlight = !comment.highlight;
        },
        toggleCommentCollapse: (state, action) => {
            const comment = findComment(state, action.payload);
            comment.collapsed = !comment.collapsed;
        }

    },
    extraReducers: {
        [getCommentsForPost.pending]: (state, action) => {
            state.comments.isLoading = true;
            state.comments.hasError = false;
        },
        [getCommentsForPost.fulfilled]: (state, action) => {
            state.comments.comments = action.payload[1].data.children.filter(object => object.kind === 't1').map(comment => ({...comment, threadLength: 1, highlight: false, collapsed: false}));
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
//export const selectPost = state => state.post;
export const selectPost = state => {
    const  { type, ups, downs, title, author, content, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail, name, num_comments } = state.post
    return { type, ups, downs, title, author, content, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail, name, num_comments }
}
export const selectGalleryIndex = state => state.post.galleryIndex;
export const selectCommentsLoading = state => state.post.comments.isLoading;
export const selectCommentsError = state => state.post.comments.hasError;
export const selectPostThreadLength = state => state.post.threadLength;
export const selectComments = state => state.post.comments.comments;

export const { toggleDisplayPost, setPost, setGalleryIndex, setPostThreadLength, setCommentThreadLength, toggleCommentHighlight, toggleCommentCollapse } = postSlice.actions;
export default postSlice.reducer;