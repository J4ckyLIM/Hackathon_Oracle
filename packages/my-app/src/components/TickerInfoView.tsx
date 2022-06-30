import { Grid, Typography } from "@mui/material";
import { FC } from "react";

export type TickerInfo = {
  id: string;
  symbol: string;
  high: string;
  low: string;
  open: string;
  close: string;
  date: string;
}

interface TickerInfoViewProps {
  tickerInfo: TickerInfo
}

export const TickerInfoView: FC<TickerInfoViewProps> = ({tickerInfo}: TickerInfoViewProps) => {
  return (
    <Grid container sx={{ border: '2px solid white', borderRadius: 3}} p={5} mt={5}>
      <Grid xs={2} sx={{ borderRight: '2px solid white' }}>
        <Typography variant="h5">{tickerInfo.symbol}</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" color="green">High: {tickerInfo.high}</Typography>
      </Grid>
      <Grid xs={2}>
      <Typography variant="body1" color="red">Low: {tickerInfo.low}</Typography>
      </Grid>
      <Grid xs={2}>
      <Typography variant="body1">Open: {tickerInfo.open}</Typography>
      </Grid>
      <Grid xs={2}>
      <Typography variant="body1">Close: {tickerInfo.close}</Typography>
      </Grid>
      <Grid xs={2}>
      <Typography variant="body1">{tickerInfo.date}</Typography>
      </Grid>
    </Grid>
  )
}
