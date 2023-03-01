import { Box, Heading, Input, VStack } from "@chakra-ui/react";
import { Inventory } from "../types/Inventory";
import { SelectorItem } from "./SelectorItem";

export interface PackListInventorySelectorProps {
  inventory: Inventory[];
  selectedInventory: Inventory[];
  handleInventorySelector: (
    isSelected: boolean,
    currentSelectedInventory: Inventory[],
    newItem: Inventory
  ) => void;
}

export default function PackListInventorySelector({
  inventory,
  selectedInventory,
  handleInventorySelector,
}: PackListInventorySelectorProps) {
  return (
    <Box>
      <VStack
        spacing={4}
        boxShadow="base"
        bg="gray.100"
        p={2}
        overflowY="auto"
        h="93vh"
      >
        <Heading as="h2" size="md">
          Inventory
        </Heading>
        <Input placeholder="Search Inventory" />
        {inventory.map((item: Inventory) => {
          return (
            <SelectorItem
              selectedInventory={selectedInventory}
              inventoryItem={item}
              handleInventorySelector={handleInventorySelector}
            />
          );
        })}
      </VStack>
    </Box>
  );
}
