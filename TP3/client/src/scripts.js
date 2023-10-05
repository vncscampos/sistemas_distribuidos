const net = require("net");

const connectButton = document.querySelector("[data-connect-button]");
const messageButton = document.querySelector("[data-message-button]");

var socket = null;

const createConnection = () => {
  const ip = document.getElementById("ip").value;
  const port = document.getElementById("port").value;

  socket = new net.Socket();

  socket.connect(port, ip, () => {
    alert('Conexão estabelecida')
  });

  listenServer();
};

const sendMessage = () => {
  const msg = document.getElementById("msg").value;

  printMessage("client", msg);
  socket.write(msg);

  document.getElementById("msg").value = "";
};

const listenServer = () => {
  socket.on("data", (data) => {
    printMessage("server", data.toString("utf-8"));
  });
};

const printMessage = (from, msg) => {
  const messagesDiv = document.querySelector(".messages");
  const spanElement = document.createElement("span");
  spanElement.innerHTML = msg;
  spanElement.className = from === "client" ? "msgreq" : "msgres";
  messagesDiv.appendChild(spanElement);
};

connectButton.addEventListener("click", createConnection);
messageButton.addEventListener("click", sendMessage);
