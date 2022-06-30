import { InfuraProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import Contract from "../abi";
import { TickerInfo } from "../components/Results";

export const useOracle = () => {

  const fakeData: TickerInfo[] = [
    {
      id: '1',
      symbol: 'AAPL',
      high: '100',
      low: '98',
      open: '95',
      close: '100',
      date: '2022-06-19'
    },
    {
      id: '2',
      symbol: 'TSLA',
      high: '100',
      low: '98',
      open: '95',
      close: '100',
      date: '2022-06-19'
    },
    {
      id: '3',
      symbol: 'AMZN',
      high: '100',
      low: '98',
      open: '95',
      close: '100',
      date: '2022-06-19'
    }
  ]
  const getDataFromCID =  async (cid: string) => {
    const CONTRACT_ADDRESS = '0xD202FE899d90cF4Ec9Fc1EBeBc4f3953d73BC458';
    
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new InfuraProvider("rinkeby");

        const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
        const signer = wallet.connect(provider);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Contract,
          signer
        )
        console.log(contract);

        let awaitedTx = await contract.readData(cid);
        let tx = await awaitedTx.wait();
        console.log(tx);
        return fakeData;
      } else {
        console.log("Ethereum object doesn't exist!")
        return null;
      }
    }
    catch (error: any) {
      console.log('Error while airdropping')
      console.error(error);
      return null;
    }
  }

  return { getDataFromCID }
}