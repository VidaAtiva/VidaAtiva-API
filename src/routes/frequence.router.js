import Router from "express";
import {
  addFrequencesController,
  allFrequencesOnTheMonth,
  allFrequencesOnTheWeek,
  findAllFrequencesByDateController,
} from "../controllers/frequence.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const frequenceRouter = Router();

frequenceRouter.get("/consult", findAllFrequencesByDateController);
frequenceRouter.post("/add", authMiddleware, addFrequencesController);
frequenceRouter.get("/allmonth", allFrequencesOnTheMonth);
frequenceRouter.get("/allweek", allFrequencesOnTheWeek);

export default frequenceRouter;
