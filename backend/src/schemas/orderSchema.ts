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
