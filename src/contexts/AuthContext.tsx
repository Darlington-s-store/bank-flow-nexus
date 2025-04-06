
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// This is a mock admin - in a real app this would come from a database
const MOCK_ADMIN = {
  id: "1",
  name: "Admin User",
  email: "admin@bankflow.com",
  role: "admin",
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we're using hardcoded credentials
    if (email === "admin@bankflow.com" && password === "admin123") {
      setAdmin(MOCK_ADMIN);
      setIsAuthenticated(true);
      localStorage.setItem("admin", JSON.stringify(MOCK_ADMIN));
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem("admin");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
