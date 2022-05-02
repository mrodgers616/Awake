import { Box, Flex, Progress, Text, Button } from "@chakra-ui/react";

type VoteCardProps = {
  votes?: number;
  voteType: "For" | "Against" | "Abstain";
  addresses?: Array<string>;
  proposalState: string;
};

export default function VoteCard({
  votes,
  voteType,
  addresses = [],
  proposalState
}: VoteCardProps): JSX.Element {

  function colorScheme(): string {
    switch (voteType) {
      case "For":
        return "green";
      case "Against":
        return "red";
      case "Abstain":
        return "purple";
    }
  }

  function displayVoteBar () {
    switch (proposalState) {
      case "Pending":
      case "Active":
        return false;
      case "Canceled":
      case "Defeated":
      case "Succeeded":
      case "Queued":
      case "Expired":
      case "Executed":
      default:
        return true;
    }
  }

  return (
    <Box
      bg="white"
      border="1px solid #eaeaea"
      borderRadius="16px"
      padding="32px"
      maxW="350px"
      width="100%"
      mb="16px"
      mr="10px"
      flex="1 1"
    >
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        fontSize={"16px"}
        fontWeight="600"
        lineHeight={"20px"}
        color="#000"
      >
        <span>{voteType}</span>
        <span>{votes}</span>
      </Flex>
      { displayVoteBar() && <Progress
        value={80}
        colorScheme={colorScheme()}
        borderRadius="6px"
        height="8px"
        width="100%"
        margin="16px 0"
      ></Progress>}
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        fontSize={"16px"}
        fontWeight="600"
        lineHeight={"20px"}
        color="#000"
      >
        <Text>0 Addresses</Text>
        <Button
          background="transparent"
          color="blue"
          p="0"
          _hover={{
            background: "transparent",
          }}
          disabled={ addresses.length < 1 }
        >
          View Addresses
        </Button>
      </Flex>
      <Button
        width="100%"
        variant="outline"
        mt="25px"
        height="36px"
        fontSize="14px"
        border="1px solid"
        borderColor="#7c7f89"
        color="#7c7f89"
        _hover={{
          backgroundColor: "transparent",
          color: "#000",
        }}
      >
        Vote {voteType}
      </Button>
    </Box>
  );
}
