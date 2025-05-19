import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Artist } from "./Artist";

@Entity("album")
export class Album {
  @PrimaryGeneratedColumn()
  album_id: number;

  @Column()
  title: string;

  @Column()
  artist_id: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: "artist_id" })
  artist: Artist;
}
