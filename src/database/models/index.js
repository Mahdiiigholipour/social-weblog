import { DatabaseError } from "../../errors/index.js";
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

    return models;
  } catch (error) {
    throw new DatabaseError("Model initialization failed:", error);
  }
};

export default models;
