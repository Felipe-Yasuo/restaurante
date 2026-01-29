import { apiClient } from "@/lib/api";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

const COOKIE_NAME = "token_pizzaria";

export async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
    });
}

export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<User | null> {
    try {
        const token = await getToken();

        if (!token) {
            return null;
        }

        const user = await apiClient<User>("/me", {
            token: token,
        });

        return user;
    } catch (err) {
        // console.log(err);
        return null;
    }
}
