import { env } from "../../core/config/environment.config.js";
import Database from "./sequelize.js";
import models, { initializeModels } from "../models/init.js";
import { DatabaseError } from "../../errors/index.js";

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

      return { Database, models: this.initializedModels };
    } catch (error) {
      throw new DatabaseError("Database connection failed:", error);
    }
  }

  async syncModels() {
    try {
      await Database.getSequelize().sync({
        force: true,
        // alter: env.isDevelopment(),
      });
    } catch (error) {
      throw new DatabaseError("Model synchronization failed:", error);
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
