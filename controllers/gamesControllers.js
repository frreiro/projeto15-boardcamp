import connection from "../database.js";

export async function readGames(req, res) {
    const { name } = req.query;
    console.log(name)

    try {
        if (name) {
            const result = await connection.query(`
            SELECT * 
            FROM games
            WHERE name LIKE ''||$1||'%';
            `, [name]);

            return res.send(result.rows);
        } else {
            const result = await connection.query(`
            SELECT * 
            FROM games
            `);

            return res.send(result.rows);
        }
    } catch (e) {
        console.log(e)
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