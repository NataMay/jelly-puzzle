function PVector(x,y) {
	this.x = x;
	this.y = y;
	
this.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
}

this.sub = function(vector) {
	this.x -= vector.x;
	this.y -= vector.y;
}

this.mult = function(c) {
	this.x *= c;
	this.y *= c;
}

this.div = function(c) {
	this.x /= c;
	this.y /= c;
}

this.dot = function(vector)
{
  return (this.x * vector.x + this.y * vector.y);
}

this.mag = function() {
  return Math.sqrt(x*x + y*y);
}

this.limit = function(high) {
  if (this.mag() > high) {
	this.normalize();
	this.mult(high);
  }
}

this.dist = function(v) {
  var dx = this.x - v.x,
	  dy = this.y - v.y;
  return Math.sqrt(dx * dx + dy * dy);
}

this.normalize = function() {
	var m = this.mag();
	if(m)
		this.div(m);
}
this.heading2D = function() {
	return (-Math.atan2(-this.y, this.x));
}

this.get = function() {
	return new PVector(this.x,this.y);
}

}

PVector.sub = function(vector,vector2) {
	return new PVector(vector.x-vector2.x,vector.y-vector2.y);
}

PVector.add = function(vector,vector2) {
	return new PVector(vector.x+vector2.x,vector.y+vector2.y);
}

PVector.dist = function(vector,vector2) {
	return vector.dist(vector2);
}


/*// ------------------- public methods ------------------- //



Vector2.prototype.distance = function( vector )
{
  var deltaX = _x - vector.x;
  var deltaY = _y - vector.y;
  return Math.sqrt( deltaX * deltaX + deltaY * deltaY );
};

Vector2.prototype.distanceSqr = function( vector )
{
  var deltaX = _x - vector.x;
  var deltaY = _y - vector.y;
  return ( deltaX * deltaX + deltaY * deltaY );
};

Vector2.prototype.magnitude = function( )
{
  return Math.sqrt( _x * _x + _y * _y );
};

Vector2.prototype.normalize = function( )
{
  var mag = Math.sqrt( _x * _x + _y * _y );
  
  if ( mag === 0 )
  {
    _x = 0;
    _y = 0;
  }
  else
  {
    _x = _x / mag;
    _y = _y / mag;
  }
};

Vector2.prototype.getNormalized = function( )
{
  var mag = Matn.sqrt( _x * _x + _y * _y );
  return new Vector2( _x / mag, _y / mag );
};

Vector2.prototype.getAngle = function( )
{
  return Math.atan2( _y, _x ) * 180 / Math.PI;
};

Vector2.prototype.degToVec = function( deg )
{
  var rad = deg * DEGRAD;
  return new Vector2( Math.cos( rad ), Math.sin( rad ) );
};

Vector2.prototype.radToVec = function( )
{
  return new Vector2( Math.sin( rad ), Math.cos( rad ) );
};

// ---------------- additional vector methods ---------------- //
  
Vector2.prototype.dot = function( vector )
{
  return ( _x * vector.x + _y * vector.y );
};

Vector2.prototype.rotate = function( deg )
{
  var rad = deg * DEGRAD;
  var cos = Math.cos( rad );
  var sin = Math.sin( rad );
  _x = _x * cos - _y * sin;
  _y = _y * cos + _x * sin;
};

Vector2.prototype.perpRight = function( )
{
  return new Vector2( -_y, _x );
};

Vector2.prototype.toString = function( )
{
  return ( "x : " + int( _x * 100 ) / 100 + ", \ty : " + int( _y * 100 ) / 100 );
};*/