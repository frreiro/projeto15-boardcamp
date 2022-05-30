import JoiBasic from 'joi';
import JoiDate from '@joi/date';
import connection from '.././database.js'
const Joi = JoiBasic.extend(JoiDate);

export async function hasNoCustomer(req, res, next) {
    const { id } = req.params;

    const idSchema = Joi.number().required();
    const { error } = idSchema.validate(id);
    if (error) return res.sendStatus(400)

    try {
        const result = await connection.query(` 
        SELECT cpf
        FROM customers
        WHERE id = $1
        `, [id]);

        if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado')
        else next();

    } catch (e) {
        res.sendStatus(500);
    }
}


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

export async function customerValidate(req, res, next) {
    const body = req.body;

    const customerShema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
        cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
        birthday: Joi.date().format('YYYY-MM-DD').max('now')
    })

    const { error } = customerShema.validate(body)
    if (error) return res.status(400).send('Falha ao cadastrar o usuário');
    else next();
}


export async function hasEqualCpf(req, res, next) {
    const { id } = req.params
    const { cpf } = req.body;

    try {
        const result = await connection.query(` 
        SELECT cpf
        FROM customers
        WHERE cpf = $1 and id != $2
        `, [cpf, id]);

        if (result.rows.length > 0) return res.status(409).send('Cpf já cadastrada')
        else next();

    } catch (e) {
        res.sendStatus(500);
    }
}