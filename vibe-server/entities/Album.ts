import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Artist } from "./Artist";
import { Track } from "./Track";

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

  @OneToMany(() => Track, (track) => track.album)
  @JoinColumn({ name: "track_id" })
  tracks: Track[];
}
