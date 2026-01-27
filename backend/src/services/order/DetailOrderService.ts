import prismaClient from "../../prisma/index";

interface DetailOrderServiceProps {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailOrderServiceProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    draft: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    items: {
                        select: {
                            id: true,
                            amount: true,
                            createdAt: true,
                            updatedAt: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    description: true,
                                    banner: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!order) {
                throw new Error("Order nao encontrada");
            }

            return order;
        } catch (err) {
            console.log(err);
            throw new Error("Falha ao buscar detalhes da ordem")
        }
    }
}

export { DetailOrderService };

