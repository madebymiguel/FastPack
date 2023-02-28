import { Tr, Td, CloseButton, HStack } from "@chakra-ui/react";
import UpdateInventoryItemModal from "./UpdateInventoryItemModal";
import deleteInventoryItem from "../api/deleteInventoryItem";

export interface InventoryItemProps {
  id: string;
  name: string;
  description: string;
  category: string;
  isConsumable: boolean;
  weight: number;
  weightUnit: string;
  quantity: number;
}

export default function InventoryItem({
  id,
  name,
  description,
  category,
  isConsumable,
  weight,
  weightUnit,
  quantity,
}: InventoryItemProps) {
  const handleItemDelete = async (id: string) => {
    deleteInventoryItem(id);
    window.location.reload();
  };

  return (
    <Tr>
      <Td pt="4px" pb="4px">
        {name}
      </Td>
      <Td pt="4px" pb="4px">
        {description}
      </Td>
      <Td pt="4px" pb="4px">
        {isConsumable ? "Yes" : "No"}
      </Td>
      <Td pt="4px" pb="4px">
        {weight} {weightUnit}
      </Td>
      <Td pt="4px" pb="4px">
        {quantity}
      </Td>

      <Td pt="4px" pb="4px" pr="8px" w="40px" h="40px">
        <HStack>
          <UpdateInventoryItemModal
            id={id}
            name={name}
            description={description}
            category={category}
            weight={weight}
            weightUnit={weightUnit}
            isConsumable={isConsumable}
            quantity={quantity}
          />
          <CloseButton
            onClick={() => handleItemDelete(id)}
            aria-label="Delete Item"
            _hover={{ bg: "red.500", color: "white" }}
          />
        </HStack>
      </Td>
    </Tr>
  );
}
