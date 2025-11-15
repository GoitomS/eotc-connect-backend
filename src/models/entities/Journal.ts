
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "journals", timestamps: true })
export class Journal extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  content!: string;

  @Column(DataType.BOOLEAN)
  is_private?: boolean;

  @BelongsTo(() => User)
  user!: User;
}