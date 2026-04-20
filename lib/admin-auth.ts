import { createContext, useContext } from "react";

export const AdminAuthContext = createContext<{ token: string }>({ token: "" });
export const useAuth = () => useContext(AdminAuthContext);
