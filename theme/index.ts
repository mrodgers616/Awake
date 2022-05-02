import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";

import Button from './components/button';
import Heading from './components/heading';
import Container from './components/container';

const overrides = {
  styles,
  colors: {
    neongreen: {
      500: '#11f628'
    },
    seafoam: {
      500: '#1CD0A7'
    },
    sage: {
      500: '#36555A'
    },
    lightblue: {
      500: '#EFF3F9'
    },
    black: {
      500: '#000000'
    },
    grey: {
      500: '#D4D4D4'
    }
  },
  components: {
    Button,
    Heading,
    Container
  }
}

export default extendTheme(overrides);