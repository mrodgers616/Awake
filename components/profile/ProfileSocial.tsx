import {
  Flex,
  Badge,
  IconButton
} from '@chakra-ui/react';
import Link from '../Link';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function ProfileBadges({ email, twitter, facebook, linkedin }: any): JSX.Element {

  const ButtonStyle= {
    bg: 'black',
    color: 'white',
    mx: '16px',
    borderRadius: '100%'
  }

  return (
    <Flex>
      { email && <IconButton sx={ButtonStyle} aria-label="email link" as={Link} href={`mailto:${email}`} icon={<MdEmail />}>Email</IconButton> }
      { twitter && <IconButton aria-label="twitter link" as={Link} href={twitter} icon={<MdEmail />}>Twitter</IconButton> }
      { facebook && <IconButton aria-label="facebook link" as={Link} href={facebook} icon={<MdEmail />}>Facebook</IconButton> }
      { linkedin && <IconButton aria-label="linkedIn link" as={Link} href={linkedin} icon={<MdEmail />}>Linkedin</IconButton> }
    </Flex>
  );
}