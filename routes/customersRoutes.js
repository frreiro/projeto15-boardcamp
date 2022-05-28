import { Router } from "express";
import { insertCustomer, readCustomers, updateCustomer, readOneCustomers } from "../controllers/customersControllers.js";
import { customerValidate, hasCustomer, hasEqualCpf, hasNoCustomer } from "../middlewares/customersMiddlewares.js";

const customersRouters = Router();


customersRouters.get('/customers', readCustomers);
customersRouters.get('/customers/:id', hasNoCustomer, readOneCustomers);
customersRouters.post('/customers', hasCustomer, customerValidate, insertCustomer);
customersRouters.put('/customers/:id', hasEqualCpf, customerValidate, updateCustomer)

export default customersRouters;