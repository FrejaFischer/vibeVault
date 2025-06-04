import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";

/**
 * GET route for checking authentication
 * @param req - Should include a token inside a cookie
 * @param res - Sends teh decoded user if token in cookie is valid, else sends error message
 */
export const getAuth: RequestHandler = async (req: Request, res: Response) => {
  // Check if .env file with token secret is available
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: "Server error - Please contact us." });
    return;
  }

  const SECRET_KEY = process.env.JWT_SECRET;
  const token = req.cookies.token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ user: decoded });
  } catch {
    res.sendStatus(401);
  }
};
