import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import InventoryItem from "./InventoryItem";
import { INVENTORY_TABLE_HEADERS } from "../variables/Variables";
import { Inventory } from "../types/Inventory";

export interface InventoryCategoryProps {
  title: string;
  inventory: Inventory[];
}

export default function InventoryCategory({
  title,
  inventory,
}: InventoryCategoryProps) {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h3" size="md">
                {title}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {INVENTORY_TABLE_HEADERS.map((header: string) => {
                    return <Th>{header}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {inventory.map((item: Inventory) => {
                  return (
                    <InventoryItem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      category={item.category}
                      isConsumable={item.isConsumable}
                      weight={item.weight}
                      weightUnit={item.weightUnit}
                      quantity={item.quantity}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
