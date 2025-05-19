import { Request, Response } from "express";
import { ILike } from "typeorm";
import { Artist } from "../entities/Artist";
import { Album } from "../entities/Album";
import { AppDataSource } from "../startup/data-source";

export const getArtists = async (req: Request, res: Response) => {
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

export const getArtistAlbums = async (req: Request, res: Response) => {
  const artistId = req.params.artist_id;

  // Check if the artistId is not a number
  if (isNaN(Number(artistId))) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  // check if artist exists
  const artistRepo = AppDataSource.getRepository(Artist);
  const artist = await artistRepo.findOne({
    where: { artist_id: Number(artistId) },
  });
  // Check if artist was found
  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
    return;
  }
  const albumRepo = AppDataSource.getRepository(Album);

  const albums = await albumRepo.find({
    where: { artist: { artist_id: Number(artistId) } },
    relations: ["artist"],
  });

  res.json({
    count: albums.length,
    results: albums,
  });
};
