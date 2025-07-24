/**
 * Hook for handling authentication token in localStorage.
 *
 * @returns {object} Methods to get, set, and remove the token.
 * @property {function(): string | null} getToken - Returns the current token or null.
 * @property {function(string): void} setToken - Sets a new token.
 * @property {function(): void} removeToken - Removes the token from localStorage.
 */
export function useToken(): {
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
} {
  const TOKEN_KEY = "auth_token";
  /**
   * Returns the token stored in localStorage.
   * @returns {string|null}
   */
  function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saves the token in localStorage.
   * @param {string} token
   */
  function setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Removes the token from localStorage.
   */
  function removeToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  }

  return { getToken, setToken, removeToken };
}
