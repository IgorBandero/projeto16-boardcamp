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
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

//#####################################################################################

export async function checkStock(req, res, next){

    const { gameId } = req.body;

    try {
        const game = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
        const gameStock = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId]);
        if (gameStock.rows.length >= game.rows[0].stockTotal){
            return res.status(400).send("Jogo sem estoque para aluguel!");
        }
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

//#####################################################################################

export async function checkRental(req, res, next){

    const { id } = req.params;

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if (rental.rows.length === 0){
            return res.sendStatus(404);
        }
        if (rental.rows[0].returnDate){
            res.sendStatus(400);
        }
        next();        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

//#####################################################################################

export async function checkRentalDelete(req, res, next){

    const { id } = req.params;

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if (rental.rows.length === 0){
            return res.sendStatus(404);
        }
        if (rental.rows[0].returnDate){
            res.sendStatus(400);
        }
        next();        
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

export default { checkCostumer, checkGame, checkStock, checkRental, checkRentalDelete};