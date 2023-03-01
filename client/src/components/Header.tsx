import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import fetchSignoff from "../api/fetchSignoff";

export default function Header() {
  const navigate = useNavigate();

  const handleSignoff = async () => {
    fetchSignoff().then((returnMessage) => {
      if (returnMessage.msg) {
        return navigate("/");
      }
    });
  };

  return (
    <Box>
      <Flex
        bg="gray.800"
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Heading fontFamily={"heading"} color="white">
            FastPack
          </Heading>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={"grey.400"}
            >
              View
            </MenuButton>
            <MenuList bg={"gray.800"}>
              <MenuItem
                as={ReactRouterLink}
                to="/inventory"
                bg={"gray.800"}
                _hover={{ bg: "orange.500", textDecor: "none" }}
              >
                Inventory
              </MenuItem>
              <MenuItem
                as={ReactRouterLink}
                to="/packlist"
                bg={"gray.800"}
                _hover={{ bg: "orange.500", textDecor: "none" }}
              >
                Pack List
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={handleSignoff}
            bg={"orange.400"}
            rounded={"xl"}
            color={"black"}
            _hover={{ bg: "orange.500", textDecor: "none" }}
          >
            Sign Off
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
