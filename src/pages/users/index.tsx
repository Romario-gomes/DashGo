import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NetxLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";

import { useState } from "react";
import { useUsers } from "../../services/hooks/users/useUsers";
import { QueryClient } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['users', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    });
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/> }  
            </Heading>
            <NetxLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine}  fontSize="20"/>}>
                Criar novo
              </Button>
            </NetxLink>
            
          </Flex>

         { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
         ): error ? (
          <Flex justify="center">
            <Text>Falh o obter dados dos usuários</Text>
          </Flex>
         ) : (
          <>
          <Table colorScheme="whiteAlpha" >
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuários</Th>
                { isWideVersion && <Th>Data de cadastro</Th> }  
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              { data.users.map(user => {
                return (
                  <Tr key={user.id}>
                    <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                    </Td>

                    <Td px={["4", "4", "6"]}>
                    <Box>
                      <Text fontWeight="bold">
                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                          {user.name}
                        </Link>
                        </Text>
                      <Text fontSize="sm" color="gray.300">{user.email}</Text>

                    </Box>
                    </Td>
                    { isWideVersion && <Td>{user.createdAt}</Td> }
                    <Td>
                    <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiPencilLine}  fontSize="16"/>}>
                      { isWideVersion ? 'Editar' : '' }
                    </Button>
                    </Td>
                  </Tr>
                )
              }) }

              
              
            </Tbody>
          </Table>
          <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
          </>
         ) }
        </Box>
      </Flex>
    </Box>
  );
}

