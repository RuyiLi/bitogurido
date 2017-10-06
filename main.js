const game = document.getElementById('game');
const ctx = game.getContext('2d');
const snd = document.getElementById('song');
const p = document.getElementById('score');
const bar = document.getElementById('progress');
game.width = 200;
game.height = 200;

var bullets = []

//player pos in grid
var pos = { x: 1, y: 1 };

var paused = false;

var timer = null;

//grid dimensions
const gw = 30;
const gh = 30;

function start(map){
	bullets = []
	pos = { x: 1, y: 1 };

	let beats = map.split('\n');
	let music = beats.shift();

	if(music !== 'none'){
		snd.src = music;
		snd.play();
	}

	ctx.strokeStyle = ctx.fillStyle = '#EFEFEF';
	ctx.lineWidth = 0.8;

	console.log('Loaded bitomap! Patterns: ' + beats.map(e => e.split(',')[0]).join(' | '));

	spawn(beats, 0)
	gameLoop();
}

function spawn(beats, i){
	if(i < beats.length){
		let sections = beats[i].split(',')

		let parts = sections[0].split(' ');
		let delay = sections[1] ? parseInt(sections[1]) : 1000;
		let speed = parseInt(sections[2]) || 1;
		timer = new Timer(function(){
			spawn(beats, i + 1)
		}, delay);

		bullet(parts, speed);
	}
}

document.getElementById('bar').addEventListener('click', function(e){
	if(!paused){
		snd.pause();
		timer.pause();
	}else{
		snd.play();
		timer.resume();
	}
	paused = !paused;
}, false);

document.addEventListener('keydown', function(e) {
	if(paused) return;
    if(e.keyCode === 37) pos.x += pos.x > 0 ? -1 : 0;
    if(e.keyCode === 38) pos.y += pos.y > 0 ? -1 : 0;
    if(e.keyCode === 39) pos.x += pos.x < 2 ? 1 : 0;
    if(e.keyCode === 40) pos.y += pos.y < 2 ? 1 : 0;
}, false);

function gameLoop(){
	if(!paused){
		p.innerHTML = `${Math.round(snd.currentTime * 100) / 100} / ${Math.round(snd.duration * 100) / 100}`
		bar.style.width = snd.currentTime / snd.duration * 100 + '%';
		ctx.clearRect(0, 0, game.width, game.height);

		//make it so the grid outline isn't translucent
		ctx.strokeRect(55, 55, gw * 3, gh * 3);

		//hot
		for(let i = 0; i < 9; i++){
			ctx.strokeRect(i % 3 * gw + 55, Math.floor(i / 3) * gh + 55, gw, gh);
		}

		for(let bullet of bullets){
			if(bullet){	
				if(bullet.x < 0 || bullet.x > game.width || bullet.y < 0 || bullet.y > game.height){
					bullets.splice(bullets.indexOf(bullet), 1);
					bullet = null;
					delete bullet;
					continue;
				}
				if(bullet.x > (pos.x * gw + 60) && bullet.x < (pos.x * gw + 80) && bullet.y > (pos.y * gh + 60) && bullet.y < (pos.y * gh + 80)){
					bullets.splice(bullets.indexOf(bullet), 1);
					bullet = null;
					delete bullet;
					console.log('Game over.')
					continue;
				}
				bullet.render(ctx);
			}
		}

		ctx.fillRect(pos.x * gw + 60, pos.y * gh + 60, 20, 20);
	}
	requestAnimationFrame(gameLoop);
}

function bullet(from, speed){
	for(let d of from){
		d = d.substring(0, 2)
		switch(d){
			//=============CORNERS================
			case 'tl':
				var b = new Bullet(0, 0, speed, speed);
				break;
			case 'tr':
				var b = new Bullet(1, 0, -speed, speed);
				break;
			case 'bl':
				var b = new Bullet(0, 1, speed, -speed);
				break;
			case 'br':
				var b = new Bullet(1, 1, -speed, -speed);
				break;
			//===============LEFT===================
			case '1l':
				var b = new Bullet(0, 1 / 3, speed, 0);
				break;
			case '2l':
			case 'l':
				var b = new Bullet(0, 0.5, speed, 0);
				break;
			case '3l':
				var b = new Bullet(0, 2 / 3, speed, 0);
				break;
			//===============RIGHT==================
			case '1r':
				var b = new Bullet(1, 1 / 3, -speed, 0);
				break;
			case '2r':
			case 'r':
				var b = new Bullet(1, 0.5, -speed, 0);
				break;
			case '3r':
				var b = new Bullet(1, 2 / 3, -speed, 0);
				break;
			//================TOP===================
			case '1t':
				var b = new Bullet(1 / 3, 0, 0, speed);
				break;
			case '2t':
			case 't':
				var b = new Bullet(0.5, 0, 0, speed);
				break;
			case '3t':
				var b = new Bullet(2 / 3, 0, 0, speed);
				break;
			//===============BOTTOM==================
			case '1b':
				var b = new Bullet(1 / 3, 1, 0, -speed);
				break;
			case '2b':
			case 'b':
				var b = new Bullet(0.5, 1, 0, -speed);
				break;
			case '3b':
				var b = new Bullet(2 / 3, 1, 0, -speed);
				break;
		}
		console.log('Direction:', d, '| Bullet:', b);
		bullets.push(b);
	}
}

(function() {
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();