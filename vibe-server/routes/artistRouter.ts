import { Router } from "express";
import { getArtists, getArtistAlbums } from "../controllers/artistController";
import { verifyToken } from "../middleware/verifyToken";

const artistRouter = Router();

artistRouter.get("/", verifyToken, getArtists); // GET route, for getting all albums, handles optional search query
artistRouter.get("/:artist_id/albums", verifyToken, getArtistAlbums); // GET route, for getting all albums by a specific artist

export default artistRouter;
