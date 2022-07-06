"use strict"

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey
} from "sequelize-typescript";
import User from "./user.model"

@Table({ timestamps: true })
export default class Room extends Model {

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  public creater!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public join_count!: number;
}