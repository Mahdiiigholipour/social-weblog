import { DataTypes } from "sequelize";
import { BaseModel } from "./BaseModel.js";
import { REGEX } from "../../utils/constants.js";

class User extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: { len: [3, 50], is: REGEX.USERNAME },
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
          unique: true,
          validate: { isEmail: true, len: [5, 100] },
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "password_hash",
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.NOW,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
export default User;
