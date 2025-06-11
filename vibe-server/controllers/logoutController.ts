import { Request, Response, RequestHandler } from "express";

/**
 * POST route for the logout
 * @param req - Should include
 * @param res - Sends
 */
export const postLogout: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};
