import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Active le mode dark via la classe "dark"
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ".flowbite-react\\class-list.json",
    ],
    theme: {
        extend: {},
    },
    plugins: [flowbiteReact],
};
