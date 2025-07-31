"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

type AuthContextType = {
  username: string;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicPaths = ["/login", "/"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth.isLoggedIn && !publicPaths.includes(pathname)) {
      router.push("/login");
    } else if (auth.isLoggedIn && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [auth.isLoggedIn, pathname, router]);

  // Don't render protected content for unauthenticated users
  if (!auth.isLoggedIn && !publicPaths.includes(pathname)) {
    return null;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
