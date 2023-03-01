import { Flex, Heading, VStack, Text, Select } from "@chakra-ui/react";

export interface NewPackListWeightBreakDownProps {
  base: number;
  consumable: number;
  worn: number;
  total: number;
  unitType: string;
  handleUnitType: (value: any) => void;
}

export default function NewPackListWeightBreakDown({
  base,
  consumable,
  worn,
  total,
  unitType,
  handleUnitType,
}: NewPackListWeightBreakDownProps) {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      m="32px"
      mt="8px"
      mb="8px"
      p="4px"
      border="1px"
      borderRadius="8px"
      borderColor="teal"
    >
      <VStack>
        <Heading fontSize="xl" color="black">
          {base} {unitType}
        </Heading>
        <Text fontSize="xs">BASE WEIGHT</Text>
      </VStack>
      <VStack>
        <Heading fontSize="xl" color="black">
          {consumable} {unitType}
        </Heading>
        <Text fontSize="xs">CONSUMABLES</Text>
      </VStack>
      <VStack>
        <Heading fontSize="xl" color="black">
          {worn} {unitType}
        </Heading>
        <Text fontSize="xs">WORN</Text>
      </VStack>
      <VStack>
        <Heading fontSize="xl" color="black">
          {total} {unitType}
        </Heading>
        <Text fontSize="xs">TOTAL WEIGHT</Text>
      </VStack>
      <Select
        name="convertToUnit"
        defaultValue={unitType}
        onChange={(event) => handleUnitType(event.target.value)}
        size="lg"
        w="100px"
      >
        <option value="oz">oz</option>
        <option value="lb">lb</option>
        <option value="g">g</option>
        <option value="kg">kg</option>
      </Select>
    </Flex>
  );
}
