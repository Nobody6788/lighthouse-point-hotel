/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                navy: '#1B2A4A',
                ocean: '#3A7CA5',
                sand: '#F4E8D1',
                gold: '#C8A951',
                charcoal: '#2D2D2D',
                error: '#D94F4F',
                success: '#4F9D69',
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '8px',
            },
        },
    },
    plugins: [],
}
