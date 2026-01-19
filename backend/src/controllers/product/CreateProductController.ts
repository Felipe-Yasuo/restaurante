import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id } = request.body;

        if (!request.file) {
            throw new Error("A imagem do produto é obrigatória")
        }

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name: name,
            price: parseInt(price), // Converte string para Int para ter o valor em centavos
            description: description,
            category_id: category_id,
            imageBuffer: request.file.buffer,
            imageName: request.file.originalname
        });

        response.json(product)

    }
}

export { CreateProductController }