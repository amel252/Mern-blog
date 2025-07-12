// import { configureStore , combineReducers} from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // ou "./slices/userSlice" si nécessaire
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // utilise localStorage

// // Combine reducers
const rootReducer = combineReducers({
    user:userReducer

})
// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true
        })


})
// Export store and persistor
export const persistor = persistStore(store);
