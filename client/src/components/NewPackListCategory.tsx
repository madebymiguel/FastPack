import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Inventory } from "../types/Inventory";
import { PACK_LIST_TABLE_HEADERS } from "../variables/Variables";
import NewPackListItem from "./NewPackListItem";

export interface NewPackListCategoryProps {
  title: string;
  inventory: Inventory[];
  handleInventoryUpdate: (
    id: string,
    isWorn: boolean,
    tripQty: number,
    selectedInventory: Inventory[]
  ) => void;
  selectedInventory: Inventory[];
}

export default function NewPackListCategory({
  title,
  inventory,
  handleInventoryUpdate,
  selectedInventory,
}: NewPackListCategoryProps) {
  return (
    <Box mt="16px" p="4px">
      <Box bg="gray.200" ml="8px" p="6px">
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {PACK_LIST_TABLE_HEADERS.map((header: string) => {
                return <Th>{header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {inventory.map((item: Inventory) => {
              return (
                <NewPackListItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  isConsumable={item.isConsumable}
                  weight={item.weight}
                  weightUnit={item.weightUnit}
                  quantity={item.quantity}
                  handleInventoryUpdate={handleInventoryUpdate}
                  selectedInventory={selectedInventory}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
