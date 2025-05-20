import { Router } from "express";
import { getTracks } from "../controllers/trackController";

const trackRouter = Router();

trackRouter.get("/", getTracks); // GET route, for getting all albums, handles optional search query

export default trackRouter;
