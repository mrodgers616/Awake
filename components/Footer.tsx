import React from "react";
import { chakra, Container, Box, Text, Image, Flex, ChakraProvider, Stack } from "@chakra-ui/react";

import Link from "./Link";

const socialMedia: Array<Record<string, any>> = [
  {
    name: "Telegram",
    icon: "telegram",
    url: "https://t.me/awakeinvest",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/awakeinvest",
  },
  {
    name: "Medium",
    icon: "medium",
    url: "https://medium.com/@awakeinvest",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/awakeinvest/",
  },
  {
    name: "YouTube",
    icon: "youtube",
    url: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw",
  },
];

export default function Footer(): JSX.Element {
  return (

    <chakra.footer
      bg='#f5f5f5'
    >
      <Flex mr="10%" mt="10px">
        <Container

          h="120px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Image
              src='/illustrations/Awake Logo light.png'
              w='160px'
              alt='Awake Logo light'
            />
          </Box>
        </Container>
        <Stack spacing={2}>
          <Link href="https://twitter.com/Climate_DAO?s=20&t=KSWCSCV6J_BrI_9SGo-S9w" isExternal>
            Twitter
          </Link>
          <Link href="https://discord.gg/WwhjrS3HCm" isExternal>Discord</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
          <Text>info@Awakeinvest.com</Text>
        </Stack>
      </Flex>
    </chakra.footer>
  );
}
