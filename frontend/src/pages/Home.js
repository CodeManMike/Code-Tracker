import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Container,
  SimpleGrid,
  Icon,
  Flex
} from '@chakra-ui/react';
import { FaGithub, FaCode, FaChartLine } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'blue.500'}
        mb={1}
      >
        <Icon as={icon} w={10} h={10} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

const Home = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Track your code contributions with{' '}
          <Text as={'span'} color={'blue.500'}>
            GitHub Code Tracker
          </Text>
        </Heading>
        <Text color={'gray.600'} maxW={'3xl'}>
          A simple way to track how many lines of code you've contributed to GitHub
          repositories. Get insights into your coding habits, measure productivity,
          and visualize your impact over time.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            as={RouterLink}
            to={'/login'}
            rounded={'full'}
            px={6}
            colorScheme={'blue'}
            bg={'blue.500'}
            _hover={{ bg: 'blue.600' }}
          >
            Get Started
          </Button>
          <Button
            as={'a'}
            href={'https://github.com'}
            target={'_blank'}
            rounded={'full'}
            px={6}
            leftIcon={<FaGithub />}
          >
            GitHub
          </Button>
        </Stack>
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={FaGithub}
              title={'GitHub Integration'}
              text={'Connect with your GitHub account to track your repositories.'}
            />
            <Feature
              icon={FaCode}
              title={'Code Metrics'}
              text={'Track lines of code added, deleted, and total commits.'}
            />
            <Feature
              icon={FaChartLine}
              title={'Visual Reports'}
              text={'View statistics and trends about your coding activity.'}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
