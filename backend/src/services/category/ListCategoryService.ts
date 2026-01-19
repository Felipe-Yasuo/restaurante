import prismaClient from "../../prisma/index";

class ListCategoryService {
    async execute() {
        try {
            const categories = await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return categories;
        } catch (err) {
            throw new Error("Falha ao listar categorias")
        }
    }
}

export { ListCategoryService }
