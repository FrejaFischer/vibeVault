import { Artist } from "./artist";
export interface Album {
  album_id: number;
  title: string;
  artist: Artist | undefined
}
