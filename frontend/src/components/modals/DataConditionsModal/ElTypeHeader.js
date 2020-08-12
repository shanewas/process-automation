import React from "react";

export default ({ isManual, toggle }) => (
  <div onClick={toggle} style={{ cursor: "pointer" }}>
    <span style={{ fontWeight: isManual ? 700 : 400 }}>Manual</span> /{" "}
    <span style={{ fontWeight: isManual ? 400 : 700 }}>Header</span>
  </div>
);
