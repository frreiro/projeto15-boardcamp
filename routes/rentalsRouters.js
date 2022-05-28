import { Router } from "express";
import { readRentals, insertRent, returnRent, deleteRent } from "../controllers/rentalsControllers.js";


const rentalsRouters = Router();

rentalsRouters.get('/rentals', readRentals)
rentalsRouters.post('/rentals', insertRent)
rentalsRouters.post('/rentals/:id/return', returnRent)
rentalsRouters.delete('/rentals/:id', deleteRent)


export default rentalsRouters;