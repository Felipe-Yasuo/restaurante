"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Erro ao criar produto" };
        }

        // Para FormData, precisamos fazer a requisição diretamente
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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

export async function deleteProductAction(productId: string) {
    try {
        if (!productId) {
            return { success: false, error: "Falha ao deletar produto" };
        }

        const token = await getToken();

        if (!token) {
            return { success: false, error: "Falha ao deletar produto" };
        }

        await apiClient(`/product?product_id=${productId}`, {
            method: "DELETE",
            token: token,
        });

        revalidatePath("/dashboard/products");
        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao deletar o produto" };
    }
}
