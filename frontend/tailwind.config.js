// import flowbiteReact from "flowbite-react/plugin/tailwindcss";

// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: "class", // Active le mode dark via la classe "dark"
//     content: [
//         "./index.html",
//         "./src/**/*.{js,ts,jsx,tsx}",
//         ".flowbite-react\\class-list.json",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [
//         [flowbiteReact],
//         // require("@tailwindcss/line-clamp")
//     ],
// };
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#1d4ed8",
                secondary: "#9333ea",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
