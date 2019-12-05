import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const ResultTable = ({ children }) => (
  <div className="flex rounded p-4 mt-4 max-w-sm">
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>
            <p className="font-bold">Payee</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Receiver</p>
          </TableCell>
          <TableCell>
            <p className="font-bold">Value</p>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </div>
);

const ResultRow = ({ payee, receiver, value }) => {
  return (
    <TableRow>
      <TableCell>{payee}</TableCell>
      <TableCell>{receiver}</TableCell>
      <TableCell>RM {value}</TableCell>
    </TableRow>
  );
};

export { ResultTable, ResultRow };
