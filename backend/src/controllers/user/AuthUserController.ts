import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const authService = new AuthUserService()

        const session = await authService.execute({ email, password })

        response.json({ session })

    }
}

export { AuthUserController }