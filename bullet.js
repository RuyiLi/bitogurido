class Bullet{
	constructor(x, y, vx, vy){
		this.x = x * 200;
		this.y = y * 200;
		this.vx = vx;
		this.vy = vy;
	}

	render(ctx){
		this.x += this.vx;
		this.y += this.vy;
		ctx.beginPath();
	    ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
	    ctx.fill();
	}
}