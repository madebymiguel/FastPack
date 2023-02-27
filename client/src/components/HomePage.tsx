import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import HomePageImage from "../assets/HomePageImage.jpg";

export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={HomePageImage}
      backgroundSize={"cover"}
      backgroundPosition={"center bottom"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            FastPack
          </Text>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "xl", md: "lg" })}
          >
            assists in tracking the gear you own and planning the loadout for
            your next adventure
          </Text>
          <Stack direction={"row"}>
            <Button
              as={Link}
              href="/signup"
              bg={"orange.400"}
              rounded={"xl"}
              color={"black"}
              _hover={{ bg: "orange.500", textDecor: "none" }}
            >
              Get Started
            </Button>
            <Button
              as={Link}
              href="/login"
              bg={"teal"}
              rounded={"xl"}
              color={"white"}
              _hover={{ bg: "teal.500", textDecor: "none" }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
