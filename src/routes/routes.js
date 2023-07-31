import { Router } from "express";
import { getGames, registerGame, getCustomers } from "../controllers/controllers.js";
import { validationSchema, checkRepeatedGame } from "../middlewares/validationGame.js";
import { gameSchema } from "../schemas/gameSchema.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validationSchema(gameSchema), checkRepeatedGame, registerGame);
router.get("/customers", getCustomers);

export default router;