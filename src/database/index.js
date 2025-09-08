import { env } from "../core/config/environment.config.js";
import Database from "./config/sequelize.js";
import models, { initializeModels } from "./models/index.js";

class DatabaseConnnection {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      if (this.isConnected) {
        console.log("✅ Database already connected");
        return;
      }

      await Database.initialize();

      this.initializedModels = await initializeModels();

      await this.syncModels();

      this.isConnected = true;
      console.log("🎉 Database connected successfully");

      return { Database, models: this.initializedModels };
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }

  async syncModels() {
    try {
      await Database.getSequelize().sync({
        force: false,
        alter: env.isDevelopment(),
      });
      console.log("✅ Models synchronized successfully");
    } catch (error) {
      console.error("❌ Model synchronization failed:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected && Database.sequelize) {
      await Database.close();
      this.isConnected = false;
      console.log("✅ Database connection closed");
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      database: Database.sequelize?.config || null,
    };
  }
}

const dbConnection = new DatabaseConnnection();

export { Database, models, dbConnection };
export default dbConnection;
