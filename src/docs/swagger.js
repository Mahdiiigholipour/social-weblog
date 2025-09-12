import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

const yamlFiles = ["auth.yaml"];

let mergedPaths = {};

yamlFiles.forEach((file) => {
  const doc = YAML.load(path.resolve("src/docs", file));
  mergedPaths = { ...mergedPaths, ...doc.paths };
});

const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Social Weblog API",
    version: "1.0.0",
    description: "مستندات API پروژه Social Weblog",
  },
  servers: [{ url: "http://localhost:3000", description: "Local server" }],
  paths: mergedPaths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export const SetupSwagger = [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
