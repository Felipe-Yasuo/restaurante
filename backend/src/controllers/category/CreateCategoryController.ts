import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute({ name: name })

        response.status(201).json(category)

    }
}

export { CreateCategoryController }