import React from "react";
import {
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
  DrawerBody,
  IconButton,
  Container,
  Drawer,
  chakra,
  Button,
  Image,
  List,
  ListItem,
  ListIcon,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import Link from "./Link";
import WalletConnectBtn from "./WalletConnectBtn";
import WalletModal from "./WalletModal";
import { useWeb3 } from "../contexts/Web3Context";
import { useAuth } from "../contexts/AuthContext";
import { HamburgerIcon } from '@chakra-ui/icons';

import { useRouter } from "next/router";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  //const { web3Errors } = useWeb3();
  const { logout, loggedIn, userid } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const LinkProps = {
    mx: '16px',
    fontWeight: 600,
    color: "black",
    textDecor: "none",
    _active: {
      color: "blue.500",
    },
    _hover: {
      color: "blue.500",
      textDecor: "none",
    }
  };

  const NAV_LINKS = [
    {
      name: 'Campaigns',
      href: '/campaigns',
    }, {
      name: 'Link Account',
      href: '/linkAccount',
    }
  ];


  const activeLink = (path: string) => (router.pathname === path ? 'active' : '');

  const Auth = () => (userid ? (
    <Flex
      flexDir={{
        base: 'column',
        lg: 'row'
      }}
      alignItems={{
        base: 'stretch',
        lg: 'center'
      }}
    >
      {/* {web3Errors && (<IconButton
        aria-label="Check Notifications"
        icon={<Icon as={FiBell} w={5} h={5} />}
        p={0}
        mr="8px"
        size="lg"
        bg="none"
      />) } */}
      <Link
        href={`/user/${userid}/profile`}
        sx={{
          ...LinkProps,
          mx: {
            base: '0',
            lg: '16px'
          }
        }}
        className={activeLink('/profile')}
      >Profile</Link>
      {/* <WalletConnectBtn/> */}
      <Button
        display={{
          base: 'flex',
          lg: 'inline-flex'
        }}
        onClick={() => { logout(); router.push("/login"); onClose();}}>
          Logout
      </Button>
    </Flex>
  ) : (
    <Flex
      flexDirection={{
        base: 'column',
        lg: 'row'
      }}
    >
      <Link
      href="/campaigns"
      {...LinkProps}
      className={activeLink('/campaigns')}
      mt="2%"
    >
      Campaigns
    </Link>
    <Link
      href="/blog"
      {...LinkProps}
      className={activeLink('/blog')}
      mt="2%"
    >
      Blog
    </Link>
      <Button
        mx={{
          base: '0',
          lg: '16px'
        }}
        mb={{
          base: '16px',
          lg: '0'
        }} 
        onClick={() => { router.push("/login"); onClose(); }}>
          Login
      </Button>
      <Button
        onClick={() => { router.push("/register"); onClose(); }}>
          Register
      </Button>
    </Flex>
  ));

  return (
    <chakra.nav
      position="fixed"
      width="100%"
      backdropFilter="blur(10px)"
      bg="white"
      zIndex={1000}
    >
      <Container  p="0 25px">
        <Flex
          justifyContent="space-between" 
          alignItems={"center"} 
          h="120px"
          display={{
            base: 'none',
            lg: 'flex'
          }}
        >
          <chakra.div>
          <Button
              onClick={() => { router.push("/"); onClose(); }}
              bg="white"
              
              >
            <Image
              src="/illustrations/Climate DAO dark.png"
              width={200}
              alt="Climate DAO Logo"
            >
            </Image>
          </Button>
          </chakra.div>
          <chakra.div
            display="flex"
            flexGrow={2}
            ml='32px'
            alignItems="center"
            justifyContent="flex-end"
          >
            <Link
              href="/"
              {...LinkProps}
              className={activeLink('/')}
            >
              Home
            </Link>
            <Link
              href="/about"
              {...LinkProps}
              className={activeLink('/about')}
            >
              About
            </Link>
            { userid && (<><Link
              href="/campaigns"
              {...LinkProps}
              className={activeLink('/campaigns')}
            >
              Campaigns
            </Link>
            <Link
              href="/blog"
              {...LinkProps}
              className={activeLink('/blog')}
            >
              Blog
            </Link>
            <Link
              href="/linkAccount"
              {...LinkProps}
              className={activeLink('/linkAccount')}
            >
              Link Account
            </Link></>)}
            <Auth />
          </chakra.div>
        </Flex>
        <Flex
          justifyContent="space-between" 
          alignItems={"center"} 
          h="120px"
          display={{
            base: 'flex',
            lg: 'none'
          }}
        >
          <chakra.div>
            <Image
              src="/illustrations/Climate DAO dark.png"
              width={250}
              alt="Climate DAO Logo"
            />
          </chakra.div>
          <chakra.div>
            <IconButton
              aria-label="site navigation menu"
              variant="unstyled"
              icon={<HamburgerIcon />}
              fontSize="32px"
              top='-8px'
              onClick={onOpen}
              _focus={{
                outline: 'none',
              }}
            />
          </chakra.div>
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent paddingTop="4" background="white">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              px='16px'
            >
              <Image
                src="/illustrations/Climate DAO dark.png"
                width={200}
                alt="Climate DAO Logo"
              />
              <DrawerCloseButton position='relative' size="lg" top={0} right={0}/>
            </Flex>
            <DrawerBody paddingTop="4">
              <List>
                <ListItem my='16px'>
                  <Link
                    href="/"
                    sx={{
                      ...LinkProps,
                      mx: 0
                  }}
                    className={activeLink('/')}
                  >
                    Home
                  </Link>
                </ListItem>
                <ListItem my='16px'>
                  <Link
                    href="/about"
                    sx={{
                      ...LinkProps,
                      mx: 0
                    }}
                    className={activeLink('/about')}
                  >
                    About
                  </Link>
                </ListItem>
                { userid && NAV_LINKS.map((link, index) => (
                  <ListItem key={index} my='16px'>
                    <Link
                      href={link.href}
                      sx={{
                        ...LinkProps,
                        mx: 0
                      }}
                      className={activeLink(link.href)}
                    >{ link.name }</Link>
                  </ListItem>
                ))}
                <ListItem>
                  <Auth />
                </ListItem>
              </List>
            </DrawerBody>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </chakra.nav>
  );
}
