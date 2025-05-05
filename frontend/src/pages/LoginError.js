import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

const LoginError = () => {
  return (
    <Center height="70vh">
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <FaExclamationTriangle size="50px" color="#F56565" />
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Authentication Failed
        </Heading>
        <Text color={'gray.500'} mb={6}>
          We couldn't authenticate you with GitHub. This could be due to:
          <br />
          - GitHub authentication issues
          <br />
          - Connection problems
          <br />
          - Permissions not granted
        </Text>
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="red"
          bgGradient="linear(to-r, red.400, red.500, red.600)"
          color="white"
          variant="solid"
          mb={3}
          mr={3}
        >
          Try Again
        </Button>
        <Button as={RouterLink} to="/" variant="ghost">
          Return Home
        </Button>
      </Box>
    </Center>
  );
};

export default LoginError;
