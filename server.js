import http from "http";
import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { EnvironmentVariableError } from "./src/errors/index.js";

try {
  env.validateRequired();
  console.log("✅ All required environment variables are set");

  const server = http.createServer(app);

  server.listen(env.server.port, () => {
    console.log(
      `Server run on successfully => http://${env.server.host}:${env.server.port}`
    );
  });
} catch (error) {
  if (error instanceof EnvironmentVariableError) {
    console.error("❌ Configuration error:", error.message);
  }
}
