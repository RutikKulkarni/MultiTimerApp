/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#F59E0B",
        darkBg: "#1F2937",
        lightBg: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
