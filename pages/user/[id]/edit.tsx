import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";
import {
  Container,
  TabPanels,
  TabPanel,
  TabList,
  Image,
  Text,
  Tabs,
  Tab,
  Box,
} from "@chakra-ui/react";
import ProfileEditForm from "../../../components/profile/ProfileEditForm";

const ProfileEdit: NextPage<{ pfp: string }> = ({ pfp }) => {
  const [profileImage, setProfileImage] = React.useState(pfp);
  const [bgImage, setBgImage] = React.useState(profileImage);

  const ProfileImageStyles = {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    border: "8px solid",
    borderColor: "white",
    bg: "grey",
    top: "calc(-250px / 3)",
    left: "64px",
  };

  const ProfileImage = () =>
    profileImage ? (
      <Image {...ProfileImageStyles} position="absolute" />
    ) : (
      <Box {...ProfileImageStyles} position="absolute" />
    );

  return (
    <>
      <Head>
        <title>Climate DAO | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box width="100%" height="400px" mt="120px" bg="green" />
      <Container mt="-120px">
        <Box bg="#fff" padding="20px" borderRadius="10px" mb="32px">
            <Tabs>
              <TabList mb='8em'>
                <Tab>Profile</Tab>
                <Tab>Notifications</Tab>
                <Tab>Wallet</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ProfileEditForm />
                </TabPanel>
                <TabPanel>
                  <Text>Notifications</Text>
                </TabPanel>
                <TabPanel>
                  <Text>Wallet</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default ProfileEdit;
