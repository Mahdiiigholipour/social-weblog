import http from 'http';
import app from './src/app.js';
import { configDotenv } from 'dotenv';
configDotenv();

const server = http.createServer(app);

server.listen(process.env.PORT,()=>{console.log("server run on port "+process.env.PORT);})

