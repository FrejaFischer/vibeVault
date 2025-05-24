import { Router } from "express";
import { postLogin } from "../controllers/loginController";

const loginRouter = Router();

// POST route for users
loginRouter.post("/", postLogin);
console.log("loginRouter");

export default loginRouter;
