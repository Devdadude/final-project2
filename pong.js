const canvas = document.getElementById('pong-canvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function draw() {
  // Clear canvas
  drawRect(0, 0, canvas.width, canvas.height, '#000');

  // Draw paddles
  drawRect(0, leftPaddleY, paddleWidth, paddleHeight, '#fff');
  drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, '#fff');

  // Draw ball
  drawCircle(ballX, ballY, ballRadius, '#fff');
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 4;
}

function update() {
  // Move paddles
  leftPaddleY += leftPaddleSpeed;
  rightPaddleY += rightPaddleSpeed;

  // Prevent paddles from going out of bounds
  if (leftPaddleY < 0) leftPaddleY = 0;
  if (leftPaddleY + paddleHeight > canvas.height) leftPaddleY = canvas.height - paddleHeight;
  if (rightPaddleY < 0) rightPaddleY = 0;
  if (rightPaddleY + paddleHeight > canvas.height) rightPaddleY = canvas.height - paddleHeight;

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;

::contentReference[oaicite:0]{index=0}
