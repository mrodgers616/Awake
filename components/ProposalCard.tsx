import React, { useEffect, useState } from "react";
import type { StyleProps } from "@chakra-ui/react";
import {
  Flex,
  Image,
  Text,
  Box,
  Link,
  Progress,
  ProgressLabel,
  Button,
  Heading,
  Tooltip,
  Icon,
  AspectRatio,
} from "@chakra-ui/react";
import { useTicker } from "../hooks/useTicker";
import { differenceInSeconds } from "date-fns";
import { BiBookmark } from "react-icons/bi";
import { getProposalState } from "../lib/web3";

interface ProposalProps extends StyleProps {
  isFeatured?: boolean | null;
  proposalId: string;
  title?: string | null;
  description?: string | null;
  companyName?: string | null;
  walletAddress?: string | null;
  isConnected: boolean;
  symbol?: string | null;
  threadId?: string | null;
  id?: string | null;
  startBlock?: string | null;
  endBlock?: string | null;
  image?: string | null;
  datePosted?: Date | null;
  deadline: Date;
  createdAt: Date;
}

export default function ProposalCard(props: ProposalProps): JSX.Element {
  const {
    id,
    title,
    description,
    symbol,
    isFeatured,
    companyName,
    startBlock,
    endBlock,
    proposalId,
    isConnected,
    datePosted,
    image,
    createdAt,
    deadline,
    ...rest
  } = props;

  const [dl, setDL] = useState(deadline ? new Date(deadline) : new Date());
  const [start, setStart] = useState(
    createdAt ? new Date(createdAt) : new Date()
  );
  const [progress, setProgress] = useState(0);
  const [campaignState, setCampaignState] = useState("");

  const { days, hours, minutes, seconds, isTimeUp, now } = useTicker(dl);

  useEffect(() => {
    getProposalState(proposalId).then((res) => {
      setCampaignState(res);
    });
  }, []);

  useEffect(() => {
    if (isTimeUp) {
      setProgress(100);
    } else {
      const diffTodayStart = differenceInSeconds(now as Date, start);
      const diffEndStart = differenceInSeconds(dl, start);
      const prog = Math.round((diffTodayStart / diffEndStart) * 100);
      setProgress(prog);
    }
  }, [now]);

  const timerText = isTimeUp
    ? "Voting Closed"
    : `${days}d ${hours}h ${minutes}m ${seconds}s`;

  const proposalOutcomeStyles = (state: string): Object => {
    const baseStyle = {
      borderRadius: "50%",
      padding: "5px",
      mr: "15px",
    };

    switch (state) {
      case "Active":
        return {
          color: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          ...baseStyle,
        };
      case "Passed":
        return {
          color: "green",
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          ...baseStyle,
        };
      case "Failed":
      default:
        return {
          color: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          ...baseStyle,
        };
    }
  };

  return (
    <Flex flexDir={"column"} {...rest}>
      <AspectRatio maxW='475px' ratio={16 / 9}>
        <Image src={image!} alt="a campaign image" mb="15px" objectFit='cover'></Image>
      </AspectRatio>
      <Heading fontSize="1.2em" mb="8px">
        {companyName ?? "Company"} | {symbol ?? "SMBL"}
      </Heading>
      <Progress
        colorScheme={isTimeUp ? "red" : "seafoam.500"}
        value={progress}
        w="100%"
        h="32px"
        borderRadius="8px"
        mb="18px"
      >
        <ProgressLabel fontSize="sm" color="sage.500" w="fit-content">
          {timerText}
        </ProgressLabel>
      </Progress>
      <Box mb="32px" flexGrow={2}>
        <Heading mb="16px" fontSize="1.2em">
          {title}
        </Heading>
        <Text
          h="3em"
          overflow="hidden"
          _after={{
            content: description ? "'...'" : '""',
          }}
        >
          {description?.substring(0, 140)}
        </Text>
      </Box>
      <Box>
        <Tooltip
          hasArrow
          isDisabled={isConnected}
          label={"Connect your wallet to participate"}
          shouldWrapChildren
        >
          <Button
            as={Link}
            bg="seafoam.500"
            color="white"
            w="55%"
            mr="16px"
            href={`/campaigns/${id}`}
            textDecoration="none"
            _disabled={{
              pointerEvents: 'none'
            }}
            _hover={{
              textDecoration: "none",
            }}
          >
            Back Campaign
          </Button>
        </Tooltip>
        {/* <Button
          bg='seafoam.500'
          color='white'
          w='36px'
        >
          <Icon as={BiBookmark} />
        </Button> */}
      </Box>
    </Flex>
  );
}
