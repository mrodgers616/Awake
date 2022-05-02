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
      bgGradient="linear(90deg, seafoam.500 -500%, sage.500 50%, seafoam.500 500%)"
    >
      <Container>
        <Flex
          h='1200px'
          color='white'
        >
          <Flex
            flexDir='column'
            w='30%'
            justifyContent={'center'}
            mr='120px'
          >
            <Heading
              fontSize='64px'
              fontWeight={'medium'}
              mb='8px'
            >Testimonials</Heading>
            <Text
              fontSize='16px'
              mb='36px'
            >Take corporate governance into your own hands; join</Text>
            <Button
              textTransform='capitalize'
              color='white'
              bg='seafoam.500'
            >read more</Button>
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
                  bg='#36555A'
                  p='24px'
                  mx='16px'
                  mb='5em'
                  h='fit-content'
                  w='450px'
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
                      m='4px 16px 4px 0'
                      />
                    <Heading fontSize='1.6em'>{ username }</Heading>
                  </Flex>
                  <Text
                    fontSize='1.33em'
                    mb='16px'
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
