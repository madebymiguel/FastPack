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
  isWorn: boolean;
  tripQuantity: number;
}

const InventorySchema = new Schema<InventoryType>({
  name: { type: String, required: [true, "Please Provide Item Name"] },
  description: { type: String },
  category: { type: String, required: [true, "Please Provide Category"] },
  weight: { type: Number, required: [true, "Please Provide Weight"] },
  weightUnit: { type: String, required: [true, "Please Provide Weight Unit"] },
  quantity: { type: Number, required: [true, "Please Provide Quantity"] },
  isConsumable: { type: Boolean },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User"],
  },
  // For PackList
  isWorn: { type: Boolean, default: false },
  tripQuantity: { type: Number, default: 1 },
});

export default model<InventoryType>("Inventory", InventorySchema);
