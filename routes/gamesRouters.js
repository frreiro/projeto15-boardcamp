import { Router } from "express";
import { insertGame, readGames } from ".././controllers/gamesControllers.js";

const gamesRouters = Router();

gamesRouters.get('/games', readGames);
gamesRouters.post('/games', insertGame);


export default gamesRouters;