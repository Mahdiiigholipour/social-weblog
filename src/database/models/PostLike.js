import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

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
        indexes: [{ fields: "postID" }],
      }
    );
  }
}
