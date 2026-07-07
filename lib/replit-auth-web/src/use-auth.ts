import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: string;
  roleConfirmed: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refetch: () => void;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetch("/api/auth/user", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { user: AuthUser | null }) => {
        if (!cancelled) {
          setUser(data.user ?? null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const login = useCallback(() => {
    const base =
      (typeof import.meta !== "undefined" &&
        (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL?.replace(
          /\/+$/,
          "",
        )) ||
      "";
    window.location.href = `/api/login?returnTo=${encodeURIComponent(base || "/")}`;
  }, []);

  const logout = useCallback(() => {
    window.location.href = "/api/logout";
  }, []);

  const refetch = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  return { user, isLoading, isAuthenticated: !!user, login, logout, refetch };
}
