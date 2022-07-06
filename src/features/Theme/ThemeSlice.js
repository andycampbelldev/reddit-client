import { createSlice } from '@reduxjs/toolkit';

const options = {
    name: 'theme',
    initialState: {
        darkMode: true 
    },
    reducers: {
        setDarkMode: (state) => {
            const savedTheme = window.localStorage.getItem("redditBoardTheme");
            if(!savedTheme) return;
            let savedDarkMode = JSON.parse(savedTheme).darkMode;
            if (!savedDarkMode) return;
            state.darkMode = savedDarkMode;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            window.localStorage.setItem("redditBoardTheme", JSON.stringify({ darkMode: state.darkMode }));
        }
    }
}

const themeSlice = createSlice(options);

export const selectDarkMode = state => state.theme.darkMode;
export const { setDarkMode, toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;