import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
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
  },
});
