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
export default class Friend extends Model {

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  public from_user!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  public to_user!: number;
}