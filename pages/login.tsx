import type { NextPageWithLayout } from '../lib/types/next';

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
} from "@chakra-ui/react";
import Link from '../components/Link';
import Layout from '../components/layout';
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { Protected } from '../contexts/Protected';
import GoogleButton from 'react-google-button'


const Login: NextPageWithLayout = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {
    login,
  } = useAuth();
  const { googleSignIn: googleRegister } = useAuth();

  const onSubmit = (data: any) => {
    login(data);
  };


  return (
    <>
      <Head>
        <title>Awake | Proposals</title>
      </Head>
      <Box>
        <Container
          width="100%"
          overflow="auto"
          marginX="auto"
          mt="184px"
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
            <Heading mb='32px' textTransform='capitalize'>
              Log in to your account
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
                  >Login</Button>

                </Flex>
                <Link href='/register'>Create A New Account</Link>
              </HStack>
              <Container mt="3%" ml="-1.75%">
                <GoogleButton onClick={() => { googleRegister() }}></GoogleButton>
              </Container>
            </chakra.form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
