import { createMuiTheme } from "@material-ui/core";

export const PRIMARY = "#fff";
export const SECONDARY = "#254059";

const THEME = {
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: "#e7e7e7",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiFormControlLabel: {
      label: {
        color: SECONDARY,
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "transparent",
      },
      root: {
        boxShadow: "unset",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: SECONDARY,
      },
    },
    MuiCheckbox: {
      root: {
        "&$disabled": {
          color: "red",
        },
      },
    },
  },
};

export const DefaultTheme = createMuiTheme({
  ...THEME,
});
