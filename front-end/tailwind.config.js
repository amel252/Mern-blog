const flowbite = require("flowbite/plugin");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
        "./node_modules/flowbite-react/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [flowbite],
};
