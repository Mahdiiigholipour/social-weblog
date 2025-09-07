import { Sequelize } from "sequelize";
import { env } from "../../core/config/environment.config.js";
class Database {
  constructor() {
    this.sequelize = null;
  }

  async initialize() {
    try {
      this.sequelize = new Sequelize(
        env.database.name,
        env.database.user,
        env.database.password,
        {
          host: env.database.host,
          port: env.database.port,
          dialect: env.database.dialect,
          logging: env.database.logging,
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
      await this.testConnection();
      return this.sequelize;
    } catch (error) {
      console.error("Database initialization failed:", error);
      throw error;
    }
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log("✅ PostgreSQL connection established");
    } catch (error) {
      console.error("❌ Unable to connect to PostgreSQL:", error);
      throw error;
    }
  }
}

export default new Database();
