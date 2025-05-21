import { Router } from "express";
import { getArtists, getArtistAlbums } from "../controllers/artistController";

const artistRouter = Router();

artistRouter.get("/", getArtists); // GET route, for getting all albums, handles optional search query
artistRouter.get("/:artist_id/albums", getArtistAlbums); // GET route, for getting all albums by a specific artist

export default artistRouter;
