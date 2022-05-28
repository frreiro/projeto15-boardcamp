import { Router } from "express";
import { insertCategory, readCategories } from "../controllers/categoriesController.js"
import { hasCategory, emptyBodyValidate } from "../middlewares/categoriesMiddlewares.js";



const categoriesRouters = Router();

categoriesRouters.get('/categories', readCategories);
categoriesRouters.post('/categories', emptyBodyValidate, hasCategory, insertCategory)

export default categoriesRouters;