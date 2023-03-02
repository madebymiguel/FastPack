import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import PackListCategory from "./PackListCategory";
import { PackListInventory } from "../types/PackListInventory";
import fetchPackList from "../api/fetchPackList";
import NewPackListWeightBreakDown from "./NewPackListWeightBreakDown";
import handleConversion from "../utils/handleConversion";
import PackListHeader from "./PackListHeader";
import deletePackList from "../api/deletePackList";

export default function PackList() {
  const [isFetching, setFetching] = useState<boolean>(true);
  const [packList, setpackList] = useState<PackListInventory | null>(null);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [packListName, setPackListName] = useState<string>("");
  const [packListId, setPackListId] = useState<string>("");

  const [unitType, setUnitType] = useState<string>("oz");
  const [base, setBase] = useState<number>(0);
  const [consumable, setConsumable] = useState<number>(0);
  const [worn, setWorn] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { list } = useParams<{ list: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (list) {
      fetchPackList(list).then((data) => {
        const fetchedPackList: PackListInventory = data.packListItem;
        setpackList(fetchedPackList);
        setPackListName(fetchedPackList.listName);
        setPackListId(fetchedPackList._id);

        const inventory = fetchedPackList.inventory;
        setUsedCategories([...new Set(inventory.map((item) => item.category))]);

        handleConversion(
          unitType,
          inventory,
          handleBase,
          handleConsumable,
          handleWorn,
          handleTotal
        );

        setFetching(false);
      });

      if (packList !== null) {
        handleConversion(
          unitType,
          packList.inventory,
          handleBase,
          handleConsumable,
          handleWorn,
          handleTotal
        );
      }
    }
  }, [unitType]);

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

  const handleItemDelete = async (id: string) => {
    deletePackList(id);
    navigate("/packlist");
  };

  return (
    <Box>
      <Header />
      <PackListHeader
        packListId={packListId}
        packListName={packListName}
        handleItemDelete={handleItemDelete}
      />
      <NewPackListWeightBreakDown
        base={base}
        consumable={consumable}
        worn={worn}
        total={total}
        unitType={unitType}
        handleUnitType={handleUnitType}
      />
      {!isFetching ? (
        packList !== null &&
        usedCategories.map((categoryName: string) => {
          const inventoryCategory = packList.inventory.filter((item) =>
            categoryName.includes(item.category)
          );
          return (
            <PackListCategory
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
