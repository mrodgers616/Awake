import type { NextPage } from "next";
import { useRouter } from "next/router";
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
import { useForm } from "react-hook-form";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const Login: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();
  const toast = useToast();

  const onSubmit = (data: any) => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, data.email, data.password)
      .then((response: UserCredential) => {
        if (window.sessionStorage) {
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          window.sessionStorage.setItem("Auth Token", response.user.refreshToken);
          router.push('/');
        }
      }).catch((error: FirebaseError) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        reset();
      });
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
