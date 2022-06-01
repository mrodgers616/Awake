import { FC, useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  ButtonProps,
  Icon,
  Text,
  Button,
  Heading,
  Box,
  Image,
  Flex
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup,
} from "chakra-paginator";
import { FiArrowUpRight, FiChevronRight, FiChevronLeft } from "react-icons/fi";

const fetchArticles = (pageSize: number, offset: number) => {};



const baseStyles: ButtonProps = {
  w: 7,
  fontSize: "sm"
};

const normalStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    color: 'blue.500'
  },
  bg: "transparent",
  color: 'blue.500'
};

const activeStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    color: 'blue.500'
  },
  bg: "transparent",
  color: 'blue.500'
};

const separatorStyles: ButtonProps = {
  w: 7,
  bg: "green.200"
};



export default function LatestArticles({
  title,
  displayPaginator = true,
  climateDAOArticles
}: {
  title: string;
  climateDAOArticles: any[];
  displayPaginator?: boolean;
}): JSX.Element {
  const [articles, setArticles] = useState<any>([]);
  const [articlesTotal, setArticlesTotal] = useState(6);

  const {
    pagesQuantity,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePaginator({
    total: articlesTotal,
    initialState: {
      pageSize: 3,
      isDisabled: false,
      currentPage: 1,
    },
  });


const PaginatorProps = {
  pagesQuantity: pagesQuantity,
  currentPage: currentPage,
  onPageChange: setCurrentPage,
  activeStyles: activeStyles ,
  normalStyles: normalStyles,
  separatorStyles: separatorStyles
}

  useEffect(() => {
    setArticles(climateDAOArticles.slice(offset, offset + pageSize));
    setArticlesTotal(climateDAOArticles.length);
  }, []);

  useEffect(() => {
    setArticles(climateDAOArticles.slice(offset, offset + pageSize));
  }, [currentPage, pageSize, offset]);

  return (
    <>
      <Heading
        textTransform="uppercase"
        mb='64px'
        ml='8px'
      >{ title ?? 'latest news' }</Heading>
      <Flex
        flexDirection={{
          base: "column",
          lg: 'row'
        }}  
      >
        {articles.map((article: any, index: number) => (
          <Box
            key={index}
            bg='sage.500'
            p='16px'
            borderRadius='10px'
            mx='8px'
            mb={{
              base: '16px',
            }}
            color='white'
            maxW={{ 
              base: '100%', 
              lg: '33%'
            }}
          >
            <Image
              src={article.src}
              mb='8px'
              h='250px'
              w='100%'
              objectFit='cover'
            />
            <Heading
              mb='16px'
              textTransform={'capitalize'}
            >{article.title}</Heading>
            <Text
              flexGrow={2}
            >{article.description}</Text>
            <Button
              my='8px'
              borderRadius={'18px'}
              colorScheme='seafoam'
            >Read on Medium <Icon as={FiArrowUpRight}/></Button>
          </Box>
        ))}
      </Flex>
      { displayPaginator && (<Paginator {...PaginatorProps}>
        <Flex
          justifyContent='flex-end'
        >
          <Container
            justify="space-between"
            w="fit-content"
            p={4}
          >
            <Previous
              bg='transparent'
              _hover={{
                bg: 'transparent',
                color: 'blue'
              }}
            >
              <Icon as={FiChevronLeft}/>
            </Previous>
            <PageGroup
              isInline
              align="center"
            />
            <Next
              bg='transparent'
              _hover={{
                bg: 'transparent',
                color: 'blue'
              }}
            >
              <Icon as={FiChevronRight}/>
            </Next>
          </Container>
        </Flex>
      </Paginator>)}
    </>
  );
};
