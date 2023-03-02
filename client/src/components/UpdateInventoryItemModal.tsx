import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import updateInventoryItem from "../api/updateInventoryItem";
import { ITEM_CATEGORY } from "../variables/Variables";

export interface UpdateInventoryItemModalProps {
  id: string;
  name: string;
  description: string;
  category: string;
  weight: number;
  weightUnit: string;
  isConsumable: boolean;
  quantity: number;
}

export default function UpdateInventoryItemModal({
  id,
  name,
  description,
  category,
  weight,
  weightUnit,
  isConsumable,
  quantity,
}: UpdateInventoryItemModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [consumable, setConsumable] = useState<boolean>(isConsumable);

  const handleConsumable = () => {
    setConsumable(!consumable);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = new FormData(event.currentTarget);
    const submissionData = {
      _id: id,
      name: userInput.get("name") as string,
      description: userInput.get("description") as string,
      category: userInput.get("category") as string,
      weight: userInput.get("weight") as unknown as number,
      weightUnit: userInput.get("weightUnit") as string,
      isConsumable: consumable,
      quantity: userInput.get("quantity") as unknown as number,
    };

    updateInventoryItem(submissionData).then(() => {
      onClose();
      window.location.reload();
    });
  };

  return (
    <>
      <Tooltip label="Update Item" aria-label="Update Item">
        <IconButton
          onClick={onOpen}
          aria-label="Update Item"
          icon={<EditIcon />}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Update Item</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input mb="2" name="name" defaultValue={name} />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input mb="2" name="description" defaultValue={description} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Flex mb="2">
                  <Select
                    name="category"
                    placeholder="Select Option"
                    defaultValue={category}
                  >
                    {ITEM_CATEGORY.map((category) => {
                      return <option>{category}</option>;
                    })}
                  </Select>
                </Flex>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Weight</FormLabel>
                <Flex mb="2">
                  <NumberInput defaultValue={weight}>
                    <NumberInputField name="weight" />
                  </NumberInput>

                  <Select name="weightUnit" defaultValue={weightUnit}>
                    <option value="oz">oz</option>
                    <option value="lb">lb</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                  </Select>
                </Flex>
              </FormControl>

              <FormControl display="flex" alignItems="center" m="16px" ml="0px">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Consumable?
                </FormLabel>
                <Switch
                  name="isConsumable"
                  size="md"
                  colorScheme={"teal"}
                  onChange={handleConsumable}
                  defaultChecked={isConsumable}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  defaultValue={quantity}
                  min={1}
                  max={99}
                  name="quantity"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
