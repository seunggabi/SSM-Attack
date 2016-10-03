var Q = 0.0001;
var R = 0.001;
var P = 1;
var K;
var filteredX;
var filteredY;
var mX = 0.0;
var mY = 0.0;

function transform(){
	K = (P + Q) / (P + Q + R);
	P = R * (P + Q) / (R + P + Q);
}

function update(currentCoordinate,newCoordinate){
	currentCoordinate = currentCoordinate + (newCoordinate - currentCoordinate) * K;
	return currentCoordinate;
}

function kalman(newX,newY){
	transform();
	filteredX = update(mX,newX);
	filteredY = update(mY,newY);
	/*
		(mX - filteredX) * 100 , (mY-filteredY) * 100 에 좌표를 이동시킨다.
	*/
	mX = filteredX;
	mY = filteredY;
}