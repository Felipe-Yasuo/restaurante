import { Request, Response } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(request: Request, response: Response) {
        const { user_id } = request.body;

        const detailUser = new DetailUserService();

        const user = await detailUser.execute(user_id!)

        response.json(user)
    }
}

export { DetailUserController }