import React from 'react';
import Link from 'next/link';
import Box from '../../common/components/Box';
import Text from '../../common/components/Text';
import Image from '../../common/components/Image';
import Logo from '../../common/components/UIElements/Logo';
import Heading from '../../common/components/Heading';
import Container from '../../common/components/UI/Container';
import FooterArea, {
  WidgetArea,
  MenuArea,
  Menu,
  MenuItem,
  CopyrightText,
} from './footer.style';
import LogoImage from '../../../public/illustrations/Awake Logo light.png';


import { footer } from '../../common/data/AppModern';

const Footer = () => {
  const { logo, menu, widgets } = footer;
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterArea>
      <Container>
        {/* <WidgetArea>
          {widgets.map((item) => (
            <Box className="col" key={`footer-widget--key${item.id}`}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Image src={item.icon?.src} alt={item.title} />
              </a>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Heading as="h3" content={item.title} />
              </a>
              <Text content={item.description} />
            </Box>
          ))}
        </WidgetArea> */}
        {/* End of footer widgets area */}
        <MenuArea>
          <Logo
            className="logo"
            logoSrc={LogoImage}
            title="App Classic"
          />
          <Menu>
            {menu.map((item) => (
              <MenuItem key={`footer-link${item.id}`}>
                <Link href={item.link}>
                  <a>{item.text}</a>
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <CopyrightText>Copyright {year} By Awake Inc</CopyrightText>
        </MenuArea>
        {/* End of footer menu area */}
      </Container>
    </FooterArea>
  );
};

export default Footer;
