import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: pink[200],
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        letterSpacing: ".2rem",
      },
    },
    MuiSnackbarContent: {
      root: {
        color: "pink",
        textTransform: "uppercase",
        letterSpacing: ".1rem",
        textAlign: "center",
        fontWeight: 900,
      },
    },
  },
});

export default theme;
