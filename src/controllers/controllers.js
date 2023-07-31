import { db } from "../database/database.js";

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
            res.sendStatus(404);
        }
        res.send(gamesList.rows[0]);
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