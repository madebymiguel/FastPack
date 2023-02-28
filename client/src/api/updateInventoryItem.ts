import { Inventory } from "../types/Inventory";
import fetchUserToken from "./fetchUserToken";

export interface updateInventoryItemProps {
  _id: string;
  name: string;
  description: string;
  category: string;
  isConsumable: boolean;
  weight: number;
  weightUnit: string;
  quantity: number;
}

export default async function updateInventoryItem({
  _id,
  name,
  description,
  category,
  isConsumable,
  weight,
  weightUnit,
  quantity,
}: updateInventoryItemProps) {
  let token;
  await fetchUserToken().then((data) => {
    if (data.token) {
      token = data.token;
    }
  });

  const submissionData = {
    _id,
    name,
    description,
    category,
    isConsumable,
    weight,
    weightUnit,
    quantity,
  };

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/inventory/${submissionData._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    }
  );
  const returnMessage = await res.json();
  return returnMessage;
}
