import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import studentRouter from "./student.router.js";
import frequenceRouter from "./frequence.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/frequence", frequenceRouter);

export default router;
