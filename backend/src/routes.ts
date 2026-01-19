import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateProductController } from './controllers/product/CreateProductController';


import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';


const router = Router();
const upload = multer(uploadConfig)


// Rotas Users
router.post('/users', validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);


// Rotas Category
router.post("/category",
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle);


// Rotas Product
router.post("/product",
    isAuthenticated,
    isAdmin,
    upload.single('file'),
    new CreateProductController().handle);

export { router };

