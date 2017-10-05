const game = document.getElementById('game');
const ctx = game.getContext('2d');
const snd = document.getElementById('song');
game.width = 200;
game.height = 200;

bullets = []

//grid dimensions
const gw = 30;
const gh = 30;

//player pos in grid
let pos = { x: 1, y: 1 };

function start(map){
	let beats = map.split('\n');
	let music = beats.shift();
	snd.src = music;
	snd.play();
	ctx.strokeStyle = ctx.fillStyle = '#EFEFEF';
	ctx.lineWidth = 0.8;
	console.log('Loaded bitomap! Patterns: ' + beats.join(' | '));
	gameLoop();
	spawn(beats, 0)
}

function spawn(beats, i){
	if(i < beats.length){
		let p = beats[i].split(' ');
		if(!isNaN(p[p.length - 1])){
			setTimeout(function(){
				spawn(beats, i + 1)
			},  parseInt(p[p.length - 1]));	
			p.pop();
		}else{
			setTimeout(function(){
				spawn(beats, i + 1)
			},  1000);	
		}
		bullet(p);
	}
}

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37) pos.x += pos.x > 0 ? -1 : 0;
    if(e.keyCode === 38) pos.y += pos.y > 0 ? -1 : 0;
    if(e.keyCode === 39) pos.x += pos.x < 2 ? 1 : 0;
    if(e.keyCode === 40) pos.y += pos.y < 2 ? 1 : 0;
}, false);

function gameLoop(){
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
	requestAnimationFrame(gameLoop);
}

function bullet(from){
	for(let d of from){
		d = d.substring(0, 2)
		switch(d){
			//=============CORNERS================
			case 'tl':
				var b = new Bullet(0, 0, 1, 1);
				break;
			case 'tr':
				var b = new Bullet(1, 0, -1, 1);
				break;
			case 'bl':
				var b = new Bullet(0, 1, 1, -1);
				break;
			case 'br':
				var b = new Bullet(1, 1, -1, -1);
				break;
			//===============LEFT===================
			case '1l':
				var b = new Bullet(0, 1 / 3, 1, 0);
				break;
			case '2l':
			case 'l':
				var b = new Bullet(0, 0.5, 1, 0);
				break;
			case '3l':
				var b = new Bullet(0, 2 / 3, 1, 0);
				break;
			//===============RIGHT==================
			case '1r':
				var b = new Bullet(1, 1 / 3, -1, 0);
				break;
			case '2r':
			case 'r':
				var b = new Bullet(1, 0.5, -1, 0);
				break;
			case '3r':
				var b = new Bullet(1, 2 / 3, -1, 0);
				break;
			//================TOP===================
			case '1t':
				var b = new Bullet(1 / 3, 0, 0, 1);
				break;
			case '2t':
			case 't':
				var b = new Bullet(0.5, 0, 0, 1);
				break;
			case '3t':
				var b = new Bullet(2 / 3, 0, 0, 1);
				break;
			//===============BOTTOM==================
			case '1b':
				var b = new Bullet(1 / 3, 1, 0, -1);
				break;
			case '2b':
			case 'b':
				var b = new Bullet(0.5, 1, 0, -1);
				break;
			case '3b':
				var b = new Bullet(2 / 3, 1, 0, -1);
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