export default async function fetchUserToken() {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const returnMessage = await res.json();
  return returnMessage;
}
