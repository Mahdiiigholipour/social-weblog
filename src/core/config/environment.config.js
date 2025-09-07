import { config } from "dotenv";
import { EnvironmentVariableError } from "../../errors/index.js";
config();
export class EnvironmentConfig {
  static get database() {
    return {
      name: this.getRequired("POSTGRES_NAME"),
      user: this.getRequired("POSTGRES_USER"),
      password: this.getRequired("POSTGRES_PASSWORD"),
      host: this.get("POSTGRESS_HOST", "localhost"),
      port: this.getNumber("POSTGRES_PORT", 5432),
      dialect: "postgres",
      logging: this.getBoolean("DB_LOGGING", false),
    };
  }
  static get server() {
    return {
      port: this.getNumber("SERVER_PORT", 3000),
      host: this.get("SERVER_HOST", "0.0.0.0"),
      corsOrigin: this.get("CORS_ORIGIN", "*"),
    };
  }
  static get environment() {
    return {
      nodeEnv: this.get("NODE_ENV", "development"),
    };
  }

  // Helper methods
  static get(key, defaultValue = null) {
    return process.env[key] ?? defaultValue;
  }
  static getNumber(key, defaultValue = 0) {
    const value = this.get(key);
    if (value && isNaN(Number(value))) {
      EnvironmentVariableError.invalidFormat(key, "numeric value", {
        received: value,
      });
    }

    return value ? parseInt(value, 10) : defaultValue;
  }
  static getBoolean(key, defaultValue = false) {
    const value = this.get(key);

    if (value && !["false", "true"].includes(value.toLowerCase()))
      EnvironmentVariableError.invalidFormat(key, "boolean value", {
        recevied: value,
      });

    return value || false;
  }
  static getRequired(key, details = {}) {
    const value = this.get(key);
    if (!value) EnvironmentVariableError.missingVariable(key, details);
    return value;
  }

  //Environment checks
  static isProduction() {
    return this.get("NODE_ENV") === "production";
  }
  static isDevelopment() {
    return this.get("NODE_ENV") === "development";
  }
  static isTest() {
    return this.get("NODE_ENV") === "test";
  }

  // Validate required variables
  static validateRequired() {
    const requiredVars = [
      "POSTGRES_NAME",
      "POSTGRES_USER",
      "POSTGRES_PASSWORD",
    ];
    const missingVars = [];

    for (const varName of requiredVars) {
      try {
        this.getRequired(varName);
      } catch (error) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0)
      EnvironmentVariableError.missingVariable(missingVars);
  }
}

export const env = EnvironmentConfig;
