import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";
import { LoginResponse, User } from "../types/index";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextData {
    user: User | null;
    signed: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function signIn(email: string, password: string) {
        try {
            const response = await api.post<LoginResponse>("/session", {
                email: email,
                password: password,
            });

            const { token, ...userData } = response.data;

            await AsyncStorage.setItem("@token:pizzaria", token);
            await AsyncStorage.setItem("@user:pizzaria", JSON.stringify(userData));

            setUser(userData);
        } catch (error: any) {
            if (error.response?.data?.error) {
                console.log(error.response?.data?.error);
                return;
            }

            console.log(error);
        }
    }

    return (
        <AuthContext
            value={{
                signed,
                loading,
                signIn,
                user,
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
