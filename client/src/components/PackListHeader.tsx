import { Flex, Input, useColorModeValue } from "@chakra-ui/react";

export default function PackListHeader() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={8}
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
    >
      <Input placeholder="search" width="250px" />
    </Flex>
  );
}
