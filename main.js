var Typewriter = function(el, text, time, bold) {
	this.target = text;
	this.time = time
	this.bold = bold;
	this.txt = '';
	this.el = el;
	this.tick();
};

Typewriter.prototype.tick = function() {
	this.txt = this.target.substring(0, this.txt.length + 1);

	if (this.bold != "true") {
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
	} else {
		this.el.innerHTML = '<span class="wrap"><b>'+this.txt+'</b></span>';
	}

	var delta
	var that = this;
	
	if (this.time) {
		delta = (this.time / this.target.length) * 1000;
	} else {
		delta = 100;
	}
	
	if (this.txt != this.target) {
		setTimeout(function() {
			that.tick();
		}, delta);
	}
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
		var text = elements[i].getAttribute('data-text');
		var bold = elements[i].getAttribute('data-bold');
		var time = parseFloat(elements[i].getAttribute('data-time'));

		new Typewriter(elements[i], text, time, bold);
	}
};
