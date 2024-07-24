/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#004b9c',
        'orange': '#fab001',
        'blue-light': '#2196F3',
        'orange-light': '#FF9800',
        'gray-light': '#E0E0E0',
        'gray-medium': '#9E9E9E',
        'gray-dark': '#424242',
        'background-main': '#FFFFFF',
        'background-secondary': '#F5F5F5',
        'text-main': '#212121',
        'text-secondary': '#757575',
        'icon-active': '#1A237E',
        'icon-inactive': '#9E9E9E',
      },
      fontFamily: {
        'roboto-bold': ['Roboto Bold', 'sans-serif'],
        'roboto-medium': ['Roboto Medium', 'sans-serif'],
        'roboto-regular': ['Roboto Regular', 'sans-serif'],
        'roboto-light': ['Roboto Light', 'sans-serif'],
      },
      fontSize: {
        'h1': '32px',
        'h2': '24px',
        'h3': '20px',
        'body': '16px',
        'caption': '14px',
        'note': '12px',
      },
      borderRadius: {
        'default': '4px',
      },
      boxShadow: {
        'card': '0px 2px 4px rgba(0, 0, 0, 0.1)',
        'modal': '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}