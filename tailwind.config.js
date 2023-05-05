/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AB55',
        'primary-light': '#5BE584',
        'primary-lighter': '#C8FACD',
        'primary-dark': '#007B55',
        secondary: '#3366FF',
        'secondary-light': '#84A9FF',
        'secondary-lighter': '#D6E4FF',
        'bg-dark-theme': '#262a2e',
        'light-theme-bg': '#f9f9ff',
        'dark-theme-bg': '#262a2e',
        'dark-theme-content': '#161819',
        info: '#1890FF',
        success: '#54D62C',
        warning: '#FFC107',
        error: '#FF4842',
        facebook: '#1877f2',
        instagram: '#eff1f4',
        linkedin: '#0077b5',
        twitter: '#1DA1F2'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
