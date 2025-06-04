import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Entry } from "../entities/Entry";
import jwt from "jsonwebtoken";

/**
 * GET route for getting users entries (protected route)
 * @param req - Needs authorization in the header, with valid token
 * @param res - Sends all entries for the user if token is valid, else sends error message
 */
export const getEntries: RequestHandler = async (req: Request, res: Response) => {
  // Check if .env file with token secret is available
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: "Server error - Please contact us." });
    return;
  }
  const SECRET_KEY = process.env.JWT_SECRET; // Secret key from env file (a key that should be included in the token)

  // Read from HttpOnly cookie
  const token = req.cookies.token;
  // Check if there is a token
  if (!token) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }

  try {
    // Check if token is valid, throws error if not (e.g if expired or with wrong secret key)
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    // Check if user_id is in token and is valid type
    if (!decoded.user_id || typeof decoded.user_id !== "number") {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }
    const userId = decoded.user_id; // user_id from the token

    // Get the Entry Entity (table)
    const entryRepo = AppDataSource.getRepository(Entry);

    // Find entries with that user_id
    const entries = await entryRepo.find({
      where: { user: { user_id: userId } }, // the relation `user` is from the Entry entity
    });

    // send reponse of entries
    res.json({
      count: entries.length,
      results: entries,
      user: decoded,
    });
  } catch (err) {
    // Token is expired
    if (err instanceof Error && err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
      return;
    }
    // Token is not valid
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export const getEntryById: RequestHandler = async (req: Request, res: Response) => {
  const entryId = Number(req.params.entry_id);

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry_id" });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const entry = await entryRepo.findOne({
    where: { entry_id: entryId },
    relations: ["entryTracks.track"], // still load entryTracks and their tracks
  });

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  // Extract tracks from entry.entryTracks
  const tracks = entry.entryTracks.map((et) => et.track);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { entryTracks, ...entryWithoutEntryTracks } = entry;
  const entryWithTracks = { ...entryWithoutEntryTracks, tracks };

  res.json({
    count: tracks.length,
    entry: entryWithTracks,
  });
};

export const createEntry: RequestHandler = async (req: Request, res: Response) => {
  //TODO: finish this functione, it is not finished yet
  const { title, start_period, end_period, playlist_link, cover_image, description } = req.body;

  if (!title || !start_period || !cover_image || !description) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const newEntry = entryRepo.create({
    title,
    start_period,
    end_period,
    playlist_link,
    cover_image,
    description,
  });

  await entryRepo.save(newEntry);

  res.status(201).json(newEntry);
};
