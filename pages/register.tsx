import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  FormErrorMessage,
  InputLeftAddon,
  FormControl,
  InputGroup,
  FormLabel,
  Container,
  useToast,
  Heading,
  Button,
  chakra,
  HStack,
  Input,
  Box,
  Flex,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import GoogleButton from 'react-google-button'


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

  return (
    <>
      <Head>
        <title>Awake | Register</title>
      </Head>
      <Box
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
            w='80%'
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
                  {/* eslint-disable-next-line react/no-children-prop*/}
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
                    bg="seafoam.500"
                    mr='16px'
                  >
                    Register
                  </Button>
                </Flex>
                <Link href="/login">Already Registered?</Link>
              </HStack>
              <Flex>
                <Container mt="3%" ml="-1.75%">
                  <GoogleButton onClick={() => { googleRegister() }}></GoogleButton>
                </Container>
                <Container mt="3%" ml="-1.75%">
                  <Button onClick={() => { facebook() }}>Log in with facebook</Button>
                </Container>
              </Flex>
            </chakra.form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
