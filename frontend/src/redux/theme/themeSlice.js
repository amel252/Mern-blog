// import { createSlice } from "@reduxjs/toolkit";

// const getInitialTheme = () => {
//     if (localStorage.getItem("theme")) {
//         return localStorage.getItem("theme");
//     }
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
// };

// const initialState = {
//     theme: getInitialTheme(),
// };

// const themeSlice = createSlice({
//     name: "theme",
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.theme = state.theme === "light" ? "dark" : "light";
//             localStorage.setItem("theme", state.theme);
//         },
//     },
// });

// export const { toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer;
// src/redux/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const initialState = {
    theme: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
