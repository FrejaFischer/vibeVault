import { Request, Response } from "express";
import { Album } from "../entities/Album";
import { AppDataSource } from "../startup/data-source";
import { ILike } from "typeorm";

export const getAlbums = async (req: Request, res: Response) => {
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

export const getAlbumTracks = async (req: Request, res: Response) => {
  const albumId = parseInt(req.params.album_id);
  const albumRepo = AppDataSource.getRepository(Album);

  const album = await albumRepo.findOne({
    where: { album_id: albumId },
    relations: ["tracks"],
  });

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }

  res.json({
    count: album.tracks.length,
    results: album.tracks,
  });
};
