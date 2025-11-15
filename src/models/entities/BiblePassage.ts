
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "bible_passages", timestamps: true })
export class BiblePassage extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  book!: string;

  @Column(DataType.INTEGER)
  chapter!: number;

  @Column(DataType.INTEGER)
  verse!: number;

  @Column(DataType.TEXT)
  text!: string;

  @Column(DataType.STRING)
  translation?: string; // e.g., "ESV", "NIV", "Ge'ez"

  @Column(DataType.STRING)
  language?: string; // e.g., "en", "am", "gez"
}