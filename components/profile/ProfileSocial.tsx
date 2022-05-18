import {
  Flex,
  Badge
} from '@chakra-ui/react';

export default function ProfileBadges({ email, twitter, facebook, linkedin }: any): JSX.Element {
  return (
    <Flex>
      { email && <Badge>Email</Badge> }
      { twitter && <Badge>Twitter</Badge> }
      { facebook && <Badge>Facebook</Badge> }
      { linkedin && <Badge>Linkedin</Badge> }
    </Flex>
  );
}