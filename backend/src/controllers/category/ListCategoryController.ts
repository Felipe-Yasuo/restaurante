import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(request: Request, response: Response) {
        const listCategory = new ListCategoryService();

        const categories = await listCategory.execute();

        response.json(categories)
    }
}

export { ListCategoryController }
