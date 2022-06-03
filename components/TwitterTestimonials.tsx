import {
  Flex,
  Heading,
  Text,
  Box,
  Container,
  Button,
  Image
} from "@chakra-ui/react";
import {
  darken,
  lighten
} from '@chakra-ui/theme-tools';
import tweets from '../data/tweets.json';
import { format } from 'date-fns';

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
      width = "98%"
      mx={"1%"}
    >
      <Container>
        <Flex
          h='800px'
          color='white'
        >
          <Flex
            flexDir='column'
            w='25%'
            justifyContent={'center'}
            mr='120px'
          >
            <Heading
              fontSize='48px'
              fontWeight={'medium'}
              mb='8px'
            >You&#39;re in good company</Heading>
            <Text
              fontSize='16px'
              mb='36px'
            >Take corporate accountability into your own hands.</Text>
            <Button
              textTransform='capitalize'
              color='white'
              bg='seafoam.500'
            >Browse Campaigns</Button>
          </Flex>
          <Flex
            w='50%'
            flexDir={'column'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            h='100%'
          >
            { tweetData.map(({ data, includes}, index) => {
              const { id, text, created_at } = data;
              const { username, profile_image_url } = includes.users[0];
              return (
                <Box 
                  key={`${id}{index}`}
                  borderRadius = "16px"
                  bg='#36555A'
                  p='12px'
                  mx='12px'
                  mb='5em'
                  h='fit-content'
                  w='300px'
                  boxShadow={'0px 0px 48px 2px rgba(0, 0, 0, 0.1)'}
                  _first={{
                    mt: '13em'
                  }}
                  _last={{
                    mb: '8em'
                  }}
                >
                  <Flex
                    alignItems={'center'}
                    mb='16px'
                  >
                    <Image
                      src={profile_image_url} 
                      alt={`twitter profile image of ${username}`}
                      m='2px 8px 2px 0'
                      borderRadius='full'
                      boxSize='40px'
                      />
                    <Heading fontSize='1.2em'>{ username }</Heading>
                  </Flex>
                  <Text
                    fontSize='1.0em'
                    mb='12px'
                  >{ text }</Text>
                  <Text>{ format(new Date(created_at), 'MMMM d, yyyy') }</Text>
                </Box>
              )
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
