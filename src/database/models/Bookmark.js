import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class Bookmark extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        postId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "Post", key: "id" },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "Bookmark",
        tableName: "bookmark",
        timestamps: true,
        indexes: [{ fields: ["userId"] }],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
    });
  }
}
