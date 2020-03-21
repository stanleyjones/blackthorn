const req = require("supertest");
const WebSocket = require("ws");

const createServer = require("../wss").createServer;
const auth = require("../lib/auth");
const db = require("../db");

const Game = require("../games/model");
const Roll = require("../rolls/model");

const WS_HOST = "localhost";
const WS_PORT = 3030;

const createSocket = (channel = "abc123", userData = {}) =>
  new WebSocket(`ws://${WS_HOST}:${WS_PORT}/channel/${channel}`, {
    headers: { Authorization: `Bearer ${auth.createToken(userData)}` }
  });

describe("WebSocketServer", () => {
  beforeAll(async done => {
    await db.connect("blackthorn-test", 27017);
    await Roll.deleteMany({});

    wss = createServer({ host: WS_HOST, port: WS_PORT }).wss;
    wss.on("listening", () => done());
  });

  test("PING should receive PONG", () => {
    const ws = createSocket();
    ws.onopen = () => {
      const handlePong = jest.fn();
      ws.on("pong", handlePong);
      ws.ping();
      setTimeout(() => expect(handlePong).toHaveBeenCalled(), 1000);
    };
  });

  test('SEND "join" should broadcast to all subscribed sockets', done => {
    const ws1 = createSocket();
    const ws2 = createSocket();
    const game = new Game();
    ws1.onopen = () => {
      ws1.on("message", msg => {
        expect(JSON.parse(msg).type).toBe("update");
        done();
      });
    };
    ws2.onopen = () => ws2.send(JSON.stringify({ type: "join" }));
  });

  test('SEND "roll" should RECEIVE "rolls"', done => {
    const ws = createSocket();
    ws.onopen = () => {
      ws.on("message", msg => {
        expect(JSON.parse(msg).type).toBe("rolls");
        done();
      });
      ws.send(JSON.stringify({ type: "roll", payload: { display: "3d" } }));
    };
  });
});
