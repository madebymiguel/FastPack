import fetchUserToken from "./fetchUserToken";

export default async function fetchInventoryItem(itemId: string) {
  let token;
  await fetchUserToken().then((data) => {
    if (data.token) {
      token = data.token;
    }
  });

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/inventory/:${itemId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const returnMessage = await res.json();
  return returnMessage;
}
