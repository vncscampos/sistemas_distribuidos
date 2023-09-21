const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");

const connectButton = document.querySelector("[data-connect-button]");

let client = null;
let typeConn;

const startGame = () => {
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
};

const setBoardHoverClass = () => {
  board.classList.add("x");
};

const handleClick = (e) => {
  const cell = e.target;
  cell.classList.add("x");

  sendData(cell.id);
};

const setServerPlay = (data) => {
  const cell = document.getElementById(data);
  cell.classList.add("circle");
};

const showResult = (res) => {
  alert(res);
};

// Conexões

const createConnection = () => {
  const types = document.getElementsByName("tipoConexao");

  for (const element of types) {
    if (element.checked) typeConn = element.value;
  }

  const ip = document.getElementById("ip").value;
  const port = document.getElementById("port").value;

  if (typeConn === "TCP") {
    tcpConnection(ip, port);
  } else if (typeConn === "UDP") {
    udpConnection(ip, port);
  }

  startGame();
};

const tcpConnection = (ip, port) => {
  client = new TcpClient(ip, port);
  client.init();
  client.listen();
};

const udpConnection = (ip, port) => {
  client = new UdpClient(ip, port);
  client.init();
  client.listen();
};

const sendData = (data) => {
  client.send(data);
};

connectButton.addEventListener("click", createConnection);
