import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import timeElapsed from '../../utils/timeElapsed';

export const getPosts = createAsyncThunk('posts/getPosts', async (url, thunkAPI) => {
    const response = await fetch(url);
    const result = await response.json();
    return result.data.children;
})

const options = {
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: true,
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
            // loop over each post returned and set additional properties
            for (let post of action.payload) {
                const { post_hint, is_gallery, gallery_data, created_utc, title, url, thumbnail } = post.data;
                //when posted
                post.data.whenPosted = timeElapsed(new Date(created_utc * 1000), 'day', 7).toPreferredString();
                //decoded title
                post.data.decodedTitle = title.replace(/&amp;/g, '&');
                //post type - image, gallery or video, or link to external content like imgur or youtube
                post.data.postType = post_hint === 'image' ? 'image' : post_hint === 'hosted:video' ? 'video' : ['link', 'rich:video'].includes(post_hint) ? 'link' : is_gallery && gallery_data ? 'gallery' : undefined;
                //background image url for use on PostCard. Where possible, use a 640px wide image, otherwise fallback to largest.
                if (post.data.postType === 'image') {
                    const previewImageResolutions = post.data.preview.images[0].resolutions;
                    const image = previewImageResolutions.find(image => image.width === 640) || previewImageResolutions[previewImageResolutions.length - 1];
                    post.data.backgroundImageUrl = image.url.replace(/&amp;/g, '&');
                } else if (post.data.postType === 'gallery') {
                    const { media_metadata } = post.data;
                    const metadataKeys = Object.keys(media_metadata);
                    const previewImageResolutions = media_metadata[metadataKeys[0]].p;
                    // use the 640px image, or fallback to the largest available
                    let image = previewImageResolutions.find(image => image.x === 640) || previewImageResolutions[previewImageResolutions.length - 1];
                    post.data.backgroundImageUrl = image.u.replace(/&amp;/g, '&');
                } else {
                    post.data.backgroundImageUrl = post.data.postType === 'video' ? thumbnail : undefined;
                }


            }
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