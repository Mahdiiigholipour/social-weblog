import { DataTypes } from "sequelize";
import { BaseModel } from "../BaseModel.js";
export default class RefreshToken extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "User", key: "id" },
          onDelete: "CASCADE",
        },
        tokenHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
        revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
        replacedBy: { type: DataTypes.UUID, allowNull: true },
        createdByIp: { type: DataTypes.STRING },
        revokedByIp: { type: DataTypes.STRING },
        userAgent: { type: DataTypes.STRING },
        metadata: { type: DataTypes.JSONB, allowNull: true },
      },
      {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_token",
        timestamps: true,
        indexes: [
          { fields: ["user_id"] },
          { unique: true, fields: ["token_hash"] },
          { fields: ["expires_at"] },
        ],
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}
