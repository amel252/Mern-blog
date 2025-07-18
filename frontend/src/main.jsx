import { createRoot } from "react-dom/client";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import "flowbite";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
