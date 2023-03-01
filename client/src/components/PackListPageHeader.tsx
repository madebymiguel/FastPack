import { Button, Flex, Input, useColorModeValue, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function PackListPageHeader() {
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
      <Button as={ReactRouterLink} to="/packlist/new">
        New List
      </Button>
    </Flex>
  );
}
