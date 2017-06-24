const width = 30;
const height = 30;
const blocksize = 20;

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById("snake");
	const ctx = canvas.getContext("2d");
	canvas.height = height * blocksize;
	canvas.width = width * blocksize;

	function newApple() {
		let x, y;
		do {
			x = Math.floor(Math.random() * width);
			y = Math.floor(Math.random() * height);
		} while (snake.find(({ sx, sy}) => sx === x && sy === y));
		return { x, y };
	}

	function createSnake() {
		return Array.from({ length : 5}).map(() => ({ x : Math.floor(height / 2), y : Math.floor(height / 2) }));
	}

	let snake = createSnake();
	let speedx = 1;
	let speedy = 0;
	let apple = newApple();
	let keyCode;

	function reset() {
		snake = createSnake();
		speedx = 1;
		speedy = 0;
		apple = newApple();
	}

	function draw() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0, width*blocksize, height * blocksize);

		ctx.fillStyle = 'lime';
		ctx.strokeStyle = 'black';
		snake.forEach(({ x , y }) => {
			ctx.fillRect(x * blocksize, y * blocksize, blocksize, blocksize);
			ctx.strokeRect(x * blocksize, y * blocksize, blocksize, blocksize);
		});

		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'black';
		ctx.fillRect(apple.x * blocksize, apple.y * blocksize, blocksize, blocksize);
	}

	function update() {
		switch (keyCode) {
			case 37:
				if (speedx !== 1) {
					speedx = -1;
					speedy = 0;
				}
				break;
			case 38:
				if (speedy !== 1) {
					speedx = 0;
					speedy = -1;
				}
				break;
			case 39:
				if (speedx !== -1) {
					speedx = 1;
					speedy = 0;
				}
				break;
			case 40:
				if (speedy !== -1) {
					speedx = 0;
					speedy = 1;
				}
				break;
		}
		keyCode = null;

		const last = snake[snake.length - 1];
		const head = {
			x : last.x + speedx,
			y : last.y + speedy
		};
		snake.shift();
		snake.push(head);

		const collision = snake.find(part => {
			return part !== head &&
				part.x === head.x &&
				part.y === head.y;
		});

		const oob = head.x >= width || head.y >= height || head.x < 0 || head.y < 0;

		if (collision || oob) {
			alert("You ded");
			reset();
			return;
		}
		if (head.x === apple.x && head.y === apple.y) {
			apple = newApple();
			snake.unshift({
				x: snake[0].x,
				y: snake[0].y
			});
		}


	}

	draw();

	setInterval(() => {
		update();
		draw();
	}, 1000/8);


	document.addEventListener('keydown', (e) => {
		keyCode = e.keyCode;
	});
});
