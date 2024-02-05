import { Router } from "express";
import {
  ChangeUserPasswordController,
  CreateUserController,
  FindUserByIdController,
  findAllUsersController,
  updateAllUsersController,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  checkUserExists,
  verifyIfCanAddTeacher,
} from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post(
  "/register",
  authMiddleware,
  verifyIfCanAddTeacher,
  checkUserExists,
  CreateUserController
);
userRouter.put("/changepassword", authMiddleware, ChangeUserPasswordController);
userRouter.get("/all", authMiddleware, findAllUsersController);
userRouter.put(
  "/update",
  authMiddleware,
  verifyIfCanAddTeacher,
  updateAllUsersController
);
userRouter.get("/finduser", authMiddleware, FindUserByIdController);

export default userRouter;
