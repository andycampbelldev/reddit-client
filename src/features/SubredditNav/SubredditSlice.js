import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'subreddits',
    initialState: {
        currentSubreddit: 'beerporn'
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        }
    }
}

const subredditSlice = createSlice(options);

export const selectCurrentSubreddit = state => state.subreddits.currentSubreddit;

export const { setCurrentSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;