import express from "express";
import { getAlbums, getAlbumTracks } from "../controllers/albumController";

const albumRouter = express.Router();

albumRouter.get("/", getAlbums); // GET route, for getting all albums, handles optional search query
albumRouter.get("/:album_id/tracks", getAlbumTracks); // GET route, for getting all tracks in a specific album

export default albumRouter;
