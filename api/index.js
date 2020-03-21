const server = require("http").createServer();

const app = require("./app");
const db = require("./db");
const wss = require("./wss").createServer();

const DB_NAME = "blackthorn";
const DB_PORT = 27017;

db.connect(DB_NAME, DB_PORT);
console.log(`DB is connected on port ${DB_PORT}...`);

server.on("request", app);
server.on("upgrade", wss.upgrade);

const API_PORT = 3000;

server.listen(API_PORT, () => {
  console.log(`HTTP & WS servers listening on port ${API_PORT}...`);
});
