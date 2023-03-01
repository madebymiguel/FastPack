import { Box, Link, StackDivider, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import PackListPageHeader from "./PackListPageHeader";
import fetchPackLists from "../api/fetchPackLists";
import { PackListInventory } from "../types/PackListInventory";

export default function PackingListPage() {
  const [isFetching, setFetching] = useState<boolean>(true);
  const [packLists, setPackLists] = useState<PackListInventory[]>([]);

  useEffect(() => {
    fetchPackLists().then((data) => {
      if (data.count !== 0) {
        const fetchedInventory: PackListInventory[] = data.packLists;
        setPackLists(fetchedInventory);
      }
      setFetching(false);
    });
  }, []);

  return (
    <Box>
      <Header />
      <PackListPageHeader />

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        p="24px"
        pl="48px"
        pr="48px"
      >
        {!isFetching ? (
          packLists.length === 0 ? (
            <Box>
              <Text fontSize="xl" color="black">
                No List Yet. Click on New List to get started!
              </Text>
            </Box>
          ) : (
            packLists.map((packlist) => {
              return (
                <Link
                  as={ReactRouterLink}
                  to={`/packlist/${packlist._id}`}
                  key={packlist._id}
                >
                  {packlist.listName}
                </Link>
              );
            })
          )
        ) : (
          <Loading />
        )}
      </VStack>
    </Box>
  );
}
