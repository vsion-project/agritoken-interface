import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'logo-white': "url('/logo_agritoken_white.svg')",
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        round: 'round 4s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        round: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      colors: {
        primary: colors.emerald[700],
        secondary: colors.yellow[600],
        danger: colors.red[400]
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
