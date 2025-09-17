import type { Config } from "tailwindcss";

type FontSizeValue = [string, { lineHeight?: string; screens?: { [key: string]: string } }];

type FontSizes = {
  [key: string]: FontSizeValue;
};

const fontSize: FontSizes = {
  "5xl": [
    "48px",
    {
      lineHeight: "1.2",
      screens: {
        md: "32px",
      },
    },
  ],
  "4xl": [
    "36px",
    {
      lineHeight: "1.2",
      screens: {
        md: "28px",
      },
    },
  ],
  "3xl": [
    "30px",
    {
      lineHeight: "1.2",
      screens: {
        md: "24px",
      },
    },
  ],
  "2xl": [
    "24px",
    {
      lineHeight: "1.2",
      screens: {
        md: "20px",
      },
    },
  ],
  xl: [
    "20px",
    {
      lineHeight: "1.2",
      screens: {
        md: "18px",
      },
    },
  ],
  lg: [
    "18px",
    {
      lineHeight: "1.2",
      screens: {
        md: "16px",
      },
    },
  ],
  base: [
    "16px",
    {
      screens: {
        md: "14px",
      },
    },
  ],
  sm: [
    "14px",
    {
      screens: {
        md: "12px",
      },
    },
  ],
  xs: [
    "12px",
    {
      screens: {
        md: "10px",
      },
    },
  ],
  "2xs": [
    "10px",
    {
      screens: {
        md: "8px",
      },
    },
  ],
};

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize,
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        dashboard: {
          "gradient-from": "#FFFFFF",
          "gradient-to": "#F8FAFC",
          accent: "#F1F5F9",
          DEFAULT: "#FFFFFF",
        },
        primary: {
          "100": "#FFFFFF",
          "200": "#E8EFF6",
          "300": "#CDDEEA",
          "400": "#A1C2D8",
          "500": "#6EA2C2",
          "600": "#4C87AB",
          "700": "#2F5673",
          "800": "#2B4A61",
          "900": "#284052",
          DEFAULT: "#4C87AB",
        },
        secondary: {
          "100": "#EBE4D6",
          "200": "#D9C9AF",
          "300": "#C3A781",
          "400": "#A27950",
          "500": "#8B6243",
          "600": "#704B38",
          "700": "#5F4034",
          "800": "#533830",
          "900": "#000000",
          DEFAULT: "#8B6243",
        },
        info: {
          "100": "#FFFFFF",
          "200": "#BBDDFF",
          "300": "#8CC6FF",
          "400": "#5EAFFF",
          "500": "#2D91F4",
          "600": "#1976D2",
          "700": "#0A5DB0",
          "800": "#00478E",
          "900": "#00366C",
          "950": "#00254A",
          DEFAULT: "#1976D2",
        },
        bg: {
          "100": "#ECE5D3",
          "200": "#DBCEAC",
          "300": "#C8B281",
          "400": "#BC9C63",
          "500": "#B08450",
          "600": "#9B6C44",
          "700": "#82543B",
          "800": "#6B4535",
          "900": "#593B2E",
          DEFAULT: "#B08450",
        },
        line: {
          "100": "#FFFFFF",
          "200": "#DEDEE1",
          "300": "#C7C7CD",
          "400": "#B0B0B9",
          "500": "#9A9AA4",
          "600": "#858590",
          "700": "#70707B",
          "800": "#5C5C67",
          "900": "#484853",
          "950": "#35353E",
          DEFAULT: "#858590",
        },
        error: {
          "100": "#FFFFFF",
          "200": "#FFC3C3",
          "300": "#FF9A9A",
          "400": "#FF7070",
          "500": "#F54444",
          "600": "#D32F2F",
          "700": "#B11D1D",
          "800": "#8F1010",
          "900": "#6D0606",
          "950": "#4B0000",
          DEFAULT: "#D32F2F",
        },
        warning: {
          "100": "#FFFFFF",
          "200": "#FBEFC6",
          "300": "#FFD38A",
          "400": "#FFC25C",
          "500": "#FFB12E",
          "600": "#FFA000",
          "700": "#D68600",
          "800": "#AD6D00",
          "900": "#855300",
          "950": "#5C3A00",
          DEFAULT: "#FFA000",
        },
        success: {
          "100": "#FFFFFF",
          "200": "#D9FFDB",
          "300": "#C0FFC3",
          "400": "#A5FEAA",
          "500": "#86F48B",
          "600": "#69D26E",
          "700": "#4FB053",
          "800": "#388E3C",
          "900": "#256C28",
          "950": "#164A18",
          DEFAULT: "#69D26E",
        },
        text: {
          "100": "#FFFFFF",
          "200": "#EBE7E7",
          "300": "#D6CFCF",
          "400": "#C2B8B8",
          "500": "#ADA2A2",
          "600": "#998D8D",
          "700": "#857878",
          "800": "#706464",
          "900": "#5C5050",
          "950": "#473D3D",
          DEFAULT: "#473D3D",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "#2F5673",
          foreground: "#FFFFFF",
          primary: "#2F5673",
          "primary-foreground": "#FFFFFF",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "#000",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      ringColor: {
        DEFAULT: "#4C87AB",
      },
      ringOpacity: {
        DEFAULT: "0.2",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
