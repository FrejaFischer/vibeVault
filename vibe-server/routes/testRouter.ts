import { Router } from "express";
import { Test } from "../entities/Test";
import { AppDataSource } from "../startup/data-source";

const testRouter = Router();

// Get the Test Entity (table)
const userRepo = AppDataSource.getRepository(Test);

// GET route, for getting all test users
testRouter.get("/", async (req, res) => {
  const users = await userRepo.find();
  // console.log("Fetched rows:", users); // See the fetched rows
  res.json(users);
});

export default testRouter;
