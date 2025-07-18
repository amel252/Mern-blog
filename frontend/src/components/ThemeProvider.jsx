// // ThemeProvider.jsx
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function ThemeProvider({ children }) {
//     const { theme } = useSelector((state) => state.theme);

//     useEffect(() => {
//         if (theme === "dark") {
//             document.documentElement.classList.add("dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//         }
//     }, [theme]); // Se met à jour si le thème change

//     return <>{children}</>;
// }
// src/components/ThemeProvider.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return <>{children}</>;
}
