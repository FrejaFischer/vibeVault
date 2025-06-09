import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
// This is React Context — a built-in way to pass data through our component tree without prop drilling.
export const AuthContext = createContext<AuthContextType | null>(null);
