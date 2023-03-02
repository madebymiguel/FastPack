import { Box, Heading, Input, Spacer, VStack } from "@chakra-ui/react";
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
    <Box boxShadow="base" bg="gray.100">
      <VStack p={2}>
        <Heading as="h2" size="md">
          Inventory
        </Heading>
        <Input placeholder="Search Inventory" bg="white" />
        <VStack overflowY="auto" h="82vh">
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
      </VStack>
      <Spacer h="16px" />
    </Box>
  );
}
