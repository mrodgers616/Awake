import { Box, Circle, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const HIW = () => (
  <Box as="section" bg={useColorModeValue('gray.50', 'gray.800')}>
    <Box maxW="3xl" mx="auto" px={{ base: '6', md: '8' }} pt="12" pb="16">
      <Flex direction="column" align="center" textAlign="center">
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="medium" mt="6">
          &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas
          culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.&rdquo;
        </Text>
        <img
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTN8fGxhZHklMjBoZWFkc2hvdCUyMHNtaWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
      </Flex>
      <HStack justify="center" spacing="4" mt="8" color={useColorModeValue('gray.300', 'gray.600')}>
        <Circle size="3" bg="blue.500" />
        <Circle size="2" bg="currentColor" />
        <Circle size="2" bg="currentColor" />
      </HStack>
    </Box>
  </Box>
)