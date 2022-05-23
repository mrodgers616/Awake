import {
  Flex,
  Badge,
  IconButton
} from '@chakra-ui/react';
import Link from '../Link';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaTwitter, FaLink, FaLinkedinIn } from 'react-icons/fa';

export default function ProfileBadges({ email, twitter, facebook, linkedin }: any): JSX.Element {

  const ButtonStyle= {
    bg: 'black',
    color: 'white',
    mx: '8px',
    borderRadius: '100%',
    _first: {
      ml: '16px'
    }
  }

  return (
    <Flex>
      { email && <IconButton sx={ButtonStyle} aria-label="email link" as={Link} href={`mailto:${email}`} icon={<MdEmail />}>Email</IconButton> }
      { twitter && <IconButton sx={ButtonStyle} aria-label="twitter link" as={Link} href={twitter} icon={<FaTwitter />}>Twitter</IconButton> }
      { facebook && <IconButton sx={ButtonStyle} aria-label="facebook link" as={Link} href={facebook} icon={<FaFacebook />}>Facebook</IconButton> }
      { linkedin && <IconButton sx={ButtonStyle} aria-label="linkedIn link" as={Link} href={linkedin} icon={<FaLinkedinIn />}>Linkedin</IconButton> }
    </Flex>
  );
}