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

const Profile: NextPage<{ profileImage: string; id:string; }> = ({ profileImage, id }) => {

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

  const ProfileImage = () => profileImage ? (<Image { ...ProfileImageStyles } />) : (<Box {...ProfileImageStyles}/>)

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
          <Button as={Link} href={`/user/${id}/edit`}>Edit</Button>
          <ProfileImage />
          <ProfileInfo profile={{
            name: 'John Doe',
            username: 'johndoe',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod, nunc eget pretium aliquet, nisi nunc ultricies nisi, euismod euismod nunc nunc euismod nunc.',
            social: {
              email: 'email@example.com',
              twitter: '@climateer',
              facebook: 'climateer',
              linkedin: 'climateer',
            }
          }}/>
          <Text position='absolute' top='32px' right='32px'>Member since Feb 2022 { id }</Text>
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

export async function getServerSideProps({ req, res, params }: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    'public, s-maxage=15, stale-while-revalidate=59'
  )

  return {
    props: {
      id: params?.id ?? '',
    },
  }
}

export default Profile;
