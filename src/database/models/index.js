import Database from "../config/sequelize.js";
import User from "./User.js";

const models = { User };

export const initializeModels = async () => {
  try {
    // Initialize all models
    Object.values(models).forEach((model) =>
      model.init(Database.getSequelize())
    );

    // setup associations
    Object.values(models).forEach((model) => {
      if (model.associate) model.associate(models);
    });

    console.log("✅ Models initialized successfully");
    return models;
  } catch (error) {
    console.error("❌ Model initialization failed:", error);
    throw error;
  }
};

export default models;
