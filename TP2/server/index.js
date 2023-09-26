var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const TicTacToe = require("./tictactoe");

const proto = protoLoader.loadSync("./tictactoe.proto");

const protoDescriptor = grpc.loadPackageDefinition(proto);
const tictactoe = protoDescriptor.tictactoe;

const server = new grpc.Server();
let tictactoeGame = null;

function getPlay(call, callback) {
  tictactoeGame.getClientPlay(call.request.play);

  let message = null;
  let play = `${call.request.play}`;

  if (tictactoeGame.checkWin(tictactoeGame.clientPlays)) {
    message = "Resultado: Jogador X ganhou!";
  } else if (tictactoeGame.clientPlays.length === 5) {
    message = "Resultado: Empate!";
    tictactoeGame = null;
  } else {
    const number = tictactoeGame.getServerPlay();
    if (tictactoeGame.checkWin(tictactoeGame.serverPlays)) {
      message = "Resultado: Jogador O ganhou!";
      tictactoeGame = null;
    }
    play = `${number}`;
  }

  callback(null, { play, message });
}

function createSession(call, callback) {
  tictactoeGame = new TicTacToe();
}

server.addService(tictactoe.TicTacToe.service, {
  getplay: getPlay,
  createsession: createSession,
});

server.bindAsync(
  "127.0.0.1:3333",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Erro ao vincular o servidor:", err);
    } else {
      console.log(`Servidor está rodando em http://127.0.0.1:${port}`);
      server.start();
    }
  }
);
