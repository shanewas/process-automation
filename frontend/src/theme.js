import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
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
    },
  },
});
