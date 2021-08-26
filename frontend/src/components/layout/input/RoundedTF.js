import { withStyles, FilledInput } from "@material-ui/core";

export default withStyles({
  root: {
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      backgroundColor: "#fff",
    },
    borderRadius: "25px",
  },
  focused: {
    backgroundColor: "#fff",
    "&:not(:hover)": {
      backgroundColor: "#fff",
    },
  },
})(FilledInput);
