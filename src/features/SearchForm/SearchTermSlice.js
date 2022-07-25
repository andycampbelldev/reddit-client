import { createSlice } from '@reduxjs/toolkit';

const options = {
    name: 'searchTerm',
    initialState: {
        searchInput: '',
        searchedTerm: '',
    },
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setSearchedTerm: (state, action) => {
            state.searchedTerm = action.payload;
        }
    }
}

const searchTermSlice = createSlice(options);

export const selectSearchInput = state => state.searchTerm.searchInput;
export const selectSearchedTerm = state => state.searchTerm.searchedTerm;

export const { setSearchInput, setSearchedTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;