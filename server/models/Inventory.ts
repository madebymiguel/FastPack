import { Schema, model, Types } from "mongoose";

export interface InventoryType {
  name: string;
  description: string;
  category: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  isConsumable: boolean;
  createdBy: { type: Types.ObjectId };
  // For PackList
  isWorn: boolean | null;
  tripQuantity: number | null;
}

const InventorySchema = new Schema<InventoryType>({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  weight: { type: Number },
  weightUnit: { type: String },
  quantity: { type: Number },
  isConsumable: { type: Boolean },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User"],
  },
  // For PackList
  isWorn: { type: Boolean, default: null },
  tripQuantity: { type: Number, default: null },
});

export default model<InventoryType>("Inventory", InventorySchema);
