/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706', // 亮色模式：橙色
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#652b0e',
          950: '#421a09',
        }
      }
    }
  },
  plugins: []
}
