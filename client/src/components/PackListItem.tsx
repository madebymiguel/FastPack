import { Td, Tr } from "@chakra-ui/react";

export interface PackListItemProps {
  name: string;
  description: string;
  isConsumable: boolean;
  isWorn: boolean;
  weight: number;
  weightUnit: string;
  tripQuantity: number;
}

export default function PackListItem({
  name,
  description,
  isConsumable,
  isWorn,
  weight,
  weightUnit,
  tripQuantity,
}: PackListItemProps) {
  return (
    <Tr justifyContent="space-between">
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
        {isWorn ? "Yes" : "No"}
      </Td>
      <Td pt="4px" pb="4px">
        {weight} {weightUnit}
      </Td>
      <Td>{tripQuantity}</Td>
    </Tr>
  );
}
