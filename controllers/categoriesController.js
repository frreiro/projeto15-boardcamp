import connection from '.././database.js'


export async function readCategories(req, res) {
    try {
        const result = await connection.query(`
        SELECT * 
        FROM categories 
        ORDER BY id ASC
        `)
        res.send(result.rows);

    } catch (e) {
        res.sendStatus(500);
    }
}


export async function insertCategory(req, res) {
    const { name } = req.body;

    try {
        await connection.query(` 
        INSERT INTO categories (name) VALUES ($1)
        `, [name])

        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}