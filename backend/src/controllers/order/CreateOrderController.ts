import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(request: Request, response: Response) {
        const { table, name } = request.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            table: Number(table),
            name: name
        });

        response.status(201).json(order);
    }
}

export { CreateOrderController }
