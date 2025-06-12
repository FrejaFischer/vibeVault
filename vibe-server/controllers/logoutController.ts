import { Request, Response, RequestHandler } from "express";

/**
 * POST route for logout - deletes cookie
 * @param res - Sends status code 200, and a succes message
 */
export const postLogout: RequestHandler = async (req: Request, res: Response) => {
  let secure = true;
  if (process.env.RTE) {
    const isTest = process.env.RTE === "test";

    if (isTest) {
      secure = false;
    }
    console.log("logout", secure);
  }

  // Clear the JWT cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: secure,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successful" });
};
