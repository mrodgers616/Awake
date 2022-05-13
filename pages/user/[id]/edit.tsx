import type { NextPage } from "next";
import Head from "next/head";
import {
  Container,
  Box,
  Image,
} from "@chakra-ui/react";
import ProfileEditForm from "../../../components/profile/ProfileEditForm";

const ProfileEdit: NextPage<{ profileImage: string }> = ({ profileImage }) => {

  const ProfileImageStyles = {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    border: '8px solid',
    borderColor: 'white',
    bg: 'grey',
    top: 'calc(-250px / 3)',
    left: '64px'
  }

  const ProfileImage = () => profileImage ? (<Image { ...ProfileImageStyles } position='absolute'/>) : (<Box {...ProfileImageStyles} position='absolute' />)

  return (
    <>
      <Head>
        <title>Climate DAO | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box width='100%' height='400px' mt='120px' bg='green'/>
      <Container mt='-120px'>
        <Box
          width='100%'
          height='300px'
          bg='#fff'
          borderRadius='10px'
          padding='20px'
          mb='32px'
          position={'relative'}
        >
        </Box>
        <Box
          bg='#fff'
          padding='20px'
          borderRadius='10px'
          mb='32px'
        >
          <Container>
            <ProfileEditForm />
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default ProfileEdit;
