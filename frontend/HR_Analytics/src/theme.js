import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


// color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                0: "#ffffff", // manually adjusted
                10: "#f6f6f6", // manually adjusted
                50: "#f0f0f0", // manually adjusted
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
                1000: "#000000", // manually adjusted
            },
            primary: {
                // blue
                100: "#d3d4de",
                200: "#a6a9be",
                300: "#7a7f9d",
                400: "#4d547d",
                500: "#21295c",
                600: "#191F45", // manually adjusted
                700: "#141937",
                800: "#0d1025",
                900: "#070812",
            },
            greenAccent: {
                // yellow
                50: "#f0f0f0", // manually adjusted
                100: "#fff6e0",
                200: "#ffedc2",
                300: "#ffe3a3",
                400: "#ffda85",
                500: "#ffd166",
                600: "#cca752",
                700: "#997d3d",
                800: "#665429",
                900: "#332a14",
            },
            redAccent: {
                50: "#f0f0f0", // manually adjusted
                100: "#fff6e0",
                200: "#ffedc2",
                300: "#ffe3a3",
                400: "#ffda85",
                500: "#ffd166",
                600: "#cca752",
                700: "#997d3d",
                800: "#665429",
                900: "#332a14",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632"
            },
        } : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }
    )
});

// mui theme settings
export const themeSetting = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
            ? {
                primary: {
                    ...colors.primary,
                    main: colors.primary[400],
                    light: colors.primary[400],
                },
                secondary: {
                    ...colors.greenAccent,
                    main: colors.greenAccent[300],
                },
                neutral: {
                    ...colors.grey,
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                },
                backgroud: {
                    default: colors.primary[600],
                    alt: colors.primary[500],
                },
            } : {
                primary: {
                    ...colors.primary,
                    main: colors.grey[50],
                    light: colors.grey[100],
                },
                secondary: {
                    ...colors.secondary,
                    main: colors.greenAccent[600],
                    light: colors.greenAccent[700],
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                },
                backgroud: {
                    default: colors.grey[0],
                    alt: colors.primary[50],
                },
            }),
        },
        topography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
            h7: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 12,
            },
            h8: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 10,
            },
            h9: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 4,
            },
        }
    }
}

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export const useMode = () => {
    const [mode, setMode] = useState("dark")

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
            //setMode((prev) => (prev === "light" ? "dark" : "light")),
            setMode((prev) => (prev === "light" ? "dark" : "dark")),
        }),
    );

    const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])

    return [theme, colorMode]

}