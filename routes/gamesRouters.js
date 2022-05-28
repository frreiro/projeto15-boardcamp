import { Router } from "express";
import { insertGame, readGames } from ".././controllers/gamesControllers.js";
import { hasGame, gameValidate } from ".././middlewares/gamesMiddlewares.js"

const gamesRouters = Router();

gamesRouters.get('/games', readGames);
gamesRouters.post('/games', gameValidate, hasGame, insertGame);


export default gamesRouters;