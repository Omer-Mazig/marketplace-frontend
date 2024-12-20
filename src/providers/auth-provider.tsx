// React hooks and context management
import { createContext, useState, useEffect, useContext } from "react";

// Types
import {
  RegisterFormValues,
  LoginFormValues as LoginCredentials,
} from "@/types/auth.typs";

// Constants
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/auth.constant";

// Utilities and API
import api from "@/lib/api";
import { UserTierOptionType } from "@/types/users.types";

export interface LoggedInUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userTier: UserTierOptionType;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  loggedInUser: LoggedInUser | null | undefined;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  shouldShowLoginAlertDialog: boolean;
  setShouldShowLoginAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUser | null | undefined
  >(undefined);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    return storedToken ? storedToken.replace(/['"]+/g, "") : null;
  });

  const [shouldShowLoginAlertDialog, setShouldShowLoginAlertDialog] =
    useState(false);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
      fetchUser();
    } else {
      setLoggedInUser(null);
    }
  }, [accessToken]);

  async function fetchUser() {
    try {
      const response = await api.get("/users/active");
      console.log("fetchUser...");
      setLoggedInUser(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Invalid token, logging out");
        await logout();
      } else if (error.response?.status === 404) {
        console.error("User not found, logging out");
        await logout();
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  }

  async function logout() {
    await api.post("/auth/sign-out");
    setAccessToken(null);
    setLoggedInUser(null);
    setShouldShowLoginAlertDialog(false); // wierd behivior with login dialog
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  async function login(cred: LoginCredentials) {
    try {
      const response = await api.post("/auth/sign-in", cred);
      const accessToken = response.data.accessToken;
      setAccessToken(accessToken); // Store token directly
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
    <AuthContext.Provider
      value={{
        loggedInUser,
        login,
        register,
        logout,
        shouldShowLoginAlertDialog,
        setShouldShowLoginAlertDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
