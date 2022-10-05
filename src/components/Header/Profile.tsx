import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
        <Text>Romário Alves</Text>
        <Text color="gray.300" fontSize="small">romariogn10@gmail.com</Text>
      </Box>
      ) }
      
      <Avatar size="md" name="Romário Alves" src="https://avatars.githubusercontent.com/u/59178255?v=4" />
    </Flex>

  );
}