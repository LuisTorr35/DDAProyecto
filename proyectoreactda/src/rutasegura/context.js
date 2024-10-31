import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado inicial en false

    const login = () => setIsAuthenticated(true); 
    const logout = () => setIsAuthenticated(false); 
    const [DNI, setDNI] = useState("");
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, DNI, setDNI, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
