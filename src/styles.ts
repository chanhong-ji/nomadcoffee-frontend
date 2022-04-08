import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";

export const darkTheme: DefaultTheme = {
  color: {
    bg: "grey",
    accent: "black",
  },
};

export const lightTheme: DefaultTheme = {
  color: {
    bg: "grey",
    accent: "black",
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
      box-sizing: border-box;
  }
  ${reset}
`;
