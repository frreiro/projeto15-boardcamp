import { Router } from "express";
import { insertGame, readGames } from ".././controllers/gamesControllers.js";

const gamesRouters = Router();
//TODO: nome por query string
gamesRouters.get('/games', readGames);
gamesRouters.post('/games', insertGame);


export default gamesRouters;