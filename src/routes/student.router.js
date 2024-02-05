import { Router } from "express";
import {
  allStudentsController,
  registerStudentController,
} from "../controllers/student.controller.js";
import {
  authMiddleware,
  verifyIfCanAddStudent,
} from "../middleware/auth.middleware.js";

const studentRouter = Router();

studentRouter.post(
  "/register",
  authMiddleware,
  verifyIfCanAddStudent,
  registerStudentController
);
studentRouter.get("/all", allStudentsController);

export default studentRouter;
