/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  daisyui: {
  themes: [
    {
        mytheme: {
        "primary": "#932e44",
        "secondary": "#BD93F9",
        "accent": "#FFB86C",
        "neutral": "#414558",
        "base-100": "#282A36",
        "info": "#8BE9FD",
        "success": "#50FA7B",
        "warning": "#F1FA8C",
        "error": "#FF5555",
      },
    },
  ],
  },
  plugins: [require("daisyui")],
}
