import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Inventory } from "../types/Inventory";

export interface SelectorItemProps {
  selectedInventory: Inventory[];
  inventoryItem: Inventory;
  handleInventorySelector: (
    isSelected: boolean,
    currentSelectedInventory: Inventory[],
    newItem: Inventory
  ) => void;
}

export function SelectorItem({
  selectedInventory,
  inventoryItem,
  handleInventorySelector,
}: SelectorItemProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Button
      bg={isSelected ? "teal" : "white"}
      colorScheme="teal"
      variant="outline"
      onClick={() => {
        setIsSelected(!isSelected);
        handleInventorySelector(!isSelected, selectedInventory, inventoryItem);
      }}
      h="48px"
    >
      <VStack justifyContent="flex-start" w="250px">
        <Heading fontSize="xs" color="black">
          {inventoryItem.name}
        </Heading>
        <Text fontSize="xs" color="black">
          {inventoryItem.weight} {inventoryItem.weightUnit}
        </Text>
      </VStack>
    </Button>
  );
}
