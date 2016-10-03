enemyCnt = 0;

function Enemy(canvas, left, top, id, x, y, w, h, rect, copy, dx, dy)
{
	if(copy == 0)
		id = enemyCnt++;
	if(copy == 0)
	{
		x = Math.floor((Math.random() * 1000) + 1) % 700;
		y = Math.floor((Math.random() * 1000) + 1) % 500;
		w = Math.floor((Math.random() * 100) + 1);
		h = Math.floor((Math.random() * 100) + 1);
		w = 70;
		h = 70;
		dx = Math.floor((Math.random() * 10) + 1) % 3;
		switch(dx)
		{
		case 0: dx = -1; break;
		case 1: dx = 0; break;
		case 2: dx = 1; break;
		}
		dy = Math.floor((Math.random() * 10) + 1) % 3;
		switch(dy)
		{
		case 0: dy = -1; break;
		case 1: dy = 0; break;
		case 2: dy = 1; break;
		}
	}

	this.draw = function ()
	{
		if(x > 730)
			dx = -1;
		if(y > 530)
			dy = -1;
		if(x <= 0)
			dx = 1;
		if(y <= 0)
			dy = 1;
		if(rect != 0)
			rect.remove();
		rect = $("<div class='enemyRect enemy"+id+"'></div>");
		canvas.after(rect);
		rect = $('.enemy'+id);
		x = x + dx;
		y = y + dy;
		rect.css('position', 'absolute');
		rect.css('left', parseInt(left,10)+x+'px');
		rect.css('top', parseInt(top,10)+y+'px');
		rect.css('z-index', 300);
		rect.width(w);
		rect.height(h);
	};
	this.kill = function ()
	{
		rect.remove();
	};
	this.getX = function ()
	{
		return x;
	};
	this.getY = function ()
	{
		return y;
	};
	this.getW = function ()
	{
		return w;
	};
	this.getH = function ()
	{
		return h;
	};
	this.getId = function ()
	{
		return id;
	}
	this.getRect = function ()
	{
		return rect;
	}
	this.getDx = function ()
	{
		return dx;
	}
	this.getDy = function ()
	{
		return dy;
	}
	this.getValue = function ()
	{
		console.log(id);
		console.log(x);
		console.log(y);
		console.log(w);
		console.log(h);
		console.log(dx);
		console.log(dy);
	}
}