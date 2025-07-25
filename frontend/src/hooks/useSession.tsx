import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UseSessionResult {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export function useSession(): UseSessionResult {
  const { getToken } = useToken();
  const { data, isLoading, error } = useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/auth/profile`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        throw new Error("Falha ao buscar perfil");
      }
      const json = await res.json();
      return json as UserProfile;
    },
  });
  return {
    user: data ?? null,
    loading: isLoading,
    error: error ? error.message : null,
  };
}
