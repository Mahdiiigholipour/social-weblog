import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

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
          { unique: true, fields: ["post_id", "tag_id"] },
          { fields: ["post_id"] },
          { fields: ["tag_id"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.Tag, {
      foreignKey: "tag_id",
      as: "tag",
      onDelete: "CASCADE",
    });
  }
}
