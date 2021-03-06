import React from "react";
import { Link, Box, Flex, Text, Button, Stack, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from 'react-icons/fi';
import Logo from "./logo";
import Auth from '../utils/auth'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NavBarContainer {...props}>
      <Link
        href="/"
      >
        <Logo
          w="100px"
          color={["green", "green"]}
        />
      </Link>
      
      <MenuToggle toggle={() => setIsOpen((isOpen) ? false : true)} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="green"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="green"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  const logout =(event) => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <Box
      to="/"
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/products">Shop</MenuItem>
        <MenuItem to="/cart">
            <Icon as={FiShoppingCart}/>
        </MenuItem>
      <div>
        {Auth.loggedIn() ? (
          <Button onClick={logout}>
            Logout
          </Button>
        ) : (

          <MenuItem to="/login">
            <Button
                size="sm"
                rounded="md"
                color={["green", "green", "white", "white"]}
                bg={["white", "white", "green", "green"]}
                _hover={{
                  bg: ["gray", "gray", "blue", "blue"]
                }}
                >
                Login
            </Button>
        </MenuItem>
        
        )}
      </div>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={1}
      p={8}
      bg={"transparent"}
      color={"black"}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;