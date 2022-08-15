import { extendTheme } from "@chakra-ui/react";

const gray = {
  global: {
    body: {
      bg: 'gray.50',
    },
    ".active": {
      color: '#1CD0A7 !important',
    }
  }
};


const customeTheme = extendTheme({
  colors: {},
  fonts: {},
  fontSizes: {},
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});

const theme = extendTheme({ customeTheme });

export default { customeTheme, gray, theme }