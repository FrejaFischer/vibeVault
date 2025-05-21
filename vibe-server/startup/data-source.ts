import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";
import { Entry } from "../entities/Entry";
import { User } from "../entities/User";
import { Track } from "../entities/Track";
import { EntryTrack } from "../entities/EntryTrack";

const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: connectionString,
  synchronize: false,
  entities: [Album, Artist, Entry, User, Track, EntryTrack],
  // ssl: {
  //   rejectUnauthorized: false, // Need this config for local server to have connection to deployed db (NOT FOR DEPLOYED SERVER)
  // },
});

// Solution for connecting without connection string
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "postgres",
//   port: 5432,
//   username: "app1",
//   password: "changethispassword",
//   database: "vibevault",
//   synchronize: true,
//   entities: [Album, Artist],
// });
//
