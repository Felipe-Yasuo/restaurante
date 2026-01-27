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
})


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
})