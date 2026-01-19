import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
    draft?: string;
}


class ListOrdersService {
    async execute({ draft }: ListOrdersServiceProps) {

        const order = await prismaClient.order.findMany({
            where: {
                draft: draft === "true" ? true : false
            },
            select: {
                id: true,
                table: true,
                name: true,
                draft: true,
                status: true,
                createdAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                description: true,
                                banner: true,
                            }
                        }
                    }
                }
            }
        })
        return order;
    }
}

export { ListOrdersService }