import React, { useState, useRef } from 'react';
import ScrollSpyMenu from '../../common/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';
import { search } from 'react-icons-kit/feather/search';
import Logo from '../../common/components/UIElements/Logo';
import Button from '../../common/components/Button';
import Container from '../../common/components/UI/Container';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';
import NavbarWrapper, { MenuArea, MobileMenu, Search } from './navbar.style';
// COMMENTED OUT THE OLD LOGO
// import LogoImage from '../../../public/illustrations/ClimateDAO Logo.png';
import LogoImage from '../../../public/illustrations/Awake Logo.png';
import LogoImageLight from '../../../public/illustrations/Awake Logo light.png';
// COMMENTED OUT THE OLD LOGO
// import LogoImageAlt from '../../../public/illustrations/Climate DAO dark.png';
import LogoImageAlt from '../../../public/illustrations/Awake Logo dark (new).png';
import { getAllDocs } from "../../../lib/firebaseClient";
import { navbar } from '../../common/data/AppModern';
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";


const Navbar = () => {
  const { navMenu } = navbar;
  const [state, setState] = useState({
    search: '',
    searchToggle: false,
    mobileMenu: false,
  });

  const { logout, loggedIn, userid } = useAuth();
  const router = useRouter();

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () =>
    setState({ ...state, searchToggle: false })
  );

  const toggleHandler = (type) => {
    if (type === 'search') {
      setState({
        ...state,
        search: '',
        searchToggle: !state.searchToggle,
        mobileMenu: false,
      });
    }

    if (type === 'menu') {
      setState({
        ...state,
        mobileMenu: !state.mobileMenu,
      });
    }
  };

  const handleOnChange = (event) => {
    setState({
      ...state,
      search: event.target.value,
    });
  };

  const handleSearchForm = (event) => {
    event.preventDefault();

    if (state.search !== '') {
      console.log('search data: ', state.search);

      setState({
        ...state,
        search: '',
      });
    } else {
      console.log('Please fill this field.');
    }
  };

  const scrollItems = [];

  navMenu.forEach((item) => {
    if (item.needAuth) {
      if (userid) {
        scrollItems.push(item.path);
      }
    }
    else {
      scrollItems.push(item.path);
    }

  });

  const handleRemoveMenu = () => {
    setState({
      ...state,
      mobileMenu: false,
    });
  };

  return (
    <NavbarWrapper className="navbar"
    box-shadow="0px 21px 29px -5px"
    >
      <Container>
        <Logo
          href="/"
          logoSrc={LogoImageAlt}
          title="ClimateDAO"
          className="main-logo"
        />
        <Logo
          href="/"
          logoSrc={LogoImageAlt}
          title="ClimateDAO"
          className="logo-alt"
        />
        {/* end of logo */}

        <MenuArea className={state.searchToggle ? 'active' : ''} >
          <ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84}  />
          {/* end of main menu */}

          {/* <Search className="search" ref={searchRef}>
            <form onSubmit={handleSearchForm}>
              <input
                type="text"
                value={state.search}
                placeholder="Enter your keyword"
                onChange={handleOnChange}
              />
            </form>
            <Button
              className="text"
              variant="textButton"
              icon={<Icon icon={state.searchToggle ? x : search} />}
              onClick={() => toggleHandler('search')}
            />
          </Search>
          end of search */}

          {userid ? (
            <div href="#trail" offset={84}>
              <Button className="trail" title="Profile" onClick={() => { router.push(`/user/${userid}/profile`); }} /> <span> </span>
            </div>
          ) : (<>
              <div href="#trail" offset={84}>
                <Button className="mobileView" backgroundColor="white" color="black" title="Log In" onClick={() => { router.push("/login"); }} /> <span></span>
                <Button title="Sign Up" onClick={() => { router.push("/register"); }} />
              </div>
              </>
          )}


          <Button
            className="menubar"
            color="#32006b"
            icon={
              state.mobileMenu ? (
                <Icon className="bar" icon={x} />
              ) : (
                <Icon className="close" icon={menu} />
              )
            }
            variant="textButton"
            onClick={() => toggleHandler('menu')}
          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${state.mobileMenu ? 'active' : ''}`}>
        <Container>
          <Scrollspy
            className="menu"
            items={scrollItems}
            offset={-84}
            currentClassName="active"
          >
            {navMenu.map((menu, index) => (
              menu.needAuth ? (
                userid ? (
                  <li key={`menu_key${index}`}>
                    <a
                      href={menu.path}
                      offset={menu.offset}
                      onClick={() => {handleRemoveMenu; pageChange}}
                    >
                      {menu.label}
                    </a>
                  </li>
                ) : (
                  null
                )
              ) : (
                <li key={`menu_key${index}`}>
                  <a
                    href={menu.path}
                    offset={menu.offset}
                    onClick={handleRemoveMenu}
                  >
                    {menu.label}
                  </a>
                </li>
              )

            ))}
          </Scrollspy>
          {userid ? (
            <div href="#trail" offset={84}>
              <Button className="login_button" title="Profile" onClick={() => { router.push(`/user/${userid}/profile`); handleRemoveMenu()}} /> <span> </span>
            </div>
          ) : (
            <div href="#trail" offset={84}>
              <Button className="login_button" title="Login" onClick={() => { router.push("/login"); handleRemoveMenu() }} />
            </div>
          )}
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
