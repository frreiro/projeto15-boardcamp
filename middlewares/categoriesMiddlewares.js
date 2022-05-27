import connection from '.././database.js'

//TODO: Validar o joi o body

export async function hasCategory(req, res, next) {
    const { name } = req.body;

    try {
        const result = await connection.query(` 
        SELECT name
        FROM categories
        WHERE name = $1
        `, [name]);

        if (result.rows.length > 0) return res.status(409).send('Categoria já cadastrada')
        else next();

    } catch (e) {
        res.sendStatus(500);
    }
}