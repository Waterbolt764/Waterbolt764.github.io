const symbols = ["💎", "🍒", "🔔", "7️⃣", "🍋", "⭐"];
const grid = document.getElementById("grid");
let balance = 10;

function initGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "❔";
    grid.appendChild(cell);
  }
  updateBalanceUI();
  updateWinUI(0);
  setMessage("Welcome! Spin to win!");
}

function normalizeSymbol(sym) {
  return sym.normalize('NFC');
}

function spin() {
  if (balance < 1) {
    setMessage("💸 Not enough funds!");
    return;
  }

  const powerPlay = document.getElementById("powerPlay").checked;
  const cells = document.querySelectorAll(".cell");
  let result = [];

  for (let i = 0; i < 9; i++) {
    let sym = symbols[Math.floor(Math.random() * symbols.length)];
    if (powerPlay && sym === "💎") sym = "⭐"; // Power Play effect
    result.push(sym);
    cells[i].textContent = sym;
  }

  balance -= 1; // cost per spin

  let win = checkWin(result);

  balance += win;

  updateBalanceUI();
  updateWinUI(win);
}

function checkWin(result) {
  const winLines = [
    [3, 4, 5], // middle row
    [0, 4, 8], // diagonal TL-BR
    [2, 4, 6]  // diagonal TR-BL
  ];

  for (let line of winLines) {
    const [i, j, k] = line;
    const a = result[i];
    const b = result[j];
    const c = result[k];

    if (
      normalizeSymbol(a) === normalizeSymbol(b) &&
      normalizeSymbol(b) === normalizeSymbol(c)
    ) {
      const winAmount = getWinAmount(a);
      setMessage(`🎉 3 ${a}s! You win £${winAmount.toFixed(2)}`);
      return winAmount;
    }
  }

  setMessage("No win – try again!");
  return 0;
}

function getWinAmount(symbol) {
  switch (symbol) {
    case "⭐": return 5;
    case "💎": return 4;
    case "7️⃣": return 3;
    case "🔔": return 2;
    case "🍒": return 1.5;
    case "🍋": return 1;
    default: return 0;
  }
}

function topUp() {
  const input = document.getElementById("topupAmount");
  const amount = parseFloat(input.value);

  if (!amount || amount <= 0) {
    setMessage("Please enter a valid amount.");
    return;
  }

  balance += amount;
  updateBalanceUI();
  setMessage(`💳 Added £${amount.toFixed(2)} to your balance.`);
  input.value = '';
}

function updateBalanceUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

function updateWinUI(win) {
  document.getElementById("win").textContent = win.toFixed(2);
}

function setMessage(msg) {
  document.getElementById("message").textContent = msg;
}

window.onload = initGrid;
