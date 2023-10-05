const WebSocket = require("ws");

const connectButton = document.querySelector("[data-connect-button]");
const messageButton = document.querySelector("[data-message-button]");

var socket = null;

const createConnection = () => {
  const ip = document.getElementById("ip").value;
  const port = document.getElementById("port").value;

  socket = new WebSocket(`ws://${ip}:${port}`);

  socket.on("open", () => {
    console.log("Conexão estabelecida");
    alert("Conexão estabelecida");
  });

  listenServer();
};

const sendMessage = () => {
  const msg = document.getElementById("msg").value;

  printMessage('client', msg);
  socket.send(msg);

  document.getElementById("msg").value = "";
};

const listenServer = () => {
  socket.on("message", (data) => {
    printMessage('server', data.toString("utf-8"));
  });
};

const printMessage = (from, msg) => {
  const messagesDiv = document.querySelector('.messages');
  const spanElement = document.createElement('span');
  spanElement.innerHTML = msg;
  spanElement.className = from === 'client' ? 'msgreq' : 'msgres';
  messagesDiv.appendChild(spanElement);
}

connectButton.addEventListener("click", createConnection);
messageButton.addEventListener("click", sendMessage);
