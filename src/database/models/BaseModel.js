import { Model } from "sequelize";

export class BaseModel extends Model {
  static async findById(id, options = {}) {
    return await this.findByPk(id, options);
  }
  static async findActive(id) {
    return await this.findByPk(id, { paranoid: false });
  }
  static async bulkCreateSafe(items, options = {}) {
    return await this.bulkCreate(items, {
      validate: true,
      individualHooks: true,
      ...options,
    });
  }
  toJSON() {
    const values = { ...super.toJSON() };

    const sensitiveFields = [
      "password",
      "password_hash",
      "refresh_token",
      "verification_token",
      "reset_token",
    ];

    sensitiveFields.forEach((field) => {
      if (values[field]) delete values[field];
    });

    return values;
  }
}

export default BaseModel;
