import http from "http";
import app from "./src/app.js";
import { env } from "./src/core/config/environment.config.js";
const server = http.createServer(app);

server.listen(env.server.port, () => {
  console.log(
    `Server run on successfully => http://${env.server.host}:${env.server.port}`
  );
});
