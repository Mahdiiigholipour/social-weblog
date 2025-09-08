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
            model: "post",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        tagId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "tad",
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
