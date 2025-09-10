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
        indexes: [
          { unique: true, fields: ["postId", "tagId"] },
          { fields: ["postId"] },
          { fields: ["tagId"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.Tag, {
      foreignKey: "tagId",
      as: "tag",
      onDelete: "CASCADE",
    });
  }
}
