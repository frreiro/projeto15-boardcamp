import connection from '.././database.js'

export async function readCustomers(req, res) {
    const { cpf } = req.query;

    try {

        if (cpf) {
            const result = await connection.query(`
            SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday 
            FROM customers
            WHERE cpf LIKE $1||'%'
            `, [cpf])
            res.send(result.rows);

        } else {
            const result = await connection.query(`
            SELECT * 
            FROM customers 
            `)
            res.send(result.rows);
        }
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
export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`
        UPDATE customers 
        SET 
        name=$1, phone=$2, cpf=$3, birthday=$4
        WHERE id=$5
        `, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function readOneCustomers(req, res) {
    const { id } = req.params;
    try {
        const result = await connection.query(`
        SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday 
        FROM customers
        WHERE customers.id = $1
        `, [id])

        res.send(result.rows[0]);
    } catch (e) {
        res.sendStatus(500);
    }
}