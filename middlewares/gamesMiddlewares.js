import connection from '.././database.js'
import Joi from 'joi';


//TODO: validar por joi o body
export async function gameValidate(req, res, next) {
    const body = req.body;

    try {
        const ids = (await connection.query(`SELECT id FROM categories`)).rows

        const categoriesIds = [];
        for (const objectId of ids) {
            categoriesIds.push(objectId.id);
        }

        const gamesSchema = Joi.object({
            name: Joi.string().required(),
            image: Joi.string().uri().required(),
            stockTotal: Joi.number().integer().min(1).required(),
            categoryId: Joi.number().integer().valid(...categoriesIds).required(),
            pricePerDay: Joi.number().integer().min(1).required(),
        })

        const { error } = gamesSchema.validate(body);
        if (error) return res.status(400).send('Falha ao cadastrar o jogo')
        else next();
    } catch (e) {
        res.sendStatus(500);
    }

}

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