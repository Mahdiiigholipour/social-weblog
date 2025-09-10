import { DataTypes } from "sequelize";
import BaseModel from "../BaseModel.js";

export default class CommentLike extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        commentId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "PostComment", key: "id" },
          onDelete: "CASCADE",
        },
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "User", key: "id" },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "CommentLike",
        tableName: "comment_like",
        timestamps: true,
        indexes: [
          { fields: ["comment_id"] },
          { fields: ["user_id"] },
          { unique: true, fields: ["comment_id", "user_id"] },
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

    this.belongsTo(models.PostComment, {
      foreignKey: "comment_id",
      as: "comment",
      onDelete: "CASCADE",
    });
  }
}
