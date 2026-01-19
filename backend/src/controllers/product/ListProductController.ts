import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response) {
        const disabled = request.query.disabled as string | undefined;

        const listProduct = new ListProductService();

        const products = await listProduct.execute({
            disabled: disabled,
        });

        response.status(200).json(products);
    }
}

export { ListProductController }
