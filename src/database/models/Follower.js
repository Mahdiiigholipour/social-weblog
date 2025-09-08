import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

export default class Follower extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        followerId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "User", key: "id" },
          onDelete: "SET NULL",
        },
        followingId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "User", key: "id" },
          onDelete: "SET NULL",
        },
      },
      {
        sequelize,
        modelName: "Follower",
        tableName: "follower",
        timestamps: true,
      }
    );
  }
}
