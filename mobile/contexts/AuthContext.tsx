import { createContext, useContext, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextData {
    signed: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(false);

    async function signIn(email: string, password: string) {
        alert("TESTEEEEEEEE");
    }

    return (
        <AuthContext
            value={{
                signed,
                loading,
                signIn,
            }}
        >
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Contexto não foi encontrado!");
    }

    return context;
}
