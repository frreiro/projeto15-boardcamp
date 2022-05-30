import connection from '.././database.js'
import Joi from "joi";

export async function emptyBodyValidate(req, res, next) {
    const body = req.body;

    const categorySchema = Joi.object({ name: Joi.string().required() })
    const { error } = categorySchema.validate(body);
    if (error) return res.status(400).send('Falha ao cadastrar a categoria')
    else next();

}

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