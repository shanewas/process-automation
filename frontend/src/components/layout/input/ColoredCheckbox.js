import { Checkbox, withStyles } from "@material-ui/core";

export default withStyles({
  root: {
    color: (props) => props.color,
    "&$checked": {
      color: (props) => props.color,
    },
  },
  checked: {},
})(({ color, ...props }) => <Checkbox {...props} color="default" />);
