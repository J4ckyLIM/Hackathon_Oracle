import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const APIURL =
  'https://api.thegraph.com/subgraphs/name/teddynotbear/sg-hackathon';

const symbolSearchQuery = `
    query {
        symbolSearch($text: String) {
            id
            symbol
            high
            low
            open
            close
            date
        }
    }
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

export const queryDataForTicker = async () => {
    const result = await client.query({
        query: gql(symbolSearchQuery),
        variables: {
            text: 'APPL',
        }
    })
    
    console.log(result);
    return result;
}
