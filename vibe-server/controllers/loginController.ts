import { Request, Response, RequestHandler } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../startup/data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * POST route for the login
 * @param req - Should include a body with email and password
 * @param res - Sends token if user login is valid, else sends error message
 */
export const postLogin: RequestHandler = async (req: Request, res: Response) => {
  // Check if .env file with token secret is available
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: "Server error - Please contact us." });
    return;
  }

  const SECRET_KEY = process.env.JWT_SECRET;
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

  // Get the User Entity (table)
  const userRepo = AppDataSource.getRepository(User);

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

  res.cookie("token", token, {
    httpOnly: true, // only accessible from server
    secure: true, // only send over HTTPS
    sameSite: "none", // CORS rules decide who can request
    maxAge: 3600000, // 1 hour from now
    expires: new Date(Date.now() + 3600000), // 1 hour from now
  });

  res.status(200).json({ message: "Login successful", user: { email: user.email } });
};
