import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  name: string;
  email: string;
}

interface UseSessionResult {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

async function fetchProfile(): Promise<UserProfile> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const res = await fetch(`${apiUrl}/auth/profile`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie.includes("access_token") ? document.cookie.split("access_token=")[1].split(";")[0] : ""}`,
    },
  });
  if (!res.ok) {
    throw new Error("Falha ao buscar perfil");
  }
  return res.json();
}

export function useSession(): UseSessionResult {
  const { data, isLoading, error } = useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  return {
    user: data ?? null,
    loading: isLoading,
    error: error ? error.message : null,
  };
}
