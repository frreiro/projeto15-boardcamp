import connection from '.././database.js'

//TODO: Validar o joi o body

//TODO: validar mais de um parâmetro (nome, cpf e telefone)
export async function hasCustomer(req, res, next) {
    const { cpf } = req.body;

    try {
        const result = await connection.query(` 
        SELECT cpf
        FROM customers
        WHERE cpf = $1
        `, [cpf]);

        if (result.rows.length > 0) return res.status(409).send('Usuário já cadastrada')
        else next();

    } catch (e) {
        res.sendStatus(500);
    }
}