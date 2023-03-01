import fetchUserToken from "./fetchUserToken";

export interface postInventoryItemProps {
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

export default async function postInventoryItem({
  name,
  description,
  category,
  isConsumable,
  weight,
  weightUnit,
  quantity,
  isWorn,
  tripQuantity,
}: postInventoryItemProps) {
  let token;
  await fetchUserToken().then((data) => {
    if (data.token) {
      token = data.token;
    }
  });

  const submissionData = {
    name,
    description,
    category,
    isConsumable,
    weight,
    weightUnit,
    quantity,
    isWorn,
    tripQuantity,
  };

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submissionData),
  });
  const returnMessage = await res.json();
  return returnMessage;
}
