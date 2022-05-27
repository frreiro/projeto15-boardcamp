import connection from "../database.js";

export async function readGames(req, res) {
    try {
        const result = await connection.query(`
        SELECT * 
        FROM games
        `);

        res.send(result.rows);
    } catch (e) {
        res.sendStatus(500);
    }
}

//TODO: validar entrada por middleware
export async function insertGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);

    }
}