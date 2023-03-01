import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { Inventory } from "../types/Inventory";

export interface NewPackListItemProps {
  id: string;
  name: string;
  description: string;
  isConsumable: boolean;
  weight: number;
  weightUnit: string;
  quantity: number;
  handleInventoryUpdate: (
    id: string,
    isWorn: boolean,
    tripQty: number,
    selectedInventory: Inventory[]
  ) => void;
  selectedInventory: Inventory[];
}

export default function NewPackListItem({
  id,
  name,
  description,
  isConsumable,
  weight,
  weightUnit,
  quantity,
  handleInventoryUpdate,
  selectedInventory,
}: NewPackListItemProps) {
  const [updateWorn, setUpdateWorn] = useState<boolean>(false);
  const [updateTripQty, setUpdateTripQty] = useState<number>(1);

  const handleUpdateWorn = () => {
    setUpdateWorn(!updateWorn);
    handleInventoryUpdate(id, !updateWorn, updateTripQty, selectedInventory);
  };

  const handleUpdateTripQty = (value: any) => {
    setUpdateTripQty(value);
    handleInventoryUpdate(id, updateWorn, value, selectedInventory);
  };

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
        <FormControl display="flex" alignItems="center" m="16px" ml="0px">
          <Switch
            name="isWorn"
            size="md"
            colorScheme={"teal"}
            onChange={handleUpdateWorn}
            defaultChecked={updateWorn}
          />
        </FormControl>
      </Td>
      <Td pt="4px" pb="4px">
        {weight} {weightUnit}
      </Td>
      <Td>
        <FormControl>
          <NumberInput
            min={1}
            max={quantity}
            name="quantity"
            w="75px"
            value={updateTripQty}
            onChange={handleUpdateTripQty}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Td>
    </Tr>
  );
}
