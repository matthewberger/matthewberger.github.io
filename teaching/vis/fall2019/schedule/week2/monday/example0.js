var circle = {
	cx:3,
	cy:10,
	cr:5,
};
circle['blah'] = 4;
circle.foo = 'bar';
circle.length = function()  {
	return Math.sqrt(this.cx*this.cx+this.cy*this.cy);
}
