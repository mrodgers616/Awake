import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  InputLeftAddon,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import GoogleButton from 'react-google-button'
import { Logo } from '../components/login/Logo'
import { GoogleIcon } from '../components/login/ProviderIcons'


const Register: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { register: userRegister } = useAuth();
  const { googleSignIn: googleRegister } = useAuth();
  const { facebookSignIn: facebook } = useAuth();

  const onSubmit = (data: any) => userRegister(data);
  const providers = [
    { name: 'Google', icon: <GoogleIcon boxSize="5" /> },
  ]

  return (
    <>
      <Head>
        <title>Awake | Register</title>
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
            <Heading mb='32px'>Register</Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb='16px'>
                <FormLabel htmlFor="username">Username:</FormLabel>
                <InputGroup>
                  {/* eslint-disable-next-line react/no-children-prop}
                  <InputLeftAddon children='@' />
                  <Input
                    id='username'
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl mb='16px'>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Please enter your email",
                  })}
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl mb='16px'>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl mb='32px'>
                <FormLabel htmlFor="password">Verify Password:</FormLabel>
                <Input
                  id="password2"
                  type="password"
                  {...register("password2", {
                    required: "Please enter your password",
                  })}
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <HStack>
                <Flex>
                  <Button
                    type="submit"
                    bg="rgb(164,191,217)"
                    mr='16px'
                  >
                    Register
                  </Button>
                </Flex>
                <Link href="/login">Already Have an Account?</Link>
              </HStack>
              <Flex>
                <Container mt={{base: "40%",md: "3%", lg: "3%"}} ml={{base: "-9.75%", md: "-1.75%", lg: "-1.75%"}} w={{base: '50%', md:"100%", lg:"100%"}}>
                  <GoogleButton onClick={() => { googleRegister() }}></GoogleButton>
                </Container>
                <Container mt="3%" ml="-1.75%">
                  {/* <Button onClick={() => { facebook() }}>Log in with facebook</Button>}
                </Container>
              </Flex>
            </chakra.form>
          </Box>
        </Container>
      </Box> */}
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} mt="30px">
    <Stack spacing="8">
      <Stack spacing="6">
        <Logo />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Create An Account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <Button variant="link" colorScheme="blue" onClick={() => {router.push(`/login`);}}>
              Sign In
            </Button>
          </HStack>
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
              <FormLabel htmlFor="email">Username</FormLabel>
                  <Input
                    id='username'
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                  id='email'
                  type='email'
                  {...register('email', {
                    required: 'Please enter your email',
                  })}
                />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputRightElement>
                  {/* <IconButton
                    variant="link"
                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={onClickReveal}
                  /> */}
                </InputRightElement>
                <Input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: 'Please enter your password',
                  })}
                />
              </InputGroup>
          </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            {/* <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button> */}
          </HStack>
          <Stack spacing="6">
            <Button variant="primary" type="submit" border="2px" borderColor="#32006B" _hover={{ bg: '#ebedf0' }}>Create An Account</Button>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <ButtonGroup variant="outline" spacing="4" width="full">
              {providers.map(({ name, icon }) => (
                <Button key={name} width="full" onClick={() => { googleRegister() }}>
                  <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                  {icon}
                </Button>
              ))}
            </ButtonGroup>
          </Stack>
        </Stack>
        </chakra.form>
      </Box>
    </Stack>
  </Container>
    </>
  );
};

export default Register;
