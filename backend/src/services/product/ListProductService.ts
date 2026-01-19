import prismaClient from "../../prisma/index";

interface ListProductServiceProps {
    disabled?: string;
}

class ListProductService {
    async execute({ disabled }: ListProductServiceProps) {
        try {
            const products = await prismaClient.product.findMany({
                where: {
                    disabled: disabled === "true" ? true : false
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
            throw new Error("Falha ao listar produtos")
        }
    }
}

export { ListProductService }
