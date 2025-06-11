import { Request, Response, RequestHandler } from "express";

/**
 * POST route for the logout
 * @param res - Sends 200 succes message if succes
 */
export const postLogout: RequestHandler = async (req: Request, res: Response) => {
  let secure = true;
  if (process.env.RTE) {
    const isTest = process.env.RTE === "test";

    if (isTest) {
      secure = false;
    }
  }

  // Clear the JWT cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: secure,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successful" });
};
