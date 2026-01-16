import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ message: "Nome é obrigatório" })
            .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
        email: z.email({ message: "Email inválido" }),
        password: z
            .string({ message: "A senha é obrigatório" })
            .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    })
});

