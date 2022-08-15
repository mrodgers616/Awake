import type { StyleProps } from '@chakra-ui/react'
import {
  Flex,
  Box,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'

interface StepsCardProps extends StyleProps {
  title?: string;
  illustration?: string | null;
  description?: string;
}

const StepsCard: React.FC<StepsCardProps> = ({ title, illustration, description, ...rest }) => {
  return (
    <Flex
      {...rest}
    >
      {(illustration && <Image w="170px" h="170px" src={illustration} objectFit='contain' alt={`Illustration of ${title} Key Option`} />) || <Box w="170px" h="170px" bg="grey" />}
      <Heading
        as="h2"
        fontSize="18px"
        fontWeight={700}
        lineHeight="23px"
        minH={"46px"}
        m="0.83em 0"
        textAlign='center'
      >
        {title}
      </Heading>
      <Text
        m="1em 0"
        textAlign='center'
        w={['100%', '60%', '70%', '80%']}
      >{description}</Text>
    </Flex>
  )
}

export default StepsCard;