import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Album } from "./Album";

@Entity("artist")
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
