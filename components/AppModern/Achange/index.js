import React from 'react'
import {
  ChakraProvider,
  Container,
  Flex,
  Highlight,
  Image,
  Heading
} from '@chakra-ui/react'

const NewContent = () => (
  <ChakraProvider resetCSS>
    <Flex justifyContent="space-between" alignItems="center" width="100%" mt={20}>
        <Image
          height="400px"
          width="400px"
          display="inline-block"
          minWidth="100px"
          minHeight="100px"
          ml="10%"
          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg"
        />
        <Heading 
          mr="10%" 
          as="h1"
          maxWidth={"600px"} 
          display="inline-block" 
          textAlign="right" 
          size="2xl"
        >
          <Highlight
            query='profit AND purpose.'
            styles={{ px: '1', py: '.5', bg: 'yellow.200' }}>
            Join a community of like-minded investors in profit AND purpose.
          </Highlight>
        </Heading>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" width="100%" mt={20}>
      <Heading 
          ml="10%" 
          as="h1"
          maxWidth={"600px"} 
          display="inline-block" 
          textAlign="left" 
          size="2xl"
        ><Highlight
        query='change.'
        styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
      >
        Vote on campaigns for companies in your portfolio to change.
      </Highlight>
          
        </Heading>
        <Image
          height="400px"
          width="400px"
          display="inline-block"
          minWidth="100px"
          minHeight="100px"
          mr="10%"
          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg"
        />
      </Flex>
      
      <Flex justifyContent="space-between" alignItems="center" width="100%" mt={20}>
        <Image
          height="400px"
          width="400px"
          display="inline-block"
          minWidth="100px"
          minHeight="100px"
          ml="10%"
          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg"
        />
        <Heading 
          mr="10%" 
          as="h1"
          maxWidth={"600px"} 
          display="inline-block" 
          textAlign="right" 
          size="2xl"
        >
          <Highlight
            query='real impact'
            styles={{ px: '1', py: '.5', bg: 'yellow.200' }}
          >
            Join forces with other investors to have real impact
          </Highlight>
        </Heading>
      </Flex>
  </ChakraProvider>
)

export default NewContent