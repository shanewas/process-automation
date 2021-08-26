import React from "react";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

export default ({ open, handleClose, datasetProperties }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Dataset Properties</Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table aria-label="Dataset Properties">
            <TableHead>
              <TableRow>
                <TableCell>File type</TableCell>
                <TableCell align="left">File size</TableCell>
                <TableCell align="left">No. of Rows</TableCell>
                <TableCell align="left">Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {datasetProperties.type}
                </TableCell>
                <TableCell align="left">
                  {parseInt(datasetProperties.size / 1024)}Kb
                </TableCell>
                <TableCell align="left">
                  {datasetProperties.rowNumber}
                </TableCell>
                <TableCell align="left">{datasetProperties.path}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
