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
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import postInventoryItem from "../api/postInventoryItem";
import { ITEM_CATEGORY } from "../variables/Variables";

export default function AddInventoryItemModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isConsumable, setIsConsumable] = useState<boolean>(false);

  const handleConsumable = () => {
    setIsConsumable(!isConsumable);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = new FormData(event.currentTarget);
    const submissionData = {
      name: userInput.get("name") as string,
      description: userInput.get("description") as string,
      category: userInput.get("category") as string,
      weight: userInput.get("weight") as unknown as number,
      weightUnit: userInput.get("weightUnit") as string,
      isConsumable: isConsumable,
      quantity: userInput.get("quantity") as unknown as number,
      isWorn: false,
      tripQuantity: 1,
    };

    postInventoryItem(submissionData).then(() => {
      onClose();
      window.location.reload();
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Add New Item</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Add New Item</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input mb="2" name="name" />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input mb="2" name="description" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Flex mb="2">
                  <Select name="category" placeholder="Select Option">
                    {ITEM_CATEGORY.map((category, index) => {
                      return <option key={index}>{category}</option>;
                    })}
                  </Select>
                </Flex>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Weight</FormLabel>
                <Flex mb="2">
                  <NumberInput>
                    <NumberInputField defaultValue={0} name="weight" />
                  </NumberInput>

                  <Select name="weightUnit">
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
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <NumberInput defaultValue={1} min={1} max={99} name="quantity">
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
                Add
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
