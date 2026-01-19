import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { ListProductByCategoryController } from './controllers/category/ListProductByCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';


import { createUserSchema, authUserSchema } from './schemas/userSchema';
import { validateSchema } from './middlewares/validateSchema';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema, listProductByCategorySchema } from './schemas/categorySchema';
import { createProductSchema, listProductSchema } from './schemas/productSchema';
import { DeleteProductController } from './controllers/product/DeleteProductController';

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
    validateSchema(createProductSchema),
    new CreateProductController().handle);

router.get("/products",
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle);

router.delete(
    "/product",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
);

router.get("/category/product",
    isAuthenticated,
    validateSchema(listProductByCategorySchema),
    new ListProductByCategoryController().handle);



export { router };

