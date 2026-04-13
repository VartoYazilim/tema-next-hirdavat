/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#cde6f4",
        "surface-dim": "#dcd9d9",
        "secondary-container": "#d1e2ec",
        outline: "#8c7166",
        "on-secondary-fixed": "#0d1e25",
        "on-primary": "#ffffff",
        "on-surface-variant": "#584238",
        "on-tertiary-fixed": "#051e28",
        "on-secondary-container": "#55656d",
        surface: "#fcf9f8",
        "inverse-primary": "#ffb596",
        "surface-container": "#f0eded",
        "on-primary-fixed-variant": "#7c2e00",
        "on-error": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "on-tertiary-container": "#162e38",
        background: "#fcf9f8",
        "surface-tint": "#a33f00",
        "on-tertiary": "#ffffff",
        "secondary-fixed": "#d4e5ef",
        "primary-fixed": "#ffdbcd",
        secondary: "#506169",
        "surface-container-highest": "#e5e2e1",
        tertiary: "#4a626d",
        "on-secondary-fixed-variant": "#394951",
        "secondary-fixed-dim": "#b8c9d3",
        "surface-variant": "#e5e2e1",
        "primary-fixed-dim": "#ffb596",
        "outline-variant": "#e0c0b3",
        "on-error-container": "#93000a",
        "on-primary-container": "#501b00",
        primary: "#a33f00",
        "surface-container-lowest": "#ffffff",
        "on-background": "#1b1c1c",
        "surface-container-high": "#eae7e7",
        "inverse-on-surface": "#f3f0ef",
        "on-secondary": "#ffffff",
        error: "#ba1a1a",
        "on-primary-fixed": "#360f00",
        "error-container": "#ffdad6",
        "inverse-surface": "#303030",
        "primary-container": "#f06a22",
        "tertiary-container": "#7e96a2",
        "tertiary-fixed-dim": "#b1cad7",
        "surface-bright": "#fcf9f8",
        "on-tertiary-fixed-variant": "#334a55",
        "on-surface": "#1b1c1c"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(71, 41, 25, 0.12)"
      }
    }
  },
  plugins: []
};
