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


  function pushLoginAndCampaignId(campaignID: string) {
    localStorage.setItem('campaignID', campaignID);
    Router.push("/login");
  }

  const [dl, setDL] = useState(deadline ? new Date(deadline) : new Date());
  const [start, setStart] = useState(
    createdAt ? new Date(createdAt) : new Date()
  );
  const [progress, setProgress] = useState(0);

  const { days, hours, minutes, seconds, isTimeUp, now } = useTicker(dl);

  const { userid } = useAuth();

  function handleLinkClick(campaignID: string) {

    localStorage.setItem('campaignID', campaignID);
    Router.push(`${campaignID}`);
    // if (userid) {
    //   Router.push(`${campaignID}`);
    // }
    // else {
    //   pushLoginAndCampaignId(campaignID);
    // }
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
    : `${days}d ${hours}h ${minutes}m ${seconds}s left`;

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
      {/* I'VE COMMENTED OUT THE HEADING FOR INDIVIDUAL CAMPAIGNS SO THAT IT EMPHASIZES THE IMAGES OVER THE TEXT */}
      {/* <Heading fontSize="1.2em" mb="8px">
        {companyName ?? "Company"} | {symbol ?? "SMBL"}
      </Heading> */}
      <Progress
        colorScheme={isTimeUp ? "purple" : "green"}
        value={isTimeUp ? progress : 80}
        w="100%"
        h="32px"
        borderRadius="8px"
        mb="18px"
        mt="9px"
      >
        <ProgressLabel fontSize="sm" color={isTimeUp ? "#BAC7BE" : "white"} w="fit-content">
          {timerText}
        </ProgressLabel>
      </Progress>
      <Box mb="0px" flexGrow={2}>
        <Heading mb="8px" fontSize="1.2em">
          {title?.substring(0, 100)}
        </Heading>
        {/* TESTING TAKING THE DESCRIPTION OUT TO OPTIMZE FOR CAMPAIGN VISIBILITY */}
        {/* <Text
          h="3em"
          //overflow="hidden"
          _after={{
            content: description ? "'...'" : '""',
          }}
        >
          {description?.substring(0, 120)}
        </Text> */}
      </Box>
      <Box>
        <Tooltip
          hasArrow
          shouldWrapChildren
        >
          <Button
            as={Link}
            bg="rgb(100, 43, 115)"
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
