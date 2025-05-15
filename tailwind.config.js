/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#1F2937",
        lightBg: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
