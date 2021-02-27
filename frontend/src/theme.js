import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#0A0B16",
      paper: "#1D1E28",
    },
    primary: {
      main: "#5C87DC",
    },
    secondary: {
      main: "#6AD9C4",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",

    h6: {
      fontWeight: 700,
    },
  },
  overrides: {
    MuiBadge: {
      dot: {
        height: "10px",
        width: "10px",
        borderRadius: "20px",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#494B53",
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "16px",
      },
    },
    MuiListItem: {
      root: {
        "&.active": {
          backgroundColor: "#3C3D45",
        },
      },
    },
    MuiListItemText: {
      root: {
        textTransform: "capitalize",
      },
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: "16px",
        textTransform: "none",
      },
      label: {
        "& > svg": {
          marginRight: "8px",
        },
      },
    },
    MuiDrawer: {
      paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: "44px",
      },
    },

    // MuiSnackbarContent: {
    //   root: {
    //     backgroundColor: (props) => {
    //       console.log(props);
    //       return props.bgcolor ? props.bgcolor : "#363636";
    //     },
    //   },
    // },
    MuiDialogActions: {
      root: {
        padding: "16px 24px",
      },
    },
    MuiInputBase: {
      root: {
        height: 40,
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 13px) scale(1)",
      },
    },
    MuiFilledInput: {
      input: {
        padding: "13px 20px 10px",
      },
      root: {
        height: "55px",
      },
    },
  },
});
