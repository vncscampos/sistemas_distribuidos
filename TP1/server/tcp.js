const net = require("net");
const TicTacToe = require("./tictactoe");

const server = net.createServer((socket) => {
  console.log("Conexão estabelecida");

  const tictactoe = new TicTacToe();

  socket.on("data", (data) => {
    tictactoe.getClientPlay(data.toString());
    const res = tictactoe.checkWin(tictactoe.clientPlays);
    if (res) {
      socket.write(`Resultado: Jogador X ganhou!`);
      socket.destroy();
    } else {
      const number = tictactoe.getServerPlay();
      socket.write(`${number}`);
      if (tictactoe.checkWin(tictactoe.serverPlays)) {
        setTimeout(() => {
          socket.write("Resultado: Jogador O ganhou!");
          socket.destroy();
        }, 1000);
      }
    }
  });

  socket.on("end", () => {
    console.log("Conexão encerrada");
  });
});

server.listen(4444);
