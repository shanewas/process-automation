import React from "react";
import {
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons/";

export default ({ conditions, editCondition }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Element 1</TableCell>
          <TableCell align="right">Operator</TableCell>
          <TableCell align="right">Element 2</TableCell>
          <TableCell align="right">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {conditions.map((condition) => (
          <TableRow key={condition.id}>
            <TableCell>{condition.el1}</TableCell>
            <TableCell align="right">{condition.operator}</TableCell>
            <TableCell align="right">{condition.el2}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => editCondition(condition.id)}>
                <EditIcon style={{ fontSize: "16px" }} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
