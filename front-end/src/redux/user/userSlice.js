// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     // l'utiisateur n'est pas encore membre
//     currentUser: null,
//     error: null,
//     loading: false,
// };
// // creation de slice
// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         // au début rien ne passe
//         signInStart: (state) => {
//             (state.loading = true), (state.error = null);
//         },
//         // reussie
//         signInSucces: (state, action) => {
//             //payload parle de données de l'utilisateur
//             state.currentUser = action.payload;
//             (state.loading = false), (state.error = null);
//         },
//         // echec
//         signInFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     },
// });
// export const { signInStart, signInSucces, signInFailure } = userSlice.actions;
// export default userSlice.reducer;
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
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
// exporte reducer dans store.js et renome comme c'est un export default
export default userSlice.reducer;
