import { DataTypes } from "sequelize";
import BaseModel from "../BaseModel.js";

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
          { unique: true, fields: ["post_id", "category_id"] },
          { fields: ["post_id"] },
          { fields: ["category_id"] },
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

    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
    });
  }
}
