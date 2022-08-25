import type { NextPage, GetServerSidePropsContext } from "next";
import { useState } from "react";
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
import { useAuth } from '../../../contexts/AuthContext';
import nookies from 'nookies';
import Link from "../../../components/Link";
import ProfileInfo from '../../../components/profile/ProfileInfo';
import { admin } from '../../../lib/firebaseAdmin';
import { getProfileData, getImageFromStorage } from "../../../lib/firebaseClient";
import Debug from 'debug';

const debug = Debug('pages:user:profile');

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
  badges: any;
  activity: any;
  proposals: any;
  investments: any;
};

const Profile: NextPage<ProfilePageProps> = ({ profile, profileImage, backgroundImage, investments, badges, activity, proposals }) => {

  const { userid, user } = useAuth();

  const [ memberSince, setMemberSince ] = useState(user?.metadata.creationTime);

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

  const placeholderStyles = {
    textAlign: 'center',
    w: '100%',
    py: '64px',
    m: '16px 4px',
    border: '1px solid #efefef',
    borderRadius: '8px',
    fontSize: '2xl',
  }

  const placeholderStylesInvestments = {
    textAlign: 'center',
    w: 'fit',
    m: '8px 20% 8px 20%',
    fontSize: 'md',
  }

  const ProfileImage = () => profileImage ? (<Image 
    src={profileImage} 
    { ...ProfileImageStyles }
    objectFit="cover"
    objectPosition={'center'}
  />) : (<Box {...ProfileImageStyles}/>)

  const Investments = () => (!investments ? 
    (<Text sx={placeholderStyles}>You haven&apos;t <Link href="/linkAccount" color="blue">linked an account </Link>yet!</Text>) :
    (<
      Text sx={placeholderStyles}> 
         Here are your holdings:<br/>
        {investments.map((investment: any) => (
          <Text sx={placeholderStylesInvestments} 
          key={investment} 
          paddingLeft="3%" 
          paddingTop="2%"
          paddingBottom="2%"
          border='3px solid black' 
          borderRadius='8px'> 
            <b>{investment} </b> <br/>
          </Text>
        ))}
      </Text>
    ));
  
  const Badges = () => (!badges ? 
    (<Text sx={placeholderStyles}>You haven&apos;t earned any badges</Text>) :
    (<Box></Box>));

  const Proposals = () => (!proposals ? 
    (<Text sx={placeholderStyles}>You haven&apos;t created any proposals</Text>) :
    (<Box></Box>));

  const Activity = () => (!activity ? 
    (<Text sx={placeholderStyles}>You haven&apos;t been active yet. Check out <Link href='/campaigns' color='seafoam.500'>campaigns</Link> to get involved!</Text>) : 
    (<Box></Box>));

  return (
    <>
      <Head>
        <title>Awake | Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box bgGradient="linear-gradient(41deg,rgb(100, 43, 115) 0%,rgb(164,191,217) 100%)" height="98px" width="100%"></Box>
      <Box
        width='100%'
        height='400px'
        mt='-3px'
        bg='grey'
        backgroundImage={`${backgroundImage}`}
        backgroundPosition={`center`}
        backgroundSize='cover'
      >
        <Image src={backgroundImage} w="100%" h="100%"/>
      </Box>
      <Container mt='-120px'>
        <Box
          width='100%'
          minHeight='300px'
          bg='#fff'
          borderRadius='10px'
          padding='20px'
          mb='32px'
          position={'relative'}
        >
          <Button
            as={Link}
            href={`/user/${userid}/edit`}
            bg='seafoam.500'
            position={'absolute'}
            bottom={'32px'}
            right={'32px'}
          >Edit</Button>
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
            <Heading>Investments</Heading>
            <Flex w='100%'>
              <Investments />
            </Flex>
          </Box>
          <Box>
            <Heading>Badges</Heading>
            <Flex w='100%'>
              <Badges />
            </Flex>
          </Box>
          <Box>
            <Heading>Proposals</Heading>
            <Flex w='100%'>
              <Proposals />
            </Flex>
          </Box>
          <Box>
            <Heading>Activity</Heading>
            <Flex w='100%'>
              <Activity />
            </Flex>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    context.res.setHeader(
      "Cache-Control",
      'public, s-maxage=15, stale-while-revalidate=59'
    );

    const cookies = nookies.get(context);
    const session = cookies.__session;
    const token = await admin.auth().verifyIdToken(session);

    const uid = token.uid;

    const profile = await getProfileData(uid);

    const data = {
      ...profile.data()
    };

    let pfp = null;
    let bg = null;
    let investmentsFromDatabase = null;

    if (data.profileImage) {
      pfp = await getImageFromStorage(data.profileImage);
      //pfp = data.profileImage;
    }

    if (data.backgroundImage) {
      bg = await getImageFromStorage(data.backgroundImage);
      //bg = data.backgroundImage;
    }

    if (data.investments) {
       let unformattedInvestments = data.investments;
       let investmentsAsArray = new Array();
       for(let i = 0; i < unformattedInvestments.length; i++) {
          investmentsAsArray.push(unformattedInvestments[i].name);
       }

       investmentsFromDatabase = investmentsAsArray;

    }

    return {
      props: {
        profile: { ...profile.data() },
        profileImage: pfp,
        backgroundImage: bg,
        activity: null,
        badges: null,
        proposals: null,
        investments: investmentsFromDatabase
      }
    }
  } catch (error) {
    //console.log(error);
    debug((error as any).message);
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return { props: {} as never }
  }
}

export default Profile;
