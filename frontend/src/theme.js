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
  },
});
