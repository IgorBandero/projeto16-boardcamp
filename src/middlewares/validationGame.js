import { db } from "../database/database.js";

export async function checkRepeatedGame(req, res, next){

    const { name } = req.body;

    console.log(name);

    try {
        const game = await db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
        console.log(game.rows[0]);
        if (game.rows.length > 0){
            res.status(409).send("Jogo já existe!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 
