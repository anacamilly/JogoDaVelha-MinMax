// Função para descobrir o melhor movimento
function bestMove() {
    // AI para fazer sua tur
    let bestScore = -Infinity; //A melhor pontuação é o infinito negativo
    let move; //Jogada
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Verifica se a vaga está disponível
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, 0, false); // Chama o minmax para pegar a pontuação
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
  }
  
  // Pontuações para X, O e empate
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };

  function minimax(board, depth, isMaximizing) {
    let result = checkWinner(); //Checa se algum jogador gannhou
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;

    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // verifica se a vaga está disponível
          if (board[i][j] == '') {
            // Encontra a melhor pontuação para ele, para a pontuação do humano seja a mais baixa
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }