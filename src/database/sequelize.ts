/**
 * AI-generated code by factory.ai Droid
 * Database connection configuration for EOTConnect
 */
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/entities/User";
import { Prayer } from "../models/entities/Prayer";
import { Church } from "../models/entities/Church";
import { Journal } from "../models/entities/Journal";
import { BiblePassage } from "../models/entities/BiblePassage";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "eotconnect",
  models: [User, Prayer, Church, Journal, BiblePassage],
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
