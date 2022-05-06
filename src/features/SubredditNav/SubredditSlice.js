import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'subreddit',
    initialState: '/r/beerporn',
    reducers: {
        setSubreddit: (state, action) => {
            return action.payload;
        }
    }
}

const subredditSlice = createSlice(options);

export const selectSubreddit = state => state.subreddit;

export const { setSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;