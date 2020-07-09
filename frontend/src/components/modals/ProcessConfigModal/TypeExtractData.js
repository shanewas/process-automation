import React from "react";
import { Grid } from "@material-ui/core";
import SelectorInput from "../../layout/input/SelectorInput";

export default ({
  extractField,
  extractDataFields,
  onExtractFieldChange,
  variables,
}) => {
  console.log("%c TYPE LOAD DATA ", "background: #222; color: #bada55");
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <SelectorInput
          value={extractField}
          onChange={onExtractFieldChange}
          options={extractDataFields}
          placeholder="Save"
        />
      </Grid>
      <Grid item>
        <SelectorInput
          options={variables}
          optionsConfigure={{ id: "id", label: "name", value: "name" }}
          placeholder="Variable"
        />
      </Grid>
    </Grid>
  );
};
