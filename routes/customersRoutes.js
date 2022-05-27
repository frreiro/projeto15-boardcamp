import { Router } from "express";
import { insertCustomer, readCustomers } from "../controllers/customersControllers.js";
import { hasCustomer } from "../middlewares/customersMiddlewares.js";

const customersRouters = Router();


customersRouters.get('/customers', readCustomers);
customersRouters.post('/customers', hasCustomer, insertCustomer);

export default customersRouters;