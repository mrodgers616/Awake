import {
  Flex,
  Box,
  Text
} from '@chakra-ui/react';

const Stats: React.FC<{
  sharesCommited: number;
  treasury: number;
  walletsConnected: number;
}> = ({ sharesCommited, treasury, walletsConnected }) => {
  return (<Flex
    id="stats"
    bg="white"
    height="160px"
    color="black"
    mb='120px'
    mx='36px'
    justifyContent="center"
    alignItems="center"
    borderRadius="25px"
    boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
  >
    <Box
      w="30%"
      borderRight="1px solid black"
      px="86px"
      textAlign={"center"}
    >
      <Text
        fontSize="5xl"
        color='sage.500'
      >{ sharesCommited } +</Text>
      <Text>~shares committed</Text>
    </Box>
    <Box
      w="30%"
      borderRight="1px solid black"
      px="86px"
      textAlign={"center"}
    >
      <Text
        fontSize="5xl"
        color='sage.500'
      >{walletsConnected} +</Text>
      <Text>~wallets connected</Text>
    </Box>
    <Box w="30%" px="86px" textAlign={"center"}>
      <Text
        fontSize="5xl"
        color='sage.500'
      >{treasury} +</Text>
      <Text>~$ in treasury</Text>
    </Box>
  </Flex>)
};

export default Stats;