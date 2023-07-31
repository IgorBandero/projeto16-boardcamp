import { Router } from "express";
import { getGames, registerGame, getCustomers, getCustomersById, registerCustomer, updateCustomer } from "../controllers/controllers.js";
import { checkRepeatedGame } from "../middlewares/validationGame.js";
import { checkRepeatedCostumer, checkRepeatedUpdatedCostumer } from "../middlewares/validationCustomer.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validationSchema(gameSchema), checkRepeatedGame, registerGame);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", validationSchema(customerSchema), checkRepeatedCostumer, registerCustomer);
router.put("/customers/:id", validationSchema(customerSchema), checkRepeatedUpdatedCostumer, updateCustomer);

export default router;