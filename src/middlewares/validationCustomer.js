import { db } from "../database/database.js";

export async function checkRepeatedCostumer(req, res, next){

    const { name } = req.body;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE name = $1;`, [name]);
        console.log(customer.rows[0]);
        if (customer.rows.length > 0){
            res.status(409).send("Cliente já existe!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }

} 