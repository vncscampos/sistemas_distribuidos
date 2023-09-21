class TicTacToe {
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  serverPlays = [];
  clientPlays = [];

  getClientPlay(data) {
    this.clientPlays.push(Number(data));
  }

  getServerPlay() {
    let number = Math.floor(Math.random() * 9);

    while (
      this.serverPlays.includes(number) ||
      this.clientPlays.includes(number)
    ) {
      number = Math.floor(Math.random() * 9);
    }

    this.serverPlays.push(number);
    return number;
  }

  checkWin(currentPlayer) {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;

      if (
        currentPlayer.includes(a) &&
        currentPlayer.includes(b) &&
        currentPlayer.includes(c)
      ) {
        return true;
      }
    }
    return false;
  }
}

module.exports = TicTacToe;
