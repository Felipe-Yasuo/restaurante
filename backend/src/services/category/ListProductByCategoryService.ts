import prismaClient from "../../prisma/index";

interface ListProductByCategoryServiceProps {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryServiceProps) {
        try {
            // Verifica se a categoria existe
            const categoryExists = await prismaClient.category.findFirst({
                where: {
                    id: category_id
                }
            });

            if (!categoryExists) {
                throw new Error("Categoria não encontrada!");
            }

            const products = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    disabled: false,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    disabled: true,
                    category_id: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return products;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("Falha ao listar produtos da categoria")
        }
    }
}

export { ListProductByCategoryService }
