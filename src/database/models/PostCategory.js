import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

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
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: "postId", as: "post" });

    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  }
}
