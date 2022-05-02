import React from "react";
import { chakra, Container, Box, Text, Image } from "@chakra-ui/react";

import Link from "./Link";

const socialMedia: Array<Record<string, any>> = [
  {
    name: "Telegram",
    icon: "telegram",
    url: "https://t.me/climateDAO",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/climateDAO",
  },
  {
    name: "Medium",
    icon: "medium",
    url: "https://medium.com/@climateDAO",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/climateDAO/",
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
      <Container
        
        h="120px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Image
            src='/illustrations/Climate DAO dark.png'
            w='160px'
            alt='ClimateDAO Logo'
          />
        </Box>
      </Container>
    </chakra.footer>
  );
}
