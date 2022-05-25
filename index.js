import chalk from "chalk";
import express from "express";
import dotenv from "dotenv"

dotenv.config();
const app = express();


const port = process.env.PORT;
app.listen(port, () => console.log(chalk.bold.green(`Server on port ${port} is running...`)));