import { db } from "../database/database.js";

export async function checkCostumer(req, res, next){

    const { customerId } = req.body;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if (customer.rows.length === 0){
            res.status(400).send("Cliente não existe!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

//#####################################################################################

export async function checkGame(req, res, next){

    const { gameId } = req.body;

    try {
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        if (game.rows.length === 0){
            return res.status(400).send("Jogo não existe!");
        }
        if (game.rows[0].stockTotal === 0){
            res.status(400).send("Jogo esgotado para aluguel!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

export default { checkCostumer, checkGame };