import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import api from "@/lib/api";
import { RegisterFormValues } from "@/pages/register-page";
import { LoginFormValues as LoginCredentials } from "@/pages/login-page";

import { USER_TIERS_OPTIONS } from "@/constants/auth.constant";

export interface LoggedInUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userTier: (typeof USER_TIERS_OPTIONS)[number];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  loggedInUser: LoggedInUser | null | undefined;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUser | null | undefined
  >(undefined);
  const [accessToken, setAccessToken] = useLocalStorage(
    "jwt-marketplace",
    null
  );

  useEffect(() => {
    if (!accessToken) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/users/active");
        setLoggedInUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [accessToken]);

  function logout() {
    setAccessToken(null);
    setLoggedInUser(null);
  }

  async function login(cred: LoginCredentials) {
    try {
      const response = await api.post("/auth/sign-in", cred);
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function register(cred: RegisterCredentials) {
    try {
      await api.post("/users", cred);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
