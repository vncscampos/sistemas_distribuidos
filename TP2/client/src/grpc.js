const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = "./src/tictactoe.proto";

class Rpc {
  constructor(ip, port) {
    const proto = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const protoDescriptor = grpc.loadPackageDefinition(proto);
    const tictactoe = protoDescriptor.tictactoe;

    this.client = new tictactoe.TicTacToe(
      `${ip}:${port}`,
      grpc.credentials.createInsecure()
    );

    this.client.createsession({}, (error) => {
      if (error) {
        console.error('Falha na conexão');
      }
    });
  }

  send(data) {
    this.client.getplay({ play: data }, (error, { play, message }) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(play, message);
      setServerPlay(play);

      if (message) {
        setTimeout(() => {
          showResult(message);
        }, 1000);
      }
    });
  }
}

module.exports = Rpc;
