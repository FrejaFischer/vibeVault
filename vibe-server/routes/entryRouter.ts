import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createEntry, getEntries, getEntryById, updateEntry, getTracksByEntryId } from "../controllers/entryController";

const entryRouter = Router();

entryRouter.get("/", verifyToken, getEntries);
entryRouter.post("/", verifyToken, createEntry);
entryRouter.put("/", verifyToken, updateEntry);
entryRouter.get("/:entry_id", verifyToken, getEntryById);
entryRouter.get("/:entry_id/tracks", verifyToken, getTracksByEntryId);

export default entryRouter;
