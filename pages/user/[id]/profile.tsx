import type { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
  Container,
  Heading,
  Button,
  Image,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import ProfileInfo from '../../../components/profile/ProfileInfo';
import Link from "../../../components/Link";
import nookies from 'nookies';
import { admin } from '../../../lib/firebaseAdmin';
import { getProfileData, getImageFromStorage } from "../../../lib/firebaseClient";
import { useAuth } from '../../../contexts/AuthContext';

type ProfileProps = {
  linkedIn: string;
  facebook: string;
  twitter: string;
  email: string;
  profileImage: string;
  backgroundImage: string;
  username: string;
  biography: string;
  name: string;
}

type ProfilePageProps = {
  profile: ProfileProps;
  profileImage: string;
  backgroundImage: string;
};

const Profile: NextPage<ProfilePageProps> = ({ profile, profileImage, backgroundImage }) => {

  const { userid } = useAuth();

  const ProfileImageStyles = {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    border: '8px solid',
    borderColor: 'white',
    bg: 'grey',
    mt: 'calc(-250px / 2.5)',
    ml: '32px',
  }

  const ProfileImage = () => profileImage ? (<Image 
    src={profileImage} 
    { ...ProfileImageStyles }
    objectFit="cover"
    objectPosition={'center'}
  />) : (<Box {...ProfileImageStyles}/>)

  console.log('bg image: ', backgroundImage);

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
        backgroundImage={`${backgroundImage}`}
        backgroundSize='cover'
        backgroundPosition={`center`}
      />
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
          <Button as={Link} href={`/user/${userid}/edit`}>Edit</Button>
          <ProfileImage />
          <ProfileInfo profile={profile}/>
          <Text position='absolute' top='32px' right='32px'>Member since Feb 2022</Text>
        </Box>
        <Box
          bg='#fff'
          padding='20px'
          borderRadius='10px'
          mb='32px'
        >
          <Box>
            <Heading>Badges</Heading>
            <Flex>
              <Box w='150px' h='150px' bg='gray' borderRadius={100} m='16px'/>
              <Box w='150px' h='150px' bg='gray' borderRadius={100} m='16px'/>
            </Flex>
          </Box>
          <Box>
            <Heading>Proposals</Heading>
          </Box>
          <Box>
            <Heading>Activity</Heading>
          </Box>
          {/* <ProfileBadges />
          <ProfileProposals />
          <ProfileActivity /> */}
        </Box>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  context.res.setHeader(
    "Cache-Control",
    'public, s-maxage=15, stale-while-revalidate=59'
  );

  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;

    const profile = await getProfileData(uid);

    const data = {
      ...profile.data()
    };

    let pfp = null;
    let bg = null;

    if (data.profileImage) {
      pfp = await getImageFromStorage(data.profileImage);
    }

    if (data.backgroundImage) {
      bg = await getImageFromStorage(data.backgroundImage);
    }

    return {
      props: {
        profile: { ...profile.data() },
        profileImage: pfp,
        backgroundImage: bg,
        activity: null,
        badges: null,
        proposals: null
      }
    }
  } catch (error) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    
    return { props: {} as never }
  }
}

export default Profile;
