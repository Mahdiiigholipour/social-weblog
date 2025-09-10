import { DataTypes } from "sequelize";
import BaseModel from "../BaseModel.js";

export default class PostLike extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "Post",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "PostLike",
        tableName: "post_like",
        timestamps: true,
        indexes: [
          { fields: ["post_id"] },
          { fields: ["user_id"] },
          { unique: true, fields: ["user_id", "post_id"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
      onDelete: "CASCADE",
    });
  }
}
