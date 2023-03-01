import { Schema, model, Types } from "mongoose";
import Inventory, { InventoryType } from "./Inventory";

export interface PackList {
  listName: string;
  inventory: InventoryType[];
  createdBy: { type: Types.ObjectId };
}

const PackListSchema = new Schema<PackList>({
  listName: { type: String },
  inventory: { type: [Inventory.schema] },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User"],
  },
});

export default model<PackList>("PackList", PackListSchema);
