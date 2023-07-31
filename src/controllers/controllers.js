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

