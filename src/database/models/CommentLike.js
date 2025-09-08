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
          onDelete: "SET NULL",
        },
      },
      {
        sequelize,
        modelName: "CommentLike",
        tableName: "comment_like",
        timestamps: true,
      }
    );
  }
}
