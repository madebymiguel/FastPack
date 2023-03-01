import { Inventory } from "../types/Inventory";
import fetchUserToken from "./fetchUserToken";

export interface postInventoryItemProps {
  listName: string;
  inventory: Inventory[];
}

export default async function postPackList({
  listName,
  inventory,
}: postInventoryItemProps) {
  let token;
  await fetchUserToken().then((data) => {
    if (data.token) {
      token = data.token;
    }
  });

  const submissionData = {
    listName,
    inventory,
  };

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/packlist/new`, {
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
