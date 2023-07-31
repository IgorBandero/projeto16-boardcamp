import { db } from "../database/database.js";

export async function checkRepeatedCostumer(req, res, next){

    const { cpf } = req.body;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (customer.rows.length > 0){
            res.status(409).send("Cliente já existe!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

//#####################################################################################

export async function checkRepeatedUpdatedCostumer(req, res, next){

    const { cpf } = req.body;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (customer.rows.length > 0){
            res.status(409).send("Cliente já existe!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 