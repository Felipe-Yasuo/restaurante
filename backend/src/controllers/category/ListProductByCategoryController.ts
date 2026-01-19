import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/category/ListProductByCategoryService";

class ListProductByCategoryController {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string

        const listProductByCategory = new ListProductByCategoryService();

        const products = await listProductByCategory.execute({
            category_id: category_id as string,
        });

        response.status(200).json(products);
    }
}

export { ListProductByCategoryController }
