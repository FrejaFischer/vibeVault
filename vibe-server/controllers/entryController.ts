import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Entry } from "../entities/Entry";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { validateCoverImage, validateDescription, validateEndPeriod, validatePlaylistLink, validateStartPeriod, validateTitle } from "../validators/entryValidator";

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
      relations: ["entryTracks"],
    });

    // send reponse of entries

    //only show id, title, start date, trackcount
    res.json({
      count: entries.length,
      results: entries.map(entry => ({
        entry_id: entry.entry_id,
        title: entry.title,
        start_period: entry.start_period,
        cover_image: entry.cover_image,
        trackcount: entry.entryTracks.length,
      })),
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch entries" });
    return;
  }
};

export const getEntryById: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  const entryId = Number(req.params.entry_id);
  const userId = req.userId;

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry_id" });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const entry = await entryRepo.findOne({
    where: { entry_id: entryId },
    relations: ["entryTracks.track"],
  });

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  if (entry.user_id !== userId) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  const trackcount = entry.entryTracks.length;

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { entryTracks, ...entryWithoutEntryTracks } = entry;
  const entryResponse = { ...entryWithoutEntryTracks, trackcount };

  res.json({
    entry: entryResponse,
  });
};


export const getTracksByEntryId: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  const entryId = Number(req.params.entry_id);
  const userId = req.userId;

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry_id" });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const entry = await entryRepo.findOne({
    where: { entry_id: entryId },
    relations: [
      "entryTracks.track",
      "entryTracks.track.album",
      "entryTracks.track.album.artist",
    ],
  });

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  if (entry.user_id !== userId) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  const tracks = entry.entryTracks.map((et) => {
    const { track } = et;
    return {
      track_id: track.track_id,
      name: track.name,
      album: {
        album_id: track.album?.album_id,
        title: track.album?.title,
        artist: {
          artist_id: track.album?.artist?.artist_id,
          name: track.album?.artist?.name,
        },
      },
    };
  });

  res.json({
    count: tracks.length,
    entry_id: entryId,
    tracks,
  });
};

export const createEntry: RequestHandler = async (req: Request, res: Response) => {

  const user_id = 1; //TODO: MUST BE CHANGED

  const { title, start_period, end_period, playlist_link, cover_image, description } = req.body || {};

  const validationErros = [];

  const titleErrors = validateTitle(title);
  if (titleErrors.length > 0) {
    validationErros.push(...titleErrors);
  }

  const descriptionErrors = validateDescription(description);
  if (descriptionErrors.length > 0) {
    validationErros.push(...descriptionErrors);
  }

  const startPeriodErrors = validateStartPeriod(start_period);
  if (startPeriodErrors.length > 0) {
    validationErros.push(...startPeriodErrors)
  }

  const endPeriodErrors = validateEndPeriod(end_period);
  if (endPeriodErrors.length > 0) {
    validationErros.push(...endPeriodErrors)
  }

  const coverImageErrors = validateCoverImage(cover_image);
  if (coverImageErrors.length > 0) {
    validationErros.push(...coverImageErrors)
  }

  const playlistLinkErrors = validatePlaylistLink(playlist_link);
  if (playlistLinkErrors.length > 0) {
    validationErros.push(...playlistLinkErrors)
  }

  if (validationErros.length > 0) {
    res.status(400).json({ errors: validationErros });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const newEntry = entryRepo.create({
    user_id,
    title,
    start_period,
    end_period,
    playlist_link,
    cover_image,
    description,
  });
  try {
    await entryRepo.save(newEntry);
    res.status(201).json({ message: "Entry created successfully", entry_id: newEntry.entry_id });

  } catch (error) {
    res.status(400).json({ message: "Could not insert entry", error: error });
  }
};

export const updateEntry: RequestHandler = async (req: Request, res: Response) => {
  const entryId = 2; //TODO: MUST BE CHANGED

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry_id" });
    return;
  }

  const { title, start_period, end_period, playlist_link, cover_image, description } = req.body;

  const validationErros = [];

  const titleErrors = validateTitle(title);
  if (titleErrors.length > 0) {
    validationErros.push(...titleErrors);
  }

  const descriptionErrors = validateDescription(description);
  if (descriptionErrors.length > 0) {
    validationErros.push(...descriptionErrors);
  }

  const startPeriodErrors = validateStartPeriod(start_period);
  if (startPeriodErrors.length > 0) {
    validationErros.push(...startPeriodErrors)
  }

  const endPeriodErrors = validateEndPeriod(end_period);
  if (endPeriodErrors.length > 0) {
    validationErros.push(...endPeriodErrors)
  }

  const coverImageErrors = validateCoverImage(cover_image);
  if (coverImageErrors.length > 0) {
    validationErros.push(...coverImageErrors)
  }

  const playlistLinkErrors = validatePlaylistLink(playlist_link);
  if (playlistLinkErrors.length > 0) {
    validationErros.push(...playlistLinkErrors)
  }

  if (validationErros.length > 0) {
    res.status(400).json({ errors: validationErros });
    return;
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const entryToUpdate = await entryRepo.findOneBy({ entry_id: entryId });

  if (!entryToUpdate) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  entryToUpdate.title = title;
  entryToUpdate.start_period = start_period;
  entryToUpdate.end_period = end_period;
  entryToUpdate.playlist_link = playlist_link;
  entryToUpdate.cover_image = cover_image;
  entryToUpdate.description = description;

  try {
    await entryRepo.save(entryToUpdate);

    res.status(201).json({ message: "Entry updated successfully", entry: entryToUpdate });

  } catch (error) {
    res.status(400).json({ message: "Could not update entry", error: error });
  }
}