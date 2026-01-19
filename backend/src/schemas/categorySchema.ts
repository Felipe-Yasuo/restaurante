import { z } from 'zod';


export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string({ message: "Categoria precisa ser um texto" })
            .min(2, { message: "nome da categoria precisa ter 2 caracteres" })
    })
})

export const listProductByCategorySchema = z.object({
    query: z.object({
        category_id: z
            .string({ message: "O category_id é obrigatório" }),
    }),
});