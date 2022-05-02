import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'searchTerm',
    initialState: '',
    reducers: {
        setSearchTerm: (state, action) => {
            return action.payload;
        }
    }
}

const searchTermSlice = createSlice(options);

export const selectSearchTerm = state => state.searchTerm;

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;