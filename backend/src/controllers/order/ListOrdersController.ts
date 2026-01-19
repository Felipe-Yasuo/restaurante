import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";


class ListOrdersController {
    async handle(request: Request, response: Response) {
        const draft = request.query?.draft as string | undefined;

        const listOrders = new ListOrdersService();

        const orders = await listOrders.execute({
            draft: draft
        })

        response.json(orders)

    }
}

export { ListOrdersController }