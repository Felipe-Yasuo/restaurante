"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {
    try {
        const token = await getToken();
        const name = formData.get("name");

        if (!token) {
            return { success: false, error: "Erro ao criar categoria" };
        }

        const data = {
            name: name,
        };

        await apiClient<Category>("/category", {
            method: "POST",
            body: JSON.stringify(data),
            token: token,
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar categoria" };
    }
}
