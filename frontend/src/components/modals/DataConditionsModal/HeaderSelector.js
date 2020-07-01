import React from "react";
import { Select, MenuItem } from "@material-ui/core";

export default ({ value = "", handleChange, headers = [], error }) => {
  return (
    <Select
      variant="outlined"
      style={{ width: "100%" }}
      value={value}
      error={error}
      onChange={handleChange}
      placeholder="Header"
    >
      {headers.length === 0 ? (
        <MenuItem disabled aria-label="None" value="">
          No Header found
        </MenuItem>
      ) : (
        headers.map((header) => (
          <MenuItem key={header} value={header}>
            {header}
          </MenuItem>
        ))
      )}
    </Select>
  );
};
