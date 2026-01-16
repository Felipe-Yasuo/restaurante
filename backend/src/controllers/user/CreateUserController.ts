import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
    async handle(request: Request, response: Response) {

        const { name, email, password } = request.body;

        console.log(name, email, password);

        const createUserService = new CreateUserService();

        const user = await createUserService.execute();
        response.json({ message: user });
    }
}

export { CreateUserController };