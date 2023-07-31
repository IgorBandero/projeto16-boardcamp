import { Router } from "express";
import { getGames, registerGame, getCustomers, getCustomersById, registerCustomer, updateCustomer, 
        getRentals, registerRental } from "../controllers/controllers.js";
import { checkRepeatedGame } from "../middlewares/validationGame.js";
import { checkRepeatedCostumer, checkRepeatedUpdatedCostumer } from "../middlewares/validationCustomer.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { checkCostumer, checkGame, checkStock} from "../middlewares/validationRental.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validationSchema(gameSchema), checkRepeatedGame, registerGame);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", validationSchema(customerSchema), checkRepeatedCostumer, registerCustomer);
router.put("/customers/:id", validationSchema(customerSchema), checkRepeatedUpdatedCostumer, updateCustomer);
router.get("/rentals", getRentals);
router.post("/rentals", validationSchema(rentalSchema), checkCostumer, checkGame, checkStock, registerRental);


export default router;