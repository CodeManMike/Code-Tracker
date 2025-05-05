import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const handleGitHubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  return (
    <Flex
      minH={'70vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to track your GitHub code contributions
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Button
              bg={'black'}
              color={'white'}
              leftIcon={<FaGithub />}
              _hover={{
                bg: 'gray.700',
              }}
              onClick={handleGitHubLogin}
            >
              Sign in with GitHub
            </Button>
            <Text fontSize={'sm'} color={'gray.500'} textAlign={'center'} mt={4}>
              We'll only access your public repositories to count lines of code.
              We don't store your code, just the statistics.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
