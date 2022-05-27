import connection from '.././database.js'


//TODO: validar por joi o body


//TODO: descobrir um jeito de refatorar esse middleware com o de categorias
export async function hasGame(req, res, next) {
    const { name } = req.body;

    try {
        const result = await connection.query(` 
        SELECT name
        FROM games
        WHERE name = $1
        `, [name]);

        if (result.rows.length > 0) return res.status(409).send('Jogo já cadastrada')
        else next();

    } catch (e) {
        res.sendStatus(500);
    }
}