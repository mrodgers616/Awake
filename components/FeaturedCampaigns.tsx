import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Link,
  Icon,
  Button
} from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import CampaignCard from "./CampaignCard";
import { useWeb3 } from "../contexts/Web3Context";

export default function FeaturedCampaigns({
  featured,
  trending
}: {
  featured: any;
  trending: any;
}) {

  const { hasEnoughBalance, isConnected } = useWeb3();

  return (          
  <Flex
    as="section"
    w="100%"
    borderRadius="24px"
    title="proposals"
    mb="128px"
  >
    <Box w="50%" px="32px">
      <Heading fontSize="30px" textTransform="uppercase" mb="36px">
        Featured Campaign
      </Heading>
      <CampaignCard
        type='featured'
        size="large" 
        campaign={featured}
        timer={true}
      />
    </Box>
    <Box w="50%" px="32px">
      <Heading fontSize="30px" textTransform="uppercase" mb="36px">
        Trending Campaigns
      </Heading>
      <Flex flexDir="column" alignItems="center">
        {trending.map((campaign: any, index: number) => (
          <CampaignCard
            key={index}
            type='trending'
            size="small"
            campaign={campaign}
            timer={true}
          />
        ))}
      </Flex>
      <Flex 
        title="controls"
        w="100%"
        justifyContent="flex-end"
      >
        <Button
          as={Link}
          bg="seafoam.500"
          disabled={isConnected}
          color="white"
          mr="16px"
          borderRadius="20px"
          href="campaigns"
          _hover={{
            textDecoration: "none"
          }}
        >
          Browse Campaigns
          <Icon ml="16px" as={FaArrowRight} />
        </Button>
        <Button
          as={Link}
          textDecoration="none"
          disabled={!hasEnoughBalance}
          bg="seafoam.500" 
          color="white" 
          borderRadius="20px"
          href="campaigns/create"
          _hover={{
            textDecoration: "none"
          }}
        >
          Start My Own
          <Icon ml="16px" as={FaArrowRight} />
        </Button>
      </Flex>
    </Box>
  </Flex>)
}