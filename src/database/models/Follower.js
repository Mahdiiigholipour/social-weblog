import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class Follower extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        follower_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "User", key: "id" },
          onDelete: "CASCADE",
        },
        following_id: {
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
          { unique: true, fields: ["follower_id", "following_id"] },
          { fields: ["follower_id"] },
          { fields: ["following_id"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "follower_id",
      as: "follower",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.User, {
      foreignKey: "following_id",
      as: "following",
      onDelete: "CASCADE",
    });
  }
}
