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
          onDelete: "CASCADE",
        },
        followingId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "User", key: "id" },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "Follower",
        tableName: "follower",
        timestamps: true,
        indexes: [
          { unique: true, fields: ["followerId", "followingId"] },
          { fields: ["followerId"] },
          { fields: ["followingId"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "followerId",
      as: "follower",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.User, {
      foreignKey: "followingId",
      as: "following",
      onDelete: "CASCADE",
    });
  }
}
