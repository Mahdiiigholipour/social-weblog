import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

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
          { fields: ["commentId"] },
          { fields: ["userId"] },
          { unique: true, fields: ["commentId", "userId"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.PostComment, {
      foreignKey: "commentId",
      as: "comment",
      onDelete: "CASCADE",
    });
  }
}
