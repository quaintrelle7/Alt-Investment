// 1. Import `extendTheme`
import {  extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

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
      primary: "#111214", //black
      secondary: "#FFFFFF", //white
      ternary: "#18191C", //gray
      quaternary: "#C07DD0", //purple
      quinary:"#53BCC9", //green blue
      senary: "#7FA3CC", //blue shade
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
        bg: "brand.primary",
        color: "white"
      }
    })
  },

components: {
    Button
  }
  
});