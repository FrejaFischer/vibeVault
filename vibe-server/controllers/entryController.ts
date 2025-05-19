import { Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { Entry } from "../entities/Entry";

export const getEntries = async (req: Request, res: Response) => {
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

export const getEntryById = async (req: Request, res: Response) => {
  const entryId = req.params.entry_id;

  if (isNaN(Number(entryId))) {
    return res.status(400).json({ error: "Invalid entry_id" });
  }

  const entryRepo = AppDataSource.getRepository(Entry);

  const entry = await entryRepo.findOne({
    where: { entry_id: Number(entryId) },
    relations: ["entryTracks.track"], // still load entryTracks and their tracks
  });

  if (!entry) {
    return res.status(404).json({ error: "Entry not found" });
  }

  // Extract tracks from entry.entryTracks
  const tracks = entry.entryTracks.map((et) => et.track);

  const { entryTracks, ...entryWithoutEntryTracks } = entry;
  const entryWithTracks = { ...entryWithoutEntryTracks, tracks };

  res.json({
    count: tracks.length,
    entry: entryWithTracks,
  });
};

export const createEntry = async (req: Request, res: Response) => {
  const { title, start_period, end_period, playlist_link, cover_image, description } = req.body;

  if (!title || !start_period || !cover_image || !description) {
    return res.status(400).json({ error: "Missing required fields" });
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
