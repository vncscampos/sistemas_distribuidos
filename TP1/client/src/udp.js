const dgram = require("dgram");

class UdpClient {
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
    this.client = null;
  }

  init() {
    this.client = dgram.createSocket("udp4");
    console.log(this.port, this.ip);
    this.client.connect(this.port, this.ip);

    this.client.on("connect", () => {
      console.log("Conexão estabelecida!");
      this.client.send("reset");
    });
  }

  send(data) {
    this.client.send(data);
  }

  listen() {
    this.client.on("message", (msg) => {
      const res = msg.toString();
      if (res.includes("Resultado")) {
        showResult(res);
      } else {
        setServerPlay(res);
      }
    });
  }
}

module.exports = UdpClient;
