export interface Inventory {
  _id: string;
  name: string;
  description: string;
  category: string;
  isConsumable: boolean;
  weight: number;
  weightUnit: string;
  quantity: number;
  // For PackList
  isWorn: boolean;
  tripQuantity: number;
}
