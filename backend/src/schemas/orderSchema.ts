import { z } from 'zod';

export const createOrderSchema = z.object({
    body: z.object({
        table: z
            .number({ message: "O numero da mesa é obrigatório" })
            .int({ message: "O número da mesa deve ser um número inteiro" })
            .positive({ message: "O número da mesa deve ser positivo" }),
        name: z
            .string().optional(),
    })
});


export const addItemSchema = z.object({
    body: z.object({
        order_id: z
            .string({ message: "Order deve ser uma string" })
            .min(1, "A order_id deve ser obrigatória"),
        product_id: z
            .string({ message: "Produto deve ser uma string" })
            .min(1, "A id do produto deve ser obrigatória"),
        amount: z
            .number()
            .int("Quantidade deve ser um numero inteiro")
            .positive("Quantidade deve ser um numero positivo")
    })
});

export const removeItemSchema = z.object({
    query: z.object({
        item_id: z
            .string({ message: "Item IDdeve ser uma string" })
            .min(1, "O item_id deve ser obrigatório"),
    }),
});

export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z
            .string({ message: "Order deve ser uma string" })
            .min(1, "O order_id deve ser obrigatório"),
    }),
});

export const sendOrderSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "ID do pedido precisa ser uma string" }),
        name: z.string({ message: "O nome precisa ser um texto" }),
    }),
});
