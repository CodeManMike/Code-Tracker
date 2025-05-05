import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Spinner, Text, Center } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/login-error');
      return;
    }

    const handleLogin = async () => {
      const success = await login(token);

      if (success) {
        navigate('/dashboard');
      } else {
        navigate('/login-error');
      }
    };

    handleLogin();
  }, [searchParams, login, navigate]);

  return (
    <Center height="70vh">
      <Box textAlign="center">
        <Spinner size="xl" mb={4} />
        <Text fontSize="lg">
          GitHub authentication successful. Redirecting to dashboard...
        </Text>
      </Box>
    </Center>
  );
};

export default LoginSuccess;
