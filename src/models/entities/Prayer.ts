
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "prayers", timestamps: true })
export class Prayer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  text!: string;

  @Column(DataType.STRING)
  language?: string;

  @Column(DataType.STRING)
  category?: string;
}