// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px"
};
export const theme = extendTheme({
  breakpoints,
  colors: {
    brand: {
      primary: "#000",
      secondary: "#24E500",
      ternary: "#8A8A8A",
      danger: "#EA047E",
      success: "#A31ACB",
      lavenderBlush: '#FFF0F5'
    }
  },

  fonts: {
    body: "Inter,  sans-serif"
  },

  styles: {
    global: () => ({
      body: {
        bg: "black",
        color: "white"
      }
    })
  },

  
});