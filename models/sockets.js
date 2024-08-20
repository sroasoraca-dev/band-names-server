const BandList = require('./band-list');

class Sockets {
	constructor(io) {
		this.io = io;

		this.bandList = new BandList();

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		let connectedCLients = 0;
		this.io.on('connection', (socket) => {
			connectedCLients += 1;
			console.log(`Cliente conectado. Total de conexiones: ${connectedCLients}`);

			socket.emit('current-bands', this.bandList.getBands());

			socket.on('disconnect', () => {
				connectedCLients -= 1;
				console.log(`Cliente desconectado. Total de conexiones: ${connectedCLients}`);
			});
		});
	}
}

module.exports = Sockets;
