import {
  Flex,
  Heading,
  Text,
  Box,
  Container,
  Button,
  Link,
  Icon,
  Image
} from "@chakra-ui/react";
import {
  darken,
  lighten
} from '@chakra-ui/theme-tools';
import tweets from '../data/tweets.json';
import { FaArrowRight } from "react-icons/fa";
import { format } from 'date-fns';
import picture from "../public/illustrations/default.jpeg"

type StepSectionProps = {
  steps: Array<any>;
};

const testimonials = [
  {
    handle: '@johndoe',
    message: '',

  }, {
    handle: '@johndoe2',
    message: '',

  }, {
    handle: '@johndoe3',
    message: '',

  }
]

export default function TwitterTestimonial(): JSX.Element {
  const { data: tweetData } = tweets;
  return (
    <Box
      id="testimonials"
      bgGradient="linear-gradient(seafoam.500, sage.500)"
      overflow={'visible'}
      borderRadius='30px'
      width="98%"
      mx={"3%"}
      // borderColor={"blue"}
      // borderWidth={"thick"}
      h={{ base: "600px", sm: "600px", lg: '800px' }}
    >
      <Container>
        {/* This is where the left side content for testimonials Starts */}
        <Flex
          flexDir='row'
          w='100%'
          h={{ base: "85px", sm: "100px", lg: "150px" }}
          mt="40px"
          // borderColor={"red"}
          // borderWidth={"thick"}
          justifyContent={"center"}
        >
          <Flex
            flexDir='column'
            w='80%'
            mr='20px'

          >
            <Heading
              fontSize={{ base: "16px", sm: "16px", md: "24px", lg: "54px" }}
              fontWeight={'medium'}
              mb='8px'
              mt={{ base: "16px", sm: "16px", lg: "32px" }}
            >You&#39;re in good company</Heading>
            <Text
              fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "32px" }}
              mb='36px'
            >Take corporate accountability into your own hands.</Text>
          </Flex>
          <Button
            as={Link}
            bg="seafoam.500"
            color="white"
            mt={{ base: "16px", lg: "auto" }}
            mb={{ base: "0px", lg: "auto" }}
            h={{ base: "48px", sm: "48px", md: "64px", lg: "72px" }}
            w={{ base: "108px", sm: "108px", md: "124px", lg: "304px" }}
            href="/campaigns"
            fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "24px" }}
            _disabled={{
              pointerEvents: "none",
            }}
          >
            Campaigns
            <Icon as={FaArrowRight} ml="15px" />
          </Button>
        </Flex>

        {/* This is where the content for testimonials Starts */}
        <Flex
          w="100%"
          flexDir={'row'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          h='100%'
          // borderColor={"yellow"}
          // borderWidth={"thick"}
          mt="20px"
        >
          {tweetData.map(({ data, includes }, index) => {
            const { id, text, created_at } = data;
            const { username, profile_image_url } = includes.users[0];
            return (
              // This is where the content for each twitter testimonial goes
              <Box
                key={`${id}{index}`}
                borderRadius="16px"
                bg='#36555A'
                p='12px'
                // p={{ base: "12px", sm: "8px", md: "12px", lg: "12px" }}
                mx='12px'
                mb={{ base: "5px", sm: "0px", lg: "5em" }}
                h='100%'
                w={{ base: "fit-content", sm: 'fit-content', lg: "25%" }}
                boxShadow={'0px 0px 48px 2px rgba(0, 0, 0, 0.1)'}
                _first={{
                  mt: '15px'
                }}
                _last={{
                  mb: '15px'
                }}
              >
                <Flex
                  alignItems={'center'}
                  mb={{ base: "6px", sm: "6px", lg: '16px' }}
                >
                  <Image
                    src={profile_image_url ? profile_image_url : "/illustrations/default.jpeg"}
                    //@ts-ignore
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/illustrations/default.jpeg";
                    }}
                    alt={`twitter profile image of ${username}`}
                    m='2px 8px 2px 0'
                    borderRadius='full'
                    boxSize={{ base: "16px", sm: "16px", md: "20px", lg: "40px" }}

                  />
                  <Heading
                    fontSize={{ base: "10px", sm: "12px", md: "1.0em", lg: "1.2em" }}
                    color={"white"}
                  >{username}</Heading>
                </Flex>
                <Text
                  // fontSize='1.0em'
                  fontSize={{ base: "8px", sm: "8px", md: "12px", lg: "1.0em" }}
                  color={"white"}
                  mb={{ base: "6px", sm: "6px", lg: '12px' }}
                >{text}</Text>
                {/* <Text>{format(new Date(created_at), 'MMMM d, yyyy')}</Text> */}
              </Box>
            )
          })}
        </Flex>
        {/* </Flex> */}
      </Container>
    </Box>
  );
}
