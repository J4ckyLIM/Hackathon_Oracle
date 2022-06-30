import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { Results } from "../../components/Results";
import { TickerInfo } from "../../components/Results";
import { useOracle } from "../../hooks/useOracle";

export const Home: FC = () => {
  
  const [cid, setCid] = useState<string>('');
  const [data, setData] = useState<TickerInfo[] | null>([]);

  const { getDataFromCID } = useOracle();

  const fetchData = useCallback(async() => {
    const result = await getDataFromCID(cid);
    setData(result);
  }, [cid, getDataFromCID])

  return (
    <Container sx={{ height: '100vh', border: '1px solid white', padding: '30px' }}>
      <Box flexDirection="column" p="30px">
        <Typography variant="h2">{'Title'}</Typography>
        <Typography variant="body1">{'Description'}</Typography>
        <Box justifyContent="center" alignItems="center" display="flex" mt="30px">
          <TextField 
            label="Enter your CID"
            color="primary" 
            focused 
            sx={{ minWidth: '600px' }} 
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
        {data && data.length >= 1 && (
          <Results data={data} />
        )}
      </Box>
    </Container>
  )
}