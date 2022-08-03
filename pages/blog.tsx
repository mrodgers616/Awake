import type { NextPage } from "next";
import Head from "next/head";
import {
  Text,
  Flex,
  Container,
  Heading,
  ButtonProps,
  Box,
  Button,
  Icon,
  Image,
  Link
} from "@chakra-ui/react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import tempArticles from "../data/articles.json";
import {
  Pagination as Paginator,
  PaginationContainer as PaginatorContainer,
  PaginationPrevious as Previous,
  usePagination as usePaginator,
  PaginationNext as Next,
  PaginationPageGroup as PageGroup,
} from "@ajna/pagination";

import { useEffect, useState } from "react";
import { fakerArticles } from "../lib/mock-data";

const Blog: NextPage = () => {
  const [articles, setArticles] = useState(fakerArticles);
  const [articlesTotal, setArticlesTotal] = useState(6);
  const { pagesCount, offset, currentPage, setCurrentPage, pageSize } =
    usePaginator({
      total: articlesTotal,
      initialState: {
        pageSize: 6,
        isDisabled: false,
        currentPage: 1,
      },
    });

  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm",
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      color: "blue.500",
    },
    bg: "transparent",
    color: "blue.500",
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      color: "blue.500",
    },
    bg: "transparent",
    color: "blue.500",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200",
  };

  const PaginatorProps = {
    pagesCount: pagesCount,
    currentPage: currentPage,
    onPageChange: setCurrentPage,
    activeStyles: activeStyles ,
    normalStyles: normalStyles,
    separatorStyles: separatorStyles
  }

  useEffect(() => {
    setArticles(tempArticles.slice(offset, offset + pageSize));
    setArticlesTotal(tempArticles.length);
  }, []);

  useEffect(() => {
    setArticles(tempArticles.slice(offset, offset + pageSize));
  }, [currentPage, pageSize, offset]);

  return (
    <>
      <Head>
        <title>Climate DAO | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box
        bgGradient="linear-gradient(sage.500, seafoam.500)"
        // bgImage="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        bgSize="cover"
        bgPosition="center"
        mt="8%"
        //borderRadius='30px'
        //mx="1%"
      >
        <Box w="100%" h="100%" bg="rgba(0,0,0,.0)">
          <Container h="400px">
            <Flex h="100%" justifyContent="center" alignItems="center">
              <Heading
                color="white"
                textAlign={"center"}
                fontSize="4.5em"
                mb="60px"
              >
                Learn About ClimateDAO
              </Heading>
            </Flex>
          </Container>
        </Box>
      </Box>
      <Container>
        <Flex
          m="64px auto 16px"
          flexWrap="wrap"
          justifyContent={"space-between"}
        >
          {articles.map((article: any, index: number) => (
            <Flex
              key={index}
              flexDir="column"
              maxW={{
                base: 'calc(100% - 8px)',
                md: 'calc(50% - 16px)',                
                lg: "calc(33% - 16px)"
              }}
              // flexBasis="30%"
              bg="sage.500"
              p="16px"
              borderRadius="10px"
              mt="32px"
              flexGrow={2}
              color="white"
            >
              <Image
                src={article.src}
                mb="8px"
                h="250px"
                w="100%"
                borderRadius=".33em"
                objectFit="cover"
              />
              <Heading fontSize="1.5em" mb="16px" textTransform={"capitalize"}>
                {article.title}
              </Heading>
              <Link href={article.link} isExternal>
                <Text flexGrow={2}>{article.description}</Text>
                <Button my="8px" borderRadius={"18px"} colorScheme="seafoam">
                  Read Article <Icon as={FiArrowUpRight} />
                </Button>
              </Link>
            </Flex>
          ))}
        </Flex>
        <Paginator {...PaginatorProps}>
          <Flex justifyContent="flex-end">
            <PaginatorContainer justify="space-between" w="fit-content" p={4}>
              <Previous
                bg="transparent"
                _hover={{
                  bg: "transparent",
                  color: "blue",
                }}
              >
                <Icon as={FiChevronLeft} />
              </Previous>
              <PageGroup isInline align="center" />
              <Next
                bg="transparent"
                _hover={{
                  bg: "transparent",
                  color: "blue",
                }}
              >
                <Icon as={FiChevronRight} />
              </Next>
            </PaginatorContainer>
          </Flex>
        </Paginator>
      </Container>
    </>
  );
};

export default Blog;
