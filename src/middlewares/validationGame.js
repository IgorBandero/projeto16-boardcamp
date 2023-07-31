import { db } from "../database/database.js";

export function validationSchema (schema){

    return (req, res, next) => {

        const { name, image, stockTotal, pricePerDay } = req.body;  

        if (!name || stockTotal <= 0 || pricePerDay <= 0){
            return res.sendStatus(400);
        }

        const validation = schema.validate(req.body, { abortEarly: false });

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }
        
        next();
    }
}

//#####################################################################################

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

export default { validationSchema, checkRepeatedGame };
