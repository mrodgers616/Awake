import type { NextPageWithLayout } from '../lib/types/next';

import Head from "next/head";
import {
  Container,
  Heading,
  Box,
  Flex,
  Image,
  Icon,
  Text,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Button,
  useToast
} from "@chakra-ui/react";
import Link from '../components/Link';
import Layout from '../components/layout';
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { Protected } from '../contexts/Protected';

const Login: NextPageWithLayout = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const {
    login,
  } = useAuth();

  const onSubmit = (data: any) => {
    login(data);
  };


  return (
    <>
      <Head>
        <title>Climate DAO | Proposals</title>
      </Head>
      <Box>
        <Container 
          width="100%"
          h="600px"
          overflow="auto"
          marginX="auto"
          mt='120px'
        >
        <Box>
            <Heading>
              Log in to your account:
            </Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="email">
                Email:
              </FormLabel>
              <FormControl isInvalid={errors.email}>
                <Input
                  id='email'
                  type='email'
                  {...register('email', {
                    required: 'Please enter your email',
                  })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message }
                  </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
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
                    {errors.password && errors.password.message }
                  </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                bg='seafoam.500'
              >Login</Button>
            </chakra.form>
            <Link href='/register'>Registered A New Account</Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
