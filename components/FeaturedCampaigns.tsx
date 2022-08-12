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
import { useAuth } from "../contexts/AuthContext";


export default function FeaturedCampaigns({
  featured,
  trending
}: {
  featured: any;
  trending: any;
}) {

  //const { hasEnoughBalance, isConnected } = useWeb3();
  const { userid } = useAuth();

  return (
    <Flex
      as="section"
      w="100%"
      borderRadius="24px"
      title="proposals"
      mb="128px"
      flexDirection={{ sm: "column", lg: "row" }}
    >
      <Box display={{ base: "none", sm: "none", lg: "block" }} w={{ sm: '100%', lg: "50%" }} px="32px" mb={{ sm: "64px", lg: 0 }}>
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
      <Box w={{ sm: '100%', lg: "50%" }} px="32px">
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
            // I've disabled the function below that disables the browse campaign button if the user doesn't have enough tokens
            // disabled={isConnected}
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
            // I've disabled the function below that disables the browse campaign button if the user doesn't have enough tokens
            // disabled={!hasEnoughBalance}
            bg="seafoam.500"
            color="white"
            borderRadius="20px"
            display={{ base: "none", sm: "none", lg: "block" }}
            href={userid ? "campaigns/create" : "/login"}
            _hover={{
              textDecoration: "none"
            }}
          >
            Start My Own
            <Icon ml="16px" as={FaArrowRight} />
          </Button>
        </Flex>
      </Box>
    </Flex >)
}