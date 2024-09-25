import { createContext, useState, useEffect, useContext } from "react";
import {
  RegisterFormValues,
  LoginFormValues as LoginCredentials,
} from "@/types/auth.typs";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  USER_TIERS_OPTIONS,
} from "@/constants/auth.constant";
import api from "@/lib/api";
import { wait } from "@/lib/utils";

export interface LoggedInUser {
  id: number;
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
  logout: () => Promise<void>;
  shouldShowLoginAlertDialog: boolean;
  setShouldShowLoginAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  const fetchUser = async () => {
    try {
      const response = await api.get("/users/active");
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
  };

  const logout = async () => {
    await api.post("/auth/sign-out");
    setAccessToken(null);
    setLoggedInUser(null);
    setShouldShowLoginAlertDialog(false); // wierd behivior with login dialog
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  };

  const login = async (cred: LoginCredentials) => {
    try {
      await wait();
      const response = await api.post("/auth/sign-in", cred);
      const accessToken = response.data.accessToken;
      setAccessToken(accessToken); // Store token directly
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const register = async (cred: RegisterCredentials) => {
    try {
      await api.post("/users", cred);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };

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
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
