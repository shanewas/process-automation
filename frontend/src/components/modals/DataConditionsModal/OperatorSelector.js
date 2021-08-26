import React from "react";
import { Select, MenuItem } from "@material-ui/core";

export default ({ value = "", handleChange, error }) => (
  <Select
    variant="outlined"
    style={{ width: "100%" }}
    value={value}
    error={error}
    onChange={handleChange}
    placeholder="Operator"
  >
    <MenuItem value={">"}>{">"}</MenuItem>
    <MenuItem value={"="}>{"="}</MenuItem>
    <MenuItem value={"<"}>{"<"}</MenuItem>
  </Select>
);
