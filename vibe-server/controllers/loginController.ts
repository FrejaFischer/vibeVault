import { Request, Response, RequestHandler } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../startup/data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get the User Entity (table)
const userRepo = AppDataSource.getRepository(User);

// POST a new user
export const postLogin: RequestHandler = async (req: Request, res: Response) => {
  const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
  const { email, password } = req.body;

  // Backend validation
  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email is required and must be a string" });
    return;
  }

  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password is required and must be a string" });
    return;
  }

  // Check if user exist (if users deleted_at is not empty, Typeorm exclude them automatically)
  const user = await userRepo.findOneBy({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // Check if password is a match
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // Create Json Web Token
  const token = jwt.sign({ user_id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  // Send token
  res.json({ token });
};
