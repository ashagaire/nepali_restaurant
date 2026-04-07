import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    // background: {
    //   default: , // #ffedd5
    //   paper: "#ffedd5",
    // },

    text: {
      // primary: "#c2410c", // #c2410c
      // secondary: "#fdba74", // #fdba74
    },

    primary: {
      main: "#c2410c", // #c2410c
      dark: "#9a3412", // #9a3412
      light: "#f97316",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#fdba74", // #fdba74
      contrastText: "#7c2d12",
    },

    divider: "#fed7aa",
  },

  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),

    h1: {
      fontSize: "40px",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Twinkle Star', cursive",
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: "'Twinkle Star', cursive",
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    body1: {
      fontFamily: "Georgia, serif",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
    },

    button: {
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary-hover)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },

    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderWidth: "2px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary)",
        },
      },
    },
  },
});

export default theme;
