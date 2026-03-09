"use server";

import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Erro ao criar produto" };
        }

        // Criar um FormData para enviar multipart/form-data
        const apiFormData = new FormData();

        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");
        const category_id = formData.get("category_id");
        const file = formData.get("file");

        if (name) apiFormData.append("name", name);
        if (price) apiFormData.append("price", price);
        if (description) apiFormData.append("description", description);
        if (category_id) apiFormData.append("category_id", category_id);
        if (file) apiFormData.append("file", file);

        // Para FormData, precisamos fazer a requisição diretamente
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: apiFormData,
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.error || "Erro ao criar produto" };
        }

        await response.json();

        revalidatePath("/dashboard/products");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar produto" };
    }
}
