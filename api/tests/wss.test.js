const req = require('supertest');
const WebSocket = require('ws');

const createServer = require('../wss').createServer;
const auth = require('../lib/auth');
const db = require('../db');

const WS_HOST = 'localhost';
const WS_PORT = 3030;

describe('WebSocketServer', () => {
	let ws, wss;

	beforeAll(done => {
		db.connect('blackthorn-test', 27017);
		wss = createServer({ host: WS_HOST, port: WS_PORT }).wss;
		wss.on('listening', () => {
			ws = new WebSocket(`ws://${WS_HOST}:${WS_PORT}`, { headers: { Authorization: `Bearer ${auth.createToken()}`} });
			ws.onopen = () => done();
		});
	});

	afterAll(() => ws.close());

    test('PING should receive PONG', () => {
    	const handlePong = jest.fn();
    	ws.on('pong', handlePong);
		ws.ping();
		setTimeout(() => expect(handlePong).toHaveBeenCalled(), 1000);
    });

    test('SEND "roll" should RECEIVE "rolls"', done => {
    	ws.on('message', msg => {
    		expect(JSON.parse(msg).type).toBe('rolls');
    		done();
    	});
    	ws.send(JSON.stringify({ type: 'roll', payload: { structure: [3, 2] } }));
    });

});