import chalk from "chalk";
import express from "express";
import dotenv from "dotenv"
import categoriesRouters from "./routes/categoriesRouters.js";
import gamesRouters from "./routes/gamesRouters.js";
import customersRouters from "./routes/customersRoutes.js";



dotenv.config();
const app = express();
app.use(express.json())
app.use(categoriesRouters);
app.use(gamesRouters);
app.use(customersRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(chalk.bold.green(`Server on port ${port} is running...`)));