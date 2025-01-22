export default {
  // important: true,
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "presets/**/*.{js,vue,ts}"
  ],
  theme: {
    fontFamily: {
      'semiBold-ff': 'Inter-SemiBold',
      'bold-ff': 'Inter-Bold',
      'medium-ff': 'Inter-Medium',
      'regular-ff': 'Inter-Regular',
    },
    extend: {
      colors: {
        // Color Scheme
        'white':'var(--white)',
        'main-clr': 'var(--main-clr)',
        'secondary-clr': 'var(--secondary-clr)',
        'green-clr': 'var(--green-clr)',
        'orange-clr': 'var(--orange-clr)',
        'red-clr': 'var(--red-clr)',
        'gray-clr': 'var(--gray-clr)',
        
        // Backgrounds
        'opacity-bg': 'var(--opacity-bg)',

        // Text
        'default-text-clr': 'var(--default-text-clr)',
        
        // Customs
        'border-clr': 'var(--border-clr)',
      },
      boxShadow: {
        '3xl': '0px 0px 24px 0px #01366680',
      }
    },
  },
  plugins: [],
}

