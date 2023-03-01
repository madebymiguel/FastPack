import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Header from "./Header";
import InventoryHeader from "./InventoryHeader";
import InventoryCategory from "./InventoryCategory";
import Loading from "./Loading";
import { Inventory } from "../types/Inventory";
import fetchAllInventory from "../api/fetchAllInventory";

export default function InventoryPage() {
  const [isFetching, setFetching] = useState<boolean>(true);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchAllInventory().then((data) => {
      const fetchedInventory: Inventory[] = data.inventory;
      setInventory(fetchedInventory);
      setUsedCategories([
        ...new Set(fetchedInventory.map((item) => item.category)),
      ]);
      setFetching(false);
    });
  }, []);

  return (
    <Box>
      <Header />
      <InventoryHeader />

      {!isFetching ? (
        inventory.length === 0 ? (
          <Box p="24px" pl="48px">
            <Text fontSize="xl" color="black">
              No Inventory Items Yet. Click on Add New Item to get started!
            </Text>
          </Box>
        ) : (
          usedCategories.map((categoryName: string) => {
            const inventoryCategory = inventory.filter((item) =>
              categoryName.includes(item.category)
            );
            return (
              <InventoryCategory
                key={categoryName}
                title={categoryName}
                inventory={inventoryCategory}
              />
            );
          })
        )
      ) : (
        <Loading />
      )}
    </Box>
  );
}
