import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubredditInfo = createAsyncThunk('subreddits/getSubredditInfo', async (url, thunkAPI) => {
    const response = await fetch(url);
    const result = await response.json();
    const { display_name, public_description, community_icon } = result.data;
    return {
        display_name,
        public_description,
        community_icon
    }
})

//const subredditList = ['beerporn', 'patiogardening', 'reactjs', 'sourdough', 'pizza', 'videos']

const options = {
    name: 'subreddits',
    initialState: {
        currentSubreddit: 'beerporn',
        allSubreddits: [{name: 'beerporn'}, {name: 'patiogardening'}, {name: 'reactjs'}, {name: 'sourdough'}, {name: 'pizza'}, {name: 'videos'}],
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        }
    },
    extraReducers: {
        [getSubredditInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getSubredditInfo.fulfilled]: (state, action) => {
            const subreddit = state.allSubreddits.find(sr => sr.name.toLowerCase() === action.payload.display_name.toLowerCase());
            subreddit.description = action.payload.public_description;
            subreddit.icon = action.payload.community_icon.replace(/&amp;/g, '&');
            state.isLoading = false;
            state.hasError = false;
        },
        [getSubredditInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
}

const subredditSlice = createSlice(options);

export const selectCurrentSubreddit = state => state.subreddits.currentSubreddit;
export const selectAllSubreddits = state => state.subreddits.allSubreddits;

export const { setCurrentSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;