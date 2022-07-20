import React, { useEffect, useState } from "react";
import { StyleProps, useToast } from "@chakra-ui/react";
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
import { useAuth } from "../contexts/AuthContext";
import Router from "next/router";

interface ProposalProps extends StyleProps {
  isFeatured?: boolean | null;
  proposalId: string;
  title?: string | null;
  governanceTitle?: string | null;
  description?: string | null;
  proposalType?: string | null;
  smartContractAddress?: string | null;
  threadId?: string | null;
  governanceDescription?: string | null;
  contractFunctions?: any;
  companyName?: string | null;
  isConnected: boolean;
  symbol?: string | null;
  id?: string | null;
  startBlock?: string | null;
  endBlock?: string | null;
  image?: string | null;
  datePosted?: Date | null;
  deadline: Date;
  createdAt: Date;
}

function pushLoginAndCampaignId(campaignID: string) {
  localStorage.setItem('campaignID', campaignID);
  Router.push("/login");
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

  const { days, hours, minutes, seconds, isTimeUp, now } = useTicker(dl);

  const { userid } = useAuth();

  function handleLinkClick(campaignID: string) {
    if (userid) {
      Router.push(`${campaignID}`);
    }
    else {
      pushLoginAndCampaignId(campaignID);
    }
  }

  useEffect(() => {
    if (isTimeUp) {
      setProgress(100);
    } else {
      //@ts-ignore
      const diffTodayStart = differenceInSeconds(now, start);
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
    <Flex flexDir={"column"} {...rest} as={Link} onClick={() => handleLinkClick(`/campaigns/${id}`)}>
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
          {title?.substring(0, 100)}
        </Heading>
        <Text
          h="3em"
          //overflow="hidden"
          _after={{
            content: description ? "'...'" : '""',
          }}
        >
          {description?.substring(0, 120)}
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
            //href={userid ? `/campaigns/${id}` : pushLoginAndCampaignId(`/campaigns/${id}`)}
            onClick={() => handleLinkClick(`/campaigns/${id}`)}
            textDecoration="none"
            _disabled={{
              pointerEvents: 'none'
            }}
            _hover={{
              textDecoration: "none",
            }}
          >
            View Campaign
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
}
