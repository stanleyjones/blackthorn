const clientsByChannel = {}; // "Static" property

class Connection {

	constructor (ws, req) {
		this._socket = ws;
		this._req = req;
		this._extractChannel();
		this._subscribeClient();
	}

	broadcast (type, payload) {
		clientsByChannel[this._channel].forEach(client => {
			client.send(this._createMessage(type, payload));
		});
	}

	send (type, payload) {
		this._socket.send(this._createMessage(type, payload));
	}

	_createMessage (type, payload = {}) {
		return JSON.stringify({ type, payload });
	}

	_extractChannel () {
		const match = this._req.url.match(/\/channel\/(.*)/);
		this._channel = match ? match[1] : null;
	}

	_subscribeClient () {
		if (clientsByChannel[this._channel]) {
			clientsByChannel[this._channel].push(this._socket);
		} else {
			clientsByChannel[this._channel] = [this._socket];
		}			
	}

}

module.exports = { Connection };