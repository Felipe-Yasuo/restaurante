import { z } from 'zod';


export const createProductSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, { message: "O nome do produto precisa ser um texto" }),
        price: z
            .string()
            .min(1, { message: "o valor do produto é obrigatório" }).regex(/^\d+$/),
        description: z
            .string()
            .min(1, { message: "A descrição do produto é obrigtório" }),
        category_id: z
            .string({ message: "A Categoria do produto é obrigatória" })
    })
})

export const listProductSchema = z.object({
    query: z.object({
        disabled: z
            .enum(["true", "false"], {
                message: "O parâmetro disabled deve ser 'true' ou 'false'",
            })
            .optional()
            .default("false")
            .transform((val) => val === "true"),
    }),
});