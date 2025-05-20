import { Request, Response, RequestHandler } from "express";
import { ILike } from "typeorm";
import { Track } from "../entities/Track";
import { AppDataSource } from "../startup/data-source";

export const getTracks: RequestHandler = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  // Get the Album Entity (table)
  const trackRepo = AppDataSource.getRepository(Track);

  // If search query is provided, filter tracks by name
  const tracks = search ? await trackRepo.find({ where: { name: ILike(`%${search}%`) } }) : await trackRepo.find();

  res.json({
    count: tracks.length,
    results: tracks,
  });
};
