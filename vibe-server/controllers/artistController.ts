import { Request, Response, RequestHandler } from "express";
import { ILike } from "typeorm";
import { Artist } from "../entities/Artist";
import { Album } from "../entities/Album";
import { AppDataSource } from "../startup/data-source";

export const getArtists: RequestHandler = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  // Get the Album Entity (table)
  const artistRepo = AppDataSource.getRepository(Artist);

  // If search query is provided, filter artists by name
  const artists = search ? await artistRepo.find({ where: { name: ILike(`%${search}%`) } }) : await artistRepo.find();

  res.json({
    count: artists.length,
    results: artists,
  });
};

export const getArtistAlbums: RequestHandler = async (req: Request, res: Response) => {
  const artistId = Number(req.params.artist_id);

  // Check if the artistId is not a number
  if (isNaN(artistId)) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  // check if artist exists
  const artistRepo = AppDataSource.getRepository(Artist);
  const artist = await artistRepo.findOne({
    where: { artist_id: artistId },
  });
  // Check if artist was found
  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
    return;
  }
  const albumRepo = AppDataSource.getRepository(Album);

  const albums = await albumRepo.find({
    where: { artist: { artist_id: artistId } },
    relations: ["artist"],
  });

  res.json({
    count: albums.length,
    results: albums,
  });
};
