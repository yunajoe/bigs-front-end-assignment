import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUserName: (username: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  clearUserName: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      username: null,
      accessToken: null,
      refreshToken: null,
      setUserName: (username: string) => set({ username }),
      setTokens: (accessToken: string, refreshToken: string) =>
        set({ accessToken, refreshToken }),

      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      clearUserName: () => set({ username: null }),
    }),
    {
      name: "auth",
    }
  )
);
