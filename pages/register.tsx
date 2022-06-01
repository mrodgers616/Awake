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
} from "@chakra-ui/react";
import Link from "../components/Link";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";


const Register: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { register: userRegister } = useAuth();

  const onSubmit = (data: any) => userRegister(data);

  return (
    <>
      <Head>
        <title>Climate DAO | Register</title>
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
            <Heading mb='32px'>Register</Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb='16px' isInvalid={errors.username}>
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
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb='16px' isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Please enter your email",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb='16px' isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb='32px' isInvalid={errors.password2}>
                <FormLabel htmlFor="password">Verify Password:</FormLabel>
                <Input
                  id="password2"
                  type="password"
                  {...register("password2", {
                    required: "Please enter your password",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <HStack>
                <Button
                  type="submit"
                  bg="seafoam.500"
                  mr='16px'
                >
                  Register
                </Button>
                <Link href="/login">Already Registered?</Link>
              </HStack>
            </chakra.form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
