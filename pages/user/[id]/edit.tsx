import type { NextPage, GetServerSidePropsContext } from "next";
import React, { useState } from 'react';
import Head from "next/head";
import {
  Container,
  TabPanels,
  TabPanel,
  TabList,
  Text,
  Tabs,
  Tab,
  Box,
} from "@chakra-ui/react";
import nookies from 'nookies';
import ProfileEditForm from "../../../components/profile/ProfileEditForm";
import { admin } from '../../../lib/firebaseAdmin';
import { getImageFromStorage, getProfileData } from "../../../lib/firebaseClient";
import { useAuth } from "../../../contexts/AuthContext";

const ProfileEdit: NextPage<any> = ({ profile: profileData, profileImage, backgroundImage }) => {
  const [profile, _setProfile] = useState(profileData);

  const { userid } = useAuth();

  return (
    <>
      <Head>
        <title>Climate DAO | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box 
        width='100%'
        height='400px'
        mt='120px'
        bg='grey'
        backgroundImage={`${backgroundImage}`}
        backgroundSize='cover'
        backgroundPosition={`center`}
      />
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
                  <ProfileEditForm
                    id={userid}
                    profile={profile}
                    profileImage={profileImage}
                    backgroundImage={backgroundImage}
                  />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  context.res.setHeader(
    "Cache-Control",
    'public, s-maxage=15, stale-while-revalidate=59'
  );

  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const profile = await getProfileData(uid);

    const data = {
      ...profile.data()
    }
    let profileImage = null;
    let backgroundImage = null;

    if (data.profileImage) {
      profileImage = await getImageFromStorage(data.profileImage);
    }

    if (data.backgroundImage) {
      backgroundImage = await getImageFromStorage(data.backgroundImage);
    }
    
    return {
      props: {
        profile : data,
        profileImage,
        backgroundImage
      }
    }
  } catch (error) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    
    return { props: {} as never }
  }
}
