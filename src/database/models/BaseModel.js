const { Model } = require("sequelize");

export class BaseModel extends Model {
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
