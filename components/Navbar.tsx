import React from "react";
import {
  IconButton,
  Container,
  chakra,
  Button,
  Image,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import Link from "./Link";
import WalletConnectBtn from "./WalletConnectBtn";
// import WalletModal from "./WalletModal";
import { useWeb3 } from "../contexts/Web3Context";
import { useAuth } from "../contexts/AuthContext";

import { useRouter } from "next/router";

export default function Navbar(): JSX.Element {
  const router = useRouter();

  const { web3Errors } = useWeb3();
  const { logout, loggedIn, userid } = useAuth();

  const LinkProps = {
    mx: '32px',
    fontWeight: 600,
    color: "black",
    textDecor: "none",
    _active: {
      color: "blue.500",
    },
    _hover: {
      color: "blue.500",
      textDecor: "none",
    },
    _last: {
      mr: '64px'
    }
  };

  const Auth = () => (loggedIn ? (
    <chakra.div>
      {web3Errors && (<IconButton
        aria-label="Check Notifications"
        icon={<Icon as={FiBell} w={5} h={5} />}
        p={0}
        mr="8px"
        size="lg"
        bg="none"
      />) }
      {/* <WalletConnectBtn /> */}
      <Link
        href={`/user/${userid}/profile`}
        {...LinkProps}
        className={router.pathname === '/profile' ? 'active' : ''}
      >Profile</Link>
      <Button onClick={logout}>Logout</Button>
    </chakra.div>
  ) : (
    <chakra.div>
      <Button mr='16px' onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/register")}>Register</Button>
    </chakra.div>
  ))

  return (
    <chakra.nav
      position="fixed"
      width="100%"
      backdropFilter="blur(10px)"
      bg="white"
      zIndex={1000}
    >
      <Container  p="0 25px">
        <Flex justifyContent="space-between" alignItems={"center"} h="120px">
          <chakra.div>
            <Image
              src="/illustrations/Climate DAO dark.png"
              width={250}
              alt="Climate DAO Logo"
            />
            {/* <Heading color={daoPage ? "white" : "black"}>ClimateDAO</Heading> */}
          </chakra.div>
          <chakra.div
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Link
              href="/"
              {...LinkProps}
              className={router.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              href="/about"
              {...LinkProps}
              className={router.pathname === "/dao" ? "active" : ""}
            >
              About
            </Link>
            { loggedIn && (<><Link
              href="/campaigns"
              {...LinkProps}
              className={router.pathname === "/dao" ? "active" : ""}
            >
              Campaigns
            </Link>
            <Link
              href="/blog"
              {...LinkProps}
              className={router.pathname === "/dao" ? "active" : ""}
            >
              Blog
            </Link></>)}
            <Auth />
          </chakra.div>
        </Flex>
      </Container>
    </chakra.nav>
  );
}
