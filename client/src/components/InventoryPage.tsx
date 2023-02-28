import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
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
      ) : (
        <Loading />
      )}
    </Box>
  );
}
