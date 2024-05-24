import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         ...require('daisyui/src/theming/themes')['light'],
  //         primary: '#fbbf24',
  //         secondary: 'oklch(0.67 0.26 339.92)',
  //         'secondary-content': 'oklch(0.26 0.12 340.01)',
  //         accent: 'oklch(76.76% 0.184 183.61)',
  //         neutral: '#2B3440',
  //         'neutral-content': '#D7DDE4',
  //         'base-100': 'oklch(0.66 0.03 288.05)',
  //         'base-200': 'oklch(0.6 0.03 290.06)',
  //         'base-300': 'oklch(0.55 0.03 280.73)',
  //         'base-content': 'oklch(0.24 0 0)',
  //       },
  //       dark: {
  //         ...require('daisyui/src/theming/themes')['dark'],
  //         primary: 'oklch(0.77 0.2 59.12)',
  //         secondary: 'oklch(0.53 0.24 358.95)',
  //         'secondary-content': 'oklch(0.59 0.26 332.58)',
  //         accent: 'oklch(0.83 0.2 183.59)',
  //         neutral: 'oklch(0.52 0.07 255.39)',
  //         'neutral-content': 'oklch(0.89 0.01 0)',
  //         'base-100': 'oklch(0.29 0.17 270.74)',
  //         'base-200': 'oklch(0.25 0.14 274.05)',
  //         'base-300': 'oklch(0.19 0.11 269.39)',
  //         'base-content': 'oklch(0.81 0.11 282.85)',
  //       },
  //     },
  //   ],
  // },

  // darkMode: ['class', '["dark"]'],
  plugins: [require('daisyui')],
};
export default config;
