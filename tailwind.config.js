 module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
      fontFamily: {
        Poppins: "Poppins"
      },
      extend: {
        colors: {
          lightGray: "#D3D3D3",
          purple: "#6842EF",
          nirmaanGreen: "#45c74d",
          nirmaanGreenDark: "#3ab342",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}