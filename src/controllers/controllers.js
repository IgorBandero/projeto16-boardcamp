import { db } from "../database/database.js";
import dayjs from "dayjs";
import { format, parseISO } from 'date-fns';

//#####################################################################################

export async function getGames(req, res){
    
    try{
        const gamesList = await db.query(`SELECT * FROM games;`);
        res.send(gamesList.rows);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function registerGame(req, res){
    
    const { name, image, stockTotal, pricePerDay } = req.body;  

    try{
        await db.query(`INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function getCustomers(req, res){

    try{
        const customersList = await db.query(`SELECT * FROM customers;`);

        customersList.rows.forEach((customer) => {
            customer.birthday = format(new Date(customer.birthday), 'yyyy-MM-dd');
        });

        console.log(customersList.rows);

        res.send(customersList.rows);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function getCustomersById(req, res){

    const { id } = req.params;

    try{
        const customersList = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        if (customersList.rows.length === 0){
            return res.sendStatus(404);
        }

        customersList.rows[0].birthday = format(new Date(customersList.rows[0].birthday), 'yyyy-MM-dd');

        res.status(200).send(customersList.rows[0]);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function registerCustomer(req, res){
    
    const { name, phone, cpf, birthday } = req.body;  

    try{
        await db.query(`INSERT INTO customers ("name", "phone", "cpf", "birthday") 
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function updateCustomer(req, res){

    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try{
        await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function getRentals (req, res){
    
    try{
        const rentalsList = await db.query(`SELECT rentals.*, games.name AS "gameName", customers.name AS "customerName" FROM rentals
                                            JOIN customers ON rentals."customerId" = customers.id
                                            JOIN games ON rentals."gameId" = games.id;`);

        const rentalsComplete = rentalsList.rows.map((rental) => {

            rental.rentDate = format(new Date(rental.rentDate), 'yyyy-MM-dd');

            const rentalFinal = {

                ...rental,

                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },

                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }

            }

            delete rentalFinal.customerName;
            delete rentalFinal.gameName;

            return rentalFinal;

        });   

        res.send(rentalsComplete);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################


export async function registerRental(req, res){
    
    const { customerId, gameId, daysRented } = req.body; 

    try{
        const gameFound = await db.query('SELECT * FROM games WHERE "id" = $1;', [gameId]);
        const game = gameFound.rows[0];
        const pricePerDay = game.pricePerDay;
        const stockAvailable = game.stockTotal - 1;

        const rentDate = dayjs().format('YYYY-MM-DD');
        const originalPrice = pricePerDay * daysRented;

        if (stockAvailable >= 0){
            await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, null, $5, null);`, [customerId, gameId, rentDate, daysRented, originalPrice]);        
        
            await db.query(`UPDATE games SET name = $1, image = $2, "stockTotal" = $3, "pricePerDay" = $4 WHERE id = $5;`, [game.name, game.image, stockAvailable, game.pricePerDay, game.id]);
        }    
        else {
            return res.sendStatus(400);
        }    

        res.sendStatus(201);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function returnGame(req, res){
    
    const { id } = req.params; 

    try{
        const rental = await db.query('SELECT * FROM rentals WHERE "id" = $1;', [id]);
        const game = await db.query('SELECT * FROM games WHERE "id" = $1;', [rental.rows[0].gameId]);
       
        const today = dayjs().format('YYYY-MM-DD');

        const delayDays = (dayjs().diff(dayjs(rental.rows[0].rentDate), 'days') - rental.rows[0].daysRented);

        // Alterar a delayFee
        const delayFee = delayDays * game.rows[0].pricePerDay;

        await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`, [today, delayFee, id]);
        
        res.status(200).send(rental.rows);

    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function deleteRental(req, res){

    const { id } = req.params;

    try {
        await db.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
        res.sendStatus(200);
    }
    catch(error){
        res.status(500).send(error.message);
    }   

}