import React from "react";
import {
  Heading,
  Badge,
  Flex,
  Text
} from "@chakra-ui/react";
import ProfileSocial from './ProfileSocial';

export default function ProfileInfo({ profile }: any): JSX.Element {
  return (
    <>
      <Heading mb='16px'>{ profile.name } { profile.username && `(@${profile.username})`}</Heading>
      <Text w='75%'>{ profile.bio }</Text>
      <Flex>
        <Badge>Climateer</Badge>
        <ProfileSocial { ...profile.social } />
      </Flex>
    </>
  );
}