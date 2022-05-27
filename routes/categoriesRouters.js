import { Router } from "express";
import { insertCategory, readCategories } from "../controllers/categoriesController.js"
import { hasCategory } from "../middlewares/categoriesMiddlewares.js";



const categoriesRouters = Router();

//TODO: criar validações gerais -> joi -> body vazio 
categoriesRouters.get('/categories', readCategories);
categoriesRouters.post('/categories', hasCategory, insertCategory)

export default categoriesRouters;