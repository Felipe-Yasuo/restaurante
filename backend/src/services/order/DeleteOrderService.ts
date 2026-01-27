import prismaClient from "../../prisma/index";

interface DeleteOrderProps {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id }: DeleteOrderProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                },
            });

            if (!order) {
                throw new Error("Falha ao deletar o pedido");
            }

            await prismaClient.order.delete({
                where: {
                    id: order_id,
                },
            });

            return { message: "Pedido deletado com sucesso" };
        } catch (err) {
            console.log(err);
            throw new Error("Falha ao Deletar pedido");
        }
    }
}

export { DeleteOrderService };
