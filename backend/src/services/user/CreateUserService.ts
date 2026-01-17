import prismaClient from "../../prisma/index";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserProps) {

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if (userAlreadyExists) {
            throw new Error("Usuário já existe")
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        })

        return user.name;
    };
}

export { CreateUserService };