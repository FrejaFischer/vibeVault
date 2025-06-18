import { AppDataSource } from "./data-source";

const dbConnectPostgress = async () => {
  try {
    await AppDataSource.initialize(); // Connect to postgres database
    console.log("Connected to Postgres database");
  } catch (error) {
    console.error("Error connecting to Postgres database", error);
  }
};

export default dbConnectPostgress;
