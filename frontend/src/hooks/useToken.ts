import * as React from "react";

/**
 * Hook for handling authentication token in localStorage.
 *
 * @returns {object} Methods to get, set, and remove the token.
 * @property {function(): string | null} getToken - Returns the current token or null.
 * @property {function(string): void} setToken - Sets a new token.
 * @property {function(): void} removeToken - Removes the token from localStorage.
 */
export function useToken(): {
  token: string | null;
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
} {
  const TOKEN_KEY = "auth_token";
  const token = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  return { token, getToken, setToken, removeToken };
}
