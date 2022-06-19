import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSubredditsInfo = createAsyncThunk('subreddits/getSubredditsInfo', async (subreddits, thunkAPI) => {
    const updatedSubreddits = []
    for (let subreddit of subreddits) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit.name}/about.json`);
        const result = await response.json();
        const { public_description, community_icon } = result.data;
        updatedSubreddits.push({
            ...subreddit, 
            description: public_description, 
            icon: community_icon.replace(/&amp;/g, '&')})
    }
    return updatedSubreddits;
})

const options = {
    name: 'subreddits',
    initialState: {
        currentSubreddit: 'beerporn',
        allSubreddits: [{name: 'beerporn'}, {name: 'patiogardening'}, {name: 'reactjs'}, {name: 'sourdough'}, {name: 'pizza'}, {name: 'videos'}],
        isLoading: true,
        hasError: false,
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        }
    },
    extraReducers: {
        [getSubredditsInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getSubredditsInfo.fulfilled]: (state, action) => {
            state.allSubreddits = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [getSubredditsInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
}

const subredditSlice = createSlice(options);

export const selectSubredditsAreLoading = state => state.subreddits.isLoading;
export const selectCurrentSubreddit = state => state.subreddits.currentSubreddit;
export const selectAllSubreddits = state => state.subreddits.allSubreddits;

export const { setCurrentSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;