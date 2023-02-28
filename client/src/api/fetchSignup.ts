export interface fetchRegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default async function fetchRegister({
  firstName,
  lastName,
  email,
  password,
}: fetchRegisterProps) {
  const submissionData = {
    firstName,
    lastName,
    email,
    password,
  };

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionData),
  });

  const returnMessage = await res.json();
  return returnMessage;
}
