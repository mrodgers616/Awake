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
          // width="400px"
          display="inline-block"
          minWidth="100px"
          minHeight="100px"
          ml="10%"
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FFriends.png?alt=media&token=7db49963-3527-4ce9-a2a6-079a096d6566"
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
          src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGroup%20365.png?alt=media&token=e671bf28-36d8-477e-b377-52c52a4aa561"
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