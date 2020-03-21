const WebSocket = require("ws");

const auth = require("./lib/auth");
const rolls = require("./rolls/controller");
const { Connection } = require("./lib/messaging");

const handleMessage = cxn => async msg => {
  const { type, payload } = JSON.parse(msg);
  switch (type) {
    case "roll":
      rolls.handleRoll(payload, cxn);
      break;
    case "join":
      cxn.broadcast("update");
      break;
    default:
      ws.send("unknown-type");
  }
};

const createServer = (options = { noServer: true }) => {
  const wss = new WebSocket.Server(options);
  wss.on("connection", async (ws, req) => {
    await auth.extractToken(req);
    const cxn = new Connection(ws, req);
    ws.on("message", handleMessage(cxn));
    ws.on("ping", () => ws.pong());
  });

  const upgrade = (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, ws => {
      wss.emit("connection", ws, req);
    });
  };

  return { wss, upgrade };
};

module.exports = { createServer };
