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
import PackListItem from "./PackListItem";

export interface PackListCategoryProps {
  title: string;
  inventory: Inventory[];
}

export default function PackListCategory({
  title,
  inventory,
}: PackListCategoryProps) {
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
                <PackListItem
                  name={item.name}
                  description={item.description}
                  isConsumable={item.isConsumable}
                  isWorn={item.isWorn}
                  weight={item.weight}
                  weightUnit={item.weightUnit}
                  tripQuantity={item.quantity}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
