import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";
import { TickerInfo } from "./TickerInfoView";

interface ResultsProps {
  data: TickerInfo[];
}

export const Results: FC<ResultsProps> = ({data}: ResultsProps) => {
  if(!data.length) {
    return <Typography>{'Ya rien'}</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8fafd'}}>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">Close</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.symbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.high}</TableCell>
              <TableCell align="right">{row.low}</TableCell>
              <TableCell align="right">{row.open}</TableCell>
              <TableCell align="right">{row.close}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
} 