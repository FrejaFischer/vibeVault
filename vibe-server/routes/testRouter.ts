import { Router } from "express";
import { Test } from "../entities/Test";
import { AppDataSource } from "../startup/data-source";

// THIS IS A TEST ROUTER

const testRouter = Router();

// Get the Test Entity (table)
const userRepo = AppDataSource.getRepository(Test);

// GET route, for getting all test users
testRouter.get("/", async (req, res) => {
  const users = await userRepo.find();
  // console.log("Fetched rows:", users); // See the fetched rows
  res.json({
    count: users.length,
    results: users,
  });
});

// POST a new user
testRouter.post("/", async (req, res) => {
  const { name, role } = req.body;

  // Basic backend validation
  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Name is required and must be a string" });
    return;
  }

  if (typeof role !== "string" || !role.trim()) {
    res.status(400).json({ error: "Role is required and must be a string" });
    return;
  }

  const newUser = userRepo.create({ name, role });

  try {
    const savedUser = await userRepo.save(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: "Could not save user", details: error });
  }
});

export default testRouter;
