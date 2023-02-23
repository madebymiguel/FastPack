import { Schema, model, Types } from "mongoose";

export interface Inventory {
  name: string;
  description: string;
  category: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  createdBy: { type: Types.ObjectId };
}

const InventorySchema = new Schema<Inventory>({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  weight: { type: Number },
  weightUnit: { type: String },
  quantity: { type: Number },
  isConsumable: { type: Boolean },
  isWorn: { type: Boolean },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User"],
  },
});

export default model<Inventory>("Inventory", InventorySchema);
