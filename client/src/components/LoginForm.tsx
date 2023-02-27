import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchLogin from "../api/fetchLogin";

export default function LoginForm() {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = new FormData(event.currentTarget);
    const submissionData = {
      email: userInput.get("email") as string,
      password: userInput.get("password") as string,
    };

    fetchLogin(submissionData).then((returnMessage) => {
      if (returnMessage.user) {
        return navigate("/inventory");
      } else {
        setErrorMessage(returnMessage.msg);
        setIsError(true);
      }
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Link href="/signup" variant="link" color={"teal"}>
              Sign-up
            </Link>
          </HStack>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input name="email" type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link href="/forgotpassword" color={"teal"}>
                    Forgot password?
                  </Link>
                </Stack>

                <Stack>
                  <Button
                    type="submit"
                    bg={"teal"}
                    color={"white"}
                    _hover={{
                      bg: "teal.500",
                    }}
                  >
                    Sign in
                  </Button>
                  {isError ? (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  ) : null}
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
