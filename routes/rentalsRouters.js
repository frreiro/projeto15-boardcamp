import { Router } from "express";
import { readRentals, insertRent, returnRent, deleteRent } from "../controllers/rentalsControllers.js";
import { hasGameAvailable, hasRent, rentValidate } from "../middlewares/rentalsMiddlewares.js";


const rentalsRouters = Router();

rentalsRouters.get('/rentals', readRentals)
rentalsRouters.post('/rentals', hasGameAvailable, rentValidate, insertRent)
rentalsRouters.post('/rentals/:id/return', hasRent, returnRent)
rentalsRouters.delete('/rentals/:id', hasRent, deleteRent)


export default rentalsRouters;