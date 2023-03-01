import { Inventory } from "./Inventory";

export interface PackListInventory {
  _id: string;
  listName: string;
  inventory: Inventory[];
}
