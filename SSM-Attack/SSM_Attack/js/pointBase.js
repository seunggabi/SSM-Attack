function PointBase(left, right, up, down)
{
	this.getLeft = function() 
	{
		return left;
	}
	this.getRight = function()
	{
		return right;
	}
	this.getUp = function()
	{
		return up;
	}
	this.getDown = function()
	{
		return down;
	}
}