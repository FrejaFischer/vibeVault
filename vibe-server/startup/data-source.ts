import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Test } from "../entities/Test";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";

const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: connectionString,
  synchronize: false,
  entities: [Album, Artist],
});

// Solution for connecting without connection string
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "postgres",
//   port: 5432,
//   username: "myuser",
//   password: "mypassword",
//   database: "test",
//   synchronize: true,
//   entities: [Test],
// });
//
