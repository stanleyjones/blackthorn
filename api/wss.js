const WebSocket = require('ws');

const auth = require('./lib/auth');
const rolls = require('./rolls/resolver');

const handleMessage = ws => async msg => {
	const parsed = JSON.parse(msg);
	switch (parsed.type) {
		case 'roll':
			const created = await rolls.create(parsed.payload);
			const latestRolls = await rolls.getLatest();
			ws.send(JSON.stringify({ type: 'rolls', payload: latestRolls }));
			break;
		default:
			ws.send(JSON.stringify({ type: 'unknown' }));
	}
}

const createServer = (options = { noServer: true }) => {
	const wss = new WebSocket.Server(options);

	wss.on('connection', async function connection (ws, req) {
		await auth.extractToken(req);
		ws.on('ping', () => ws.pong());
		ws.on('message', handleMessage(ws));
	});

	const upgrade = (req, socket, head) => {
		wss.handleUpgrade(req, socket, head, ws => { wss.emit('connection', ws, req); });
	};

	return { wss, upgrade };
}

module.exports = { createServer };