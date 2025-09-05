import http from "http";
import app from "./src/app.js";
import Config from "./src/configs/index.js";
const server = http.createServer(app);

server.listen(Config.app.port, () => {
  console.log("server run on port " + Config.app.port);
});
