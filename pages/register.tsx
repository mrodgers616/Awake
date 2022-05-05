import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Container,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Box,
  chakra,
  Button,
  useToast,
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
          h="600px"
          overflow="auto"
          marginX="auto"
          mt="120px"
        >
          <Box>
            <Heading>Register:</Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <FormControl isInvalid={errors.email}>
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
              <FormControl isInvalid={errors.password}>
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
              <Button type="submit" bg="seafoam.500">
                Register
              </Button>
            </chakra.form>
            <Link href="/login">Already Registered?</Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
