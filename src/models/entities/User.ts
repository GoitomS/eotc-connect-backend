import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password_hash!: string;

  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  role?: string;
}
