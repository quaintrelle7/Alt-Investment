import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none"
    }
  },

  sizes: {
    sm: {
      fontSize: "8pt"
    },
    md: {
      fontSize: "10pt"
    }
  },

  variants: {
    solid: {
      color: "white",      
      background: "linear-gradient(black, black) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)",
      borderRadius: "50em",
      border: "4px solid transparent",
      fontWeight:500,
      zIndex: 0,
     _hover: {
        bg: "linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%);",
        color: "black",
        fontWeight:800,
        borderRadius: "50em",
        border: "1px solid black",

      }
    },

    outline: {
      color: "blue.500",
      border: "1px solid",
      borderColor: "blue.500"
    },

    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50"
      }
    }
  }
};

// background: hsla(288, 47%, 65%, 1);

// background: linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%);

// background: -moz-linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%);

// background: -webkit-linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%);

// filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#C07DD0", endColorstr="#53BCC9", GradientType=1 );