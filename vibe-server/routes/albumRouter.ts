import { Router } from "express";
import { Album } from "../entities/Album";
import { AppDataSource } from "../startup/data-source";

const albumRouter = Router();

// Get the Album Entity (table)
const albumRepo = AppDataSource.getRepository(Album);

// GET route, for getting all albums
albumRouter.get("/", async (req, res) => {
  const albums = await albumRepo.find();
  console.log("Fetched rows:", albums); // See the fetched rows
  res.json({
    count: albums.length,
    results: albums,
  });
});

export default albumRouter;
