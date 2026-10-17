/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1152px",
        "2xl": "1280px",
      },
    },

    extend: {
      colors: {
        /*
         * Primary Blue
         * Clean, professional and suitable for a service platform.
         */
        fern: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#222494",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        /*
         * Dark neutral / text colors
         */
        ink: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },

        /*
         * Secondary blue / CTA accent
         */
        marigold: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },

        /*
         * Clean neutral backgrounds
         */
        stone: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
        },
      },

      fontFamily: {
        display: [
          "'Fraunces'",
          "ui-serif",
          "Georgia",
          "serif",
        ],

        sans: [
          "'Public Sans'",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },

      boxShadow: {
        rest:
          "0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 1px rgba(15, 23, 42, 0.04)",

        lifted:
          "0 12px 24px -8px rgba(15, 23, 42, 0.18)",

        blue:
          "0 8px 20px -8px rgba(37, 99, 235, 0.25)",
      },

      borderRadius: {
        card: "1rem",
        control: "0.625rem",
      },

      maxWidth: {
        prose: "68ch",
      },
    },
  },

  plugins: [],
};