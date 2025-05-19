import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Album } from "./Album";
import { EntryTrack } from "./EntryTrack";

@Entity("track")
export class Track {
  @PrimaryGeneratedColumn()
  track_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Album, (album) => album.tracks)
  @JoinColumn({ name: "album_id" })
  album: Album;
}
