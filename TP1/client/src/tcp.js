const net = require("net");

class TcpClient {
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
    this.client = null;
  }

  init = () => {
    this.client = new net.Socket();
    this.client.connect(this.port, this.ip, () => {
      console.log("Conexão estabelecida");
    });
  };

  send = (data) => {
    this.client.write(data);
  };

  listen = () => {
    this.client.on("data", (data) => {
      const res = data.toString();
      if (res.includes("Resultado")) {
        showResult(res);
      } else {
        setServerPlay(res);
      }
    });
  };
}

module.exports = TcpClient;
