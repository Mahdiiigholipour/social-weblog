import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class Tag extends BaseModel {
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
        modelName: "Tag",
        tableName: "tag",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Post, {
      through: models.PostTag,
      foreignKey: "tag_id",
      otherKey: "post_id",
      as: "posts",
    });
  }
}
