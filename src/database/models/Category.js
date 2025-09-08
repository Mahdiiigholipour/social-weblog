import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

export default class Category extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(50), allowNull: false },
        slug: { type: DataTypes.STRING(50), unique: true, allowNull: false },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "category",
        timestamps: true,
      }
    );
  }
}
