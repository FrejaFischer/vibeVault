import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Entry } from "../entities/Entry";
import { validateCoverImage, validateDescription, validateEndPeriod, validatePlaylistLink, validateStartPeriod, validateTitle } from "../validators/entryValidator";

export const getEntries: RequestHandler = async (req: Request, res: Response) => {
  const userId = 1;
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
  });
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
  const entryId = 2;

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