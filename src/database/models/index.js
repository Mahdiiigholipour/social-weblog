import sequelize from "../config/sequelize";
import User from "./User";

const models = { User };

// Initialize all models
Object.values(models).forEach((model) => model.init());

// setup associations
Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

export { sequelize };
export default models;
