import { Response, Request } from "express"
import { DeleteProductService } from '../../services/product/DeleteProductService'


class DeleteProductController {
    async handle(request: Request, response: Response) {

        const product_id = request.query?.product_id as string

        const deleteProduct = new DeleteProductService()

        const product = await deleteProduct.execute({ product_id: product_id })

        response.status(200).json(product)

    }
}

export { DeleteProductController }