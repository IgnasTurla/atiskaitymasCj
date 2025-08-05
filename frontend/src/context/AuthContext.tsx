import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  name: string;
  surname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provideris apgaubti visa app ir duoti vartotojo duomenis
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hookas kuris leidzia auth info bet kur
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth turi būti naudojamas AuthProvider viduje");
  }
  return context;
}
