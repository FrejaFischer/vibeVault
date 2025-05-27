import { Request, Response, RequestHandler } from "express";
import { Album } from "../entities/Album";
import { AppDataSource } from "../startup/data-source";
import { ILike } from "typeorm";

export const getAlbums: RequestHandler = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  // Get the Album Entity (table)
  const albumRepo = AppDataSource.getRepository(Album);

  // If search query is provided, filter albums by name
  const albums = search ? await albumRepo.find({ where: { title: ILike(`%${search}%`) } }) : await albumRepo.find();

  res.json({
    count: albums.length,
    results: albums,
  });
};

export const getAlbumTracks: RequestHandler = async (req: Request, res: Response) => {
  const albumId = Number(req.params.album_id);

  if (isNaN(albumId)) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const albumRepo = AppDataSource.getRepository(Album);

  const album = await albumRepo.findOne({
    where: { album_id: albumId },
    relations: ["tracks"],
  });

  if (!album) {
    res.status(404).json({ message: "Album not found" });
    return;
  }

  res.json({
    count: album.tracks.length,
    results: album.tracks,
  });
};
