import { Router } from "express";
import { getAuth } from "../controllers/authController";

const entryRouter = Router();

entryRouter.get("/", getAuth);

export default entryRouter;
