/**
 * AI-generated code by factory.ai Droid
 * Church model for EOTConnect - represents churches in the directory
 */
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "churches", timestamps: true })
export class Church extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.TEXT)
  address!: string;

  @Column(DataType.DECIMAL(10, 8))
  latitude?: number;

  @Column(DataType.DECIMAL(11, 8))
  longitude?: number;

  @Column(DataType.STRING)
  phone?: string;

  @Column(DataType.STRING)
  email?: string;

  @Column(DataType.STRING)
  website?: string;

  @Column(DataType.TEXT)
  description?: string;
}