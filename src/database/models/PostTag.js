import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

export default class PostTag extends BaseModel {
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
        tagId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "Tag",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "PostTag",
        tableName: "post_tag",
        timestamps: false,
      }
    );
  }
}
