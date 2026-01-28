"use server";

import { apiClient } from "@/lib/api";

export async function registerAction(
    prevState: { success: boolean; error: string; redirectTo?: string } | null,
    formData: FormData
) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const data = {
            name: name,
            email: email,
            password: password,
        };

        await apiClient("/users", {
            method: "POST",
            body: JSON.stringify(data),
        });

        return { success: true, error: "", redirectTo: "/login" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar conta" };
    }
}
