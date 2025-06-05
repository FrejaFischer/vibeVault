import { Router } from "express";
import { postLogin } from "../controllers/loginController";

const loginRouter = Router();

// POST route for users
loginRouter.post("/", postLogin);

export default loginRouter;
