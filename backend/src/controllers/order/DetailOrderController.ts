import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(request: Request, response: Response) {
        const { order_id } = request.query;

        const detailOrder = new DetailOrderService();

        const order = await detailOrder.execute({
            order_id: order_id as string,
        });

        response.status(200).json(order);
    }
}

export { DetailOrderController };

