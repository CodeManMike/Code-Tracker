import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { FaSync } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Move hook calls outside of conditional rendering
  const statBgColor = useColorModeValue('white', 'gray.700');
  const statBorderColor = useColorModeValue('gray.200', 'gray.700');
  const boxBgColor = useColorModeValue('white', 'gray.700');
  const boxBorderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch repositories
        const reposResponse = await axios.get('/api/github/repos');
        setRepos(reposResponse.data);

        // Fetch code stats
        const statsResponse = await axios.get('/api/github/stats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchRepoStats = async (owner, repo) => {
    try {
      setRefreshing(true);
      await axios.get(`/api/github/stats/${owner}/${repo}`);

      // Refresh all stats
      const statsResponse = await axios.get('/api/github/stats');
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching repo stats:', error);
      setError('Failed to fetch repository statistics.');
    } finally {
      setRefreshing(false);
    }
  };

  // Parse repository name to get owner and repo
  const parseRepoName = (fullName) => {
    const [owner, repo] = fullName.split('/');
    return { owner, repo };
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading your GitHub data...</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Box mb={10}>
        <Heading as="h1" size="xl" mb={2}>
          Your GitHub Statistics
        </Heading>
        <Text color="gray.600">
          Welcome, {user?.username || 'Developer'}! Here's your coding activity.
        </Text>
      </Box>

      {error && (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {stats && (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
          <Stat
            px={4}
            py={5}
            shadow="md"
            border="1px"
            borderColor={statBorderColor}
            rounded="lg"
            bg={statBgColor}
          >
            <StatLabel fontSize="lg">Total Lines Added</StatLabel>
            <StatNumber fontSize="3xl" color="green.500">
              {stats.totals.linesAdded.toLocaleString()}
            </StatNumber>
            <StatHelpText>across all repositories</StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            shadow="md"
            border="1px"
            borderColor={statBorderColor}
            rounded="lg"
            bg={statBgColor}
          >
            <StatLabel fontSize="lg">Total Lines Deleted</StatLabel>
            <StatNumber fontSize="3xl" color="red.500">
              {stats.totals.linesDeleted.toLocaleString()}
            </StatNumber>
            <StatHelpText>across all repositories</StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            shadow="md"
            border="1px"
            borderColor={statBorderColor}
            rounded="lg"
            bg={statBgColor}
          >
            <StatLabel fontSize="lg">Total Commits</StatLabel>
            <StatNumber fontSize="3xl" color="blue.500">
              {stats.totals.commitCount.toLocaleString()}
            </StatNumber>
            <StatHelpText>across all repositories</StatHelpText>
          </Stat>
        </SimpleGrid>
      )}

      <Box
        mb={6}
        p={5}
        shadow="md"
        border="1px"
        borderColor={boxBorderColor}
        rounded="lg"
        bg={boxBgColor}
      >
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Heading as="h2" size="lg">
            Your Repositories
          </Heading>
          <Text color="gray.500">
            Click "Analyze" to fetch code statistics for a repository
          </Text>
        </Stack>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Repository</Th>
                <Th isNumeric>Lines Added</Th>
                <Th isNumeric>Lines Deleted</Th>
                <Th isNumeric>Commits</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {repos.map((repo) => {
                const { owner, repo: repoName } = parseRepoName(repo.fullName);
                const repoStats = stats?.stats.find(s => s.repository === repo.fullName);

                return (
                  <Tr key={repo.id}>
                    <Td>{repo.fullName}</Td>
                    <Td isNumeric>{repoStats?.linesAdded?.toLocaleString() || '-'}</Td>
                    <Td isNumeric>{repoStats?.linesDeleted?.toLocaleString() || '-'}</Td>
                    <Td isNumeric>{repoStats?.commitCount?.toLocaleString() || '-'}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<FaSync />}
                        onClick={() => fetchRepoStats(owner, repoName)}
                        isLoading={refreshing}
                      >
                        Analyze
                      </Button>
                    </Td>
                  </Tr>
                );
              })}

              {repos.length === 0 && (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    No repositories found. Make sure you have public repositories on GitHub.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
