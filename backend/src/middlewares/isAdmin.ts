import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma/index"

export const isAdmin = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const user_id = request.user_id;

    if (!user_id) {
        response.status(401).json({
            error: "Usuário sem permissão"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: user_id
        }
    })

    if (!user) {
        response.status(401).json({
            error: "Usuário sem permissão"
        })
        return;
    }

    if (user.role !== "ADMIN") {
        response.status(401).json({
            error: "Usuário sem permissão"
        })
        return;
    }


    // Usuário é admin... então segue normal...
    next();

}