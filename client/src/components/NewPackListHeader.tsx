import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";

export interface NewPackListHeaderProps {
  handleListName: (value: string) => void;
  handlePackListCreation: () => Promise<void>;
}

export default function NewPackListHeader({
  handleListName,
  handlePackListCreation,
}: NewPackListHeaderProps) {
  return (
    <Flex
      as="form"
      onSubmit={handlePackListCreation}
      align="center"
      justify="space-between"
      py={4}
      px={8}
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
    >
      <Input
        isRequired
        placeholder="PackList Name"
        size="lg"
        mr="32px"
        onChange={(event) => handleListName(event.target.value)}
      />
      <Button colorScheme="teal" size="lg" type="submit">
        Save
      </Button>
    </Flex>
  );
}
