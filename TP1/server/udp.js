const dgram = require('dgram');
const TicTacToe = require('./tictactoe');

const server = dgram.createSocket('udp4');

const tictactoe = new TicTacToe();

server.on('message', (msg, rinfo) => {
  const socket = rinfo;

  if(msg.toString() === 'reset') {
    tictactoe.clientPlays = [];
    tictactoe.serverPlays = [];
    return;
  }

  tictactoe.getClientPlay(msg.toString());
  const res = tictactoe.checkWin(tictactoe.clientPlays);
  if (res) {
    server.send(Buffer.from(`Resultado: Jogador X ganhou!`), socket.port, socket.address);
  } else {
    const number = tictactoe.getServerPlay();
    server.send(Buffer.from(`${number}`), socket.port, socket.address);
    if (tictactoe.checkWin(tictactoe.serverPlays)) {
      setTimeout(() => {
        server.send(Buffer.from(`Resultado: Jogador O ganhou!`), socket.port, socket.address);
      }, 1000);
    }
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP está escutando em ${address.address}:${address.port}`);
});

server.bind(4444);
