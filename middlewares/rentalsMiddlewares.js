import Joi from "joi";
import connection from "../database.js";

export async function rentValidate(req, res, next) {
    const body = req.body;

    try {
        const customersIdsObj = (await connection.query(`
        SELECT id from customers WHERE id = $1`, [body.customerId])).rows;

        const gamesIdsObj = (await connection.query(`
        SELECT id from customers WHERE id = $1`, [body.gameId])).rows;

        const customersIds = []
        for (const id of customersIdsObj) {
            customersIds.push(id.id);
        }

        const gamesIds = []
        for (const id of gamesIdsObj) {
            gamesIds.push(id.id);
        }

        const rentSchema = Joi.object({
            customerId: Joi.number().valid(...customersIds).required(),
            gameId: Joi.number().valid(...gamesIds).required(),
            daysRented: Joi.number().min(1).required()
        })

        const { error } = rentSchema.validate(body);
        if (error) return res.send(400).send('Falha ao cadastrar o aluguel');
        else next()
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }


}


export async function hasGameAvailable(req, res, next) {
    const { gameId } = req.body
    try {
        const rentals = (await connection.query(`
        SELECT games."stockTotal" , COUNT(*) AS "rentTotal" FROM rentals
        JOIN games ON "gameId" = games.id
        WHERE games.id = $1 AND "returnDate" is NULL
        GROUP BY games."stockTotal"`, [gameId])).rows[0];

        if (rentals.stockTotal <= rentals.rentTotal) res.status(400).send("Jogo não esta disponível");
        else next()

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function hasRent(req, res, next) {
    const { id } = req.params;

    try {
        const rent = (await connection.query(`
        SELECT id,"returnDate" FROM rentals WHERE id=$1`, [id])).rows[0];
        console.log(rent)
        if (!rent) return res.status(404).send("Falha ao encontrar o aluguel");
        else if (rent.returnDate) return res.status(400).send("Aluguel já finalizado");
        else next()
    } catch (e) {
        res.sendStatus(500);
    }
}


