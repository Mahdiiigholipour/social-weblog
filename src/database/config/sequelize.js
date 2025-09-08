import { Sequelize } from "sequelize";
import { env } from "../../core/config/environment.config.js";
import { DatabaseError } from "../../errors/index.js";
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
            max: env.isProduction() ? 20 : 10,
            min: env.isProduction() ? 5 : 0,
            acquire: env.isProduction() ? 60000 : 30000,
            idle: env.isProduction() ? 30000 : 10000,
            evict: 10000,
          },
          define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
          },
          retry: { max: 3 },
        }
      );

      await this.testConnection();
      return this.sequelize;
    } catch (error) {
      throw DatabaseError.catch("Database initialization failed:", error);
    }
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log(" PostgreSQL connection established");
    } catch (error) {
      throw new DatabaseError(" Unable to connect to PostgreSQL:", error);
    }
  }

  async close() {
    if (this.sequelize) {
      await this.sequelize.close();
      console.log("Database connection closed");
    }
  }

  getSequelize() {
    if (!this.sequelize)
      throw new DatabaseError(
        "Database not initialized. Call initialize() first"
      );

    return this.sequelize;
  }
}
const databaseInstance = new Database();
export default databaseInstance;
