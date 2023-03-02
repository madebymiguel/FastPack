import { Td, Tr } from "@chakra-ui/react";
import { PACK_LIST_TABLE_HEADERS } from "../variables/Variables";

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
    <Tr key={name}>
      <Td width={PACK_LIST_TABLE_HEADERS[0].width} pt="4px" pb="4px">
        {name}
      </Td>
      <Td width={PACK_LIST_TABLE_HEADERS[1].width} pt="4px" pb="4px">
        {description}
      </Td>
      <Td width={PACK_LIST_TABLE_HEADERS[2].width} pt="4px" pb="4px">
        {isConsumable ? "Yes" : "No"}
      </Td>
      <Td width={PACK_LIST_TABLE_HEADERS[3].width} pt="4px" pb="4px">
        {isWorn ? "Yes" : "No"}
      </Td>
      <Td width={PACK_LIST_TABLE_HEADERS[4].width} pt="4px" pb="4px">
        {weight} {weightUnit}
      </Td>
      <Td width={PACK_LIST_TABLE_HEADERS[5].width}>{tripQuantity}</Td>
    </Tr>
  );
}
