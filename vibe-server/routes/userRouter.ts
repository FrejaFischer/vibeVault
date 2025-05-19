import { Router } from "express";
import { postUser } from "../controllers/userController";

const userRouter = Router();

// POST route for users
userRouter.post("/", postUser);

export default userRouter;
