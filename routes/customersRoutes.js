import { Router } from "express";
import { insertCustomer, readCustomers, updateCustomer } from "../controllers/customersControllers.js";
import { hasCustomer } from "../middlewares/customersMiddlewares.js";

const customersRouters = Router();


customersRouters.get('/customers', readCustomers);
customersRouters.post('/customers', hasCustomer, insertCustomer);
customersRouters.put('/customers/:id', updateCustomer)

export default customersRouters;