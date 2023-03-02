import { EditIcon } from "@chakra-ui/icons";
import {
  CloseButton,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

export interface PackListHeaderProps {
  packListId: string;
  packListName: string;
  handleItemDelete: (id: string) => Promise<void>;
}

export default function PackListHeader({
  packListId,
  packListName,
  handleItemDelete,
}: PackListHeaderProps) {
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
      <Heading size="lg" color="black" w="100%">
        {packListName}
      </Heading>
      <Input placeholder="search" ml="32px" mr="16px" w="100%" />
      <HStack spacing="16px">
        <Tooltip label="Update Item" aria-label="Update Item">
          <IconButton
            // onClick={onOpen}
            aria-label="Update Item"
            icon={<EditIcon />}
          />
        </Tooltip>

        <Tooltip label="Delete List" aria-label="Delete List">
          <CloseButton
            onClick={() => handleItemDelete(packListId)}
            _hover={{ bg: "red.500", color: "white" }}
          />
        </Tooltip>
      </HStack>
    </Flex>
  );
}
