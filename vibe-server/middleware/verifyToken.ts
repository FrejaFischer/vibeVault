import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

/**
 * Gets the users token from cookies and authenticate it with JWT secret
 * If valid token if found, sets the users id in request
 */
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    res.status(500).json({ error: "Server error - Contact support" });
    return;
  }

  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    if (!decoded.user_id || typeof decoded.user_id !== "number") {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req.userId = decoded.user_id;
    next(); // Tells the code to proceed and run the next process
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err });
    return;
  }
};
