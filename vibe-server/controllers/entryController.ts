import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Entry } from "../entities/Entry";
import { AuthenticatedRequest } from "../middleware/verifyToken";

/**
 * GET route for getting users entries (protected route)
 * @param req - Needs a valid token with user id in cookie. AuthenticatedRequest checks all this beforehand.
 * @param res - Sends all entries for the user if token is valid, else sends error message
 */
export const getEntries: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId; // Set the users id from token in request

  try {
    // Get the Entry Entity (table)
    const entryRepo = AppDataSource.getRepository(Entry);

    // Find entries with the user_id
    const entries = await entryRepo.find({
      where: { user: { user_id: userId } }, // the relation `user` is from the Entry entity
    });

    // send reponse of entries
    res.json({
      count: entries.length,
      results: entries,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch entries" });
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
