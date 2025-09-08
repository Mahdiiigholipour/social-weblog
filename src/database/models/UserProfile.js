import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

export default class UserProfile extends BaseModel {
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
        },
        firstName: { type: DataTypes.STRING(50) },
        lastName: { type: DataTypes.STRING(50) },
        bio: { type: DataTypes.TEXT },
        profileImage: { type: DataTypes.STRING(255) },
        socialMediaLinks: { type: DataTypes.JSONB, defaultValue: {} },
      },
      {
        sequelize,
        modelName: "UserProfile",
        tableName: "user_profile",
        timestamps: true,
      }
    );
  }
}
