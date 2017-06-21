const width = 900;
const height = 500;
const padHeight = Math.floor(height / 5);
const padWidth = 10;
const padPadding = 20;
const ballRadius = 7;
const padSpeed = 3;
const drawFps = 60;
const runFps = 60;
const ballSpeed = 2;

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById("thegame");
	const leftScoreEl = document.getElementById("left");
	const rightScoreEl = document.getElementById("right");
	let leftScore = 0;
	let rightScore = 0;
	const ctx = canvas.getContext('2d');
	canvas.height = height;
	canvas.width = width;

	let padAY;
	let padBY;
	let ballX;
	let ballY;
	let ballSpeedX;
	let ballSpeedY;

	function reset() {
		padAY = height / 2 - padHeight / 2;
		padBY = height / 2 - padHeight / 2;
		ballX = width / 2;
		ballY = height / 2;
		ballSpeedX = ballSpeed;
		ballSpeedY = ballSpeed;
	}

	function draw() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = 'white';
		ctx.fillRect(padPadding, padAY, padWidth, padHeight);
		ctx.fillRect((width - padPadding - padWidth), padBY, padWidth, padHeight);

		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI);
		ctx.fill();
	}

	const keysPressed = new Set();

	function step() {
		keysPressed.forEach(code => {
			switch (code) {
				case 38:
					padAY -= padSpeed;
					padBY -= padSpeed;
					break;
				case 40:
					padAY += padSpeed;
					padBY += padSpeed;
					break;
			}
		});
		ballX += ballSpeedX;
		ballY += ballSpeedY;

		if (ballY + ballRadius > height) {
			ballSpeedY *= -1;
			ballY = height - ballRadius;
		} else if (ballY < ballRadius) {
			ballSpeedY *= -1;
			ballY = ballRadius;
		}

		if ((ballX + ballRadius) > (width - padPadding - padWidth) &&
			ballY > padBY && ballY < padBY + padHeight) {
			ballSpeedX *= -1.1;
			padSpeed *= 1.05;
			ballX = (width - padPadding - padWidth - ballRadius);

			const relativePosition = (ballY - padBY)/padHeight - 0.5;
			ballSpeedY += relativePosition * ballSpeed * 2;
		}
		if (ballX - ballRadius < (padPadding + padWidth) &&
			ballY > padAY && ballY < padAY + padHeight) {
			ballSpeedX *= -1.1;
			padSpeed *= 1.05;
			ballX = padPadding + padWidth + ballRadius;
			const relativePosition = (ballY - padAY)/padHeight - 0.5;
			ballSpeedY += relativePosition * ballSpeed * 2;
		}

		if (ballX > (width - padPadding)) {
			leftScore++;
			leftScoreEl.textContent = leftScore;
			reset();
		} else if (ballX < (padPadding)) {
			rightScore++;
			rightScoreEl.textContent = rightScore;
			reset();
		}

	}

	document.addEventListener('keydown', (e) => {
		keysPressed.add(e.keyCode);
	});
	document.addEventListener('keyup', (e) => {
		keysPressed.delete(e.keyCode);
	});

	reset();
	setInterval(draw, 1000/drawFps);
	setInterval(step, 1000/runFps);
});
