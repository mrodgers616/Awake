import { chakra, HTMLChakraProps, Image, Center } from '@chakra-ui/react'
import img from '../../public/illustrations/Awake Logo dark (new).png'

export const Logo = (props: HTMLChakraProps<'svg'>) => (
    <>
    <Center>
    <Image alt="logo" src='https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/Awake%20Logo%20dark%20(new).png?alt=media&token=ff0c5f7e-42b4-451e-8909-e1e233cbd91b'
    color="accent"
    height="60px"
    width="60px">
    </Image>
    </Center>
  </>
)