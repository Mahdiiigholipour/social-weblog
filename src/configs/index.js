import { config } from "dotenv";
config();

class Config {
  static get database() {
    return {
      name: this.getRequired("POSTGRES_NAME"),
      user: this.getRequired("POSTGRES_USER"),
      password: this.getRequired("POSTGRES_PASSWORD"),
      port: this.getNumber("POSTGRES_PORT", 5432),
      host: this.get("POSTGRES_HOST", "localhost"),
    };
  }

  static get app() {
    return {
      port: this.getNumber("PORT", "3000"),
      env: this.get("NODE_ENV", "development"),
      isProduction: this.get("NODE_ENV") === "production",
      isDevelopment: this.get("NODE_ENV") === "development",
    };
  }

  // Helper methods

  static get(key, defaultValue = null) {
    return process.env[key] || defaultValue;
  }

  static getNumber(key, defaultValue = 0) {
    const value = process.env[key];
    return value ? parseInt(value) : defaultValue;
  }

  static getRequired(key) {
    const value = process.env[key];

    if (!value) throw new Error(`Environment variable ${key} is required.`);
    return value;
  }
}

Config.getRequired("POSTGRES_NAME");

export default Config;
