export default async function fetchSignoff() {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signoff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const returnMessage = await res.json();
  return returnMessage;
}
