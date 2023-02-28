import { Box, Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Stack p="16px">
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    </Box>
  );
}
