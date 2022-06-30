import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { TickerInfo, TickerInfoView } from "../../components/TickerInfoView";
import { useOracle } from "../../hooks/useOracle";

export const Home: FC = () => {
  
  const [cid, setCid] = useState<string>('');
  const [data, setData] = useState<TickerInfo| null>(null);

  const { getDataFromCID } = useOracle();

  const fetchData = useCallback(async() => {
    const result = await getDataFromCID(cid);
    setData(result);
  }, [cid, getDataFromCID])

  return (
    <Container sx={{ height: '100vh', padding: '30px' }}>
      <Box flexDirection="column" p="30px" alignItems="center" display="flex">
        <Typography variant="h2">Hackathon SG Forge</Typography>
        <Typography variant="body1" maxWidth={600} mt={5}>This app allows you to have a preview of our work. By giving a CID in the input field, you will be able to retrieve any data tied to it directly on-chain.</Typography>
        <Typography variant="body2" maxWidth={600} mt={5}>Developed by Hugo BOUTOT, Teddy JEAN-FRANÇOIS, Ilyane DELOR and Jacky LIM.</Typography>
        <Box justifyContent="center" alignItems="center" display="flex" mt="30px">
          <TextField 
            label="Enter your CID"
            color="primary" 
            focused 
            sx={{ minWidth: '600px', input: { color: 'white' } }} 
            onChange={(value) => setCid(value.target.value)}
            placeholder="Search by CID"
          
          />
          <Button 
            variant="contained" 
            onClick={() => fetchData()}
            sx={{ padding: '16px 20px', marginLeft: '-5px' }}
          >
            Search
          </Button>
        </Box>
        {data && (
          <TickerInfoView tickerInfo={data} />
        )}
      </Box>
    </Container>
  )
}