import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // L'utilisateur n'existe pas encore
    currentUser: null,
    error: null,
    loading: false
}

// Création de slice 
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        // au debut
        signInstart: (state) => {
            state.loading =  true,
            state.error = null
        },
        // resussie
        signInSuccess: (state, action) => {
            // payload parle de données de l'utilisateur
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null
        },
        // Echec
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {signInstart, signInSuccess, signInFailure} = userSlice.actions;
// exporte reducer dans store.js et renome comme c'est un export default
export default userSlice.reducer