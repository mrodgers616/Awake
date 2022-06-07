import { Flex, Box, Image, Progress, ProgressLabel, Heading, Text } from "@chakra-ui/react";
import { useTicker } from "../hooks/useTicker";
import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

interface Campaign {
  state?: string | null;
  isFeatured?: boolean | null;
  title?: string | null;
  description?: string | null;
  id?: string | null;
  startBlock?: string | null;
  endBlock?: string | null;
  image?: string | null;
  datePosted?: Date | null;
  deadline: string;
  createdAt: string;
}

interface Votes {}

export default function CampaignCard({
  campaign,
  size,
  type,
  timer,
}: {
  campaign: Campaign;
  size: "small" | "medium" | "large";
  type: "featured" | "trending" | "card";
  timer: boolean;
}): JSX.Element {
  const [dl, setDL] = useState(new Date(campaign.deadline))
  const [start, setStart] = useState(new Date(campaign.createdAt))
  const [
    progress,
    setProgress,
  ] = useState(0);

  const {
    days,
    hours,
    minutes,
    seconds,
    isTimeUp,
    now
  } = useTicker(dl);

  useEffect(() => {
    if (isTimeUp) {
      setProgress(100);
    } else {
      const diffTodayStart = differenceInSeconds(new Date(), start);
      const diffEndStart = differenceInSeconds(dl, start);
      const prog =  Math.round((diffTodayStart / diffEndStart) * 100);
      setProgress(prog);
    }
  }, [now])

  const timerText = isTimeUp ? "Voting Closed" : `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return (
    <Flex flexDir={type === "trending" ? "row" : "column"}>
      <Flex
        w={ type === 'featured' ? '100%' : '50%' }
        position='relative'
        mb={ type === 'featured' ? '16px' : '32px' }
        mr={ type === "trending" ? "16px" : "0px" }
      >
        <Image 
          src={campaign.image ? campaign.image : "nature/lakeside.png"}
          h='100%'
          w='auto'
        />
      </Flex>
      <Box>
        <Heading
          fontSize={ type === "trending" ? "xl" : "2xl" }
          mb='8px'
        >{ campaign.title }</Heading>
        <Text>{ campaign.description?.substring(0, 280) }</Text>
      </Box>
    </Flex>
  );
}


{/* <Box>
<Image
  borderRadius="8px"
  w="100%"
  h="auto"
  alt='A campaign image'
  src="https://images.unsplash.com/photo-1521405785232-7a56b029191e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80"
></Image>
<Progress
  zIndex={1000}
  top="-36px"
  left="16px"
  h="24px"
  borderRadius="5px"
  w="calc(100% - 32px)"
  colorScheme="seafoam"
  value={60}
>
  <ProgressLabel
    left="0"
    textAlign={"right"}
    transform={"translate(0, -50%)"}
    fontSize="16px"
    minW={"50px"}
    fontWeight="400"
  >
    1D2H20M35S
  </ProgressLabel>
</Progress>
</Box>
<Box>
<Heading mb="8px">Campaign Title</Heading>
<Text>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.{" "}
</Text>
</Box> */}