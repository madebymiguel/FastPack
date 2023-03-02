import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import fetchAllInventory from "../api/fetchAllInventory";
import postPackList from "../api/postPackList";
import NewPackListHeader from "./NewPackListHeader";
import NewPackListCategory from "./NewPackListCategory";
import NewPackListInventorySelector from "./NewPackListInventorySelector";
import NewPackListWeightBreakDown from "./NewPackListWeightBreakDown";
import { Inventory } from "../types/Inventory";
import handleConversion from "../utils/handleConversion";

export default function NewPackListPage() {
  const [isFetching, setFetching] = useState<boolean>(true);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);
  const [listName, setListName] = useState<string>("");

  const [unitType, setUnitType] = useState<string>("oz");
  const [base, setBase] = useState<number>(0);
  const [consumable, setConsumable] = useState<number>(0);
  const [worn, setWorn] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [updatedItem, setUpdatedItem] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) {
      fetchAllInventory().then((data) => {
        const fetchedInventory: Inventory[] = data.inventory;
        setInventory(fetchedInventory);
        setFetching(false);
      });
    }

    setUsedCategories([
      ...new Set(selectedInventory.map((item) => item.category)),
    ]);

    handleConversion(
      unitType,
      selectedInventory,
      handleBase,
      handleConsumable,
      handleWorn,
      handleTotal
    );

    setUpdatedItem(false);
  }, [selectedInventory, unitType, updatedItem]);

  const handlePackListCreation = async () => {
    const submissionData = {
      listName,
      inventory: selectedInventory,
    };
    postPackList(submissionData);
    navigate("/packlist");
  };

  const handleListName = (value: string) => {
    setListName(value);
  };

  const handleInventorySelector = (
    isSelected: boolean,
    currentSelectedInventory: Inventory[],
    inventoryItem: Inventory
  ) => {
    if (isSelected) {
      setSelectedInventory((currentSelectedInventory) => [
        ...currentSelectedInventory,
        inventoryItem,
      ]);
    } else {
      currentSelectedInventory = currentSelectedInventory.filter(
        (item) => item._id !== inventoryItem._id
      );
      setSelectedInventory(currentSelectedInventory);
    }
    setUpdatedItem(true);
  };

  const handleUnitType = (value: string) => {
    setUnitType(value);
  };

  const handleBase = (value: number) => {
    setBase(value);
  };
  const handleConsumable = (value: number) => {
    setConsumable(value);
  };
  const handleWorn = (value: number) => {
    setWorn(value);
  };
  const handleTotal = (value: number) => {
    setTotal(value);
  };

  const handleInventoryUpdate = (
    id: string,
    isWorn: boolean,
    tripQty: number,
    selectedInventory: Inventory[]
  ) => {
    const itemToUpdate = selectedInventory.findIndex((item) => item._id === id);
    if (itemToUpdate !== -1) {
      selectedInventory[itemToUpdate].isWorn = isWorn;
      selectedInventory[itemToUpdate].tripQuantity = tripQty;
      setUpdatedItem(true);
    }
  };

  return (
    <Grid
      templateAreas={`"header header"
                  "selector main"
                  "selector main"`}
      gridTemplateColumns={"320px 1fr"}
      h="100vh"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"main"}>
        <NewPackListHeader
          handleListName={handleListName}
          handlePackListCreation={handlePackListCreation}
        />
        <NewPackListWeightBreakDown
          base={base}
          consumable={consumable}
          worn={worn}
          total={total}
          unitType={unitType}
          handleUnitType={handleUnitType}
        />
        <Box overflowY="auto" h="75vh">
          {inventory !== null &&
            usedCategories.map((categoryName: string) => {
              const selectedFilterInventory = selectedInventory.filter((item) =>
                categoryName.includes(item.category)
              );
              return (
                <NewPackListCategory
                  title={categoryName}
                  inventory={selectedFilterInventory}
                  handleInventoryUpdate={handleInventoryUpdate}
                  selectedInventory={selectedInventory}
                />
              );
            })}
        </Box>
      </GridItem>
      <GridItem area={"selector"}>
        {!isFetching ? (
          <NewPackListInventorySelector
            inventory={inventory}
            selectedInventory={selectedInventory}
            handleInventorySelector={handleInventorySelector}
          />
        ) : (
          <Loading />
        )}
      </GridItem>
    </Grid>
  );
}
