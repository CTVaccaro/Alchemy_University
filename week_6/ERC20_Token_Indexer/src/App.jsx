import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import {ethers} from 'ethers'

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const [metamaskInstalled, setMetamaskInstalled] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [accountAddress, setAccountAddress] = useState("")
  const [accountBalance, setAccountBalance] = useState(0)

  useEffect(() => {
    const checkMetamaskAvailability = () => {
      if(!ethereum) {
        setMetamaskInstalled(false)
      } 
        setMetamaskInstalled(true)    
    }
    checkMetamaskAvailability()
  }, [])

  async function getTokenBalance() {
    const config = {
      apiKey: "51rWN2GKgKha6cVBarEtRsfmjA-l--OP", 
      network: Network.ETH_GOERLI,
    };

    const alchemy = new Alchemy(config);
    var data = null;

    if(userAddress.includes(".")){
      const _addr = await provider.resolveName(userAddress);
      data = await alchemy.core.getTokenBalances(_addr);
    }else{
      data = await alchemy.core.getTokenBalances(userAddress);
    }

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }

  const connectWallet = async () => {
    try{
      if(!ethereum) {
        setMetamaskInstalled(false)
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAccountAddress(accounts[0]) 
      setIsConnected(true)

      const balance = await provider.getBalance(accountAddress); console.log(ethers.utils.formatEther(balance))
      setAccountBalance(ethers.utils.formatEther(balance))
      }catch(error){
        setIsConnected(false)
      }
    } 

  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <button fontSize={20} className="btn" onClick={connectWallet}>CONNECT</button>
        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>
        <h3>Current account Balance: </h3><p>{accountBalance}</p>
        <h3>Current account Address: </h3><p>{accountAddress}</p>
        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={'column'}
                  color="white"
                  bg="blue"
                  w={'20vw'}
                  key={e.id}
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance,
                      tokenDataObjects[i].decimals
                    )}
                  </Box>
                  <Image src={tokenDataObjects[i].logo} />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
