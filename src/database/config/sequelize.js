import { Sequelize } from "sequelize";
class Database {
  constructor() {
    this.sequelize = null;
  }

  async initialize() {
    try {
      this.sequelize = new Sequelize();
    } catch (error) {}
  }
}
