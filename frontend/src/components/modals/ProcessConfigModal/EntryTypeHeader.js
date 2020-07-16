import React from "react";
import { Box } from "@material-ui/core";

export default ({ type, onChange }) => (
  <Box
    onClick={(e) => {
      e.persist();
      if (e.target.tagName !== "SPAN") return;
      e.target.name = "entryType";
      e.target.value = e.target.getAttribute("name");
      e.target.typeChanged = true;
      onChange(e);
    }}
    style={{ cursor: "pointer" }}
  >
    <span name="manual" style={{ fontWeight: type === "manual" ? 700 : 400 }}>
      Manual
    </span>{" "}
    /{" "}
    <span
      name="variable"
      style={{ fontWeight: type === "variable" ? 700 : 400 }}
    >
      Variable
    </span>
    /{" "}
    <span
      name="dataHeader"
      style={{ fontWeight: type === "dataHeader" ? 700 : 400 }}
    >
      Data Header
    </span>
  </Box>
);
