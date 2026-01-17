import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, _: Request, response: Response) => {

    if (error instanceof Error) {
        return response.status(400).json({
            error: error.message,
        })
    }

    return response.status(500).json({
        error: "Innternal server error"
    })
})

const PORT = process.env.PORT! || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});