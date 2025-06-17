import { Router } from "express";
import { postLogout } from "../controllers/logoutController";

const logoutRouter = Router();

// POST route for users
logoutRouter.post("/", postLogout);

export default logoutRouter;
