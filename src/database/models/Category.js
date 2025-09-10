import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class Category extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(50), unique: true, allowNull: false },
        slug: { type: DataTypes.STRING(50), unique: true, allowNull: false },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "category",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Post, {
      through: models.PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "posts",
    });
  }
}
