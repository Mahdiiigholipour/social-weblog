import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel";

export default class Bookmark extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        postId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: "Post", key: "id" },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "Bookmark",
        tableName: "bookmark",
        timestamps: true,
        indexes: [{ fields: ["user_id"] }],
      }
    );
  }
}
