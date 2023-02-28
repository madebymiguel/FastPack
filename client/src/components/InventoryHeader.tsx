import { Flex, Input, useColorModeValue } from "@chakra-ui/react";
import AddInventoyItemModal from "./AddInventoyItemModal";

export default function InventoryHeader() {
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
      <AddInventoyItemModal />
    </Flex>
  );
}
