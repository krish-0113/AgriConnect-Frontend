/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 3.6%)",
        primary: "hsl(142.1, 70.6%, 45.3%)",
        "primary-foreground": "hsl(142.1, 100%, 97%)",
        secondary: "hsl(217.2, 91.2%, 59.8%)",
        "secondary-foreground": "hsl(217.2, 32.6%, 17.5%)",
        accent: "hsl(39.5, 92.3%, 54.1%)",
        "accent-foreground": "hsl(39.5, 89.7%, 15.1%)",
        muted: "hsl(0, 0%, 96.3%)",
        "muted-foreground": "hsl(0, 0%, 45.1%)",
        border: "hsl(0, 0%, 89.8%)",
      },
    },
  },
  plugins: [],
}
