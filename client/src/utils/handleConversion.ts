import { Inventory } from "../types/Inventory";
import convertWeight from "./convertWeight";

export default function handleConversion(
  unitType: string,
  inventory: Inventory[],
  handleBase: (value: number) => void,
  handleConsumable: (value: number) => void,
  handleWorn: (value: number) => void,
  handleTotal: (value: number) => void
) {
  let totalBase: number = 0;
  let totalConsumable: number = 0;
  let totalWorn: number = 0;
  let total: number = 0;

  inventory.forEach((item: Inventory) => {
    const weight =
      convertWeight(item.weight, item.weightUnit, unitType) * item.tripQuantity;

    // Add the weight of the item to the appropriate total variable
    if (item.isConsumable) {
      totalConsumable += weight;
    } else if (item.isWorn) {
      totalWorn += weight;
    } else {
      totalBase += weight;
    }
  });

  // Calculate the total weight by adding the individual weights
  total = totalBase + totalConsumable + totalWorn;

  // Call the provided handler functions with the formatted values
  handleBase(+totalBase.toFixed(2));
  handleConsumable(+totalConsumable.toFixed(2));
  handleWorn(+totalWorn.toFixed(2));
  handleTotal(+total.toFixed(2));
}
