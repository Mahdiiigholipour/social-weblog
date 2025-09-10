import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class PostCategory extends BaseModel {
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
        categoryId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "Category", key: "id" },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "PostCategory",
        tableName: "post_category",
        timestamps: true,
        indexes: [
          { unique: true, fields: ["postId", "categoryId"] },
          { fields: ["postId"] },
          { fields: ["categoryId"] },
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

    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
      onDelete: "CASCADE",
    });
  }
}
