import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color="blue.500">
              GitHub Code Tracker
            </Text>
          </Flex>
        </Link>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Button variant="ghost">Home</Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar size={'sm'} src={user?.avatarUrl} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link as={RouterLink} to="/login" _hover={{ textDecoration: 'none' }}>
                <Button colorScheme="blue">Login</Button>
              </Link>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
