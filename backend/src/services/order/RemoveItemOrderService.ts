import prismaClient from "../../prisma/index";

interface RemoveItemProps {
    item_id: string;
}

class RemoveItemOrderService {
    async execute({ item_id }: RemoveItemProps) {
        try {
            const itemExists = await prismaClient.item.findFirst({
                where: {
                    id: item_id
                }
            });

            if (!itemExists) {
                throw new Error("Item nao encontrado");
            }

            await prismaClient.item.delete({
                where: {
                    id: item_id
                },
            });

            return { message: "Item removido com Sucesso" }
        } catch (err) {
            console.log(err);
            throw new Error("Falha ao remover item do pedido");
        }
    }
}

export { RemoveItemOrderService };

