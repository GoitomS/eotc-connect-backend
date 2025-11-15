/**
 * AI-generated code by factory.ai Droid
 * Database configuration and model exports for EOTConnect
 */
import { Sequelize } from "sequelize-typescript";
import path from "path";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME || "eotconnect",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  models: [path.resolve(__dirname, "./entities")],
  logging: false,
});

// Export models for use in routes
export { User } from "./entities/User";
export { Prayer } from "./entities/Prayer";
export { Church } from "./entities/Church";
export { Journal } from "./entities/Journal";
export { BiblePassage } from "./entities/BiblePassage";
export { sequelize };