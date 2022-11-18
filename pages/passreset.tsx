import type { NextPageWithLayout } from '../lib/types/next';
import React from "react";
import Head from "next/head";
import {
  FormErrorMessage,
  FormControl,
  Container,
  FormLabel,
  useToast,
  Heading,
  Button,
  HStack,
  chakra,
  Input,
  Image,
  Flex,
  Icon,
  Text,
  Box,
  Checkbox,
  Divider,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  useMergeRefs,
  ButtonGroup, 
  VisuallyHidden,
} from "@chakra-ui/react";
import Link from '../components/Link';
import Layout from '../components/layout';
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { Protected } from '../contexts/Protected';
import GoogleButton from 'react-google-button'
import { Logo } from '../components/login/Logo'
import { OAuthButtonGroup } from '../components/login/OAuthButtonGroup'
import { PasswordField } from '../components/login/PasswordField'
import { GoogleIcon } from '../components/login/ProviderIcons'
import { useRouter } from "next/router";
import { HiEye, HiEyeOff } from 'react-icons/hi'
import LogoImageAlt from '../public/illustrations/Awake Logo dark (new).png';


const googleButtonStyle = {
  marignRight: "auto",
  marignLeft: "auto",
}


const Login: NextPageWithLayout = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {
    resetPassword,
  } = useAuth();
  const { googleSignIn: googleRegister } = useAuth();

  const onSubmit = (data: any) => {
    //login(data);
  };

  const providers = [
    { name: 'Google', icon: <GoogleIcon boxSize="5" /> },
  ]

  const router = useRouter();

  const [emailValue, setEmailValue] = React.useState('')
  const handleEmailChange = (event: any) => setEmailValue(event.target.value)

  const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef<HTMLInputElement>(null)
  
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

  const resetEmail = () => {
    resetPassword(emailValue)
  }



  return (
    <>
      <Head>
        <title>Awake | Login</title>
      </Head>
      {/* <Box
        bg="sage.500"
        bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)"
        // bgImage="url(https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
        bgSize="cover"
        zIndex={0}
        position="relative"
        height="96px"
      />
      <Box>
        <Container
          width="100%"
          overflow="auto"
          marginX="auto"
          mt="94px"
          mb="94px"
          pb='16px'
        >
          <Box
            w={{base: '100%', md: '80%', lg: '80%'}}
            p={16}
            shadow='md'
            borderWidth={'1px'}
            mx='auto'
            bg='white'
          >
            <Heading mb='32px' textTransform='capitalize' textAlign="center">
              Log In to your account
            </Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb='16px'>
                <FormLabel htmlFor="email">
                  Email:
                </FormLabel>
                <Input
                  id='email'
                  type='email'
                  {...register('email', {
                    required: 'Please enter your email',
                  })}
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl mb='32px'>
                <FormLabel htmlFor="password">
                  Password:
                </FormLabel>
                <Input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: 'Please enter your password',
                  })}
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <HStack>
                <Flex>
                  <Button
                    type="submit"
                    bg='rgb(164,191,217)'
                  >Log in</Button>

                </Flex>
                <Link href='/register' fontSize={{base: "sm", md: "lg",  lg:"lg"}} w={{base: '150%', md:"100%", lg:"100%"}}>Create An Account</Link>
              </HStack>
              <Container mt={{base: "40%",md: "3%", lg: "3%"}} ml={{base: "-9.75%", md: "-1.75%", lg: "-1.75%"}} w={{base: '50%', md:"100%", lg:"100%"}}>
                <GoogleButton onClick={() => { googleRegister() }}></GoogleButton>
              </Container>
            </chakra.form>
          </Box>
        </Container>
      </Box> */}
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} mt="30px" mb="100px">
    <Stack spacing="8">
      <Stack spacing="6">
        <Logo />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Reset Your Password
          </Heading>
        </Stack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                  id='email'
                  type='email'
                  onChange={handleEmailChange}
                />
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputRightElement>
                  {/* <IconButton
                    variant="link"
                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={onClickReveal}
                  /> */}
                </InputRightElement>
              </InputGroup>
          </FormControl>
          </Stack>
          <Stack spacing="6">
            <Button variant="primary" type="submit" border="2px" borderColor="#32006B" _hover={{ bg: '#ebedf0' }} onClick={() => {resetEmail()}}>Reset</Button>
          </Stack>
        </Stack>
        </chakra.form>
      </Box>
    </Stack>
  </Container>
    </>
  );
};

export default Login;
