import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'
import daisyui from 'daisyui'
export default {
  plugins: [
    tailwind({
      daisyui: {
        logs: true,
        themes: [
          "light",
          "dark",
          "cupcake",
          "retro",
          "dim",
          "lemonade"
        ],
      },
      content: [
        "./index.html",
        "./src/**/*.{vue,js,jsx}",
      ],
      plugins: [tailwindTypography, daisyui],
    })
  ]
}