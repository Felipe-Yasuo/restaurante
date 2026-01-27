import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService";

class RemoveItemController {
    async handle(request: Request, response: Response) {
        const { item_id } = request.query

        const removeItem = new RemoveItemOrderService();

        const result = await removeItem.execute({
            item_id: item_id as string,
        });

        response.status(200).json(result);
    }
}

export { RemoveItemController };

