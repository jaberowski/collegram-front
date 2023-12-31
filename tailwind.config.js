export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: "#c19008",
        navy: "#17494D",
        bone: "#F3F0EE",
        vanilla: "#f1ebe3",
        cloud: "#a5a5a5",
        charcoal: "#2b2b2b",
      },
    },
    fontFamily: {
      secondary: "Vazirmatn",
      secondary: "dana",
      montserrat: "montserrat",
    },
    backgroundImage: {
      "image-placeholder":
        "url('/src/assets/photos/placeholder-image-png.png')",
    },
  },
  plugins: [],
};
