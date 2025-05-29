let score = 0;
let clickValue = 1;
let upgradeCost = 10;
let upgrades = 0;

const scoreDisplay = document.getElementById('score');
const upgradeBtn = document.getElementById('upgradeBtn');
const cookie = document.getElementById('cookie');
const rankDisplay = document.querySelector('#cookieClickerPro .rank');

function updateScore() {
  scoreDisplay.textContent = score;
  updateRank();
}

function updateRank() {
  let rank = 'Beginner';
  if (score >= 1000) rank = 'Cookie Master';
  else if (score >= 500) rank = 'Expert';
  else if (score >= 100) rank = 'Intermediate';
  rankDisplay.textContent = `Rank: ${rank}`;
}

cookie.addEventListener('click', () => {
  score += clickValue;
  updateScore();
});

upgradeBtn.addEventListener('click', () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    upgrades++;
    clickValue++;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    upgradeBtn.textContent = `Buy Upgrade (+1 per click) - ${upgradeCost} cookies`;
    updateScore();
  } else {
    alert('Not enough cookies!');
  }
});

updateScore();
