"use strict"

import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  DataType,
} from "sequelize-typescript";

@Table({ timestamps: true })
export default class User extends Model {

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  public user_id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_password!: string;
}