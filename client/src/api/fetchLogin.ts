export interface fetchLoginProps {
  email: string;
  password: string;
}

export default async function fetchLogin({ email, password }: fetchLoginProps) {
  const submissionData = {
    email,
    password,
  };

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(submissionData),
  });

  const returnMessage = await res.json();
  return returnMessage;
}
