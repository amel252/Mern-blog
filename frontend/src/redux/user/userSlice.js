import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // L'utilisateur n'existe pas encore
    currentUser: null,
    error: null,
    loading: false,
};

// Création de slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // au debut
        signInstart: (state) => {
            (state.loading = true), (state.error = null);
        },
        // resussie
        signInSuccess: (state, action) => {
            // payload parle de données de l'utilisateur
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Echec
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = true;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    signInstart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} = userSlice.actions;
// exporte reducer dans store.js et renome comme c'est un export default
export default userSlice.reducer;
