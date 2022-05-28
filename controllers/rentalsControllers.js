
import connection from "../database.js";
import dayjs from "dayjs";

//TODO: fazer middlewares
export async function readRentals(req, res) {
    const { customerId } = req.query
    const { gameId } = req.query

    try {
        let rentals = null;
        if (customerId) rentals = await readCustomerId(customerId);
        else if (gameId) rentals = await readGameId(gameId)
        else rentals = await readAll();

        const totalRental = []
        for (const rental of rentals) {
            const gameObj = JSON.parse(rental.game);
            const customerObj = JSON.parse(rental.customer);
            totalRental.push({ ...rental, game: gameObj, customer: customerObj });
        }

        res.send(totalRental).status(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

async function readAll() {
    const resultRentals = await connection.query(`
        SELECT rentals.*
        , '{"id": "'|| games.id ||'","name":"'|| games.name ||'","categoryId":"'|| games."categoryId"|| '","categoryName":"' || categories.name ||'"}' as game 
        , '{"id": "'|| customers.id ||'","name":"'|| customers.name ||'"}' as customer
        FROM rentals 
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        JOIN customers ON rentals."customerId" = customers.id
        `);
    return resultRentals.rows;
}

async function readCustomerId(id) {
    const resultRentals = await connection.query(`
    SELECT rentals.*
    , '{"id": "'|| games.id ||'","name":"'|| games.name ||'","categoryId":"'|| games."categoryId"|| '","categoryName":"' || categories.name ||'"}' as game 
    , '{"id": "'|| customers.id ||'","name":"'|| customers.name ||'"}' as customer
    FROM rentals 
    JOIN games ON rentals."gameId" = games.id
    JOIN categories ON games."categoryId" = categories.id
    JOIN customers ON rentals."customerId" = customers.id
    WHERE customers.id = $1
    `, [id]);
    return resultRentals.rows;
}

async function readGameId(id) {
    const resultRentals = await connection.query(`
    SELECT rentals.*
    , '{"id": "'|| games.id ||'","name":"'|| games.name ||'","categoryId":"'|| games."categoryId"|| '","categoryName":"' || categories.name ||'"}' as game 
    , '{"id": "'|| customers.id ||'","name":"'|| customers.name ||'"}' as customer
    FROM rentals 
    JOIN games ON rentals."gameId" = games.id
    JOIN categories ON games."categoryId" = categories.id
    JOIN customers ON rentals."customerId" = customers.id
    WHERE games.id = $1
    `, [id]);
    return resultRentals.rows;
}
//TODO: Validar no middleware
export async function insertRent(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const gamePrice = (await connection.query(`
        SELECT "pricePerDay" FROM games WHERE id=$1`, [gameId])).rows[0];

        const originalPrice = gamePrice.pricePerDay * daysRented;
        const rentDate = dayjs().format('YYYY-MM-DD');
        const returnDate = null;
        const delayFee = null;
        await connection.query(`
            INSERT INTO rentals ("customerId","gameId","rentDate" ,"returnDate","originalPrice","delayFee", "daysRented")
            VALUES ($1,$2,$3,$4,$5,$6, $7);
        `, [customerId, gameId, rentDate, returnDate, originalPrice, delayFee, daysRented]);

        res.sendStatus(201);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

    console.log()
}


//TODO: Descobrir como diferencia as datas
//TODO: middlewares
export async function returnRent(req, res) {
    const { id } = req.params;


    try {
        const rental = (await connection.query(`
        SELECT "daysRented", "returnDate", "delayFee", "rentDate", "originalPrice"
        FROM rentals
        WHERE id = $1`, [id])).rows[0];

        const { delayFee, returnDate } = calculateTaxes(rental)
        console.log(delayFee, returnDate)

        await connection.query(`
        UPDATE rentals 
        SET  "delayFee"=$1, "returnDate"=$2
        WHERE id=$3
        `, [delayFee, returnDate, id])

        res.sendStatus(201);

    } catch (e) {
        console.log(e)
        res.sendStatus(500);

    }
}


function calculateTaxes(rental) {
    const rentDate = dayjs(rental.rentDate).format('YYYY-MM-DD');
    const pricePerDay = rental.originalPrice / rental.daysRented;

    const today = dayjs(new Date())
    const dateRent = dayjs(rentDate);
    const daysDiff = today.diff(dateRent.add(rental.daysRented, 'days'), 'days');

    let delayFee = null
    if (daysDiff > 0) delayFee = pricePerDay * daysDiff;

    return { delayFee, returnDate: today.format('YYYY-MM-DD') }
}