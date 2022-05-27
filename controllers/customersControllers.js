import connection from '.././database.js'

export async function readCustomers(req, res) {
    try {
        const result = await connection.query(`
        SELECT * 
        FROM customers 
        `)
        res.send(result.rows);
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`
        INSERT INTO customers (name,phone,cpf,birthday)
        VALUES ($1, $2, $3, $4)
        `, [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);

    }

}