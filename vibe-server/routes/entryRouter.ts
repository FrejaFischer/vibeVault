import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createEntry, getEntries, getEntryById } from "../controllers/entryController";

const entryRouter = Router();

// Use verifyToken middleware to authenticate token before running the requests
entryRouter.get("/", verifyToken, getEntries);
entryRouter.post("/", createEntry); // TO DO - add verifyToken
entryRouter.get("/:entry_id", getEntryById); // TO DO - add verifyToken

// import { Router, Request, Response } from "express";
// import { Entry } from "../entities/Entry";
// import { AppDataSource } from "../startup/data-source";

// // Param types
// interface UserIdParams {
//   user_id: string;
// }

// const entryRouter = Router({ mergeParams: true });

// // Get the Entry Entity (table)
// const entryRepo = AppDataSource.getRepository(Entry);

// // GET route, for getting all entries from a user id
// entryRouter.get("/", async (req: Request<UserIdParams>, res: Response) => {
//   const userId = Number(req.params.user_id); // get user_id from URL and convert to number

//   // Check if the userId is not a number
//   if (isNaN(userId)) {
//     res.status(400).json({ error: "Invalid user_id" });
//     return;
//   }

//   // Find entries with that user_id
//   const entries = await entryRepo.find({
//     where: { user: { user_id: userId } }, // the relation `user` is from the Entry entity
//   });
//   // send reponse of entries
//   res.json({
//     count: entries.length,
//     results: entries,
//   });
// });

export default entryRouter;
