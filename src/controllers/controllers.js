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
        await db.query(`UPDATE customers SET (name = $1, phone = $2, cpf = $3, birthday = $4) WHERE id = $5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

export async function getRentals (req, res){
    
    try{
        const rentalsList = await db.query(`SELECT * FROM rentals;`);
        res.send(rentalsList.rows);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//#####################################################################################

/*
export async function registerRent(req, res){
    
    const { customerId, gameId, daysRented } = req.body;  

    try{
        await db.query(`INSERT INTO customers ("name", "phone", "cpf", "birthday") 
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
*/